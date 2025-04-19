import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Formations from './pages/formations/Formations';
import ProgrammeMLM from './pages/programme-mlm/ProgrammeMLM';
import Blog from './pages/blog/Blog';
import Contact from './pages/contact/Contact';
import Opportunites from './pages/opportunites/Opportunites';
import JobDetail from './pages/opportunites/JobDetail';
import Entreprises from './pages/entreprises/Entreprises';
import Inscription from './pages/entreprises/Inscription';
import Dashboard from './pages/entreprises/Dashboard';
import Connexion from './pages/auth/Connexion';
import NotFound from './pages/NotFound'; // Import de la page 404
import ProtectedRoute from './components/shared/ProtectedRoute';
import { useStore } from './store/useStore';
import { AuthService } from './services/authService';

// Composant pour vérifier l'authentification au chargement de l'application
const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser } = useStore();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
      }
    };

    checkAuth();
  }, [setUser]);

  return <>{children}</>;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/programme-mlm" element={<ProgrammeMLM />} />
        <Route path="/opportunites" element={<Opportunites />} />
        <Route path="/opportunites/:id" element={<JobDetail />} />
        <Route path="/entreprises" element={<Entreprises />} />
        <Route path="/entreprises/inscription" element={<Inscription />} />
        <Route path="/entreprises/dashboard" element={
          <ProtectedRoute roles={['entreprise']}>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/connexion" element={<Connexion />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <AuthCheck>
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </AuthCheck>
    </Router>
  );
}

export default App;