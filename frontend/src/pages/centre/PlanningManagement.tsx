import React, { useState } from 'react';
import { Calendar, List, Search, Filter, Plus, Clock, Users, MapPin, MoreVertical } from 'lucide-react';
import { useGoogleCalendar } from '../../hooks/useGoogleCalendar';
import PlanningMonth from './PlanningMonth';
import PlanningWeek from './PlanningWeek';

const PlanningManagement: React.FC = () => {
  const [view, setView] = useState<'month' | 'week'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const { connectGoogleCalendar, isConnecting, error } = useGoogleCalendar();

  // Données fictives pour l'exemple
  const seances = [
    {
      id: 1,
      formation: 'Développement Web Frontend',
      formateur: 'John Doe',
      date: '2024-03-01',
      heureDebut: '09:00',
      heureFin: '12:00',
      salle: 'Salle 101',
      apprenants: 15,
      status: 'planifie'
    },
    {
      id: 2,
      formation: 'Design UI/UX Avancé',
      formateur: 'Jane Smith',
      date: '2024-03-02',
      heureDebut: '13:00',
      heureFin: '16:00',
      salle: 'Salle 102',
      apprenants: 12,
      status: 'planifie'
    },
    {
      id: 3,
      formation: 'Marketing Digital',
      formateur: 'Bob Johnson',
      date: '2024-03-03',
      heureDebut: '09:00',
      heureFin: '12:00',
      salle: 'Salle 103',
      apprenants: 18,
      status: 'termine'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planifie':
        return 'bg-blue-100 text-blue-800';
      case 'en_cours':
        return 'bg-green-100 text-green-800';
      case 'termine':
        return 'bg-gray-100 text-gray-800';
      case 'annule':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'planifie':
        return 'Planifié';
      case 'en_cours':
        return 'En cours';
      case 'termine':
        return 'Terminé';
      case 'annule':
        return 'Annulé';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion du planning</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setView('month')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              view === 'month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Calendar className="w-5 h-5 mr-2" />
            Vue mensuelle
          </button>
          <button
            onClick={() => setView('week')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              view === 'week'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <List className="w-5 h-5 mr-2" />
            Vue hebdomadaire
          </button>
          <button
            onClick={connectGoogleCalendar}
            disabled={isConnecting}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isConnecting ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Connexion en cours...
              </>
            ) : (
              <>
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
                Connecter avec Google Calendar
              </>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        {view === 'month' ? <PlanningMonth /> : <PlanningWeek />}
      </div>
    </div>
  );
};

export default PlanningManagement; 