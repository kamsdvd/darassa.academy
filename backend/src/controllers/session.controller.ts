import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

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
    const formationExists = await prisma.formation.findUnique({ where: { id: formation } });
    if (!formationExists) {
      return res.status(404).json({ message: 'Formation non trouvée' });
    }

    // Vérifier si le formateur existe et est bien un formateur
    const formateurExists = await prisma.user.findFirst({ where: { id: formateur, userType: 'formateur' } });
    if (!formateurExists) {
      return res.status(404).json({ message: 'Formateur non trouvé' });
    }

    // Création de la session avec Prisma
    const session = await prisma.session.create({
      data: {
        formationId: formation,
        titre,
        description,
        type,
        dateDebut: new Date(dateDebut),
        dateFin: new Date(dateFin),
        duree,
        formateurId: formateur,
        salle,
        lienMeet,
        materiel,
        documents,
        // participants: à gérer selon le modèle Prisma
        participants: {
          create: Array.isArray(participants) ? participants.map((p: any) => ({
            etudiantId: p.etudiantId,
            presence: p.presence,
            note: p.note,
            commentaire: p.commentaire
          })) : []
        }
      },
      include: {
        formation: { select: { id: true, titre: true } },
        formateur: { select: { id: true, firstName: true, lastName: true } },
        participants: { include: { etudiant: { select: { id: true, firstName: true, lastName: true } } } }
      }
    });
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

    // Construction du filtre Prisma
    const where: any = {};
    if (formation) where.formationId = formation;
    if (formateur) where.formateurId = formateur;
    if (statut) where.statut = statut;
    if (type) where.type = type;
    if (dateDebut && dateFin) {
      where.dateDebut = { gte: new Date(dateDebut as string) };
      where.dateFin = { lte: new Date(dateFin as string) };
    }
    const sessions = await prisma.session.findMany({
      where,
      orderBy: { dateDebut: 'asc' },
      include: {
        formation: { select: { id: true, titre: true } },
        formateur: { select: { id: true, firstName: true, lastName: true } },
        participants: { include: { etudiant: { select: { id: true, firstName: true, lastName: true } } } }
      }
    });
    res.json(sessions);
  } catch (error) {
    console.error('Erreur lors de la récupération des sessions:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des sessions' });
  }
};

// Obtenir une session par son ID
export const getSessionById = async (req: Request, res: Response) => {
  try {
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
      include: {
        formation: { select: { id: true, titre: true } },
        formateur: { select: { id: true, firstName: true, lastName: true } },
        participants: { include: { etudiant: { select: { id: true, firstName: true, lastName: true } } } }
      }
    });
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
    const { titre, description, type, dateDebut, dateFin, duree, formateur, salle, lienMeet, materiel, documents, statut } = req.body;
    const session = await prisma.session.update({
      where: { id: req.params.id },
      data: {
        titre,
        description,
        type,
        dateDebut: dateDebut ? new Date(dateDebut) : undefined,
        dateFin: dateFin ? new Date(dateFin) : undefined,
        duree,
        formateurId: formateur,
        salle,
        lienMeet,
        materiel,
        documents,
        statut
      },
      include: {
        formation: { select: { id: true, titre: true } },
        formateur: { select: { id: true, firstName: true, lastName: true } },
        participants: { include: { etudiant: { select: { id: true, firstName: true, lastName: true } } } }
      }
    });
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
    const session = await prisma.session.delete({ where: { id: req.params.id } });
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
    const session = await prisma.session.update({
      where: { id: req.params.id },
      data: { statut },
      include: {
        formation: { select: { id: true, titre: true } },
        formateur: { select: { id: true, firstName: true, lastName: true } },
        participants: { include: { etudiant: { select: { id: true, firstName: true, lastName: true } } } }
      }
    });
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
    // Mise à jour de la présence d'un participant via Prisma
    const session = await prisma.session.findUnique({
      where: { id: req.params.id },
      include: { participants: true }
    });
    if (!session) {
      return res.status(404).json({ message: 'Session non trouvée' });
    }
    const participant = session.participants.find(
      (p: any) => p.etudiantId === etudiantId
    );
    if (!participant) {
      return res.status(404).json({ message: 'Participant non trouvé dans cette session' });
    }
    await prisma.sessionParticipant.update({
      where: { id: participant.id },
      data: {
        presence,
        note,
        commentaire
      }
    });
    const updatedSession = await prisma.session.findUnique({
      where: { id: req.params.id },
      include: {
        formation: { select: { id: true, titre: true } },
        formateur: { select: { id: true, firstName: true, lastName: true } },
        participants: { include: { etudiant: { select: { id: true, firstName: true, lastName: true } } } }
      }
    });
    res.json(updatedSession);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la présence:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de la présence' });
  }
}; 