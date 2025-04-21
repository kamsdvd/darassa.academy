import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from './components/layout/Layout';
import Connexion from './pages/auth/Connexion';
import NotFound from './pages/NotFound';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { useStore } from './store/useStore';
import { AuthService } from './services/authService';

// Lazy load components
const Home = React.lazy(() => import('./pages/Home'));
const Formations = React.lazy(() => import('./pages/formations/Formations'));
const ProgrammeMLM = React.lazy(() => import('./pages/programme-mlm/ProgrammeMLM'));
const Blog = React.lazy(() => import('./pages/blog/Blog'));
const Contact = React.lazy(() => import('./pages/contact/Contact'));
const Opportunites = React.lazy(() => import('./pages/opportunites/Opportunites'));
const JobDetail = React.lazy(() => import('./pages/opportunites/JobDetail'));
const Entreprises = React.lazy(() => import('./pages/entreprises/Entreprises'));
const Inscription = React.lazy(() => import('./pages/entreprises/Inscription'));
const Dashboard = React.lazy(() => import('./pages/entreprises/Dashboard'));

// Loading component
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
      </Suspense>
    </AnimatePresence>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <Router future={{ v7_startTransition: true }}>
        <AuthCheck>
          <Layout>
            <AnimatedRoutes />
          </Layout>
        </AuthCheck>
      </Router>
    </ErrorBoundary>
  );
}

export default App;