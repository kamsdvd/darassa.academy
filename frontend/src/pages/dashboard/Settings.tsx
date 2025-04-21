import React, { useState } from 'react';
import { 
  Save,
  Globe,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Lock,
  Users,
  Bell,
  CreditCard,
  Shield
} from 'lucide-react';

interface SettingsSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
}

const Settings: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');

  const sections: SettingsSection[] = [
    {
      id: 'general',
      title: 'Paramètres généraux',
      icon: <Globe className="w-5 h-5" />,
      description: 'Configurez les informations de base de votre site'
    },
    {
      id: 'contact',
      title: 'Informations de contact',
      icon: <Mail className="w-5 h-5" />,
      description: 'Gérez les coordonnées et les informations de contact'
    },
    {
      id: 'social',
      title: 'Réseaux sociaux',
      icon: <Facebook className="w-5 h-5" />,
      description: 'Configurez vos liens de réseaux sociaux'
    },
    {
      id: 'security',
      title: 'Sécurité',
      icon: <Lock className="w-5 h-5" />,
      description: 'Paramètres de sécurité et d\'authentification'
    },
    {
      id: 'users',
      title: 'Gestion des utilisateurs',
      icon: <Users className="w-5 h-5" />,
      description: 'Configurez les rôles et les permissions'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      description: 'Gérez les paramètres de notification'
    },
    {
      id: 'billing',
      title: 'Facturation',
      icon: <CreditCard className="w-5 h-5" />,
      description: 'Configurez les paramètres de paiement'
    },
    {
      id: 'privacy',
      title: 'Confidentialité',
      icon: <Shield className="w-5 h-5" />,
      description: 'Gérez les paramètres de confidentialité'
    }
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom du site
              </label>
              <input
                type="text"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                defaultValue="Darassa Academy"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description du site
              </label>
              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                rows={3}
                defaultValue="Plateforme de formation en ligne et de recrutement"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Logo du site
              </label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg className="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  Changer
                </button>
              </div>
            </div>
          </div>
        );

      case 'contact':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email de contact
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  defaultValue="contact@darassa.academy"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Téléphone
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  defaultValue="+33 1 23 45 67 89"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Adresse
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  rows={3}
                  defaultValue="123 Rue de l'Education, 75000 Paris, France"
                />
              </div>
            </div>
          </div>
        );

      case 'social':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Facebook
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Facebook className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="https://facebook.com/darassaacademy"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Twitter
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Twitter className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="https://twitter.com/darassaacademy"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                LinkedIn
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Linkedin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="https://linkedin.com/company/darassaacademy"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Instagram
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Instagram className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="https://instagram.com/darassaacademy"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                YouTube
              </label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Youtube className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="url"
                  className="block w-full pl-10 rounded-md border-gray-300 focus:border-primary-500 focus:ring-primary-500"
                  placeholder="https://youtube.com/darassaacademy"
                />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Section en cours de développement</p>
          </div>
        );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Paramètres</h1>
        <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
          <Save className="w-5 h-5 mr-2" />
          Enregistrer les modifications
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-64 space-y-1">
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`w-full flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                activeSection === section.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {section.icon}
              <span className="ml-3">{section.title}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 bg-white shadow rounded-lg p-6">
          <div className="mb-6">
            <h2 className="text-lg font-medium text-gray-900">
              {sections.find(s => s.id === activeSection)?.title}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {sections.find(s => s.id === activeSection)?.description}
            </p>
          </div>
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings; 