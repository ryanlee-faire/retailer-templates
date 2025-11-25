import React, { useState } from 'react';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LearnMoreModal({ isOpen, onClose }: LearnMoreModalProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Combined FAQs from both Terms and COI
  const faqs = [
    // Terms FAQs
    {
      question: "Why do I need to agree to this?",
      answer: "Enterprise retailers require a formal vendor agreement. Signing these terms ensures you can sell to them."
    },
    {
      question: "Does this affect my commission or fees?",
      answer: "No, they remain the same."
    },
    {
      question: "Can I choose which retailers I sell to?",
      answer: "Yes, you retain full control over accepting or declining orders."
    },
    {
      question: "Will enterprise orders look different?",
      answer: "They'll be labeled \"Faire+\" in your Orders list."
    },
    {
      question: "Can I request changes to these terms?",
      answer: "No, the terms are fixed and cannot be modified."
    },
    // COI FAQs
    {
      question: "What is a Certificate of Insurance?",
      answer: "A COI is proof from your insurer showing you have active liability coverage. It's a standard document that your insurance provider can issue."
    },
    {
      question: "My policy is below $2M, what should I do?",
      answer: "Contact your insurance provider to request a coverage increase or add a rider to meet the $2M aggregate requirement."
    },
    {
      question: "How do I add Faire as an additional insured?",
      answer: "Request your insurance provider to list \"Faire Wholesale, Inc.\" as an additional insured on your certificate."
    },
    {
      question: "How long does verification take?",
      answer: "COI verification typically takes 1-2 business days. You'll receive an email once your document has been reviewed."
    }
  ];

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div className="relative" onClick={(e) => e.stopPropagation()}>
        {/* Close button - outside modal */}
        <button
          onClick={onClose}
          className="absolute -right-6 -top-8 flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/20 transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="w-full max-w-[700px] flex rounded-2xl shadow-xl overflow-hidden">
          {/* Left: About content (50%) */}
          <div className="w-1/2 flex-shrink-0 bg-white p-6 flex flex-col">
            {/* Header */}
            <h2 className="text-lg font-semibold text-[#333333] mb-4">
              About Faire+
            </h2>

            {/* Brief intro */}
            <div className="text-sm text-[#666666] leading-relaxed flex-1 space-y-3">
              <p>
                Faire+ connects you with larger, multi-location retailers who are looking for quality brands like yours. These enterprise retailers often place bigger orders and can become long-term partners.
              </p>
              <p>
                By joining the program, you unlock access to retailers you wouldn't reach otherwise—all while keeping your same commission rates and fees.
              </p>
            </div>

            {/* Footer - Contact Support */}
            <div className="mt-6 pt-4 border-t border-[#e5e5e5]">
              <p className="text-sm text-[#333333]">
                Need help?{' '}
                <button className="underline hover:text-[#666666]">
                  Contact support
                </button>
              </p>
            </div>
          </div>

          {/* Right: FAQ Panel (50%) */}
          <div className="w-1/2 bg-[#f7f7f7] p-6 flex flex-col">
            <h3 className="text-base font-semibold text-[#333333] mb-4">
              Frequently Asked Questions
            </h3>
            
            <div className="space-y-0 flex-1">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-[#e5e5e5] last:border-b-0">
                  <button
                    onClick={() => toggleFaq(index)}
                    className="flex items-start justify-between w-full text-left py-3"
                  >
                    <span className="text-[13px] font-medium text-[#333333] pr-2">{faq.question}</span>
                    <svg 
                      width="12" 
                      height="12" 
                      viewBox="0 0 12 12" 
                      fill="none" 
                      stroke="#333333" 
                      strokeWidth="1.5"
                      className={`flex-shrink-0 mt-1 transition-transform ${openFaq === index ? 'rotate-180' : ''}`}
                    >
                      <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {openFaq === index && (
                    <p className="text-sm text-[#666666] pb-3">
                      {faq.answer}
                    </p>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

