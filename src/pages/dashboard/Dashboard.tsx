import React, { useState } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BookOpen, 
  Briefcase, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import PageTransition from '../../components/shared/PageTransition';

// Import des pages du dashboard
import DashboardHome from './DashboardHome';
import UsersManagement from './UsersManagement';
import FormationsManagement from './FormationsManagement';
import JobsManagement from './JobsManagement';
import BlogManagement from './BlogManagement';
import SettingsPage from './SettingsPage';

const Dashboard: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: LayoutDashboard, label: 'Tableau de bord' },
    { path: '/dashboard/users', icon: Users, label: 'Utilisateurs' },
    { path: '/dashboard/formations', icon: BookOpen, label: 'Formations' },
    { path: '/dashboard/jobs', icon: Briefcase, label: 'Offres d\'emploi' },
    { path: '/dashboard/blog', icon: FileText, label: 'Blog' },
    { path: '/dashboard/settings', icon: Settings, label: 'Paramètres' },
  ];

  const handleLogout = () => {
    // Logique de déconnexion
    navigate('/connexion');
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-100">
        {/* Sidebar mobile toggle */}
        <div className="lg:hidden fixed top-0 left-0 z-20 p-4 bg-white shadow-md w-full">
          <div className="flex justify-between items-center">
            <h1 className="text-xl font-bold text-primary-600">Darassa Academy</h1>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-10 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full">
            <div className="p-6 border-b">
              <h1 className="text-xl font-bold text-primary-600">Darassa Academy</h1>
              <p className="text-sm text-gray-500">Administration</p>
            </div>
            
            <nav className="flex-1 p-4 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            
            <div className="p-4 border-t">
              <button
                onClick={handleLogout}
                className="flex items-center w-full p-3 text-gray-700 rounded-lg hover:bg-gray-50"
              >
                <LogOut className="w-5 h-5 mr-3" />
                <span>Déconnexion</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="lg:pl-64">
          <div className="p-8">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/users" element={<UsersManagement />} />
              <Route path="/formations" element={<FormationsManagement />} />
              <Route path="/jobs" element={<JobsManagement />} />
              <Route path="/blog" element={<BlogManagement />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard; 