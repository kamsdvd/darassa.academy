import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Plus, MoreVertical, Edit, Trash2, UserPlus, Check, X } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { userService, User, CreateUserData, UpdateUserData } from '../../services/user.service';
import { toast } from 'react-hot-toast';

interface UserFormData {
  firstName: string;
  lastName: string;
  email: string;
  userType: User['userType'];
  password?: string;
  phone?: string;
}

const UsersManagement: React.FC = () => {
  const { user } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<User['userType'] | 'all'>('all');
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<UserFormData>({
    firstName: '',
    lastName: '',
    email: '',
    userType: 'etudiant',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const fetchUsers = async () => {
    try {
      setIsLoadingUsers(true);
      const params: any = {
        page: currentPage,
        limit: 10,
      };
      if (filterRole !== 'all') {
        params.userType = filterRole;
      }
      const response = await userService.getAllUsers(params);
      setUsers(response.users);
      setTotalPages(Math.ceil(response.total / response.limit));
    } catch (err) {
      toast.error('Erreur lors du chargement des utilisateurs');
    } finally {
      setIsLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, filterRole]);

  const handleOpenModal = (user?: User) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType,
        phone: user.phone,
      });
    } else {
      setSelectedUser(null);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        userType: 'etudiant',
      });
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      userType: 'etudiant',
    });
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (selectedUser) {
        const updateData: UpdateUserData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          userType: formData.userType,
          phone: formData.phone,
        };
        await userService.updateUser(selectedUser._id, updateData);
        toast.success('Utilisateur mis à jour avec succès');
      } else {
        const createData: CreateUserData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          userType: formData.userType,
          password: formData.password!,
          phone: formData.phone,
        };
        await userService.createUser(createData);
        toast.success('Utilisateur créé avec succès');
      }
      handleCloseModal();
      fetchUsers();
    } catch (err: any) {
      setError(err.response?.data?.message || 'Une erreur est survenue');
      toast.error(err.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await userService.deleteUser(userId);
        toast.success('Utilisateur supprimé avec succès');
        fetchUsers();
      } catch (err: any) {
        toast.error(err.response?.data?.message || 'Erreur lors de la suppression');
      }
    }
  };

  const handleToggleStatus = async (userId: string) => {
    try {
      await userService.toggleUserStatus(userId);
      toast.success('Statut de l\'utilisateur modifié avec succès');
      fetchUsers();
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Erreur lors du changement de statut');
    }
  };

  const filteredUsers = users.filter(user => {
    const fullName = `${user.firstName} ${user.lastName}`.toLowerCase();
    const matchesSearch = fullName.includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Gestion des utilisateurs</h1>
        <button 
          onClick={() => handleOpenModal()}
          className="bg-primary-600 text-white px-4 py-2 rounded-md flex items-center hover:bg-primary-700 transition-colors"
        >
          <UserPlus className="w-4 h-4 mr-2" />
          Ajouter un utilisateur
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

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
                    Rôle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date de création
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user._id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <Users className="h-5 w-5 text-primary-600" />
                        </div>
                        <div className="ml-4">
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
                      <button
                        onClick={() => handleToggleStatus(user._id)}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full cursor-pointer ${
                          user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.isActive ? 'Actif' : 'Inactif'}
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleOpenModal(user)}
                          className="text-primary-600 hover:text-primary-900"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Précédent
          </button>
          <span className="text-sm text-gray-700">
            Page {currentPage} sur {totalPages}
          </span>
          <button
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50"
          >
            Suivant
          </button>
        </div>
      </div>

      {/* Modal d'ajout/modification d'utilisateur */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">
                {selectedUser ? 'Modifier l\'utilisateur' : 'Ajouter un utilisateur'}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-500"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Prénom</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Nom</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Téléphone</label>
                <input
                  type="tel"
                  value={formData.phone || ''}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Rôle</label>
                <select
                  value={formData.userType}
                  onChange={(e) => setFormData({ ...formData, userType: e.target.value as User['userType'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                  required
                >
                  <option value="admin">Administrateur</option>
                  <option value="formateur">Formateur</option>
                  <option value="etudiant">Étudiant</option>
                  <option value="centre_manager">Gestionnaire de centre</option>
                  <option value="entreprise">Entreprise</option>
                  <option value="demandeur">Demandeur</option>
                </select>
              </div>
              {!selectedUser && (
                <div>
                  <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
                  <input
                    type="password"
                    value={formData.password || ''}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    required
                  />
                </div>
              )}
              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50"
                >
                  {isLoading ? 'Enregistrement...' : (selectedUser ? 'Modifier' : 'Ajouter')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsersManagement; 