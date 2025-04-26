import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../components/shared/ProtectedRoute';

// Pages publiques
import Home from '../pages/Home';
import Connexion from '../pages/auth/Connexion';
import Inscription from '../pages/auth/Inscription';

// Pages du tableau de bord administrateur
import AdminDashboard from '../pages/admin/Dashboard';
import UsersManagement from '../pages/admin/UsersManagement';
import CentresManagement from '../pages/admin/CentresManagement';
import AdminStats from '../pages/admin/Stats';

// Pages du tableau de bord centre de formation
import CentreDashboard from '../pages/centre/Dashboard';
import FormateursManagement from '../pages/centre/FormateursManagement';
import FormationsManagement from '../pages/centre/FormationsManagement';
import PlanningManagement from '../pages/centre/PlanningManagement';

// Pages du tableau de bord formateur
import FormateurDashboard from '../pages/formateur/Dashboard';
import FormateurCours from '../pages/formateur/Cours';
import FormateurRessources from '../pages/formateur/Ressources';
import FormateurEvaluations from '../pages/formateur/Evaluations';

// Pages du tableau de bord entreprise
import EntrepriseDashboard from '../pages/entreprise/Dashboard';
import EmployesManagement from '../pages/entreprise/EmployesManagement';
import EntrepriseFormations from '../pages/entreprise/Formations';
import EntrepriseRapports from '../pages/entreprise/Rapports';

// Pages du tableau de bord utilisateur
import UserDashboard from '../pages/dashboard/Dashboard';
import UserFormations from '../pages/user/Formations';
import Certificats from '../pages/user/Certificats';
import UserOpportunites from '../pages/user/Opportunites';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Routes publiques */}
      <Route path="/" element={<Home />} />
      <Route path="/connexion" element={<Connexion />} />
      <Route path="/inscription" element={<Inscription />} />

      {/* Routes administrateur */}
      <Route path="/admin" element={<ProtectedRoute roles={['admin']}><AdminDashboard /></ProtectedRoute>} />
      <Route path="/admin/users" element={<ProtectedRoute roles={['admin']}><UsersManagement /></ProtectedRoute>} />
      <Route path="/admin/centres" element={<ProtectedRoute roles={['admin']}><CentresManagement /></ProtectedRoute>} />
      <Route path="/admin/stats" element={<ProtectedRoute roles={['admin']}><AdminStats /></ProtectedRoute>} />

      {/* Routes centre de formation */}
      <Route path="/centre" element={<ProtectedRoute roles={['centre_manager']}><CentreDashboard /></ProtectedRoute>} />
      <Route path="/centre/formateurs" element={<ProtectedRoute roles={['centre_manager']}><FormateursManagement /></ProtectedRoute>} />
      <Route path="/centre/formations" element={<ProtectedRoute roles={['centre_manager']}><FormationsManagement /></ProtectedRoute>} />
      <Route path="/centre/planning" element={<ProtectedRoute roles={['centre_manager']}><PlanningManagement /></ProtectedRoute>} />

      {/* Routes formateur */}
      <Route path="/formateur" element={<ProtectedRoute roles={['formateur']}><FormateurDashboard /></ProtectedRoute>} />
      <Route path="/formateur/cours" element={<ProtectedRoute roles={['formateur']}><FormateurCours /></ProtectedRoute>} />
      <Route path="/formateur/ressources" element={<ProtectedRoute roles={['formateur']}><FormateurRessources /></ProtectedRoute>} />
      <Route path="/formateur/evaluations" element={<ProtectedRoute roles={['formateur']}><FormateurEvaluations /></ProtectedRoute>} />

      {/* Routes entreprise */}
      <Route path="/entreprise" element={<ProtectedRoute roles={['entreprise']}><EntrepriseDashboard /></ProtectedRoute>} />
      <Route path="/entreprise/employes" element={<ProtectedRoute roles={['entreprise']}><EmployesManagement /></ProtectedRoute>} />
      <Route path="/entreprise/formations" element={<ProtectedRoute roles={['entreprise']}><EntrepriseFormations /></ProtectedRoute>} />
      <Route path="/entreprise/rapports" element={<ProtectedRoute roles={['entreprise']}><EntrepriseRapports /></ProtectedRoute>} />

      {/* Routes utilisateur standard */}
      <Route path="/dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
      <Route path="/formations" element={<ProtectedRoute><UserFormations /></ProtectedRoute>} />
      <Route path="/certificats" element={<ProtectedRoute><Certificats /></ProtectedRoute>} />
      <Route path="/opportunites" element={<ProtectedRoute><UserOpportunites /></ProtectedRoute>} />

      {/* Route par défaut */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRoutes; 