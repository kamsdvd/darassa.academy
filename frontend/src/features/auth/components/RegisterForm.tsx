import { useNavigate } from 'react-router-dom';
import { MainLayout } from '../../../components/layout/MainLayout';
import { Form } from '../../../components/forms/Form';
import { FormField } from '../../../components/forms/FormField';
import { Button } from '../../../components/ui/Button';
import { registerSchema, type RegisterFormData } from '../../../schemas/auth.schema';
import { User, Mail, Lock, LockCheck } from 'lucide-react';

interface RegisterFormProps {
  onSubmit: (data: RegisterFormData) => Promise<void>;
  isLoading: boolean;
}

export const RegisterForm: React.FC<RegisterFormProps> = ({
  onSubmit,
  isLoading
}) => {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Créer un compte
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Ou{' '}
              <button
                onClick={() => navigate('/connexion')}
                className="font-medium text-primary-600 hover:text-primary-500"
              >
                connectez-vous à votre compte existant
              </button>
            </p>
          </div>

          <Form
            schema={registerSchema}
            onSubmit={onSubmit}
            className="mt-8 space-y-6"
          >
            {({ formState: { isSubmitting } }) => (
              <>
                <div className="rounded-md shadow-sm space-y-4">
                  <FormField
                    name="name"
                    label="Nom complet"
                    type="text"
                    required
                    fullWidth
                    leftIcon={<User className="h-5 w-5 text-gray-400" />}
                  />

                  <FormField
                    name="email"
                    label="Email"
                    type="email"
                    required
                    fullWidth
                    leftIcon={<Mail className="h-5 w-5 text-gray-400" />}
                  />

                  <FormField
                    name="password"
                    label="Mot de passe"
                    type="password"
                    required
                    fullWidth
                    leftIcon={<Lock className="h-5 w-5 text-gray-400" />}
                  />

                  <FormField
                    name="confirmPassword"
                    label="Confirmer le mot de passe"
                    type="password"
                    required
                    fullWidth
                    leftIcon={<LockCheck className="h-5 w-5 text-gray-400" />}
                  />
                </div>

                <div>
                  <Button
                    type="submit"
                    variant="primary"
                    fullWidth
                    isLoading={isLoading || isSubmitting}
                  >
                    S'inscrire
                  </Button>
                </div>
              </>
            )}
          </Form>
        </div>
      </div>
    </MainLayout>
  );
}; 