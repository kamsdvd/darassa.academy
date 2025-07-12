import { render, screen } from '@testing-library/react';
import AppRoutes from './index';

describe('AppRoutes', () => {
  it('affiche la page Home à la racine', () => {
    render(<AppRoutes />);
    expect(screen.getByText(/accueil/i)).toBeInTheDocument();
  });
}); 