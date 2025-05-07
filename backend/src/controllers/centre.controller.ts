import { Request, Response } from 'express';
import { CentreFormation } from '../models/centreFormation.model';
import { Formation } from '../models/formation.model';
import { User } from '../models/user.model';

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const centreId = req.params.centreId;

    // Récupérer les statistiques du centre
    const centre = await CentreFormation.findById(centreId)
      .populate('formateurs')
      .populate('formations')
      .populate('etudiants');

    if (!centre) {
      return res.status(404).json({ message: 'Centre non trouvé' });
    }

    // Calculer les statistiques
    const stats = {
      formateurs: centre.formateurs.length,
      formations: centre.formations.length,
      apprenants: centre.etudiants.length,
      tauxReussite: await calculerTauxReussite(centreId)
    };

    // Récupérer les formations récentes
    const formationsRecentes = await Formation.find({ centreFormation: centreId })
      .sort({ dateDebut: -1 })
      .limit(5)
      .populate('formateurs');

    res.json({
      stats,
      formationsRecentes: formationsRecentes.map(formation => ({
        id: formation._id,
        title: formation.titre,
        formateur: formation.formateurs[0]?.firstName + ' ' + formation.formateurs[0]?.lastName,
        dateDebut: formation.dateDebut,
        apprenants: formation.inscriptions.length,
        progression: calculerProgression(formation)
      }))
    });
  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
};

// Fonction utilitaire pour calculer le taux de réussite
async function calculerTauxReussite(centreId: string): Promise<number> {
  try {
    const formations = await Formation.find({ centreFormation: centreId });
    let totalEvaluations = 0;
    let totalNotes = 0;

    for (const formation of formations) {
      const moyenne = formation.calculerMoyenneEvaluations();
      if (moyenne > 0) {
        totalEvaluations++;
        totalNotes += moyenne;
      }
    }

    return totalEvaluations > 0 ? Math.round((totalNotes / totalEvaluations) * 100) : 0;
  } catch (error) {
    console.error('Erreur lors du calcul du taux de réussite:', error);
    return 0;
  }
}

// Fonction utilitaire pour calculer la progression d'une formation
function calculerProgression(formation: any): number {
  const total = formation.modules.length;
  const modulesCompletes = formation.modules.filter((module: any) => 
    module.evaluation.every((eval: any) => eval.completed)
  ).length;

  return total > 0 ? Math.round((modulesCompletes / total) * 100) : 0;
} 