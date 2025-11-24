import React, { useState } from 'react';

interface TermsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  variant?: 1 | 2 | 3;
}

export function TermsModal({ isOpen, onClose, onAccept, variant = 1 }: TermsModalProps) {
  const [isChecked, setIsChecked] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showFaqPage, setShowFaqPage] = useState(false); // For variant 3
  const [faqSectionExpanded, setFaqSectionExpanded] = useState(false); // For variant 2

  if (!isOpen) return null;

  const handleAccept = () => {
    if (isChecked) {
      onAccept();
      setIsChecked(false);
    }
  };

  const handleClose = () => {
    setIsChecked(false);
    setOpenFaq(null);
    setShowFaqPage(false);
    setFaqSectionExpanded(false);
    onClose();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
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
    }
  ];

  // ===== TERMS CONTENT (shared across variants) =====
  const TermsContent = ({ showInlineLinks = false, onFaqClick }: { showInlineLinks?: boolean; onFaqClick?: () => void }) => (
    <div className="flex-1 bg-white p-6 overflow-y-auto max-h-[80vh]">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-[#333333] mb-6 pr-8">
        Join the Faire+ Enterprise Program
      </h2>
      
      {/* Body copy + Terms */}
      <div className="text-sm text-[#666666] leading-[22px] mb-6 space-y-4">
        <p>
          Agree to these terms to unlock access to larger, multi-location retailers. These ensure that we can help you grow on Faire.
          {showInlineLinks && (
            <button onClick={onFaqClick} className="text-[#333333] underline ml-1 hover:text-[#666666]">
              Learn more about Faire+
            </button>
          )}
        </p>
        <p>
          By joining Faire+, you agree to provide products to enterprise retailers through Faire's Vendor of Record model. This enables you to access larger orders while Faire handles compliance requirements.
        </p>
        <div>
          <p className="font-medium text-[#333333] mb-2">Key Terms:</p>
          <ul className="ml-5 list-disc">
            <li>Maintain active Certificate of Insurance listing Faire as additional insured</li>
            <li>Provide accurate product information and pricing</li>
            <li>Meet enterprise retailer fulfillment standards</li>
            <li>Standard commission rates apply (no additional fees)</li>
          </ul>
        </div>
      </div>

      {/* Checkbox */}
      <label className="flex items-start gap-3 cursor-pointer mb-4">
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)}
            className="sr-only"
          />
          <div className={`h-5 w-5 rounded flex items-center justify-center ${isChecked ? 'bg-[#333333]' : 'border-2 border-[#333333]'}`}>
            {isChecked && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2">
                <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          </div>
        </div>
        <span className="text-sm text-[#333333]">
          By checking this box and placing this order, I agree to the{' '}
          <button className="underline hover:text-[#666666]">Faire+ Terms & Conditions</button>.
        </span>
      </label>

      {/* Accept Button */}
      <button
        onClick={handleAccept}
        disabled={!isChecked}
        className={`w-full rounded-lg py-3 text-sm font-medium transition-colors ${
          isChecked
            ? 'bg-[#333333] text-white hover:bg-[#444444]'
            : 'bg-[#e5e5e5] text-[#999999] cursor-not-allowed'
        }`}
      >
        Accept
      </button>

      {showInlineLinks && (
        <p className="text-xs text-[#666666] mt-4 text-center">
          Have questions?{' '}
          <button onClick={onFaqClick} className="underline hover:text-[#333333]">View FAQs</button>
        </p>
      )}
    </div>
  );

  // ===== FAQ PANEL (for variant 1) =====
  const FaqPanel = () => (
    <div className="w-[300px] flex-shrink-0 bg-[#f7f7f7] p-6 flex flex-col overflow-y-auto max-h-[80vh]">
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

      {/* Footer - Contact Support */}
      <div className="mt-auto pt-6 border-t border-[#e5e5e5]">
        <p className="text-sm text-[#333333]">
          Need help?{' '}
          <button className="underline hover:text-[#666666]">
            Contact support
          </button>
        </p>
      </div>
    </div>
  );

  // ===== COLLAPSIBLE FAQ PANEL (for variant 2) =====
  const CollapsibleFaqPanel = () => (
    <div className="bg-[#f7f7f7]">
      {/* Collapsible Header */}
      <button
        onClick={() => setFaqSectionExpanded(!faqSectionExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between text-left"
      >
        <h3 className="text-base font-semibold text-[#333333]">
          Frequently Asked Questions
        </h3>
        <svg 
          width="16" 
          height="16" 
          viewBox="0 0 12 12" 
          fill="none" 
          stroke="#333333" 
          strokeWidth="1.5"
          className={`flex-shrink-0 transition-transform ${faqSectionExpanded ? 'rotate-180' : ''}`}
        >
          <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      
      {/* Expanded Content */}
      {faqSectionExpanded && (
        <div className="px-6 pb-6">
          <div className="space-y-0">
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

          {/* Footer - Contact Support */}
          <div className="mt-4 pt-6 border-t border-[#e5e5e5]">
            <p className="text-sm text-[#333333]">
              Need help?{' '}
              <button className="underline hover:text-[#666666]">
                Contact support
              </button>
            </p>
          </div>
        </div>
      )}
    </div>
  );

  // ===== FAQ PAGE (for variant 3 - second page) =====
  const FaqPage = ({ onBack }: { onBack: () => void }) => (
    <div className="bg-white p-6 overflow-y-auto max-h-[80vh]">
      {/* Back button + Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={onBack}
          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[#f5f5f5] transition-colors"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="#333333" strokeWidth="1.5">
            <path d="M10 12L6 8l4-4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h2 className="text-2xl font-semibold text-[#333333]">
          Frequently Asked Questions
        </h2>
      </div>
      
      <div className="space-y-0">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-[#e5e5e5] last:border-b-0">
            <button
              onClick={() => toggleFaq(index)}
              className="flex items-start justify-between w-full text-left py-4"
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
              <p className="text-sm text-[#666666] pb-4">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-6 pt-6 border-t border-[#e5e5e5]">
        <p className="text-sm text-[#333333]">
          Still have questions?{' '}
          <button className="underline hover:text-[#666666]">
            Contact support
          </button>
        </p>
      </div>
    </div>
  );

  // ===== VARIANT 1: FAQs on right panel (2-column) =====
  if (variant === 1) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="relative w-full max-w-[720px] flex rounded-2xl shadow-xl overflow-hidden">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full hover:bg-black/10 z-10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <TermsContent />
          <FaqPanel />
        </div>
      </div>
    );
  }

  // ===== VARIANT 2: FAQs on bottom (stacked) =====
  if (variant === 2) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="relative w-full max-w-[540px] flex flex-col rounded-2xl shadow-xl overflow-hidden max-h-[90vh]">
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full hover:bg-black/10 z-10"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          <div className="overflow-y-auto">
            <TermsContent />
            <CollapsibleFaqPanel />
          </div>
        </div>
      </div>
    );
  }

  // ===== VARIANT 3: FAQs as second page =====
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-[720px] rounded-2xl shadow-xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full hover:bg-black/10 z-10"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {showFaqPage ? (
          <FaqPage onBack={() => setShowFaqPage(false)} />
        ) : (
          <TermsContent showInlineLinks onFaqClick={() => setShowFaqPage(true)} />
        )}
      </div>
    </div>
  );
}
