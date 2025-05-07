import { Request, Response } from 'express';
import { Formation } from '../models/formation.model';
import { Session } from '../models/session.model';
import { Event } from '../models/event.model';

export const getEvents = async (req: Request, res: Response) => {
  try {
    const { 
      startDate, 
      endDate, 
      formateurId, 
      formationTypeId, 
      status,
      searchTerm 
    } = req.query;

    console.log('Query parameters:', {
      startDate,
      endDate,
      formateurId,
      formationTypeId,
      status,
      searchTerm
    });

    // Construire la requête de base
    const query: any = {};

    // Gestion des dates
    if (startDate && endDate) {
      query.dateDebut = { $gte: new Date(startDate as string) };
      query.dateFin = { $lte: new Date(endDate as string) };
    }

    // Ajouter les filtres si présents
    if (formateurId && formateurId !== 'all') {
      query.$or = [
        { formateurs: formateurId },
        { formateur: formateurId }
      ];
    }

    if (formationTypeId && formationTypeId !== 'all') {
      query.type = formationTypeId;
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

    console.log('MongoDB query:', JSON.stringify(query, null, 2));

    // Récupérer les événements, formations et sessions
    const [events, formations, sessions] = await Promise.all([
      Event.find(query)
        .populate('formateur', 'firstName lastName')
        .populate('formation', 'titre')
        .populate('session', 'titre'),
      Formation.find(query).populate('formateurs', 'firstName lastName'),
      Session.find(query).populate('formateur', 'firstName lastName')
    ]);

    console.log('Found events:', events.length);
    console.log('Found formations:', formations.length);
    console.log('Found sessions:', sessions.length);

    // Transformer les événements en format calendrier
    const eventCalendarItems = events.map(event => ({
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
      formateur: event.formateur 
        ? `${event.formateur.firstName} ${event.formateur.lastName}`
        : 'Non assigné',
      participants: event.participants || 0,
      type: event.type,
      status: event.statut
    }));

    // Transformer les formations en événements pour le calendrier
    const formationEvents = formations.map(formation => ({
      id: formation._id.toString(),
      summary: formation.titre,
      description: formation.description,
      start: {
        dateTime: formation.dateDebut.toISOString(),
        timeZone: 'Europe/Paris'
      },
      end: {
        dateTime: formation.dateFin.toISOString(),
        timeZone: 'Europe/Paris'
      },
      location: 'Centre de formation',
      formateur: formation.formateurs.length > 0 
        ? `${formation.formateurs[0].firstName} ${formation.formateurs[0].lastName}`
        : 'Non assigné',
      participants: formation.placesDisponibles,
      type: 'formation',
      status: formation.statut
    }));

    // Transformer les sessions en événements pour le calendrier
    const sessionEvents = sessions.map(session => ({
      id: session._id.toString(),
      summary: session.titre,
      description: session.description,
      start: {
        dateTime: session.dateDebut.toISOString(),
        timeZone: 'Europe/Paris'
      },
      end: {
        dateTime: session.dateFin.toISOString(),
        timeZone: 'Europe/Paris'
      },
      location: session.salle?.nom || 'Non spécifié',
      formateur: session.formateur 
        ? `${session.formateur.firstName} ${session.formateur.lastName}`
        : 'Non assigné',
      participants: session.participants?.length || 0,
      type: 'session',
      status: session.statut
    }));

    // Combiner et trier les événements par date de début
    const allEvents = [...eventCalendarItems, ...formationEvents, ...sessionEvents].sort((a, b) => 
      new Date(a.start.dateTime).getTime() - new Date(b.start.dateTime).getTime()
    );

    console.log('Total events:', allEvents.length);
    res.json(allEvents);
  } catch (error) {
    console.error('Erreur détaillée lors de la récupération des événements:', error);
    res.status(500).json({ 
      message: 'Erreur lors de la récupération des événements',
      error: error instanceof Error ? error.message : 'Erreur inconnue'
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