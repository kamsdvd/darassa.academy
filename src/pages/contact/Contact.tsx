import React from 'react';
import PageTransition from '../../components/shared/PageTransition';
import FormInput from '../../components/forms/FormInput';
import { useFormValidation } from '../../hooks/useFormValidation';

const Contact: React.FC = () => {
  const initialState = {
    name: '',
    email: '',
    subject: '',
    message: '',
  };

  const validationRules = {
    name: { required: true, minLength: 2 },
    email: { required: true, email: true },
    subject: { required: true, minLength: 3 },
    message: { required: true, minLength: 10 },
  };

  const { formData, errors, handleChange, validateForm, resetForm } = useFormValidation(
    initialState,
    validationRules
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        // Ici, vous pouvez ajouter la logique pour envoyer le formulaire
        console.log('Formulaire soumis:', formData);
        // Simuler un envoi réussi
        alert('Message envoyé avec succès !');
        resetForm();
      } catch (error) {
        console.error('Erreur lors de l\'envoi du formulaire:', error);
        alert('Une erreur est survenue lors de l\'envoi du message.');
      }
    }
  };

  return (
    <PageTransition>
      <div className="min-h-screen py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">Contactez-nous</h1>
            <p className="text-xl text-gray-600 mb-12">
              Nous sommes là pour répondre à toutes vos questions. N'hésitez pas à nous contacter !
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <FormInput
                label="Nom"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                required
                placeholder="Votre nom"
              />

              <FormInput
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={errors.email}
                required
                placeholder="votre@email.com"
              />

              <FormInput
                label="Sujet"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                required
                placeholder="Sujet de votre message"
              />

              <FormInput
                label="Message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                error={errors.message}
                required
                placeholder="Votre message"
                multiline
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                >
                  Envoyer le message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Contact; 