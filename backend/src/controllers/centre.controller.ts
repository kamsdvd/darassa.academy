import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const getDashboardStats = async (req: Request, res: Response) => {
  try {
    const centreId = req.params.centreId;

    // Récupérer les statistiques du centre
    const centre = await prisma.centreFormation.findUnique({
      where: { id: centreId },
      include: {
        formateurs: true,
        formations: true,
        etudiants: true
      }
    });

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
    const formationsRecentes = await prisma.formation.findMany({
      where: { centreFormationId: centreId },
      orderBy: { dateDebut: 'desc' },
      take: 5,
      include: { formateurs: true, inscriptions: true, modules: { include: { evaluation: true } } }
    });

    res.json({
      stats,
      formationsRecentes: formationsRecentes.map(formation => ({
        id: formation.id,
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
    const formations = await prisma.formation.findMany({ where: { centreFormationId: centreId }, include: { modules: { include: { evaluation: true } } } });
    let totalEvaluations = 0;
    let totalNotes = 0;

    for (const formation of formations) {
      const moyenne = calculerMoyenneEvaluations(formation);
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

// Calcule la moyenne des évaluations d'une formation
function calculerMoyenneEvaluations(formation: any): number {
  let total = 0;
  let count = 0;
  if (formation.modules) {
    for (const module of formation.modules) {
      if (module.evaluation) {
        for (const evalItem of module.evaluation) {
          if (typeof evalItem.note === 'number') {
            total += evalItem.note;
            count++;
          }
        }
      }
    }
  }
  return count > 0 ? total / count : 0;
}

// Fonction utilitaire pour calculer la progression d'une formation
function calculerProgression(formation: any): number {
  const total = formation.modules?.length || 0;
  const modulesCompletes = formation.modules?.filter((module: any) =>
    Array.isArray(module.evaluation) && module.evaluation.every((evalItem: any) => evalItem.completed)
  ).length || 0;
  return total > 0 ? Math.round((modulesCompletes / total) * 100) : 0;
}