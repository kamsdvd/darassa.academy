import React from 'react';
import { Plus, Minus } from 'lucide-react';
import Card from '../shared/Card';
import Transition from '../shared/Transition';
import { FAQ } from '@/types/faq';

interface FAQItemProps {
  faq: FAQ;
  index: number;
  isOpen: boolean;
  onToggle: (index: number) => void;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, index, isOpen, onToggle }) => {
  return (
    <Card>
      <button
        className="w-full px-6 py-4 flex items-center justify-between text-left"
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={`faq-content-${index}`}
      >
        <span className="font-semibold text-gray-900">{faq.question}</span>
        <Transition show={isOpen} type="scale" duration={200}>
          <Minus className="w-5 h-5 text-[#007BFF]" />
        </Transition>
        <Transition show={!isOpen} type="scale" duration={200}>
          <Plus className="w-5 h-5 text-[#007BFF]" />
        </Transition>
      </button>
      <Transition show={isOpen} type="slide">
        <div id={`faq-content-${index}`} className="px-6 pb-4">
          <p className="text-gray-600">{faq.answer}</p>
        </div>
      </Transition>
    </Card>
  );
};

export default FAQItem; 