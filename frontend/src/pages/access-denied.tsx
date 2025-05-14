import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../components/layout/MainLayout';
import { Button } from '../components/ui/Button';

export default function AccessDenied() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Accès Refusé
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-md">
          Désolé, vous n'avez pas les permissions nécessaires pour accéder à cette page.
          Veuillez contacter l'administrateur si vous pensez qu'il s'agit d'une erreur.
        </p>
        <div className="flex gap-4">
          <Button
            variant="primary"
            onClick={() => navigate(-1)}
          >
            Retour
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate('/')}
          >
            Retour à l'accueil
          </Button>
        </div>
      </div>
    </MainLayout>
  );
} 