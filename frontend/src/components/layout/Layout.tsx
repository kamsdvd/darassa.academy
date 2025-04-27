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
    '/admin/centres',
    '/admin/formations',
    '/admin/certificats',
    '/admin/opportunites',
    '/admin/entreprises',
    '/admin/parametres',
    // Routes Centre Manager
    '/centre/dashboard',
    '/centre/formations',
    '/centre/formateurs',
    '/centre/etudiants',
    '/centre/certificats',
    '/centre/opportunites',
    '/centre/parametres',
    // Routes Formateur
    '/formateur/dashboard',
    '/formateur/cours',
    '/formateur/etudiants',
    '/formateur/certificats',
    '/formateur/parametres',
    // Routes Étudiant
    '/etudiant/dashboard',
    '/etudiant/formations',
    '/etudiant/certificats',
    '/etudiant/opportunites',
    '/etudiant/parametres',
    // Routes Demandeur
    '/demandeur/dashboard',
    '/demandeur/formations',
    '/demandeur/certificats',
    '/demandeur/opportunites',
    '/demandeur/parametres',
    // Routes Entreprise
    '/entreprise/dashboard',
    '/entreprise/formations',
    '/entreprise/opportunites',
    '/entreprise/parametres'
  ];

  // Vérifie si la route actuelle nécessite le Sidebar
  const shouldShowSidebar = user && sidebarRoutes.some(route => location.pathname.startsWith(route));
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <div className="flex flex-1">
        {shouldShowSidebar && (
          <div className={`fixed left-0 top-16 h-[calc(100vh-4rem)] z-50 transition-all duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <Sidebar isOpen={isSidebarOpen} />
          </div>
        )}
        <button
          onClick={toggleSidebar}
          className="fixed left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-r-lg shadow-md z-50"
          style={{ top: 'calc(50% + 2rem)' }}
        >
          {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
        <main className={`flex-1 transition-all duration-300 ${shouldShowSidebar ? 'ml-64' : ''}`}>
          <div className="container mx-auto px-4 py-8">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout; 