import React from 'react';

export interface RegisterFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  error?: string;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  formData,
  onChange,
  onSubmit,
  isLoading,
  error
}) => (
  <form onSubmit={onSubmit} className="space-y-6">
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
          Prénom
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={formData.firstName}
          onChange={onChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
          Nom
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={formData.lastName}
          onChange={onChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
    <div>
      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
        Email
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={formData.email}
        onChange={onChange}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div>
      <label htmlFor="password" className="block text-sm font-medium text-gray-700">
        Mot de passe
      </label>
      <input
        type="password"
        id="password"
        name="password"
        value={formData.password}
        onChange={onChange}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    <div>
      <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
        Confirmer le mot de passe
      </label>
      <input
        type="password"
        id="confirmPassword"
        name="confirmPassword"
        value={formData.confirmPassword}
        onChange={onChange}
        required
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
    {error && <div className="text-red-600 text-sm">{error}</div>}
    <button
      type="submit"
      disabled={isLoading}
      className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
    >
      {isLoading ? "Inscription en cours..." : "S'inscrire"}
    </button>
  </form>
); 