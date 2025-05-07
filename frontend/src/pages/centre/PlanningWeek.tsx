import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, MapPin, Users } from 'lucide-react';
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

const PlanningWeek: React.FC = () => {
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
      const startOfWeek = getStartOfWeek(currentDate);
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      const response = await axios.get('/api/calendar/events', {
        params: {
          startDate: startOfWeek.toISOString(),
          endDate: endOfWeek.toISOString()
        }
      });

      setEvents(response.data);
      setError(null);
    } catch (err) {
      setError('Erreur lors du chargement des événements');
      console.error('Erreur:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour obtenir le début de la semaine (lundi)
  const getStartOfWeek = (date: Date) => {
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  };

  // Fonction pour obtenir les jours de la semaine
  const getWeekDays = (startDate: Date) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const startOfWeek = getStartOfWeek(currentDate);
  const weekDays = getWeekDays(startOfWeek);

  const changeWeek = (increment: number) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + (increment * 7));
    setCurrentDate(newDate);
  };

  const renderTimeSlots = () => {
    const timeSlots = [];
    for (let hour = 8; hour <= 18; hour++) {
      timeSlots.push(
        <div key={hour} className="grid grid-cols-7 gap-px bg-gray-200">
          <div className="bg-gray-50 p-2 text-center font-semibold">
            {`${hour}:00`}
          </div>
          {weekDays.map((day, index) => {
            const dateStr = day.toISOString().split('T')[0];
            const eventsDuJour = events.filter(event => {
              const eventDate = new Date(event.start.dateTime).toISOString().split('T')[0];
              return eventDate === dateStr;
            });
            const event = eventsDuJour.find(event => {
              const eventHour = new Date(event.start.dateTime).getHours();
              return eventHour === hour;
            });

            return (
              <div key={index} className="bg-white p-2 min-h-[60px]">
                {event && (
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="font-medium text-sm">{event.summary}</div>
                    <div className="flex items-center text-xs text-gray-600">
                      <Clock className="w-3 h-3 mr-1" />
                      {new Date(event.start.dateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}-
                      {new Date(event.end.dateTime).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                    <div className="flex items-center text-xs text-gray-600">
                      <MapPin className="w-3 h-3 mr-1" />
                      {event.location}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    return timeSlots;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 text-center p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Planning hebdomadaire</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => changeWeek(-1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <span className="text-lg font-semibold">
            Semaine du {startOfWeek.toLocaleDateString('fr-FR')}
          </span>
          <button
            onClick={() => changeWeek(1)}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-7 gap-px bg-gray-200 mb-2">
          <div className="bg-gray-50 p-2 text-center font-semibold">
            Heure
          </div>
          {weekDays.map((day, index) => (
            <div key={index} className="bg-gray-50 p-2 text-center font-semibold">
              {day.toLocaleDateString('fr-FR', { weekday: 'short', day: 'numeric' })}
            </div>
          ))}
        </div>
        {renderTimeSlots()}
      </div>
    </div>
  );
};

export default PlanningWeek; 