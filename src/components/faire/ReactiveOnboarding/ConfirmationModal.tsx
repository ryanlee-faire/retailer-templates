import React from 'react';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  type: 'coi-upload' | 'coi-confirmation';
}

export function ConfirmationModal({ isOpen, onClose, fileName, type }: ConfirmationModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-[var(--color-border-subdued)] p-6">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--color-text-primary)]">
              {type === 'coi-upload' ? 'Review your upload' : 'Upload in progress'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="ml-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full hover:bg-[var(--color-grey-200)]"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {type === 'coi-upload' ? (
            <>
              {/* File Preview */}
              <div className="mb-6 flex items-center justify-between rounded-lg border border-[var(--color-border-subdued)] bg-[var(--color-grey-100)] p-4">
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="type-paragraph text-[var(--color-text-primary)]">
                    {fileName}
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-[var(--color-grey-300)]"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M12 4L4 12M4 4l8 8" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>

              {/* Confirmation Message */}
              <div className="rounded-lg bg-[#F5F7FA] p-4">
                <p className="type-paragraph mb-2 text-[var(--color-text-primary)]">
                  Your upload contains 1 file. Submitting your upload will:
                </p>
                <div className="flex items-start gap-2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="flex-shrink-0 mt-0.5">
                    <circle cx="10" cy="10" r="9" stroke="#10B981" strokeWidth="2"/>
                    <path d="M6 10l2.5 2.5L14 7" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <p className="type-paragraph text-[var(--color-text-subdued)]">
                    Send to Faire for review. If changes are needed, Faire will email you directly.
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-lg bg-[#F5F7FA] p-6">
              <p className="type-paragraph-medium mb-2 text-[var(--color-text-primary)]">
                Your upload is in progress.
              </p>
              <p className="type-paragraph text-[var(--color-text-subdued)]">
                We'll let you know once your COI has been reviewed and approved. Any required changes we will let you know.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[var(--color-border-subdued)] p-6">
          <button
            onClick={onClose}
            className="w-full rounded-lg bg-[var(--color-grey-900)] py-3 type-paragraph-medium text-white transition-colors hover:bg-[var(--color-grey-800)]"
          >
            {type === 'coi-upload' ? 'Submit upload' : 'Done'}
          </button>
        </div>
      </div>
    </div>
  );
}

