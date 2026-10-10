import React from 'react';
import { FileQuestion, Bookmark, Search, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function EmptyState({
  type = 'general',
  title,
  description,
  actionText,
  actionLink,
  onAction
}) {
  const defaults = {
    content: {
      icon: <Layers size={48} color="var(--accent-primary)" />,
      title: 'No study material found.',
      desc: 'No topics are available for the selected criteria. Check back later or clear your filters.'
    },
    bookmarks: {
      icon: <Bookmark size={48} color="var(--accent-warning)" />,
      title: "You haven't bookmarked anything yet.",
      desc: 'Bookmark important topics during your preparation to quickly revisit them here before interviews.'
    },
    search: {
      icon: <Search size={48} color="var(--accent-secondary)" />,
      title: 'No matching topics found.',
      desc: 'Try refining your query, checking for typos, or searching for broader keywords like OOP, DBMS, or Java.'
    },
    general: {
      icon: <FileQuestion size={48} color="var(--text-muted)" />,
      title: 'No items available.',
      desc: 'There are no records to display at this time.'
    }
  };

  const current = defaults[type] || defaults.general;
  const finalTitle = title || current.title;
  const finalDesc = description || current.desc;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '3.5rem 1.5rem',
      borderRadius: 'var(--radius-lg)',
      background: 'var(--bg-card)',
      border: '1px dashed var(--border-light)',
      maxWidth: '560px',
      margin: '2rem auto'
    }}>
      <div style={{
        padding: '1.25rem',
        borderRadius: 'var(--radius-full)',
        background: 'var(--bg-tertiary)',
        marginBottom: '1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {current.icon}
      </div>
      <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', fontWeight: 700 }}>
        {finalTitle}
      </h3>
      <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', maxWidth: '420px', marginBottom: '1.5rem' }}>
        {finalDesc}
      </p>
      {actionLink && (
        <Link
          to={actionLink}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '0.6rem 1.4rem',
            background: 'var(--accent-primary)',
            color: '#ffffff',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          {actionText || 'Browse Subjects'}
        </Link>
      )}
      {onAction && !actionLink && (
        <button
          onClick={onAction}
          style={{
            padding: '0.6rem 1.4rem',
            background: 'var(--accent-primary)',
            color: '#ffffff',
            borderRadius: 'var(--radius-md)',
            fontWeight: 600,
            fontSize: '0.875rem'
          }}
        >
          {actionText || 'Retry'}
        </button>
      )}
    </div>
  );
}
