import { useState } from 'react';

export const useFAQ = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return {
    openFaqIndex,
    toggleFaq,
  };
}; 