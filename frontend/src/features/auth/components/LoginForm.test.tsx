import { render, screen, fireEvent } from '@testing-library/react';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('affiche les champs email et mot de passe', () => {
    render(<LoginForm />);
    expect(screen.getByPlaceholderText(/email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/mot de passe/i)).toBeInTheDocument();
  });

  it('déclenche la soumission du formulaire', () => {
    render(<LoginForm />);
    const emailInput = screen.getByPlaceholderText(/email/i);
    const passwordInput = screen.getByPlaceholderText(/mot de passe/i);
    const button = screen.getByRole('button', { name: /se connecter/i });

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(button);
    // Ici, tu pourrais vérifier un effet de bord ou un mock de fonction de soumission
  });
}); 