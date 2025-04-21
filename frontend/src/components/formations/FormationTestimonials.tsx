import React from 'react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Martin',
    role: 'Développeuse Front-end',
    image: '/images/testimonials/sarah.jpg',
    content: "La formation React & Next.js m'a permis de décrocher mon premier emploi en tant que développeuse front-end. Les projets pratiques étaient très pertinents et m'ont aidée à construire un portfolio solide.",
    rating: 5,
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    role: 'Marketing Digital Manager',
    image: '/images/testimonials/thomas.jpg',
    content: "Une formation complète et professionnelle qui m'a donné toutes les clés pour réussir dans le marketing digital. Les formateurs sont à l'écoute et le contenu est toujours à jour.",
    rating: 5,
  },
  {
    id: 3,
    name: 'Emma Laurent',
    role: 'UI/UX Designer',
    image: '/images/testimonials/emma.jpg',
    content: "La formation en design UI/UX a dépassé mes attentes. J'ai appris énormément et j'ai pu mettre en pratique mes connaissances sur des projets concrets. Je recommande vivement !",
    rating: 5,
  },
];

const FormationTestimonials: React.FC = () => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ce que disent nos apprenants
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Découvrez les retours d'expérience de nos anciens apprenants
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full mr-4">
                  {/* Image placeholder - replace with actual image */}
                  <div className="w-full h-full rounded-full bg-gray-300"></div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600 italic">
                "{testimonial.content}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FormationTestimonials; 