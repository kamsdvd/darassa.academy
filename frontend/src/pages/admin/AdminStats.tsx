import React, { useState } from 'react';
import { BarChart3, TrendingUp, Users, Building2, BookOpen, Award, Calendar, Download } from 'lucide-react';

const AdminStats: React.FC = () => {
  const [timeRange, setTimeRange] = useState('month');

  // Données fictives pour l'exemple
  const stats = {
    users: {
      total: 1234,
      growth: 12,
      byRole: {
        admin: 5,
        formateur: 45,
        etudiant: 980,
        centre_manager: 25,
        entreprise: 179
      }
    },
    centres: {
      total: 45,
      growth: 8,
      byRegion: {
        dakar: 20,
        thies: 8,
        saintLouis: 5,
        kaolack: 7,
        autres: 5
      }
    },
    formations: {
      total: 89,
      growth: 15,
      byCategory: {
        developpement: 25,
        design: 18,
        marketing: 22,
        gestion: 15,
        autres: 9
      }
    },
    completion: {
      rate: 78,
      growth: 5
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Statistiques globales</h1>
        <div className="flex items-center space-x-2">
          <select
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
          >
            <option value="week">Cette semaine</option>
            <option value="month">Ce mois</option>
            <option value="quarter">Ce trimestre</option>
            <option value="year">Cette année</option>
          </select>
          <button className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center">
            <Download className="w-4 h-4 mr-2" />
            Exporter
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Utilisateurs</p>
              <h3 className="text-2xl font-bold">{stats.users.total}</h3>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{stats.users.growth}%
              </p>
            </div>
            <Users className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Centres de formation</p>
              <h3 className="text-2xl font-bold">{stats.centres.total}</h3>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{stats.centres.growth}%
              </p>
            </div>
            <Building2 className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Formations actives</p>
              <h3 className="text-2xl font-bold">{stats.formations.total}</h3>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{stats.formations.growth}%
              </p>
            </div>
            <BookOpen className="h-8 w-8 text-primary-600" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Taux de complétion</p>
              <h3 className="text-2xl font-bold">{stats.completion.rate}%</h3>
              <p className="text-sm text-green-600 flex items-center">
                <TrendingUp className="w-4 h-4 mr-1" />
                +{stats.completion.growth}%
              </p>
            </div>
            <Award className="h-8 w-8 text-primary-600" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Utilisateurs par rôle</h2>
          <div className="space-y-4">
            {Object.entries(stats.users.byRole).map(([role, count]) => (
              <div key={role} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                  <span className="capitalize">{role}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{count}</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-primary-500 rounded-full" 
                      style={{ width: `${(count / stats.users.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Formations par catégorie</h2>
          <div className="space-y-4">
            {Object.entries(stats.formations.byCategory).map(([category, count]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                  <span className="capitalize">{category}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{count}</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-primary-500 rounded-full" 
                      style={{ width: `${(count / stats.formations.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Centres par région</h2>
          <div className="space-y-4">
            {Object.entries(stats.centres.byRegion).map(([region, count]) => (
              <div key={region} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-primary-500 mr-2"></div>
                  <span className="capitalize">{region}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium mr-2">{count}</span>
                  <div className="w-24 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-primary-500 rounded-full" 
                      style={{ width: `${(count / stats.centres.total) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Activité récente</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Calendar className="h-5 w-5 text-primary-600 mr-3" />
              <div>
                <p className="font-medium">Nouveau centre de formation</p>
                <p className="text-sm text-gray-500">Il y a 2 heures</p>
              </div>
            </div>
            <div className="flex items-center">
              <Users className="h-5 w-5 text-primary-600 mr-3" />
              <div>
                <p className="font-medium">15 nouveaux utilisateurs</p>
                <p className="text-sm text-gray-500">Aujourd'hui</p>
              </div>
            </div>
            <div className="flex items-center">
              <BookOpen className="h-5 w-5 text-primary-600 mr-3" />
              <div>
                <p className="font-medium">3 nouvelles formations</p>
                <p className="text-sm text-gray-500">Cette semaine</p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 text-primary-600 mr-3" />
              <div>
                <p className="font-medium">45 certificats délivrés</p>
                <p className="text-sm text-gray-500">Ce mois</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats; 