import React from 'react';
import { Users, BookOpen, Calendar, TrendingUp } from 'lucide-react';

const CentreDashboard: React.FC = () => {
  // Données fictives pour l'exemple
  const stats = {
    formateurs: 12,
    formations: 8,
    apprenants: 150,
    tauxReussite: 85
  };

  const recentFormations = [
    {
      id: 1,
      title: 'Développement Web Full Stack',
      formateur: 'John Doe',
      dateDebut: '2024-03-01',
      apprenants: 25,
      progression: 45
    },
    {
      id: 2,
      title: 'Design UI/UX Avancé',
      formateur: 'Jane Smith',
      dateDebut: '2024-04-15',
      apprenants: 20,
      progression: 30
    },
    {
      id: 3,
      title: 'Marketing Digital',
      formateur: 'Bob Johnson',
      dateDebut: '2024-02-01',
      apprenants: 30,
      progression: 75
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Tableau de bord du centre</h1>

      {/* Statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Formateurs</p>
              <h3 className="text-2xl font-bold">{stats.formateurs}</h3>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Formations</p>
              <h3 className="text-2xl font-bold">{stats.formations}</h3>
            </div>
            <BookOpen className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Apprenants</p>
              <h3 className="text-2xl font-bold">{stats.apprenants}</h3>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Taux de réussite</p>
              <h3 className="text-2xl font-bold">{stats.tauxReussite}%</h3>
            </div>
            <TrendingUp className="h-8 w-8 text-primary-600" />
          </div>
        </div>
      </div>

      {/* Formations récentes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Formations récentes</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Formation
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Formateur
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date de début
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apprenants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progression
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentFormations.map((formation) => (
                <tr key={formation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{formation.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formation.formateur}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <Calendar className="inline-block w-4 h-4 mr-1" />
                      {formation.dateDebut}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <Users className="inline-block w-4 h-4 mr-1" />
                      {formation.apprenants}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-primary-600 h-2.5 rounded-full"
                        style={{ width: `${formation.progression}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">{formation.progression}%</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CentreDashboard; 