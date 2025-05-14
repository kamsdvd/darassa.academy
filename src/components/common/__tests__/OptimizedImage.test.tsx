import { render, screen, fireEvent } from '@testing-library/react';
import { OptimizedImage } from '../OptimizedImage';

describe('OptimizedImage', () => {
  const defaultProps = {
    src: 'test-image.jpg',
    alt: 'Test Image',
  };

  it('renders with default props', () => {
    render(<OptimizedImage {...defaultProps} />);
    const image = screen.getByAltText('Test Image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'test-image.jpg');
  });

  it('renders with custom dimensions', () => {
    render(<OptimizedImage {...defaultProps} width={100} height={100} />);
    const image = screen.getByAltText('Test Image');
    expect(image).toHaveAttribute('width', '100');
    expect(image).toHaveAttribute('height', '100');
  });

  it('renders with custom className', () => {
    render(<OptimizedImage {...defaultProps} className="custom-class" />);
    const container = screen.getByAltText('Test Image').parentElement;
    expect(container).toHaveClass('custom-class');
  });

  it('shows loading state initially', () => {
    render(<OptimizedImage {...defaultProps} />);
    const loadingSpinner = screen.getByRole('status');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('removes loading state after image loads', () => {
    render(<OptimizedImage {...defaultProps} />);
    const image = screen.getByAltText('Test Image');
    fireEvent.load(image);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('renders with priority prop', () => {
    render(<OptimizedImage {...defaultProps} priority />);
    const image = screen.getByAltText('Test Image');
    expect(image).toHaveAttribute('priority', 'true');
  });

  it('renders with custom objectFit', () => {
    render(<OptimizedImage {...defaultProps} objectFit="contain" />);
    const image = screen.getByAltText('Test Image');
    expect(image).toHaveAttribute('objectFit', 'contain');
  });
}); 