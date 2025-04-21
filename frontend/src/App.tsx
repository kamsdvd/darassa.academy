import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import { reportWebVitals } from './utils/webVitals';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { useStore } from './store/useStore';
import { AuthService } from './services/authService';

// Lazy loading avec prefetch
const lazyWithPrefetch = (factory: () => Promise<any>, preload = false) => {
  const Component = React.lazy(factory);
  Component.preload = factory;
  
  if (preload) {
    factory();
  }
  
  return Component;
};

// Composants avec lazy loading
const Home = lazyWithPrefetch(() => import('./pages/Home'), true);
const Formations = lazyWithPrefetch(() => import('./pages/formations/Formations'));
const ProgrammeMLM = lazyWithPrefetch(() => import('./pages/programme-mlm/ProgrammeMLM'));
const Blog = lazyWithPrefetch(() => import('./pages/blog/Blog'));
const Contact = lazyWithPrefetch(() => import('./pages/contact/Contact'));
const Opportunites = lazyWithPrefetch(() => import('./pages/opportunites/Opportunites'));
const JobDetail = lazyWithPrefetch(() => import('./pages/opportunites/JobDetail'));
const Entreprises = lazyWithPrefetch(() => import('./pages/entreprises/Entreprises'));
const InscriptionEntreprise = lazyWithPrefetch(() => import('./pages/entreprises/Inscription'));
const EntrepriseDashboard = lazyWithPrefetch(() => import('./pages/entreprises/Dashboard'));
const UserDashboard = lazyWithPrefetch(() => import('./pages/dashboard/Dashboard'));
const InscriptionParticulier = lazyWithPrefetch(() => import('./pages/auth/Inscription'));
const Connexion = lazyWithPrefetch(() => import('./pages/auth/Connexion'), true);

// Composant de chargement
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary-600"></div>
  </div>
);

// Error component
const ErrorFallback = ({ error }: { error: Error }) => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <h2 className="text-2xl font-bold text-red-600 mb-4">Une erreur est survenue</h2>
      <p className="text-gray-600">{error.message}</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
      >
        Rafraîchir la page
      </button>
    </div>
  </div>
);

// Error boundary component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error: Error | null }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback error={this.state.error!} />;
    }

    return this.props.children;
  }
}

// Composant pour vérifier l'authentification au chargement de l'application
const AuthCheck: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { setUser } = useStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const authService = AuthService.getInstance();
      if (!authService.getToken()) {
        setIsLoading(false);
        return;
      }

      try {
        const user = await authService.getCurrentUser();
        if (user) {
          setUser(user);
        }
      } catch (error) {
        console.error('Erreur lors de la vérification de l\'authentification:', error);
        if (error instanceof Error) {
          setError(error);
        }
        authService.logout();
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [setUser]);

  if (isLoading) {
    return <LoadingFallback />;
  }

  if (error) {
    return <ErrorFallback error={error} />;
  }

  return <>{children}</>;
};

// Composant pour gérer le prefetching des routes
const RoutePrefetcher = () => {
  const location = useLocation();

  useEffect(() => {
    // Précharger les routes connexes en fonction de la route actuelle
    if (location.pathname === '/') {
      Formations.preload?.();
      ProgrammeMLM.preload?.();
    } else if (location.pathname.startsWith('/formations')) {
      Contact.preload?.();
      InscriptionEntreprise.preload?.();
    }
  }, [location]);

  return null;
};

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/formations" element={<Formations />} />
          <Route path="/programme-mlm" element={<ProgrammeMLM />} />
          <Route path="/opportunites" element={<Opportunites />} />
          <Route path="/opportunites/:id" element={<JobDetail />} />
          <Route path="/entreprises" element={<Entreprises />} />
          <Route path="/entreprises/inscription" element={<InscriptionEntreprise />} />
          <Route path="/inscription" element={<InscriptionParticulier />} />
          <Route path="/entreprises/dashboard" element={
            <ProtectedRoute roles={['entreprise']}>
              <EntrepriseDashboard />
            </ProtectedRoute>
          } />
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['user']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  useEffect(() => {
    // Démarrer le monitoring des Web Vitals
    reportWebVitals();
  }, []);

  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true }}>
        <AuthCheck>
          <RoutePrefetcher />
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </AuthCheck>
      </Router>
    </ErrorBoundary>
  );
}

export default App;