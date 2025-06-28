
import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { faqs } from '@/data/faqs';

const FAQSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-black mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Get answers to common questions about our Ayurvedic products and services
          </p>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                value={`faq-${faq.id}`}
                className="bg-white rounded-lg border border-gray-200 px-6 py-2"
              >
                <AccordionTrigger className="text-left text-black font-medium hover:text-brand-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
