import { useState, useCallback } from 'react';
import axios from 'axios';

interface CalendarEvent {
  id: string;
  summary: string;
  description?: string;
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
  participants?: number;
  type: 'formation' | 'session';
  status: string;
}

interface AvailabilityCheck {
  startDate: string;
  endDate: string;
  formateurId?: string;
  salleId?: string;
}

interface AvailabilityResponse {
  available: boolean;
  conflicts: {
    formations: any[];
    sessions: any[];
    salles: any[];
  };
}

interface UseCalendarReturn {
  events: CalendarEvent[];
  loading: boolean;
  error: string | null;
  fetchEvents: (startDate: Date, endDate: Date) => Promise<void>;
  createEvent: (event: Omit<CalendarEvent, 'id'>) => Promise<CalendarEvent>;
  updateEvent: (eventId: string, event: Partial<CalendarEvent>) => Promise<CalendarEvent>;
  deleteEvent: (eventId: string) => Promise<void>;
  checkAvailability: (check: AvailabilityCheck) => Promise<AvailabilityResponse>;
  getEvents: (params: {
    startDate: string;
    endDate: string;
    formateurId?: string;
    formationTypeId?: string;
    status?: string;
    searchTerm?: string;
  }) => Promise<CalendarEvent[]>;
}

export const useCalendar = (): UseCalendarReturn => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEvents = useCallback(async (startDate: Date, endDate: Date) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get('/api/calendar/events', {
        params: {
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
        },
      });
      setEvents(response.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la récupération des événements');
    } finally {
      setLoading(false);
    }
  }, []);

  const createEvent = useCallback(async (event: Omit<CalendarEvent, 'id'>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.post('/api/calendar/events', event);
      setEvents(prev => [...prev, response.data]);
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la création de l\'événement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateEvent = useCallback(async (eventId: string, event: Partial<CalendarEvent>) => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.put(`/api/calendar/events/${eventId}`, event);
      setEvents(prev => prev.map(e => e.id === eventId ? response.data : e));
      return response.data;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la mise à jour de l\'événement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteEvent = useCallback(async (eventId: string) => {
    try {
      setLoading(true);
      setError(null);
      await axios.delete(`/api/calendar/events/${eventId}`);
      setEvents(prev => prev.filter(e => e.id !== eventId));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la suppression de l\'événement');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const checkAvailability = async (check: AvailabilityCheck): Promise<AvailabilityResponse> => {
    try {
      const response = await axios.post('/api/calendar/check-availability', check);
      return response.data;
    } catch (err) {
      console.error('Erreur lors de la vérification de disponibilité:', err);
      throw new Error('Erreur lors de la vérification de disponibilité');
    }
  };

  const getEvents = async (params: {
    startDate: string;
    endDate: string;
    formateurId?: string;
    formationTypeId?: string;
    status?: string;
    searchTerm?: string;
  }) => {
    try {
      const response = await axios.get('/api/calendar/events', { params });
      return response.data;
    } catch (err) {
      console.error('Erreur lors de la récupération des événements:', err);
      throw new Error('Erreur lors de la récupération des événements');
    }
  };

  return {
    events,
    loading,
    error,
    fetchEvents,
    createEvent,
    updateEvent,
    deleteEvent,
    checkAvailability,
    getEvents
  };
}; 