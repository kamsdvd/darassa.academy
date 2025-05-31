import React, { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import PageHeader from '../../modules/common/components/PageHeader';

interface PageLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  title,
  subtitle,
  actions
}) => {
  const location = useLocation();
  
  // Générer les breadcrumbs basés sur le chemin actuel
  const generateBreadcrumbs = () => {
    const paths = location.pathname.split('/').filter(Boolean);
    const breadcrumbs = paths.map((path, index) => {
      const href = '/' + paths.slice(0, index + 1).join('/');
      const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
      return { label, href };
    });

    // Ajouter "Accueil" comme premier élément
    return [{ label: 'Accueil', href: '/' }, ...breadcrumbs];
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeader
        title={title}
        subtitle={subtitle}
        breadcrumbs={generateBreadcrumbs()}
        actions={actions}
      />
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
};

export default PageLayout; 