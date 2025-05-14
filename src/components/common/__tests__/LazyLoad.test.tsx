import { render, screen } from '@testing-library/react';
import { LazyLoad } from '../LazyLoad';

describe('LazyLoad', () => {
  it('renders children when loaded', () => {
    render(
      <LazyLoad>
        <div data-testid="test-content">Test Content</div>
      </LazyLoad>
    );
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
  });

  it('renders custom fallback', () => {
    render(
      <LazyLoad fallback={<div data-testid="custom-fallback">Loading...</div>}>
        <div>Test Content</div>
      </LazyLoad>
    );
    expect(screen.getByTestId('custom-fallback')).toBeInTheDocument();
  });

  it('renders default fallback when no custom fallback provided', () => {
    render(
      <LazyLoad>
        <div>Test Content</div>
      </LazyLoad>
    );
    expect(screen.getByRole('status')).toBeInTheDocument();
  });
}); 