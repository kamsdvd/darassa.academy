import React, { useState } from 'react';
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  MoreVertical,
  BookOpen,
  Filter,
  Tag,
  Clock,
  Users,
  DollarSign
} from 'lucide-react';

// Types pour les formations
interface Formation {
  id: number;
  title: string;
  category: string;
  duration: string;
  level: string;
  price: number;
  students: number;
  status: 'published' | 'draft' | 'archived';
}

const FormationsManagement: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('');

  // Données de test pour les formations
  const formations: Formation[] = [
    {
      id: 1,
      title: "Développement Web Avancé",
      category: "Développement Web",
      duration: "3 mois",
      level: "Avancé",
      price: 299,
      students: 45,
      status: "published"
    },
    {
      id: 2,
      title: "Introduction à l'Intelligence Artificielle",
      category: "Intelligence Artificielle",
      duration: "2 mois",
      level: "Débutant",
      price: 199,
      students: 78,
      status: "published"
    },
    {
      id: 3,
      title: "Marketing Digital",
      category: "Marketing",
      duration: "2.5 mois",
      level: "Intermédiaire",
      price: 249,
      students: 32,
      status: "draft"
    }
  ];

  // Filtrer les formations en fonction des critères de recherche
  const filteredFormations = formations.filter(formation => {
    const matchesSearch = 
      formation.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      formation.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || formation.category === selectedCategory;
    const matchesStatus = !selectedStatus || formation.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des formations</h1>
        <button className="flex items-center px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une formation
        </button>
      </div>

      {/* Filtres et recherche */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une formation..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">Toutes les catégories</option>
              <option value="Développement Web">Développement Web</option>
              <option value="Intelligence Artificielle">Intelligence Artificielle</option>
              <option value="Marketing">Marketing</option>
            </select>
          </div>
          <div>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
            >
              <option value="">Tous les statuts</option>
              <option value="published">Publié</option>
              <option value="draft">Brouillon</option>
              <option value="archived">Archivé</option>
            </select>
          </div>
        </div>
      </div>

      {/* Liste des formations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFormations.map((formation) => (
          <div key={formation.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{formation.title}</h3>
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Tag className="w-4 h-4 mr-1" />
                    {formation.category}
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  formation.status === 'published' 
                    ? 'bg-green-100 text-green-800' 
                    : formation.status === 'draft'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {formation.status === 'published' ? 'Publié' : formation.status === 'draft' ? 'Brouillon' : 'Archivé'}
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="w-4 h-4 mr-1" />
                  {formation.duration}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Users className="w-4 h-4 mr-1" />
                  {formation.students} étudiants
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <BookOpen className="w-4 h-4 mr-1" />
                  {formation.level}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {formation.price}€
                </div>
              </div>
              
              <div className="flex justify-end space-x-2 pt-4 border-t">
                <button className="text-primary-600 hover:text-primary-900">
                  <Edit className="w-5 h-5" />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <Trash2 className="w-5 h-5" />
                </button>
                <button className="text-gray-600 hover:text-gray-900">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormationsManagement; 