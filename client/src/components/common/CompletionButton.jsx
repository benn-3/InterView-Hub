import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';

export default function CompletionButton({ isCompleted, onToggle, showText = true, size = 18 }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
      title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.45rem',
        padding: showText ? '0.45rem 0.9rem' : '0.45rem',
        borderRadius: 'var(--radius-md)',
        background: isCompleted ? 'var(--accent-success-light)' : 'rgba(255, 255, 255, 0.05)',
        color: isCompleted ? 'var(--accent-success)' : 'var(--text-secondary)',
        border: `1px solid ${isCompleted ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-color)'}`,
        transition: 'all var(--transition-fast)',
        fontSize: '0.85rem',
        fontWeight: 600
      }}
    >
      {isCompleted ? (
        <CheckCircle2 size={size} fill="currentColor" stroke="var(--bg-card)" strokeWidth={2} />
      ) : (
        <Circle size={size} strokeWidth={2} />
      )}
      {showText && (isCompleted ? 'Completed' : 'Mark Complete')}
    </button>
  );
}
