import React, { useState } from 'react';
import {
  Code,
  CheckCircle2,
  Bookmark,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  FileEdit,
  Save
} from 'lucide-react';
import DifficultyBadge from '../common/DifficultyBadge';
import CodeBlock from '../markdown/CodeBlock';

export default function CodingProblemCard({
  problem,
  isSolved,
  isForReview,
  savedNote,
  onStatusChange,
  onSaveNote
}) {
  const [showSolution, setShowSolution] = useState(false);
  const [showNoteEditor, setShowNoteEditor] = useState(false);
  const [noteText, setNoteText] = useState(savedNote || '');

  const handleSaveNote = () => {
    if (onSaveNote) {
      onSaveNote(problem.id, noteText);
    }
    setShowNoteEditor(false);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '1.75rem',
        marginBottom: '2rem',
        borderLeft: isSolved ? '4px solid var(--accent-success)' : undefined
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>
            {problem.title}
          </h3>
          <DifficultyBadge difficulty={problem.difficulty} />
          {isSolved && (
            <span className="badge badge-easy" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <CheckCircle2 size={12} /> Solved
            </span>
          )}
          {isForReview && (
            <span className="badge badge-medium">Needs Review</span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={() => onStatusChange(problem.id, isSolved ? 'unsolved' : 'solved')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: isSolved ? 'var(--accent-success-light)' : 'var(--bg-tertiary)',
              color: isSolved ? 'var(--accent-success)' : 'var(--text-secondary)',
              border: `1px solid ${isSolved ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-color)'}`,
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <CheckCircle2 size={15} />
            <span>{isSolved ? 'Solved ✓' : 'Mark Solved'}</span>
          </button>

          <button
            onClick={() => onStatusChange(problem.id, isForReview ? 'unsolved' : 'review')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: isForReview ? 'var(--accent-warning-light)' : 'var(--bg-tertiary)',
              color: isForReview ? 'var(--accent-warning)' : 'var(--text-secondary)',
              border: `1px solid ${isForReview ? 'rgba(245, 158, 11, 0.4)' : 'var(--border-color)'}`,
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <Bookmark size={15} />
            <span>{isForReview ? 'In Review' : 'Mark for Review'}</span>
          </button>

          <button
            onClick={() => setShowNoteEditor(!showNoteEditor)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.45rem 0.85rem',
              borderRadius: 'var(--radius-md)',
              background: noteText ? 'var(--accent-primary-light)' : 'var(--bg-tertiary)',
              color: noteText ? 'var(--accent-primary)' : 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.8rem',
              fontWeight: 600
            }}
          >
            <FileEdit size={15} />
            <span>{noteText ? 'Edit Note' : 'Add Note'}</span>
          </button>
        </div>
      </div>

      {/* Description */}
      <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.25rem' }}>
        {problem.description}
      </p>

      {/* Example & Constraints Box */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '1rem',
        marginBottom: '1.25rem'
      }}>
        <div style={{
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)'
        }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>
            Example
          </h4>
          <pre style={{
            fontSize: '0.825rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap'
          }}>
            {problem.example}
          </pre>
        </div>

        <div style={{
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)'
        }}>
          <h4 style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem', fontWeight: 700 }}>
            Constraints
          </h4>
          <pre style={{
            fontSize: '0.825rem',
            fontFamily: 'var(--font-mono)',
            color: 'var(--text-primary)',
            whiteSpace: 'pre-wrap'
          }}>
            {problem.constraints}
          </pre>
        </div>
      </div>

      {/* Expected Approach */}
      <div style={{
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--accent-primary-light)',
        border: '1px solid rgba(99, 102, 241, 0.2)',
        marginBottom: '1.25rem'
      }}>
        <strong style={{ fontSize: '0.85rem', color: 'var(--accent-primary)', textTransform: 'uppercase', display: 'block', marginBottom: '0.35rem' }}>
          Expected Approach:
        </strong>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', margin: 0 }}>
          {problem.expectedApproach}
        </p>
      </div>

      {/* Personal Note if exists */}
      {savedNote && !showNoteEditor && (
        <div style={{
          padding: '0.85rem 1rem',
          borderRadius: 'var(--radius-md)',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px dashed var(--border-light)',
          marginBottom: '1.25rem',
          fontSize: '0.875rem'
        }}>
          <strong style={{ color: 'var(--accent-warning)', display: 'block', marginBottom: '0.2rem' }}>
            My Note:
          </strong>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{savedNote}</p>
        </div>
      )}

      {/* Note Editor */}
      {showNoteEditor && (
        <div style={{
          padding: '1rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-color)',
          marginBottom: '1.25rem'
        }}>
          <textarea
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Write your personal notes, edge cases, or complexity thoughts..."
            rows={3}
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--bg-primary)',
              border: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '0.875rem',
              resize: 'vertical',
              marginBottom: '0.75rem',
              outline: 'none'
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem' }}>
            <button
              onClick={() => setShowNoteEditor(false)}
              style={{
                padding: '0.4rem 0.8rem',
                borderRadius: 'var(--radius-sm)',
                background: 'transparent',
                color: 'var(--text-secondary)',
                fontSize: '0.8rem'
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleSaveNote}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.3rem',
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-primary)',
                color: '#ffffff',
                fontSize: '0.8rem',
                fontWeight: 600
              }}
            >
              <Save size={14} />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      )}

      {/* Actions: Open in Online Compiler & Show Solution */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <a
          href={problem.compilerUrl || 'https://www.jdoodle.com/online-java-compiler/'}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.55rem 1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            color: 'var(--accent-secondary)',
            border: '1px solid var(--border-color)',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          <ExternalLink size={15} />
          <span>Open in Online Compiler</span>
        </a>

        <button
          onClick={() => setShowSolution(!showSolution)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.55rem 1.15rem',
            borderRadius: 'var(--radius-md)',
            background: showSolution ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
            color: showSolution ? 'var(--text-primary)' : '#ffffff',
            fontSize: '0.85rem',
            fontWeight: 600
          }}
        >
          {showSolution ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          <span>{showSolution ? 'Hide Solution' : 'Show Solution'}</span>
        </button>
      </div>

      {/* Collapsible Solution Code */}
      {showSolution && (
        <div style={{ marginTop: '1.25rem' }}>
          <CodeBlock language="java" value={problem.solution} />
        </div>
      )}
    </div>
  );
}
