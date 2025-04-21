import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'blue';
  container?: boolean;
}

const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  background = 'white',
  container = true,
}) => {
  const backgroundStyles = {
    white: 'bg-white',
    gray: 'bg-gray-50',
    blue: 'bg-[#007BFF] text-white',
  };

  const content = container ? (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  ) : children;

  return (
    <section className={`py-16 ${backgroundStyles[background]} ${className}`}>
      {content}
    </section>
  );
};

export default Section; 