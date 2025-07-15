import React, { useState } from 'react';
import { BookOpen, Search, Filter, Plus, Calendar, Users, Clock, MoreVertical } from 'lucide-react';

const CoursesManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Données fictives pour l'exemple
  const courses = [
    {
      id: 1,
      title: 'Développement Web Full Stack',
      category: 'Développement',
      instructor: 'John Doe',
      startDate: '2024-03-01',
      endDate: '2024-06-30',
      duration: '4 mois',
      students: 25,
      status: 'en_cours'
    },
    {
      id: 2,
      title: 'Design UI/UX Avancé',
      category: 'Design',
      instructor: 'Jane Smith',
      startDate: '2024-04-15',
      endDate: '2024-07-15',
      duration: '3 mois',
      students: 20,
      status: 'planifie'
    },
    {
      id: 3,
      title: 'Marketing Digital',
      category: 'Marketing',
      instructor: 'Bob Johnson',
      startDate: '2024-02-01',
      endDate: '2024-05-01',
      duration: '3 mois',
      students: 30,
      status: 'termine'
    },
    {
      id: 4,
      title: 'Gestion de Projet Agile',
      category: 'Management',
      instructor: 'Alice Brown',
      startDate: '2024-05-01',
      endDate: '2024-08-01',
      duration: '3 mois',
      students: 15,
      status: 'planifie'
    },
    {
      id: 5,
      title: 'Data Science & Machine Learning',
      category: 'Data',
      instructor: 'Charlie Wilson',
      startDate: '2024-03-15',
      endDate: '2024-08-15',
      duration: '5 mois',
      students: 18,
      status: 'en_cours'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'en_cours':
        return 'bg-green-100 text-green-800';
      case 'planifie':
        return 'bg-blue-100 text-blue-800';
      case 'termine':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'en_cours':
        return 'En cours';
      case 'planifie':
        return 'Planifié';
      case 'termine':
        return 'Terminé';
      default:
        return status;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des formations</h1>
        <button className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Ajouter une formation
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher une formation..."
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
              <option value="en_cours">En cours</option>
              <option value="planifie">Planifié</option>
              <option value="termine">Terminé</option>
            </select>
          </div>
        </div>

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
                  Dates
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Durée
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Apprenants
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Statut
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {courses.map((course) => (
                <tr key={course.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{course.title}</div>
                        <div className="text-sm text-gray-500">{course.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{course.instructor}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <Calendar className="inline-block w-4 h-4 mr-1" />
                      {course.startDate} - {course.endDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <Clock className="inline-block w-4 h-4 mr-1" />
                      {course.duration}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      <Users className="inline-block w-4 h-4 mr-1" />
                      {course.students}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(course.status)}`}>
                      {getStatusText(course.status)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900">
                      <MoreVertical className="h-5 w-5" />
                    </button>
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

export default CoursesManagement; 