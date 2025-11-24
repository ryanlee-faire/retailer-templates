import React, { useState } from 'react';

interface COIUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (fileName: string) => void;
}

export function COIUploadModal({ isOpen, onClose, onUpload }: COIUploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      onUpload(selectedFile.name);
      setSelectedFile(null);
    }
  };

  const handleClose = () => {
    setSelectedFile(null);
    setOpenFaq(null);
    onClose();
  };

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
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

        {/* ===== LEFT PANEL: Upload ===== */}
        <div className="flex-1 bg-white flex flex-col overflow-y-auto max-h-[80vh]">
          {/* Header */}
          <div className="px-6 pt-6 pb-4">
            <h2 className="text-lg font-medium text-[#333333] pr-8">
              Upload your Certificate of Insurance
            </h2>
          </div>

          {/* Content */}
          <div className="px-6 flex-1">
            {/* File Upload Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative mb-6 rounded-lg border border-dashed h-[200px] flex flex-col items-center justify-center transition-colors ${
                isDragging
                  ? 'border-[#333333] bg-[#f7f7f7]'
                  : 'border-[#757575] bg-[#fbfbfb]'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {!selectedFile ? (
                <>
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#e5e5e5]">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1.5">
                      <path d="M12 16V4M12 4l-5 5M12 4l5 5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M3 17v3a1 1 0 001 1h16a1 1 0 001-1v-3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-sm text-[#333333]">
                      Drop your file here or{' '}
                      <span className="underline">
                        click to browse
                      </span>
                    </span>
                  </label>
                </>
              ) : (
                <div className="flex items-center justify-between rounded-lg border border-[#dfe0e1] bg-white p-3 mx-4 w-[calc(100%-32px)]">
                  <div className="flex items-center gap-3">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1.5">
                      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M14 2v6h6" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm text-[#333333]">
                      {selectedFile.name}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedFile(null);
                    }}
                    className="flex h-6 w-6 items-center justify-center rounded-full hover:bg-[#e5e5e5]"
                  >
                    <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="#333333" strokeWidth="1.5">
                      <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
              )}
            </div>

            {/* Info Banner with Requirements */}
            <div className="rounded-lg bg-[#f7f7f7] p-4 mb-6">
              <p className="text-sm text-[#333333] mb-2">
                Enterprise retailers require basic insurance documentation before ordering. Uploading your COI ensures you're eligible for high-value orders.
              </p>
              
              <p className="text-sm font-medium text-[#333333] mt-4 mb-2">
                COI Requirements:
              </p>
              <ul className="text-sm ml-5 list-disc text-[#666666]">
                <li>Minimum $2M aggregate general liability coverage</li>
                <li>Policy must be active and unexpired</li>
                <li>Must list 'Faire Wholesale, Inc.' as additional insured</li>
                <li>Accepted formats: PDF, JPG, PNG (≤ 25 MB)</li>
              </ul>
              
              <p className="text-xs text-[#333333] mt-4">
                <button className="underline">Learn more</button>
                {' '}about Certificate of Insurance or{' '}
                <button className="underline">contact support</button>
                {' '}for additional help.
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-[#fbfbfb] px-6 py-4 flex justify-end rounded-bl-lg">
            <button
              onClick={handleUpload}
              disabled={!selectedFile}
              className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedFile
                  ? 'bg-[#333333] text-white hover:bg-[#444444]'
                  : 'bg-[#e5e5e5] text-[#999999] cursor-not-allowed'
              }`}
            >
              Continue
            </button>
          </div>
        </div>

        {/* ===== RIGHT PANEL: FAQs ===== */}
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
                  <span className="text-sm font-medium text-[#333333] pr-2">{faq.question}</span>
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
      </div>
    </div>
  );
}
