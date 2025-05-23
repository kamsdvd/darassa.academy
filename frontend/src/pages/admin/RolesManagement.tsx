import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Plus, MoreVertical, Edit, Trash2, UserPlus, Check, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { userService, User } from '../../services/user.service';
import { toast } from 'react-hot-toast';

const RolesManagement: React.FC = () => {
  const { user } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<User['userType'] | 'all'>('all');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      setError(null);
      console.log('Fetching users with params:', { page: currentPage, limit: 10, userType: filterRole });
      const response = await userService.getAllUsers({
        page: currentPage,
        limit: 10,
        userType: filterRole !== 'all' ? filterRole : undefined
      });
      console.log('Users response:', response);
      setUsers(response.users);
      setTotalPages(Math.ceil(response.total / response.limit));
    } catch (err: any) {
      console.error('Error fetching users:', err);
      const errorMessage = err.response?.data?.message || 'Erreur lors du chargement des utilisateurs';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filterRole]);

  const handleRoleChange = async (userId: string, newRole: User['userType']) => {
    try {
      setIsLoading(true);
      await userService.updateUser(userId, { userType: newRole });
      toast.success('Rôle modifié avec succès');
      fetchUsers();
    } catch (err) {
      toast.error('Erreur lors de la modification du rôle');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gestion des rôles</h1>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex gap-4 mb-6">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center">
            <Filter className="w-5 h-5 text-gray-500 mr-2" />
            <select
              className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as User['userType'] | 'all')}
            >
              <option value="all">Tous les rôles</option>
              <option value="admin">Administrateur</option>
              <option value="formateur">Formateur</option>
              <option value="etudiant">Étudiant</option>
              <option value="centre_manager">Gestionnaire de centre</option>
              <option value="entreprise">Entreprise</option>
              <option value="demandeur">Demandeur</option>
            </select>
          </div>
        </div>

        {isLoadingUsers ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Utilisateur
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rôle actuel
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nouveau rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {user.userType}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={user.userType}
                        onChange={(e) => handleRoleChange(user._id, e.target.value as User['userType'])}
                        disabled={isLoading}
                      >
                        <option value="admin">Administrateur</option>
                        <option value="formateur">Formateur</option>
                        <option value="etudiant">Étudiant</option>
                        <option value="centre_manager">Gestionnaire de centre</option>
                        <option value="entreprise">Entreprise</option>
                        <option value="demandeur">Demandeur</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => handleRoleChange(user._id, user.userType)}
                        disabled={isLoading}
                        className="text-primary-600 hover:text-primary-900"
                      >
                        <Check className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RolesManagement; 