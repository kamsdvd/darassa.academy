import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from './Home';

const renderWithRouter = (component: React.ReactNode) => {
  return render(<BrowserRouter>{component}</BrowserRouter>);
};

describe('Home', () => {
  it('renders without crashing', () => {
    renderWithRouter(<Home />);
    expect(screen.getByText(/Welcome to Darassa Academy/i)).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    renderWithRouter(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Welcome to Darassa Academy/i);
  });
}); 