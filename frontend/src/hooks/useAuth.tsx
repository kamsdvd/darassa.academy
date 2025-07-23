import React, { createContext, useContext } from 'react';
import { useAuth as useModuleAuth } from '../modules/auth/hooks/useAuth';

const AuthContext = createContext<ReturnType<typeof useModuleAuth> | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useModuleAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 