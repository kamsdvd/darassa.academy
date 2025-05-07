import React, { useState, useEffect } from 'react';
import { Calendar, List, Search, Filter, Plus, Clock, Users, MapPin, MoreVertical } from 'lucide-react';
import PlanningMonth from './PlanningMonth';
import PlanningWeek from './PlanningWeek';
import PlanningDay from './PlanningDay';

interface Formateur {
  id: string;
  name: string;
}

interface FormationType {
  id: string;
  name: string;
}

const PlanningManagement: React.FC = () => {
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedFormateur, setSelectedFormateur] = useState<string>('all');
  const [selectedFormationType, setSelectedFormationType] = useState<string>('all');

  // Données fictives pour l'exemple
  const formateurs: Formateur[] = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Bob Johnson' }
  ];

  const formationTypes: FormationType[] = [
    { id: '1', name: 'Développement Web' },
    { id: '2', name: 'Design UI/UX' },
    { id: '3', name: 'Marketing Digital' }
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
            onClick={() => setView('day')}
            className={`flex items-center px-4 py-2 rounded-lg ${
              view === 'day'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Clock className="w-5 h-5 mr-2" />
            Vue journalière
          </button>
        </div>
      </div>

      <div className="mb-6 flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>
        <div className="flex gap-4">
          <select
            value={selectedFormateur}
            onChange={(e) => setSelectedFormateur(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les formateurs</option>
            {formateurs.map(formateur => (
              <option key={formateur.id} value={formateur.id}>
                {formateur.name}
              </option>
            ))}
          </select>
          <select
            value={selectedFormationType}
            onChange={(e) => setSelectedFormationType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les types</option>
            {formationTypes.map(type => (
              <option key={type.id} value={type.id}>
                {type.name}
              </option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tous les statuts</option>
            <option value="planifie">Planifié</option>
            <option value="en_cours">En cours</option>
            <option value="termine">Terminé</option>
            <option value="annule">Annulé</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        {view === 'month' && <PlanningMonth />}
        {view === 'week' && <PlanningWeek />}
        {view === 'day' && <PlanningDay />}
      </div>
    </div>
  );
};

export default PlanningManagement; 