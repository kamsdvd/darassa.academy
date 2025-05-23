import { Request, Response } from 'express';
import { Formation } from '../models/formation.model';
import { Session } from '../models/session.model';
import { Event, IEvent } from '../models/event.model';
import mongoose from 'mongoose';

interface CalendarQueryParams {
  startDate?: string;
  endDate?: string;
  formateurId?: string;
  formationTypeId?: string;
  status?: string;
  searchTerm?: string;
}

interface CalendarEventResponse {
  id: string;
  summary: string;
  description: string;
  start: {
    dateTime: string;
    timeZone: string;
  };
  end: {
    dateTime: string;
    timeZone: string;
  };
  location?: string;
  formateur?: string;
  participants: number;
  type: string;
  status: string;
}

export const getEvents = async (req: Request<{}, {}, {}, CalendarQueryParams>, res: Response) => {
  try {
    const { 
      startDate, 
      endDate, 
      formateurId, 
      formationTypeId, 
      status,
      searchTerm 
    } = req.query;

    // Build the base query
    const query: mongoose.FilterQuery<IEvent> = {};
    const orConditions: mongoose.FilterQuery<IEvent>[] = [];

    // Handle dates
    if (startDate && endDate) {
      query.dateDebut = { $gte: new Date(startDate) };
      query.dateFin = { $lte: new Date(endDate) };
    }

    // Handle formateur filter
    if (formateurId && formateurId !== 'all') {
      query.formateur = new mongoose.Types.ObjectId(formateurId);
    }

    // Handle formation type filter
    if (formationTypeId && formationTypeId !== 'all') {
      query.type = formationTypeId;
    }

    // Handle status filter
    if (status && status !== 'all') {
      query.statut = status;
    }

    // Handle search term
    if (searchTerm) {
      orConditions.push(
        { titre: { $regex: searchTerm, $options: 'i' } },
        { description: { $regex: searchTerm, $options: 'i' } }
      );
    }

    // Combine all $or conditions if any exist
    if (orConditions.length > 0) {
      query.$or = orConditions;
    }

    // Fetch events with populated references
    const events = await Event.find(query)
      .populate('formateur', 'firstName lastName')
      .populate('formation', 'titre')
      .populate('session', 'titre')
      .exec();

    // Transform events to calendar format
    const calendarEvents: CalendarEventResponse[] = events.map(event => ({
      id: event._id.toString(),
      summary: event.titre,
      description: event.description,
      start: {
        dateTime: event.dateDebut.toISOString(),
        timeZone: 'Europe/Paris'
      },
      end: {
        dateTime: event.dateFin.toISOString(),
        timeZone: 'Europe/Paris'
      },
      location: event.salle?.nom || 'Non spécifié',
      formateur: event.formateur && 'firstName' in event.formateur
        ? `${event.formateur.firstName} ${event.formateur.lastName}`
        : 'Non assigné',
      participants: event.participants || 0,
      type: event.type,
      status: event.statut
    }));

    return res.json({
      success: true,
      data: calendarEvents
    });

  } catch (error) {
    console.error('Error fetching calendar events:', error);
    return res.status(500).json({
      success: false,
      message: 'Erreur lors de la récupération des événements du calendrier',
      error: (error as Error).message
    });
  }
};

export const checkAvailability = async (req: Request, res: Response) => {
  try {
    const { startDate, endDate, formateurId, salleId } = req.body;

    // Vérifier les conflits pour les formations
    const formationConflicts = await Formation.find({
      formateurs: formateurId,
      $or: [
        {
          dateDebut: { $lte: endDate },
          dateFin: { $gte: startDate }
        }
      ]
    });

    // Vérifier les conflits pour les sessions
    const sessionConflicts = await Session.find({
      formateur: formateurId,
      $or: [
        {
          dateDebut: { $lte: endDate },
          dateFin: { $gte: startDate }
        }
      ]
    });

    // Si une salle est spécifiée, vérifier également les conflits de salle
    let salleConflicts = [];
    if (salleId) {
      salleConflicts = await Session.find({
        'salle._id': salleId,
        $or: [
          {
            dateDebut: { $lte: endDate },
            dateFin: { $gte: startDate }
          }
        ]
      });
    }

    const hasConflicts = formationConflicts.length > 0 || sessionConflicts.length > 0 || salleConflicts.length > 0;

    res.json({
      available: !hasConflicts,
      conflicts: {
        formations: formationConflicts,
        sessions: sessionConflicts,
        salles: salleConflicts
      }
    });
  } catch (error) {
    console.error('Erreur lors de la vérification de disponibilité:', error);
    res.status(500).json({ message: 'Erreur lors de la vérification de disponibilité' });
  }
};