import React, { useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import { reportWebVitals } from '@/utils/webVitals';
import NotFound from '@/pages/NotFound';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { useStore } from '@/store/useStore';
import { AuthService } from '@/services/authService';
import LoadingFallback from '@/components/common/LoadingFallback';
import AdminDashboard from '@/pages/admin/Dashboard';
import UsersManagement from '@/pages/admin/UsersManagement';
import RolesManagement from '@/pages/admin/RolesManagement';
import CentresManagement from '@/pages/admin/CentresManagement';
import AdminStats from '@/pages/admin/AdminStats';
import CentreDashboard from '@/pages/centre/Dashboard';
import FormateursManagement from '@/pages/centre/FormateursManagement';
import CoursesManagement from '@/pages/centre/CoursesManagement';
import PlanningManagement from '@/pages/centre/PlanningManagement';
import FormateurDashboard from '@/pages/formateur/Dashboard';
import FormateurCours from '@/pages/formateur/Cours';
import FormateurRessources from '@/pages/formateur/Ressources';
import FormateurEvaluations from '@/pages/formateur/Evaluations';
import EmployesManagement from '@/pages/entreprise/EmployesManagement';
import EntrepriseCourses from '@/pages/entreprise/Courses';
import EntrepriseRapports from '@/pages/entreprise/Rapports';
import Certificats from '@/pages/user/Certificats';
import UserOpportunites from '@/pages/user/Opportunites';
import MultiRoleDashboard from '@/pages/dashboard/MultiRoleDashboard';
import AddUser from '@/pages/admin/AddUser';
import UsersList from '@/pages/admin/UsersList';
import Settings from '@/pages/dashboard/Settings';
import AddFormateur from '@/pages/centre/AddFormateur';
import FormateurDisponibilitesManagement from '@/pages/centre/FormateurDisponibilitesManagement';
import CreateCourse from '@/pages/centre/CreateCourse';
import PlanifierSession from '@/pages/centre/PlanifierSession';
import PlanningMonthView from '@/pages/centre/PlanningMonthView';
import PlanningWeekView from '@/pages/centre/PlanningWeekView';
import CourseDetail from '@/pages/courses/[id]';

// Lazy loading avec prefetch
const lazyWithPrefetch = (factory: () => Promise<any>, preload = false) => {
  const Component = React.lazy(factory);
  if (preload) {
    factory();
  }
  return Component;
};

// Composants avec lazy loading
const Home = lazyWithPrefetch(() => import('@/pages/Home'), true);
const CoursesPage = lazyWithPrefetch(() => import('@/pages/Courses'));
const Affiliation = lazyWithPrefetch(() => import('@/pages/affiliation/Affiliation'));
const Blog = lazyWithPrefetch(() => import('@/pages/blog/Blog'));
const Contact = lazyWithPrefetch(() => import('@/pages/contact/Contact'));
const Opportunites = lazyWithPrefetch(() => import('@/pages/opportunites/Opportunites'));
const JobDetail = lazyWithPrefetch(() => import('@/pages/opportunites/JobDetail'));
const Entreprises = lazyWithPrefetch(() => import('@/pages/entreprises/Entreprises'));
const InscriptionEntreprise = lazyWithPrefetch(() => import('@/pages/entreprises/Inscription'));
const EntrepriseDashboard = lazyWithPrefetch(() => import('@/pages/entreprises/Dashboard'));
const InscriptionParticulier = lazyWithPrefetch(() => import('@/pages/auth/Inscription'));
const Connexion = lazyWithPrefetch(() => import('@/pages/auth/Connexion'), true);
const APropos = lazyWithPrefetch(() => import('@/pages/a-propos/APropos'));
const FAQ = lazyWithPrefetch(() => import('@/pages/faq/FAQ'));
const MentionsLegales = lazyWithPrefetch(() => import('@/pages/legal/MentionsLegales'));
const PolitiqueConfidentialite = lazyWithPrefetch(() => import('@/pages/legal/PolitiqueConfidentialite'));
const ConditionsUtilisation = lazyWithPrefetch(() => import('@/pages/legal/ConditionsUtilisation'));
const ApprenantDashboard = lazyWithPrefetch(() => import('@/pages/apprenant/Dashboard'));
const DemandeurDashboard = lazyWithPrefetch(() => import('@/pages/demandeur/Dashboard'));

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
      import('@/pages/Courses');
      import('@/pages/affiliation/Affiliation');
    } else if (location.pathname.startsWith('/courses')) {
      import('@/pages/contact/Contact');
      import('@/pages/entreprises/Inscription');
    }
  }, [location]);

  return null;
};

function AnimatedRoutes() {
  const location = useLocation();
  const { user } = useStore();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={location} key={location.pathname}>
          {/* Routes publiques */}
          <Route path="/" element={<Home />} />
          <Route path="/a-propos" element={<APropos />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetail />} />
          <Route path="/affiliation" element={<Affiliation />} />
          <Route path="/opportunites" element={<Opportunites />} />
          <Route path="/opportunites/:id" element={<JobDetail />} />
          <Route path="/entreprises" element={<Entreprises />} />
          <Route path="/entreprises/inscription" element={<InscriptionEntreprise />} />
          <Route path="/inscription" element={<InscriptionParticulier />} />
          <Route path="/connexion" element={<Connexion />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/mentions-legales" element={<MentionsLegales />} />
          <Route path="/politique-confidentialite" element={<PolitiqueConfidentialite />} />
          <Route path="/conditions-utilisation" element={<ConditionsUtilisation />} />

          {/* Routes administrateur */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/users" element={
            <ProtectedRoute roles={['admin']}>
              <UsersManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/users/roles" element={
            <ProtectedRoute roles={['admin']}>
              <RolesManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/users/add" element={
            <ProtectedRoute roles={['admin']}>
              <AddUser />
            </ProtectedRoute>
          } />
          <Route path="/admin/centres" element={
            <ProtectedRoute roles={['admin']}>
              <CentresManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/courses" element={
            <ProtectedRoute roles={['admin']}>
              <CoursesManagement />
            </ProtectedRoute>
          } />
          <Route path="/admin/stats" element={
            <ProtectedRoute roles={['admin']}>
              <AdminStats />
            </ProtectedRoute>
          } />
          <Route path="/admin/settings" element={
            <ProtectedRoute roles={['admin']}>
              <Settings />
            </ProtectedRoute>
          } />

          {/* Routes centre de formation */}
          <Route path="/centre/dashboard" element={
            <ProtectedRoute roles={['centre_manager']}>
              <CentreDashboard />
            </ProtectedRoute>
          } />
          <Route path="/centre/formateurs" element={
            <ProtectedRoute roles={['centre_manager']}>
              <FormateursManagement />
            </ProtectedRoute>
          } />
          <Route path="/centre/formateurs/add" element={
            <ProtectedRoute roles={['centre_manager']}>
              <AddFormateur />
            </ProtectedRoute>
          } />
          <Route path="/centre/formateurs/disponibilites" element={
            <ProtectedRoute roles={['centre_manager']}>
              <FormateurDisponibilitesManagement />
            </ProtectedRoute>
          } />
          <Route path="/centre/courses/create" element={
            <ProtectedRoute roles={['centre_manager']}>
              <CreateCourse />
            </ProtectedRoute>
          } />
          <Route path="/centre/courses/sessions" element={
            <ProtectedRoute roles={['centre_manager']}>
              <PlanifierSession />
            </ProtectedRoute>
          } />
          <Route path="/centre/courses" element={
            <ProtectedRoute roles={['centre_manager']}>
              <CoursesManagement />
            </ProtectedRoute>
          } />
          <Route path="/centre/planning" element={
            <ProtectedRoute roles={['centre_manager']}>
              <PlanningManagement />
            </ProtectedRoute>
          } />

          {/* Route pour la vue mensuelle du planning */}
          <Route path="/centre/planning/month" element={
            <ProtectedRoute roles={['centre_manager']}>
              <PlanningMonthView />
            </ProtectedRoute>
          } />

          {/* Route pour la vue hebdomadaire du planning */}
          <Route path="/centre/planning/week" element={
            <ProtectedRoute roles={['centre_manager']}>
              <PlanningWeekView />
            </ProtectedRoute>
          } />

          {/* Routes formateur */}
          <Route path="/formateur/dashboard" element={
            <ProtectedRoute roles={['formateur']}>
              <FormateurDashboard />
            </ProtectedRoute>
          } />
          <Route path="/formateur/cours" element={
            <ProtectedRoute roles={['formateur']}>
              <FormateurCours />
            </ProtectedRoute>
          } />
          <Route path="/formateur/ressources" element={
            <ProtectedRoute roles={['formateur']}>
              <FormateurRessources />
            </ProtectedRoute>
          } />
          <Route path="/formateur/evaluations" element={
            <ProtectedRoute roles={['formateur']}>
              <FormateurEvaluations />
            </ProtectedRoute>
          } />

          {/* Routes entreprise */}
          <Route path="/entreprise/dashboard" element={
            <ProtectedRoute roles={['entreprise']}>
              <EntrepriseDashboard />
            </ProtectedRoute>
          } />
          <Route path="/entreprise/employes" element={
            <ProtectedRoute roles={['entreprise']}>
              <EmployesManagement />
            </ProtectedRoute>
          } />
          <Route path="/entreprise/courses" element={
            <ProtectedRoute roles={['entreprise']}>
              <EntrepriseCourses />
            </ProtectedRoute>
          } />
          <Route path="/entreprise/rapports" element={
            <ProtectedRoute roles={['entreprise']}>
              <EntrepriseRapports />
            </ProtectedRoute>
          } />

          {/* Route unifiée pour les utilisateurs multi-rôles */}
          <Route path="/dashboard" element={
            <ProtectedRoute roles={['apprenant', 'etudiant', 'demandeur']}>
              <MultiRoleDashboard />
            </ProtectedRoute>
          } />

          {/* Routes spécifiques aux rôles */}
          <Route path="/apprenant/dashboard" element={
            <ProtectedRoute roles={['apprenant', 'etudiant']}>
              <ApprenantDashboard />
            </ProtectedRoute>
          } />

          <Route path="/demandeur/dashboard" element={
            <ProtectedRoute roles={['demandeur']}>
              <DemandeurDashboard />
            </ProtectedRoute>
          } />

          {/* Route par défaut */}
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