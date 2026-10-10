import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, CheckCircle2, Bookmark, Star, AlertTriangle } from 'lucide-react';
import DifficultyBadge from './DifficultyBadge';
import ImportanceBadge from './ImportanceBadge';
import BookmarkButton from './BookmarkButton';
import CompletionButton from './CompletionButton';
import { getSubjectMeta } from '../../utils/helpers';

export default function TopicCard({
  topic,
  isCompleted = false,
  isBookmarked = false,
  isImportant = false,
  isDifficult = false,
  onToggleComplete,
  onToggleBookmark,
  onToggleImportant,
  onToggleDifficult
}) {
  const meta = getSubjectMeta(topic.subject);

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        transition: 'all var(--transition-fast)'
      }}
    >
      <div>
        {/* Header row: Subject badge + Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              background: meta.bg,
              color: meta.color,
              border: `1px solid ${meta.border}`
            }}
          >
            {topic.subject}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            {onToggleBookmark && (
              <BookmarkButton
                isBookmarked={isBookmarked}
                onToggle={() => onToggleBookmark(topic.id)}
                size={16}
              />
            )}
            {onToggleComplete && (
              <CompletionButton
                isCompleted={isCompleted}
                onToggle={() => onToggleComplete(topic.id)}
                showText={false}
                size={16}
              />
            )}
          </div>
        </div>

        {/* Title */}
        <Link to={`/topic/${topic.id}`} style={{ textDecoration: 'none' }}>
          <h4
            style={{
              fontSize: '1.1rem',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '0.5rem',
              lineHeight: 1.3
            }}
          >
            {topic.title}
          </h4>
        </Link>

        {/* Tags */}
        {topic.tags && topic.tags.length > 0 && (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem' }}>
            {topic.tags.slice(0, 3).map((tag, i) => (
              <span
                key={i}
                style={{
                  fontSize: '0.72rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '4px',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-muted)'
                }}
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Footer row: Badges + View link */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: '0.75rem',
        borderTop: '1px solid var(--border-color)',
        marginTop: '0.5rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <DifficultyBadge difficulty={topic.difficulty} />
          {topic.importance === 'high' && <ImportanceBadge importance="high" />}
        </div>

        <Link
          to={`/topic/${topic.id}`}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.25rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            color: 'var(--accent-primary)'
          }}
        >
          <span>Read</span>
          <ChevronRight size={16} />
        </Link>
      </div>
    </div>
  );
}
