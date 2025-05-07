import { Request, Response } from 'express';
import { Event } from '../models/event.model';
import { Formation } from '../models/formation.model';
import { Session } from '../models/session.model';

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
    const conflicts = await Event.find({
      $or: [
        {
          dateDebut: { $lte: new Date(dateFin) },
          dateFin: { $gte: new Date(dateDebut) }
        }
      ],
      $or: [
        { formateur },
        { 'salle.nom': salle?.nom }
      ]
    });

    if (conflicts.length > 0) {
      return res.status(400).json({
        message: 'Conflit de disponibilité détecté',
        conflicts
      });
    }

    const event = new Event({
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
    });

    await event.save();
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

    const query: any = {};

    if (startDate && endDate) {
      query.dateDebut = { $gte: new Date(startDate as string) };
      query.dateFin = { $lte: new Date(endDate as string) };
    }

    if (formateurId && formateurId !== 'all') {
      query.formateur = formateurId;
    }

    if (type && type !== 'all') {
      query.type = type;
    }

    if (status && status !== 'all') {
      query.statut = status;
    }

    if (searchTerm) {
      query.$or = [
        { titre: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      ];
    }

    const events = await Event.find(query)
      .populate('formateur', 'firstName lastName')
      .populate('formation', 'titre')
      .populate('session', 'titre')
      .sort({ dateDebut: 1 });

    res.json(events);
  } catch (error) {
    console.error('Erreur lors de la récupération des événements:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération des événements' });
  }
};

// Obtenir un événement par son ID
export const getEventById = async (req: Request, res: Response) => {
  try {
    const event = await Event.findById(req.params.id)
      .populate('formateur', 'firstName lastName')
      .populate('formation', 'titre')
      .populate('session', 'titre');

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
    const conflicts = await Event.find({
      _id: { $ne: req.params.id },
      $or: [
        {
          dateDebut: { $lte: new Date(dateFin) },
          dateFin: { $gte: new Date(dateDebut) }
        }
      ],
      $or: [
        { formateur },
        { 'salle.nom': salle?.nom }
      ]
    });

    if (conflicts.length > 0) {
      return res.status(400).json({
        message: 'Conflit de disponibilité détecté',
        conflicts
      });
    }

    const event = await Event.findByIdAndUpdate(
      req.params.id,
      {
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
      },
      { new: true }
    ).populate('formateur', 'firstName lastName')
     .populate('formation', 'titre')
     .populate('session', 'titre');

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
    const event = await Event.findByIdAndDelete(req.params.id);

    if (!event) {
      return res.status(404).json({ message: 'Événement non trouvé' });
    }

    res.json({ message: 'Événement supprimé avec succès' });
  } catch (error) {
    console.error('Erreur lors de la suppression de l\'événement:', error);
    res.status(500).json({ message: 'Erreur lors de la suppression de l\'événement' });
  }
}; 