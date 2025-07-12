import { Request, Response } from 'express';
import { Session } from '../models/session.model';
import { Formation } from '../models/formation.model';
import { User } from '../models/user.model';

// Créer une nouvelle session
export const createSession = async (req: Request, res: Response) => {
  try {
    const {
      formation,
      titre,
      description,
      type,
      dateDebut,
      dateFin,
      duree,
      formateur,
      salle,
      lienMeet,
      participants,
      materiel,
      documents
    } = req.body;

    // Vérifier si la formation existe
    const formationExists = await Formation.findById(formation);
    if (!formationExists) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }

    // Vérifier si le formateur existe et est bien un formateur
    const formateurExists = await User.findOne({ _id: formateur, userType: 'formateur' });
    if (!formateurExists) {
      return res.status(404).json({ message: 'Formateur non trouvé' });
    }

    const session = new Session({
      formation,
      titre,
      description,
      type,
      dateDebut,
      dateFin,
      duree,
      formateur,
      salle,
      lienMeet,
      participants,
      materiel,
      documents
    });

    await session.save();
    res.status(201).json(session);
  } catch (error) {
    console.error('Erreur lors de la création de la session:', error);
    res.status(500).json({ message: 'Erreur lors de la création de la session' });
  }
};

// Obtenir toutes les sessions
export const getSessions = async (req: Request, res: Response) => {
  try {
    const { formation, formateur, statut, type, dateDebut, dateFin } = req.query;
    const query: any = {};

    if (formation) query.formation = formation;
    if (formateur) query.formateur = formateur;
    if (statut) query.statut = statut;
    if (type) query.type = type;
    if (dateDebut && dateFin) {
      query.dateDebut = { $gte: dateDebut };
      query.dateFin = { $lte: dateFin };
    }

    const sessions = await Session.find(query)
      .populate('formation', 'titre')
      .populate('formateur', 'firstName lastName')
      .populate('participants.etudiant', 'firstName lastName')
      .sort({ dateDebut: 1 });

    res.json(sessions);
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des sessions' });
  }
};

// Obtenir une session par son ID
export const getSessionById = async (req: Request, res: Response) => {
  try {
    const session = await Session.findById(req.params.id)
      .populate('formation', 'titre')
      .populate('formateur', 'firstName lastName')
      .populate('participants.etudiant', 'firstName lastName');

    if (!session) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    res.json(session);
  } catch (error) {
    console.error('Erreur lors de la récupération de la session:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de la session' });
  }
};

// Mettre à jour une session
export const updateSession = async (req: Request, res: Response) => {
  try {
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    ).populate('formation', 'titre')
     .populate('formateur', 'firstName lastName')
     .populate('participants.etudiant', 'firstName lastName');

    if (!session) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    res.json(session);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la session:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la session' });
  }
};

// Supprimer une session
export const deleteSession = async (req: Request, res: Response) => {
  try {
    const session = await Session.findByIdAndDelete(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    res.json({ message: 'Session supprimée avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de la session:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de la session' });
  }
};

// Mettre à jour le statut d'une session
export const updateSessionStatus = async (req: Request, res: Response) => {
  try {
    const { statut } = req.body;
    const session = await Session.findByIdAndUpdate(
      req.params.id,
      { $set: { statut } },
      { new: true }
    ).populate('formation', 'titre')
     .populate('formateur', 'firstName lastName')
     .populate('participants.etudiant', 'firstName lastName');

    if (!session) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    res.json(session);
  } catch (error) {
    console.error('Erreur lors de la mise à jour du statut de la session:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour du statut de la session' });
  }
};

// Mettre à jour la présence d'un participant
export const updateParticipantPresence = async (req: Request, res: Response) => {
  try {
    const { etudiantId, presence, note, commentaire } = req.body;
    const session = await Session.findById(req.params.id);

    if (!session) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }

    const participant = session.participants.find(
      p => p.etudiant.toString() === etudiantId
    );

    if (!participant) {
      return res.status(404).json({ message: 'Participant non trouvé dans cette session' });
    }

    participant.presence = presence;
    if (note !== undefined) participant.note = note;
    if (commentaire) participant.commentaire = commentaire;

    await session.save();
    res.json(session);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la présence:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la présence' });
  }
}; 