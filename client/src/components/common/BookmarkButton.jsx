import React from 'react';
import { Bookmark } from 'lucide-react';

export default function BookmarkButton({ isBookmarked, onToggle, showText = false, size = 18 }) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onToggle();
      }}
      aria-label={isBookmarked ? 'Remove bookmark' : 'Bookmark topic'}
      title={isBookmarked ? 'Remove bookmark' : 'Bookmark topic'}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        padding: showText ? '0.4rem 0.8rem' : '0.45rem',
        borderRadius: 'var(--radius-md)',
        background: isBookmarked ? 'var(--accent-warning-light)' : 'rgba(255, 255, 255, 0.05)',
        color: isBookmarked ? 'var(--accent-warning)' : 'var(--text-secondary)',
        border: `1px solid ${isBookmarked ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-color)'}`,
        transition: 'all var(--transition-fast)',
        fontSize: '0.85rem',
        fontWeight: 500
      }}
    >
      <Bookmark
        size={size}
        fill={isBookmarked ? 'currentColor' : 'none'}
        strokeWidth={2}
      />
      {showText && (isBookmarked ? 'Bookmarked' : 'Bookmark')}
    </button>
  );
}
