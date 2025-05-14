import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';
import { RegisterForm } from '../components/RegisterForm';
import { toast } from 'react-hot-toast';
import type { RegisterFormData } from '../../../schemas/auth.schema';

export const RegisterContainer = () => {
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const handleSubmit = async (data: RegisterFormData) => {
    try {
      await register(data.name, data.email, data.password);
      toast.success('Inscription réussie !');
      navigate('/dashboard');
    } catch (err) {
      console.error('Erreur lors de l\'inscription:', err);
    }
  };

  return (
    <RegisterForm
      onSubmit={handleSubmit}
      isLoading={isLoading}
    />
  );
}; 