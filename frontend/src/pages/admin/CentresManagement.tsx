import React, { useState } from 'react';
import { Building2, Search, Filter, Plus, MapPin, Phone, Mail, MoreVertical } from 'lucide-react';

const CentresManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Données fictives pour l'exemple
  const centres = [
    { 
      id: 1, 
      name: 'Centre de Formation Dakar', 
      address: '123 Rue de la Formation, Dakar', 
      phone: '+221 123 456 789',
      email: 'contact@cfdakar.sn',
      status: 'active',
      formateurs: 12,
      formations: 8
    },
    { 
      id: 2, 
      name: 'Institut de Formation Professionnelle', 
      address: '456 Avenue de l\'Education, Thiès', 
      phone: '+221 987 654 321',
      email: 'info@ifpthies.sn',
      status: 'active',
      formateurs: 8,
      formations: 5
    },
    { 
      id: 3, 
      name: 'Académie des Métiers', 
      address: '789 Boulevard des Compétences, Saint-Louis', 
      phone: '+221 456 789 123',
      email: 'contact@academiemetiers.sn',
      status: 'inactive',
      formateurs: 5,
      formations: 3
    },
    { 
      id: 4, 
      name: 'Centre d\'Excellence Technique', 
      address: '321 Rue des Artisans, Kaolack', 
      phone: '+221 789 123 456',
      email: 'info@cetkaolack.sn',
      status: 'active',
      formateurs: 10,
      formations: 7
    },
    { 
      id: 5, 
      name: 'École des Compétences Numériques', 
      address: '654 Avenue du Digital, Rufisque', 
      phone: '+221 321 654 987',
      email: 'contact@ecnrufisque.sn',
      status: 'active',
      formateurs: 15,
      formations: 10
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des centres de formation</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter un centre
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un centre..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="all">Tous les statuts</option>
              <option value="active">Actif</option>
              <option value="inactive">Inactif</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {centres.map((centre) => (
            <div key={centre.id} className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-full bg-primary-100 flex items-center justify-center">
                    <Building2 className="h-6 w-6 text-primary-600" />
                  </div>
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    centre.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {centre.status === 'active' ? 'Actif' : 'Inactif'}
                  </span>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{centre.name}</h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-gray-500 mr-2 mt-0.5" />
                    <span className="text-sm text-gray-600">{centre.address}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{centre.phone}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-gray-500 mr-2" />
                    <span className="text-sm text-gray-600">{centre.email}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="flex space-x-4">
                    <div>
                      <p className="text-xs text-gray-500">Formateurs</p>
                      <p className="text-sm font-medium">{centre.formateurs}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Formations</p>
                      <p className="text-sm font-medium">{centre.formations}</p>
                    </div>
                  </div>
                  <button className="text-primary-600 hover:text-primary-900">
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CentresManagement; 