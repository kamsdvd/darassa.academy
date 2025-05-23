import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useStore } from '../../store/useStore';
import { 
  Users, 
  Building, 
  FileText, 
  BookOpen, 
  Award, 
  Briefcase, 
  Calendar, 
  Settings, 
  LogOut,
  UserPlus,
  GraduationCap,
  ClipboardList,
  BarChart,
  UserCog,
  Home,
  ChevronRight,
  Menu,
  X
} from 'lucide-react';
import { authService } from '../../services/auth.service';

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface MenuItem {
  icon: React.ReactNode;
  label: string;
  path: string;
  subItems?: MenuItem[];
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle }) => {
  const { user, logout } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const handleLogout = async () => {
    try {
      await authService.logout();
      logout();
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error);
    }
  };

  const getAccountType = () => {
    if (!user) return '';
    if (user.roles.includes('admin')) return 'Administrateur';
    if (user.roles.includes('centre_manager')) return 'Centre de formation';
    if (user.roles.includes('formateur')) return 'Formateur';
    if (user.roles.includes('apprenant') || user.roles.includes('etudiant')) return 'Apprenant';
    if (user.roles.includes('demandeur')) return 'Demandeur d\'emploi';
    if (user.roles.includes('entreprise')) return 'Entreprise';
    return '';
  };

  const getAccountName = () => {
    if (!user) return '';
    if (user.roles.includes('admin')) return 'Administration';
    if (user.roles.includes('centre_manager')) return 'Centre de formation';
    if (user.roles.includes('formateur')) return 'Formation';
    if (user.roles.includes('apprenant') || user.roles.includes('etudiant')) return 'Apprentissage';
    if (user.roles.includes('demandeur')) return 'Emploi';
    if (user.roles.includes('entreprise')) return 'Entreprise';
    return '';
  };

  const renderMenuItem = (item: MenuItem, index: number) => {
    const isItemActive = isActive(item.path);
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isExpanded = expandedSections.includes(item.path);

    return (
      <div key={index} className="relative">
        <Link 
          to={item.path}
          className={`
            flex items-center px-4 py-2.5 text-sm transition-all duration-200
            ${isItemActive 
              ? 'bg-blue-50 text-blue-600 font-medium' 
              : 'text-gray-700 hover:bg-gray-50'
            }
            ${hasSubItems ? 'cursor-pointer' : ''}
          `}
          onClick={(e) => {
            if (hasSubItems) {
              e.preventDefault();
              toggleSection(item.path);
              if (!isItemActive) {
                navigate(item.path);
              }
            }
          }}
          title={!isOpen ? item.label : undefined}
        >
          <span className="flex-shrink-0">{item.icon}</span>
          {isOpen && (
            <>
              <span className="ml-3 flex-grow">{item.label}</span>
              {hasSubItems && (
                <ChevronRight 
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isExpanded ? 'transform rotate-90' : ''
                  }`}
                />
              )}
            </>
          )}
        </Link>
        {hasSubItems && isExpanded && isOpen && (
          <div className="ml-8 mt-1 space-y-1">
            {item.subItems?.map((subItem, subIndex) => (
              <Link
                key={subIndex}
                to={subItem.path}
                className={`
                  flex items-center px-3 py-2 text-sm transition-all duration-200
                  ${isActive(subItem.path)
                    ? 'text-blue-600 font-medium'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
                title={!isOpen ? subItem.label : undefined}
              >
                <span className="flex-shrink-0">{subItem.icon}</span>
                {isOpen && <span className="ml-2">{subItem.label}</span>}
              </Link>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderAdminMenu = () => {
    const adminItems: MenuItem[] = [
      {
        icon: <Home className="h-5 w-5" />,
        label: 'Tableau de bord',
        path: '/admin/dashboard'
      },
      {
        icon: <Users className="h-5 w-5" />,
        label: 'Gestion des utilisateurs',
        path: '/admin/users',
        subItems: [
          {
            icon: <UserPlus className="h-4 w-4" />,
            label: 'Ajouter un utilisateur',
            path: '/admin/users/add'
          },
          {
            icon: <UserCog className="h-4 w-4" />,
            label: 'Gérer les rôles',
            path: '/admin/users/roles'
          }
        ]
      },
      {
        icon: <Building className="h-5 w-5" />,
        label: 'Gestion des centres',
        path: '/admin/centres'
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        label: 'Gestion des formations',
        path: '/admin/formations'
      },
      {
        icon: <FileText className="h-5 w-5" />,
        label: 'Rapports',
        path: '/admin/stats'
      },
      {
        icon: <Settings className="h-5 w-5" />,
        label: 'Paramètres',
        path: '/admin/settings'
      }
    ];

    return (
      <div className="space-y-1">
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Administration
        </div>
        {adminItems.map(renderMenuItem)}
      </div>
    );
  };

  const renderCentreManagerMenu = () => {
    const centreItems: MenuItem[] = [
      {
        icon: <Home className="h-5 w-5" />,
        label: 'Tableau de bord',
        path: '/centre/dashboard'
      },
      {
        icon: <Users className="h-5 w-5" />,
        label: 'Gestion des formateurs',
        path: '/centre/formateurs',
        subItems: [
          {
            icon: <UserPlus className="h-4 w-4" />,
            label: 'Ajouter un formateur',
            path: '/centre/formateurs/add'
          },
          {
            icon: <UserCog className="h-4 w-4" />,
            label: 'Gérer les disponibilités',
            path: '/centre/formateurs/disponibilites'
          }
        ]
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        label: 'Gestion des formations',
        path: '/centre/formations',
        subItems: [
          {
            icon: <FileText className="h-4 w-4" />,
            label: 'Créer une formation',
            path: '/centre/formations/create'
          },
          {
            icon: <Calendar className="h-4 w-4" />,
            label: 'Planifier une session',
            path: '/centre/formations/sessions'
          }
        ]
      },
      {
        icon: <Calendar className="h-5 w-5" />,
        label: 'Planning',
        path: '/centre/planning',
        subItems: [
          {
            icon: <Calendar className="h-4 w-4" />,
            label: 'Vue mensuelle',
            path: '/centre/planning/month'
          },
          {
            icon: <Calendar className="h-4 w-4" />,
            label: 'Vue hebdomadaire',
            path: '/centre/planning/week'
          }
        ]
      }
    ];

    return (
      <div className="space-y-1">
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Gestion du centre
        </div>
        {centreItems.map((item) => (
          <div key={item.path}>
            <Link
              to={item.path}
              className={`flex items-center px-4 py-2 text-sm ${
                isActive(item.path) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
              }`}
              onClick={(e) => {
                if (item.subItems) {
                  toggleSection(item.path);
                }
              }}
            >
              {item.icon}
              {isOpen && (
                <>
                  <span className="ml-3">{item.label}</span>
                  {item.subItems && (
                    <ChevronRight 
                      className={`h-4 w-4 ml-auto transition-transform duration-200 ${
                        (isActive(item.path) || expandedSections.includes(item.path)) ? 'transform rotate-90' : ''
                      }`}
                    />
                  )}
                </>
              )}
            </Link>
            {item.subItems && (isActive(item.path) || expandedSections.includes(item.path)) && (
              <div className="ml-4 mt-1 space-y-1">
                {item.subItems.map((subItem) => (
                  <Link
                    key={subItem.path}
                    to={subItem.path}
                    className={`flex items-center px-4 py-2 text-sm ${
                      isActive(subItem.path) ? 'bg-primary-50 text-primary-600' : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {subItem.icon}
                    {isOpen && <span className="ml-3">{subItem.label}</span>}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  const renderFormateurMenu = () => {
    const formateurItems: MenuItem[] = [
      {
        icon: <Home className="h-5 w-5" />,
        label: 'Tableau de bord',
        path: '/formateur/dashboard'
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        label: 'Mes cours',
        path: '/formateur/cours',
        subItems: [
          {
            icon: <FileText className="h-4 w-4" />,
            label: 'Créer un cours',
            path: '/formateur/cours/create'
          },
          {
            icon: <BookOpen className="h-4 w-4" />,
            label: 'Mes supports',
            path: '/formateur/cours/supports'
          }
        ]
      },
      {
        icon: <Users className="h-5 w-5" />,
        label: 'Mes étudiants',
        path: '/formateur/etudiants',
        subItems: [
          {
            icon: <ClipboardList className="h-4 w-4" />,
            label: 'Liste des étudiants',
            path: '/formateur/etudiants/liste'
          },
          {
            icon: <BarChart className="h-4 w-4" />,
            label: 'Suivi des progrès',
            path: '/formateur/etudiants/progres'
          }
        ]
      },
      {
        icon: <ClipboardList className="h-5 w-5" />,
        label: 'Évaluations',
        path: '/formateur/evaluations',
        subItems: [
          {
            icon: <FileText className="h-4 w-4" />,
            label: 'Créer une évaluation',
            path: '/formateur/evaluations/create'
          },
          {
            icon: <ClipboardList className="h-4 w-4" />,
            label: 'Résultats',
            path: '/formateur/evaluations/resultats'
          }
        ]
      },
      {
        icon: <Calendar className="h-5 w-5" />,
        label: 'Mon planning',
        path: '/formateur/planning',
        subItems: [
          {
            icon: <Calendar className="h-4 w-4" />,
            label: 'Vue mensuelle',
            path: '/formateur/planning/month'
          },
          {
            icon: <Calendar className="h-4 w-4" />,
            label: 'Vue hebdomadaire',
            path: '/formateur/planning/week'
          }
        ]
      }
    ];

    return (
      <div className="space-y-1">
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Espace formateur
        </div>
        {formateurItems.map(renderMenuItem)}
      </div>
    );
  };

  const renderEtudiantMenu = () => {
    const etudiantItems: MenuItem[] = [
      {
        icon: <Home className="h-5 w-5" />,
        label: 'Tableau de bord',
        path: '/etudiant/dashboard'
      },
      {
        icon: <BookOpen className="h-5 w-5" />,
        label: 'Mes cours',
        path: '/etudiant/cours',
        subItems: [
          {
            icon: <BookOpen className="h-4 w-4" />,
            label: 'Cours en cours',
            path: '/etudiant/cours/current'
          },
          {
            icon: <FileText className="h-4 w-4" />,
            label: 'Supports de cours',
            path: '/etudiant/cours/supports'
          }
        ]
      },
      {
        icon: <ClipboardList className="h-5 w-5" />,
        label: 'Évaluations',
        path: '/etudiant/evaluations',
        subItems: [
          {
            icon: <ClipboardList className="h-4 w-4" />,
            label: 'Mes évaluations',
            path: '/etudiant/evaluations/liste'
          },
          {
            icon: <BarChart className="h-4 w-4" />,
            label: 'Mes résultats',
            path: '/etudiant/evaluations/resultats'
          }
        ]
      },
      {
        icon: <Calendar className="h-5 w-5" />,
        label: 'Mon planning',
        path: '/etudiant/planning',
        subItems: [
          {
            icon: <Calendar className="h-4 w-4" />,
            label: 'Vue mensuelle',
            path: '/etudiant/planning/month'
          },
          {
            icon: <Calendar className="h-4 w-4" />,
            label: 'Vue hebdomadaire',
            path: '/etudiant/planning/week'
          }
        ]
      },
      {
        icon: <Award className="h-5 w-5" />,
        label: 'Mes certifications',
        path: '/etudiant/certifications'
      }
    ];

    return (
      <div className="space-y-1">
        <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Espace étudiant
        </div>
        {etudiantItems.map(renderMenuItem)}
      </div>
    );
  };

  const renderDemandeurMenu = () => (
    <>
      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Espace demandeur d'emploi
      </div>
      <Link 
        to="/user/dashboard" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Home className="mr-3 h-5 w-5" />
        {isOpen && <span>Tableau de bord</span>}
      </Link>
      <Link 
        to="/user/formations" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <BookOpen className="mr-3 h-5 w-5" />
        {isOpen && <span>Formations disponibles</span>}
      </Link>
      <Link 
        to="/user/opportunites" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/opportunites') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Briefcase className="mr-3 h-5 w-5" />
        {isOpen && <span>Opportunités d'emploi</span>}
      </Link>
      <Link 
        to="/user/cv" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/cv') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <FileText className="mr-3 h-5 w-5" />
        {isOpen && <span>Mon CV</span>}
      </Link>
      <Link 
        to="/user/candidatures" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/user/candidatures') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <ClipboardList className="mr-3 h-5 w-5" />
        {isOpen && <span>Mes candidatures</span>}
      </Link>
    </>
  );

  const renderEntrepriseMenu = () => (
    <>
      <div className="px-4 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
        Espace entreprise
      </div>
      <Link 
        to="/entreprise/dashboard" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/dashboard') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Home className="mr-3 h-5 w-5" />
        {isOpen && <span>Tableau de bord</span>}
      </Link>
      <Link 
        to="/entreprise/employes" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/employes') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Users className="mr-3 h-5 w-5" />
        {isOpen && <span>Gestion des employés</span>}
      </Link>
      <Link 
        to="/entreprise/formations" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/formations') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <BookOpen className="mr-3 h-5 w-5" />
        {isOpen && <span>Formations</span>}
      </Link>
      <Link 
        to="/entreprise/opportunites" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/opportunites') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <Briefcase className="mr-3 h-5 w-5" />
        {isOpen && <span>Publier des offres</span>}
      </Link>
      <Link 
        to="/entreprise/candidatures" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/candidatures') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <ClipboardList className="mr-3 h-5 w-5" />
        {isOpen && <span>Candidatures reçues</span>}
      </Link>
      <Link 
        to="/entreprise/statistiques" 
        className={`flex items-center px-4 py-2 text-sm ${isActive('/entreprise/statistiques') ? 'bg-blue-50 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}
      >
        <BarChart className="mr-3 h-5 w-5" />
        {isOpen && <span>Statistiques</span>}
      </Link>
    </>
  );

  const renderMenu = () => {
    if (!user) return null;

    if (user.roles.includes('admin')) {
      return renderAdminMenu();
    } else if (user.roles.includes('centre_manager')) {
      return renderCentreManagerMenu();
    } else if (user.roles.includes('formateur')) {
      return renderFormateurMenu();
    } else if (user.roles.includes('etudiant')) {
      return renderEtudiantMenu();
    } else if (user.roles.includes('demandeur')) {
      return renderDemandeurMenu();
    } else if (user.roles.includes('entreprise')) {
      return renderEntrepriseMenu();
    }
    return null;
  };

  if (!user) return null;

  return (
    <div
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white shadow-lg transition-all duration-300 ease-in-out z-40 ${
        isOpen ? 'w-64' : 'w-16'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* En-tête de la sidebar */}
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {isOpen ? (
              <>
                <span className="text-lg font-semibold text-gray-800">{getAccountName()}</span>
                <button
                  onClick={onToggle}
                  className="p-2 rounded-md hover:bg-gray-100 transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
              </>
            ) : (
              <button
                onClick={onToggle}
                className="p-2 rounded-md hover:bg-gray-100 transition-colors w-full flex justify-center"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>
            )}
          </div>
          {isOpen && (
            <div className="mt-2 text-sm text-gray-600">
              {getAccountType()}
            </div>
          )}
        </div>

        {/* Contenu de la sidebar */}
        <div className="flex-1 overflow-y-auto py-4">
          {renderMenu()}
        </div>
        
        <div className="border-t border-gray-200 p-4 sticky bottom-0 bg-white">
          <button
            onClick={handleLogout}
            className={`
              flex items-center w-full px-4 py-2 text-sm text-gray-700
              hover:bg-gray-100 rounded-md transition-colors duration-200
            `}
            title={!isOpen ? 'Déconnexion' : undefined}
          >
            <LogOut className="h-5 w-5" />
            {isOpen && <span className="ml-3">Déconnexion</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 