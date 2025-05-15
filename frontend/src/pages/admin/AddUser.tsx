import React, { useState } from 'react';
import { userService, CreateUserData } from '../../services/user.service';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

const AddUser: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreateUserData>({
    firstName: '',
    lastName: '',
    email: '',
    userType: 'etudiant',
    password: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      await userService.createUser(formData);
      toast.success('Utilisateur créé avec succès');
      navigate('/admin/users');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Erreur lors de la création');
      toast.error(err.response?.data?.message || 'Erreur lors de la création');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Ajouter un utilisateur</h1>
      {error && <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Prénom</label>
          <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Nom</label>
          <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Téléphone</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Rôle</label>
          <select name="userType" value={formData.userType} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            <option value="admin">Administrateur</option>
            <option value="formateur">Formateur</option>
            <option value="etudiant">Étudiant</option>
            <option value="centre_manager">Gestionnaire de centre</option>
            <option value="entreprise">Entreprise</option>
            <option value="demandeur">Demandeur</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500" />
        </div>
        <div className="flex justify-end space-x-2">
          <button type="submit" disabled={isLoading} className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 disabled:opacity-50">
            {isLoading ? 'Enregistrement...' : 'Ajouter'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser; 