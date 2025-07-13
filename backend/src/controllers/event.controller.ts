import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

// Créer un nouvel événement
export const createEvent = async (req: Request, res: Response) => {
  try {
    const {
      titre,
      description,
      dateDebut,
      dateFin,
      type,
      formateur,
      salle,
      participants,
      formation,
      session
    } = req.body;

    // Vérifier les conflits de disponibilité
    const conflicts = await prisma.event.findMany({
      where: {
        OR: [
          {
            dateDebut: { lte: new Date(dateFin) },
            dateFin: { gte: new Date(dateDebut) }
          }
        ],
        AND: [
          {
            OR: [
              { formateurId: formateur },
              { salle: salle?.nom ? { equals: salle.nom } : undefined }
            ]
          }
        ]
      }
    });
    if (conflicts.length > 0) {
      return res.status(400).json({
        message: 'Conflit de disponibilité détecté',
        conflicts
      });
    }
    const event = await prisma.event.create({
      data: {
        titre,
        description,
        dateDebut: new Date(dateDebut),
        dateFin: new Date(dateFin),
        type,
        formateurId: formateur,
        salle,
        participants,
        formationId: formation,
        sessionId: session
      },
      include: {
        formateur: { select: { id: true, firstName: true, lastName: true } },
        formation: { select: { id: true, titre: true } },
        session: { select: { id: true, titre: true } }
      }
    });
    res.status(201).json(event);
  } catch (error) {
    console.error('Erreur lors de la création de l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de la création de l\'événement' });
  }
};

// Obtenir tous les événements
export const getEvents = async (req: Request, res: Response) => {
  try {
    const {
      startDate,
      endDate,
      formateurId,
      type,
      status,
      searchTerm
    } = req.query;

    // Construction du filtre Prisma
    const where: any = {};
    if (startDate && endDate) {
      where.dateDebut = { gte: new Date(startDate as string) };
      where.dateFin = { lte: new Date(endDate as string) };
    }
    if (formateurId && formateurId !== 'all') {
      where.formateurId = formateurId;
    }
    if (type && type !== 'all') {
      where.type = type;
    }
    if (status && status !== 'all') {
      where.statut = status;
    }
    if (searchTerm) {
      where.OR = [
        { titre: { contains: searchTerm as string, mode: 'insensitive' } },
        { description: { contains: searchTerm as string, mode: 'insensitive' } }
      ];
    }
    const events = await prisma.event.findMany({
      where,
      orderBy: { dateDebut: 'asc' },
      include: {
        formateur: { select: { id: true, firstName: true, lastName: true } },
        formation: { select: { id: true, titre: true } },
        session: { select: { id: true, titre: true } }
      }
    });
    res.json(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
  }
};

// Obtenir un événement par son ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.findUnique({
      where: { id: req.params.id },
      include: {
        formateur: { select: { id: true, firstName: true, lastName: true } },
        formation: { select: { id: true, titre: true } },
        session: { select: { id: true, titre: true } }
      }
    });
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
    res.json(event);
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'événement' });
  }
};

// Mettre à jour un événement
export const updateEvent = async (req: Request, res: Response) => {
  try {
    const {
      titre,
      description,
      dateDebut,
      dateFin,
      type,
      formateur,
      salle,
      participants,
      statut,
      formation,
      session
    } = req.body;

    // Vérifier les conflits de disponibilité
    const conflicts = await prisma.event.findMany({
      where: {
        id: { not: req.params.id },
        OR: [
          {
            dateDebut: { lte: new Date(dateFin) },
            dateFin: { gte: new Date(dateDebut) }
          }
        ],
        AND: [
          {
            OR: [
              { formateurId: formateur },
              { salle: salle?.nom ? { equals: salle.nom } : undefined }
            ]
          }
        ]
      }
    });
    if (conflicts.length > 0) {
      return res.status(400).json({
        message: 'Conflit de disponibilité détecté',
        conflicts
      });
    }
    const event = await prisma.event.update({
      where: { id: req.params.id },
      data: {
        titre,
        description,
        dateDebut: new Date(dateDebut),
        dateFin: new Date(dateFin),
        type,
        formateurId: formateur,
        salle,
        participants,
        statut,
        formationId: formation,
        sessionId: session
      },
      include: {
        formateur: { select: { id: true, firstName: true, lastName: true } },
        formation: { select: { id: true, titre: true } },
        session: { select: { id: true, titre: true } }
      }
    });
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
    res.json(event);
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de la mise à jour de l\'événement' });
  }
};

// Supprimer un événement
export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const event = await prisma.event.delete({ where: { id: req.params.id } });
    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }
    res.json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement' });
  }
};