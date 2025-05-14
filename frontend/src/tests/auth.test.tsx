import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { authService } from '../services/auth.service';
import { BrowserRouter } from 'react-router-dom';

// Mock du service d'authentification
jest.mock('../services/auth.service');

const TestComponent = () => {
  const { login, register, logout, user, isAuthenticated, error, loading } = useAuth();

  return (
    <div>
      <div data-testid="auth-status">
        {isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
      </div>
      <div data-testid="user-info">
        {user ? JSON.stringify(user) : 'No user'}
      </div>
      <div data-testid="error-message">
        {error?.message || 'No error'}
      </div>
      <div data-testid="loading-status">
        {loading ? 'Loading' : 'Not Loading'}
      </div>
      <button onClick={() => login('test@example.com', 'password123')}>
        Login
      </button>
      <button onClick={() => register('Test User', 'test@example.com', 'Password123!')}>
        Register
      </button>
      <button onClick={logout}>
        Logout
      </button>
    </div>
  );
};

const renderWithAuth = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Authentication System', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should handle successful login', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      roles: ['user']
    };

    (authService.login as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
      tokens: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresIn: 3600
      }
    });

    renderWithAuth(<TestComponent />);

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      expect(screen.getByTestId('user-info')).toHaveTextContent(JSON.stringify(mockUser));
    });
  });

  it('should handle login failure', async () => {
    const mockError = {
      code: 'INVALID_CREDENTIALS',
      message: 'Invalid email or password'
    };

    (authService.login as jest.Mock).mockRejectedValueOnce(mockError);

    renderWithAuth(<TestComponent />);

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Invalid email or password');
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
    });
  });

  it('should handle successful registration', async () => {
    const mockUser = {
      id: '1',
      email: 'test@example.com',
      name: 'Test User',
      roles: ['user']
    };

    (authService.register as jest.Mock).mockResolvedValueOnce({
      user: mockUser,
      tokens: {
        accessToken: 'access-token',
        refreshToken: 'refresh-token',
        expiresIn: 3600
      }
    });

    renderWithAuth(<TestComponent />);

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Authenticated');
      expect(screen.getByTestId('user-info')).toHaveTextContent(JSON.stringify(mockUser));
    });
  });

  it('should handle registration with invalid password', async () => {
    renderWithAuth(<TestComponent />);

    fireEvent.click(screen.getByText('Register'));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent(
        'Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial'
      );
    });
  });

  it('should handle logout', async () => {
    renderWithAuth(<TestComponent />);

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(screen.getByTestId('auth-status')).toHaveTextContent('Not Authenticated');
      expect(screen.getByTestId('user-info')).toHaveTextContent('No user');
    });
  });

  it('should validate email format', async () => {
    renderWithAuth(<TestComponent />);

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('error-message')).toHaveTextContent('Format d\'email invalide');
    });
  });
}); 