import React from 'react';
import { useUser } from '../hooks/useUser';
import { UserPreferences as UserPreferencesType } from '../types/user.types';

export const UserPreferences: React.FC = () => {
  const { preferences, isLoading, error, updatePreferences } = useUser();

  const handleToggle = async (key: keyof UserPreferencesType) => {
    if (!preferences) return;
    try {
      await updatePreferences({
        [key]: !preferences[key]
      });
    } catch (err) {
      // L'erreur est déjà gérée dans le hook useUser
    }
  };

  const handleLanguageChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      await updatePreferences({
        language: e.target.value
      });
    } catch (err) {
      // L'erreur est déjà gérée dans le hook useUser
    }
  };

  const handleThemeChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    try {
      await updatePreferences({
        theme: e.target.value as 'light' | 'dark' | 'system'
      });
    } catch (err) {
      // L'erreur est déjà gérée dans le hook useUser
    }
  };

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div className="text-red-600">{error}</div>;
  }

  if (!preferences) {
    return <div>Préférences non trouvées</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Préférences</h2>

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Notifications</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Notifications par email
                </label>
                <p className="text-sm text-gray-500">
                  Recevoir des notifications par email
                </p>
              </div>
              <button
                onClick={() => handleToggle('emailNotifications')}
                className={`${
                  preferences.emailNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    preferences.emailNotifications ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-700">
                  Notifications push
                </label>
                <p className="text-sm text-gray-500">
                  Recevoir des notifications push
                </p>
              </div>
              <button
                onClick={() => handleToggle('pushNotifications')}
                className={`${
                  preferences.pushNotifications ? 'bg-indigo-600' : 'bg-gray-200'
                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
              >
                <span
                  className={`${
                    preferences.pushNotifications ? 'translate-x-6' : 'translate-x-1'
                  } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                />
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-4">Préférences générales</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Langue
              </label>
              <select
                value={preferences.language}
                onChange={handleLanguageChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="fr">Français</option>
                <option value="en">English</option>
                <option value="es">Español</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Thème
              </label>
              <select
                value={preferences.theme}
                onChange={handleThemeChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              >
                <option value="light">Clair</option>
                <option value="dark">Sombre</option>
                <option value="system">Système</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 