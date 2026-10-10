import React, { useState } from 'react';
import { CheckCircle2, XCircle, HelpCircle, Tag, RotateCcw } from 'lucide-react';
import DifficultyBadge from '../common/DifficultyBadge';

export default function MCQCard({ question, savedAttempt, onAttempt }) {
  const [selectedIdx, setSelectedIdx] = useState(
    savedAttempt ? savedAttempt.selected : null
  );

  const hasAnswered = selectedIdx !== null;
  const isCorrect = selectedIdx === question.answer;

  const handleSelect = (idx) => {
    if (hasAnswered) return;
    setSelectedIdx(idx);
    const correct = idx === question.answer;
    if (onAttempt) {
      onAttempt(question.id, idx, correct);
    }
  };

  const handleRetry = () => {
    setSelectedIdx(null);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.5rem',
        marginBottom: '1.5rem',
        transition: 'border-color var(--transition-fast)'
      }}
    >
      {/* Subject, Difficulty & Question Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--accent-primary-light)',
            color: 'var(--accent-primary)'
          }}>
            {question.subject}
          </span>
          <DifficultyBadge difficulty={question.difficulty} />
        </div>

        {hasAnswered && (
          <button
            onClick={handleRetry}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              fontSize: '0.75rem',
              color: 'var(--text-muted)'
            }}
            title="Reset this question"
          >
            <RotateCcw size={13} />
            <span>Retry</span>
          </button>
        )}
      </div>

      {/* Question Text */}
      <h3 style={{
        fontSize: '1.125rem',
        fontWeight: 600,
        color: 'var(--text-primary)',
        lineHeight: 1.5,
        marginBottom: '1.25rem'
      }}>
        {question.question}
      </h3>

      {/* Options */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '1.25rem' }}>
        {question.options.map((option, idx) => {
          let btnBg = 'var(--bg-tertiary)';
          let btnBorder = 'var(--border-color)';
          let icon = null;

          if (hasAnswered) {
            if (idx === question.answer) {
              btnBg = 'var(--accent-success-light)';
              btnBorder = 'rgba(16, 185, 129, 0.5)';
              icon = <CheckCircle2 size={18} color="var(--accent-success)" />;
            } else if (idx === selectedIdx) {
              btnBg = 'var(--accent-danger-light)';
              btnBorder = 'rgba(239, 68, 68, 0.5)';
              icon = <XCircle size={18} color="var(--accent-danger)" />;
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={hasAnswered}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.85rem 1.1rem',
                borderRadius: 'var(--radius-md)',
                background: btnBg,
                border: `1px solid ${btnBorder}`,
                color: 'var(--text-primary)',
                fontSize: '0.925rem',
                textAlign: 'left',
                lineHeight: 1.4,
                cursor: hasAnswered ? 'default' : 'pointer',
                transition: 'all var(--transition-fast)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <span style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  color: 'var(--text-secondary)'
                }}>
                  {String.fromCharCode(65 + idx)}
                </span>
                <span>{option}</span>
              </div>
              {icon}
            </button>
          );
        })}
      </div>

      {/* Answer & Explanation Box */}
      {hasAnswered && (
        <div style={{
          padding: '1.15rem',
          borderRadius: 'var(--radius-md)',
          background: isCorrect ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
          borderLeft: `4px solid ${isCorrect ? 'var(--accent-success)' : 'var(--accent-danger)'}`,
          marginTop: '1rem'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.4rem',
            fontWeight: 700,
            fontSize: '0.925rem',
            color: isCorrect ? 'var(--accent-success)' : 'var(--accent-danger)'
          }}>
            {isCorrect ? <CheckCircle2 size={18} /> : <XCircle size={18} />}
            <span>{isCorrect ? 'Correct Answer!' : 'Incorrect'}</span>
          </div>
          <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text-primary)' }}>Explanation: </strong>
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
