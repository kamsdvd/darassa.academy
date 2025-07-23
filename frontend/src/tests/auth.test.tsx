import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from '../hooks/useAuth';
import { RegisterContainer } from '../modules/auth/containers/RegisterContainer';
import { authService } from '../modules/auth/services/auth.service';

// Mock du service d'authentification et de useNavigate
jest.mock('../modules/auth/services/auth.service');
const mockedAuthService = authService as jest.Mocked<typeof authService>;

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithProviders = (component: React.ReactNode) => {
  return render(
    <BrowserRouter>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrowserRouter>
  );
};

describe('Registration Flow', () => {
  beforeEach(() => {
    // Réinitialise les mocks avant chaque test
    jest.clearAllMocks();
  });

  it('should allow a user to register successfully and be redirected', async () => {
    // Arrange: Configuration du test
    const mockUserData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'Password123!',
      userType: 'apprenant',
    };

    const mockResponse = {
      user: { id: '1', ...mockUserData },
      tokens: { accessToken: 'fake-access-token', refreshToken: 'fake-refresh-token' },
    };

    // On mock la réponse de la méthode register du service
    mockedAuthService.register.mockResolvedValue(mockResponse);

    renderWithProviders(<RegisterContainer />);

    // Act: Simulation des actions de l'utilisateur
    fireEvent.change(screen.getByLabelText(/prénom/i), { target: { value: mockUserData.firstName } });
    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: mockUserData.lastName } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: mockUserData.email } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: mockUserData.password } });
    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), { target: { value: mockUserData.password } });

    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    // Assert: Vérification des résultats
    // 1. Vérifier que le service a été appelé avec les bonnes données
    await waitFor(() => {
      expect(mockedAuthService.register).toHaveBeenCalledWith({
        firstName: mockUserData.firstName,
        lastName: mockUserData.lastName,
        email: mockUserData.email,
        password: mockUserData.password,
        userType: 'apprenant', // Vérifie que le userType est bien défini par défaut
      });
    });

    // 2. Vérifier que la redirection a lieu après une inscription réussie
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard');
    });
  });

  it('should display an error message if registration fails', async () => {
    // Arrange
    const mockError = {
      code: 'REGISTRATION_FAILED',
      message: 'Cette adresse email est déjà utilisée.',
    };
    mockedAuthService.register.mockRejectedValue(mockError);

    renderWithProviders(<RegisterContainer />);

    // Act
    fireEvent.change(screen.getByLabelText(/prénom/i), { target: { value: 'Jane' } });
    fireEvent.change(screen.getByLabelText(/nom/i), { target: { value: 'Doe' } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'jane.doe@example.com' } });
    fireEvent.change(screen.getByLabelText('Mot de passe'), { target: { value: 'Password123!' } });
    fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), { target: { value: 'Password123!' } });

    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    // Assert
    // Vérifier que le message d'erreur est affiché
    await waitFor(() => {
      expect(screen.getByText(mockError.message)).toBeInTheDocument();
    });

    // Vérifier qu'aucune redirection n'a eu lieu
    expect(mockNavigate).not.toHaveBeenCalled();
  });
});
 