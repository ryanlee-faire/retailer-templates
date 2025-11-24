import React from 'react';

export type TaskStatus = 'not-started' | 'complete' | 'pending-review';

interface TaskCardProps {
  title: string;
  description: string;
  status: TaskStatus;
  onClick: () => void;
}

export function TaskCard({ title, description, status, onClick }: TaskCardProps) {
  const getStatusIcon = () => {
    if (status === 'complete') {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#10B981"/>
          <path d="M6 10l2.5 2.5L14 7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    }
    if (status === 'pending-review') {
      return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <circle cx="10" cy="10" r="10" fill="#F59E0B"/>
          <path d="M10 6v4M10 13v1" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      );
    }
    return null;
  };

  const getStatusText = () => {
    if (status === 'complete') return 'Complete';
    if (status === 'pending-review') return 'Pending review';
    return '';
  };

  return (
    <button
      onClick={onClick}
      className="flex-1 rounded-lg border border-[var(--color-border-subdued)] bg-white p-6 text-left transition-all hover:border-[#333333] hover:shadow-md"
    >
      <div className="mb-4 flex items-start justify-between">
        <div className="flex-1">
          <h3 className="type-paragraph-medium mb-1 text-[var(--color-text-primary)]">
            {title}
          </h3>
          <p className="type-paragraph text-[var(--color-text-subdued)]">
            {description}
          </p>
        </div>
        {status !== 'not-started' && (
          <div className="ml-4 flex-shrink-0">
            {getStatusIcon()}
          </div>
        )}
      </div>
      
      {status !== 'not-started' && (
        <div className="mt-4 flex items-center gap-2">
          <span className={`type-label ${
            status === 'complete' ? 'text-[#10B981]' : 'text-[#F59E0B]'
          }`}>
            {getStatusText()}
          </span>
        </div>
      )}
      
      {status === 'not-started' && (
        <div className="mt-4 flex items-center gap-2 type-paragraph-medium text-[var(--color-text-primary)]">
          Start task
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      )}
    </button>
  );
}

