import React from 'react';
import Section from '../shared/Section';
import { faqs } from '@/data/faqData';
import { useFAQ } from '@/hooks/useFAQ';
import FAQItem from './FAQItem';

const FAQ: React.FC = () => {
  const { openFaqIndex, toggleFaq } = useFAQ();

  return (
    <Section background="gray">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Questions Fréquentes</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Trouvez les réponses à vos questions sur nos formations et notre programme d'affiliation.
        </p>
      </div>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            faq={faq}
            index={index}
            isOpen={openFaqIndex === index}
            onToggle={toggleFaq}
          />
        ))}
      </div>
    </Section>
  );
};

export default FAQ; 