import { useState } from 'react';

export function useAuth() {
  const [user, setUser] = useState<{ email: string } | null>(null);
  const login = (email: string, password: string) => {
    // TODO: call API
    setUser({ email });
  };
  return { user, login };
} 