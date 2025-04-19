import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Home from './Home';

describe('Home', () => {
  it('renders without crashing', () => {
    render(<Home />);
    expect(screen.getByText(/Welcome to Darassa Academy/i)).toBeInTheDocument();
  });

  it('displays the main heading', () => {
    render(<Home />);
    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent(/Welcome to Darassa Academy/i);
  });
}); 