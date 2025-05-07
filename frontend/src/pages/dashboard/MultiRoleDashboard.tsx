import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import PageTransition from '../../components/shared/PageTransition';
import { GraduationCap, Briefcase, ChevronRight } from 'lucide-react';

const MultiRoleDashboard: React.FC = () => {
  const { user } = useStore();
  const navigate = useNavigate();
  const [activeRole, setActiveRole] = useState<string | null>(null);

  // Déterminer les rôles disponibles pour l'utilisateur
  const availableRoles = user?.roles || [];
  const isApprenant = availableRoles.includes('apprenant') || availableRoles.includes('etudiant');
  const isDemandeur = availableRoles.includes('demandeur');

  // Rediriger vers le tableau de bord spécifique
  const handleRoleSelect = (role: string) => {
    setActiveRole(role);
    switch (role) {
      case 'apprenant':
        navigate('/apprenant/dashboard');
        break;
      case 'demandeur':
        navigate('/demandeur/dashboard');
        break;
    }
  };

  return (
    <PageTransition>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">
            Bienvenue, {user?.name}
          </h1>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Sélectionnez votre espace
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {isApprenant && (
                <button
                  onClick={() => handleRoleSelect('apprenant')}
                  className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary-50 rounded-full">
                      <GraduationCap className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-medium text-gray-900">Espace Apprenant</h3>
                      <p className="text-sm text-gray-500">Accédez à vos formations et cours</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              )}

              {isDemandeur && (
                <button
                  onClick={() => handleRoleSelect('demandeur')}
                  className="flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg hover:border-primary-500 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary-50 rounded-full">
                      <Briefcase className="h-6 w-6 text-primary-600" />
                    </div>
                    <div className="text-left">
                      <h3 className="text-lg font-medium text-gray-900">Espace Demandeur d'emploi</h3>
                      <p className="text-sm text-gray-500">Gérez vos candidatures et opportunités</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </button>
              )}
            </div>

            <div className="mt-8 p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">
                Vous pouvez basculer entre vos différents espaces à tout moment en revenant sur cette page.
              </p>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default MultiRoleDashboard; 