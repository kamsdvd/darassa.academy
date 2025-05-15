import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthService } from '../../../services/authService';
import Inscription from '../Inscription';
import { useStore } from '../../../store/useStore';

// Mock des dépendances
vi.mock('../../../services/authService');
vi.mock('../../../store/useStore');
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

describe('Inscription Component', () => {
  const mockSetUser = vi.fn();
  const mockNavigate = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    (useStore as any).mockReturnValue({
      setUser: mockSetUser,
    });
  });

  const renderComponent = () => {
    return render(
      <BrowserRouter>
        <Inscription />
      </BrowserRouter>
    );
  };

  const fillForm = async (data: {
    firstName?: string;
    lastName?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
  }) => {
    if (data.firstName) {
      fireEvent.change(screen.getByLabelText(/prénom/i), {
        target: { value: data.firstName },
      });
    }
    if (data.lastName) {
      fireEvent.change(screen.getByLabelText(/nom/i), {
        target: { value: data.lastName },
      });
    }
    if (data.email) {
      fireEvent.change(screen.getByLabelText(/email/i), {
        target: { value: data.email },
      });
    }
    if (data.password) {
      fireEvent.change(screen.getByLabelText(/mot de passe/i), {
        target: { value: data.password },
      });
    }
    if (data.confirmPassword) {
      fireEvent.change(screen.getByLabelText(/confirmer le mot de passe/i), {
        target: { value: data.confirmPassword },
      });
    }
  };

  it('renders the registration form correctly', () => {
    renderComponent();

    // Vérifier que tous les champs sont présents
    expect(screen.getByLabelText(/prénom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nom/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/mot de passe/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmer le mot de passe/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /s'inscrire/i })).toBeInTheDocument();
  });

  it('shows validation errors for empty fields', async () => {
    renderComponent();

    // Soumettre le formulaire vide
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    // Vérifier les messages d'erreur
    await waitFor(() => {
      expect(screen.getByText('Le prénom est requis')).toBeInTheDocument();
      expect(screen.getByText('Le nom est requis')).toBeInTheDocument();
      expect(screen.getByText('L\'email est requis')).toBeInTheDocument();
      expect(screen.getByText('Le mot de passe est requis')).toBeInTheDocument();
    });
  });

  it('shows error for invalid email format', async () => {
    renderComponent();

    // Remplir le formulaire avec un email invalide
    await fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'invalid-email',
      password: 'password123',
      confirmPassword: 'password123',
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    // Vérifier le message d'erreur
    await waitFor(() => {
      expect(screen.getByText('L\'email n\'est pas valide')).toBeInTheDocument();
    });
  });

  it('shows error for password mismatch', async () => {
    renderComponent();

    // Remplir le formulaire avec des mots de passe différents
    await fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password456',
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    // Vérifier le message d'erreur
    await waitFor(() => {
      expect(screen.getByText('Les mots de passe ne correspondent pas')).toBeInTheDocument();
    });
  });

  it('shows error for short password', async () => {
    renderComponent();

    // Remplir le formulaire avec un mot de passe trop court
    await fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: '12345',
      confirmPassword: '12345',
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    // Vérifier le message d'erreur
    await waitFor(() => {
      expect(screen.getByText('Le mot de passe doit contenir au moins 6 caractères')).toBeInTheDocument();
    });
  });

  it('handles successful registration', async () => {
    const mockUser = {
      id: '1',
      email: 'john@example.com',
      firstName: 'John',
      lastName: 'Doe',
      role: 'user',
    };

    // Mock de la réponse du service d'authentification
    (AuthService.getInstance().register as any).mockResolvedValueOnce({
      token: 'fake-token',
      user: mockUser,
    });

    renderComponent();

    // Remplir le formulaire avec des données valides
    await fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    // Vérifier que le service a été appelé avec les bonnes données
    await waitFor(() => {
      expect(AuthService.getInstance().register).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john@example.com',
        password: 'password123',
      });
    });

    // Vérifier que l'utilisateur a été mis à jour dans le store
    expect(mockSetUser).toHaveBeenCalledWith(mockUser);
  });

  it('handles registration error', async () => {
    // Mock d'une erreur du service d'authentification
    (AuthService.getInstance().register as any).mockRejectedValueOnce(
      new Error('Email déjà utilisé')
    );

    renderComponent();

    // Remplir le formulaire avec des données valides
    await fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    // Vérifier le message d'erreur
    await waitFor(() => {
      expect(screen.getByText('Email déjà utilisé')).toBeInTheDocument();
    });
  });

  it('toggles password visibility', async () => {
    renderComponent();

    // Vérifier que les mots de passe sont masqués par défaut
    const passwordInput = screen.getByLabelText(/mot de passe/i);
    const confirmPasswordInput = screen.getByLabelText(/confirmer le mot de passe/i);
    expect(passwordInput).toHaveAttribute('type', 'password');
    expect(confirmPasswordInput).toHaveAttribute('type', 'password');

    // Cliquer sur le bouton pour afficher le mot de passe
    fireEvent.click(screen.getAllByRole('button', { name: /toggle password/i })[0]);
    expect(passwordInput).toHaveAttribute('type', 'text');

    // Cliquer sur le bouton pour afficher la confirmation du mot de passe
    fireEvent.click(screen.getAllByRole('button', { name: /toggle password/i })[1]);
    expect(confirmPasswordInput).toHaveAttribute('type', 'text');
  });

  it('disables form during submission', async () => {
    // Mock d'une réponse lente du service
    (AuthService.getInstance().register as any).mockImplementation(
      () => new Promise((resolve) => setTimeout(resolve, 1000))
    );

    renderComponent();

    // Remplir le formulaire
    await fillForm({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      password: 'password123',
      confirmPassword: 'password123',
    });

    // Soumettre le formulaire
    fireEvent.click(screen.getByRole('button', { name: /s'inscrire/i }));

    // Vérifier que le formulaire est désactivé pendant la soumission
    expect(screen.getByLabelText(/prénom/i)).toBeDisabled();
    expect(screen.getByLabelText(/nom/i)).toBeDisabled();
    expect(screen.getByLabelText(/email/i)).toBeDisabled();
    expect(screen.getByLabelText(/mot de passe/i)).toBeDisabled();
    expect(screen.getByLabelText(/confirmer le mot de passe/i)).toBeDisabled();
    expect(screen.getByRole('button', { name: /inscription en cours/i })).toBeDisabled();
  });
}); 