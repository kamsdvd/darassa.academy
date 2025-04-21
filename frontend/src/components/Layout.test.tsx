import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Layout from './Layout';

describe('Layout', () => {
  it('renders children correctly', () => {
    render(
      <Layout>
        <div data-testid="test-child">Test Content</div>
      </Layout>
    );
    expect(screen.getByTestId('test-child')).toBeInTheDocument();
  });

  it('renders the header', () => {
    render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );
    expect(screen.getByRole('banner')).toBeInTheDocument();
  });
}); 