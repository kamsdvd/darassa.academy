import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Users, Calendar } from 'lucide-react';
import axios from 'axios';

interface Event {
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
  location: string;
  formateur: string;
  participants: number;
  type: 'formation' | 'session';
  status: string;
}

const PlanningDay: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const startOfDay = new Date(currentDate);
      startOfDay.setHours(0, 0, 0, 0);
      const endOfDay = new Date(currentDate);
      endOfDay.setHours(23, 59, 59, 999);

      console.log('Fetching events for:', {
        startDate: startOfDay.toISOString(),
        endDate: endOfDay.toISOString()
      });

      const response = await axios.get('/api/calendar/events', {
        params: {
          startDate: startOfDay.toISOString(),
          endDate: endOfDay.toISOString()
        }
      });

      console.log('Response data:', response.data);
      
      if (!Array.isArray(response.data)) {
        throw new Error('Format de réponse invalide: les données ne sont pas un tableau');
      }

      const formattedEvents = response.data.map((event: any) => ({
        id: event.id,
        summary: event.summary,
        description: event.description || '',
        start: {
          dateTime: event.start.dateTime,
          timeZone: event.start.timeZone
        },
        end: {
          dateTime: event.end.dateTime,
          timeZone: event.end.timeZone
        },
        location: event.location || 'Non spécifié',
        formateur: event.formateur || 'Non assigné',
        participants: event.participants || 0,
        type: event.type,
        status: event.status
      }));

      setEvents(formattedEvents);
    } catch (err) {
      console.error('Erreur détaillée:', err);
      if (axios.isAxiosError(err)) {
        const errorMessage = err.response?.data?.message || err.message;
        setError(`Erreur lors du chargement des événements: ${errorMessage}`);
      } else if (err instanceof Error) {
        setError(`Erreur lors du chargement des événements: ${err.message}`);
      } else {
        setError('Une erreur inattendue est survenue');
      }
    } finally {
      setLoading(false);
    }
  };

  const changeDay = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + increment);
    setCurrentDate(newDate);
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 8; hour <= 18; hour++) {
      const eventsForHour = events.filter(event => {
        const eventHour = new Date(event.start.dateTime).getHours();
        return eventHour === hour;
      });

      timeSlots.push(
        <div key={hour} className="grid grid-cols-1 gap-2">
          <div className="flex items-start">
            <div className="w-20 text-right pr-4 pt-2 text-sm text-gray-500">
              {`${hour}:00`}
            </div>
            <div className="flex-1 min-h-[80px] border-t border-gray-200 pt-2">
              {eventsForHour.map(event => {
                const startTime = new Date(event.start.dateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                const endTime = new Date(event.end.dateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
                
                return (
                  <div key={event.id} className="bg-blue-50 p-2 rounded mb-2">
                    <div className="font-medium">{event.summary}</div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-1" />
                      {startTime}-{endTime}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-1" />
                      {event.participants} participants
                    </div>
                    <div className="text-sm text-gray-600">
                      Formateur: {event.formateur}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      );
    }
    return timeSlots;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
        <strong className="font-bold">Erreur!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => changeDay(-1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="flex items-center">
          <Calendar className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold">
            {currentDate.toLocaleDateString('fr-FR', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </h2>
        </div>
        <button
          onClick={() => changeDay(1)}
          className="p-2 hover:bg-gray-100 rounded-full"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
      <div className="p-4">
        {renderTimeSlots()}
      </div>
    </div>
  );
};

export default PlanningDay; 