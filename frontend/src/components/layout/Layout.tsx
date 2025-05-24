import React, { useState } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import Sidebar from './Sidebar';
import { useStore } from '../../store/useStore';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const { user } = useStore();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  // Liste des routes qui nécessitent le Sidebar
  const sidebarRoutes = [
    // Routes Admin
    '/admin/dashboard',
    '/admin/users',
    '/admin/users/add',
    '/admin/users/roles',
    '/admin/centres',
    '/admin/formations',
    '/admin/stats',
    '/admin/certificats',
    '/admin/opportunites',
    '/admin/entreprises',
    '/admin/parametres',
    // Routes Centre Manager
    '/centre/dashboard',
    '/centre/formations',
    '/centre/formations/create',
    '/centre/formations/sessions',
    '/centre/formateurs',
    '/centre/formateurs/add',
    '/centre/formateurs/disponibilites',
    '/centre/etudiants',
    '/centre/certificats',
    '/centre/opportunites',
    '/centre/planning',
    '/centre/planning/month',
    '/centre/planning/week',
    '/centre/parametres',
    // Routes Formateur
    '/formateur/dashboard',
    '/formateur/cours',
    '/formateur/cours/create',
    '/formateur/cours/supports',
    '/formateur/etudiants',
    '/formateur/etudiants/liste',
    '/formateur/etudiants/progres',
    '/formateur/certificats',
    '/formateur/evaluations',
    '/formateur/evaluations/create',
    '/formateur/evaluations/resultats',
    '/formateur/planning',
    '/formateur/planning/month',
    '/formateur/planning/week',
    '/formateur/parametres',
    // Routes Étudiant
    '/etudiant/dashboard',
    '/etudiant/formations',
    '/etudiant/cours',
    '/etudiant/cours/current',
    '/etudiant/cours/supports',
    '/etudiant/certificats',
    '/etudiant/evaluations',
    '/etudiant/evaluations/liste',
    '/etudiant/evaluations/resultats',
    '/etudiant/planning',
    '/etudiant/planning/month',
    '/etudiant/planning/week',
    '/etudiant/opportunites',
    '/etudiant/parametres',
    // Routes Demandeur
    '/demandeur/dashboard',
    '/demandeur/formations',
    '/demandeur/certificats',
    '/demandeur/opportunites',
    '/demandeur/parametres',
    '/demandeur/cv',
    '/demandeur/candidatures',
    // Routes Entreprise
    '/entreprise/dashboard',
    '/entreprise/formations',
    '/entreprise/formations/nouvelle',
    '/entreprise/employes',
    '/entreprise/opportunites',
    '/entreprise/lms/utilisateurs',
    '/entreprise/lms/contenu',
    '/entreprise/lms/rapports',
    '/entreprise/parametres',
    '/entreprise/statistiques',
  ];

  // Vérifie si la route actuelle nécessite le Sidebar
  const shouldShowSidebar = user && sidebarRoutes.some(route => location.pathname.startsWith(route));
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixe */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <Navigation />
      </div>

      {/* Contenu principal avec padding-top pour compenser le header */}
      <div className="pt-16 min-h-screen">
        <div className="flex">
          {/* Sidebar */}
          {shouldShowSidebar && (
            <div 
              className={`
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'w-64' : 'w-16'}
              `}
            >
              <Sidebar isOpen={isSidebarOpen} onToggle={toggleSidebar} />
            </div>
          )}

          {/* Contenu principal */}
          <main 
            className={`
              flex-1 transition-all duration-300 ease-in-out
              ${shouldShowSidebar ? (isSidebarOpen ? 'ml-1' : 'ml-0') : ''}
            `}
          >
            <div className="w-full px-4 py-8">
              {children}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout; 