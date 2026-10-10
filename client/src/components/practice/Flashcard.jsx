import React, { useState } from 'react';
import { RotateCw, CheckCircle2, RefreshCw, Sparkles } from 'lucide-react';

export default function Flashcard({
  card,
  isKnown,
  needsRevision,
  onStatusChange
}) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      style={{
        perspective: '1000px',
        marginBottom: '1.5rem'
      }}
    >
      <div
        className="glass-panel"
        style={{
          minHeight: '260px',
          padding: '2rem',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          cursor: 'pointer',
          borderLeft: isKnown ? '4px solid var(--accent-success)' : (needsRevision ? '4px solid var(--accent-warning)' : undefined),
          transition: 'transform 0.2s ease, box-shadow 0.2s ease'
        }}
        onClick={() => setFlipped(!flipped)}
      >
        {/* Top category & flip indicator */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--accent-primary-light)',
              color: 'var(--accent-primary)'
            }}>
              {card.subject}
            </span>
            {card.category && (
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                {card.category}
              </span>
            )}
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '0.75rem',
            color: 'var(--text-muted)'
          }}>
            <RotateCw size={14} />
            <span>{flipped ? 'Showing Answer (Click to Flip)' : 'Click to Reveal Answer'}</span>
          </div>
        </div>

        {/* Card Content (Front / Back) */}
        <div style={{ padding: '1.5rem 0', textAlign: 'center' }}>
          {!flipped ? (
            <div>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--accent-secondary)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                Question
              </span>
              <h3 style={{
                fontSize: '1.35rem',
                fontWeight: 700,
                color: 'var(--text-primary)',
                lineHeight: 1.4
              }}>
                {card.front}
              </h3>
            </div>
          ) : (
            <div style={{ textAlign: 'left' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                color: 'var(--accent-success)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem'
              }}>
                Answer
              </span>
              <pre style={{
                fontSize: '1rem',
                fontFamily: 'var(--font-sans)',
                color: 'var(--text-primary)',
                whiteSpace: 'pre-wrap',
                lineHeight: 1.6,
                margin: 0
              }}>
                {card.back}
              </pre>
            </div>
          )}
        </div>

        {/* Buttons: Know / Need Revision */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '0.75rem',
            paddingTop: '1rem',
            borderTop: '1px solid var(--border-color)'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => onStatusChange(card.id, 'revision')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.95rem',
              borderRadius: 'var(--radius-md)',
              background: needsRevision ? 'var(--accent-warning-light)' : 'var(--bg-tertiary)',
              color: needsRevision ? 'var(--accent-warning)' : 'var(--text-secondary)',
              border: `1px solid ${needsRevision ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-color)'}`,
              fontSize: '0.825rem',
              fontWeight: 600
            }}
          >
            <RefreshCw size={14} />
            <span>Need Revision</span>
          </button>

          <button
            onClick={() => onStatusChange(card.id, 'known')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: isKnown ? 'var(--accent-success-light)' : 'var(--bg-tertiary)',
              color: isKnown ? 'var(--accent-success)' : 'var(--text-secondary)',
              border: `1px solid ${isKnown ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-color)'}`,
              fontSize: '0.825rem',
              fontWeight: 600
            }}
          >
            <CheckCircle2 size={14} />
            <span>I Know This</span>
          </button>
        </div>
      </div>
    </div>
  );
}
