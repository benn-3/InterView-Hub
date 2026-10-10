import React, { useState } from 'react';
import { Database, Copy, Check, RotateCcw, Eye, CheckCircle2 } from 'lucide-react';
import DifficultyBadge from '../common/DifficultyBadge';
import CodeBlock from '../markdown/CodeBlock';

export default function SQLPracticeCard({
  problem,
  isSolved,
  savedQuery,
  onMarkSolved
}) {
  const [userQuery, setUserQuery] = useState(savedQuery || '');
  const [showExpected, setShowExpected] = useState(false);
  const [copiedQuery, setCopiedQuery] = useState(false);

  const handleCopyExpected = async () => {
    try {
      await navigator.clipboard.writeText(problem.expectedQuery);
      setCopiedQuery(true);
      setTimeout(() => setCopiedQuery(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  const handleReset = () => {
    setUserQuery('');
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
      {/* Title & Badge */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            padding: '0.4rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(59, 130, 246, 0.15)',
            color: '#3b82f6'
          }}>
            <Database size={18} />
          </div>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0 }}>{problem.title}</h3>
          <DifficultyBadge difficulty={problem.difficulty} />
        </div>

        <button
          onClick={() => onMarkSolved(problem.id, userQuery)}
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
          <span>{isSolved ? 'Completed ✓' : 'Mark Solved'}</span>
        </button>
      </div>

      {/* Schema View */}
      <div style={{
        padding: '1rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-code)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.25rem'
      }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>
          Database Schema
        </div>
        <pre style={{
          fontSize: '0.825rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-primary)',
          margin: 0,
          whiteSpace: 'pre-wrap'
        }}>
          {problem.schema}
        </pre>
      </div>

      {/* Question */}
      <div style={{ marginBottom: '1.25rem' }}>
        <strong style={{ fontSize: '0.9rem', color: 'var(--text-primary)' }}>Question:</strong>
        <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
          {problem.question}
        </p>
      </div>

      {/* SQL Editor Textarea */}
      <div style={{
        marginBottom: '1rem',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-color)',
        overflow: 'hidden',
        background: 'var(--bg-code)'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.4rem 0.85rem',
          background: 'rgba(255, 255, 255, 0.03)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          fontSize: '0.75rem',
          fontFamily: 'var(--font-mono)',
          color: 'var(--text-muted)'
        }}>
          <span>SQL Query Editor (Practice Scratchpad)</span>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Client-side practice</span>
        </div>
        <textarea
          value={userQuery}
          onChange={(e) => setUserQuery(e.target.value)}
          placeholder="-- Write your SQL query here...&#10;SELECT * FROM Employee..."
          rows={5}
          style={{
            width: '100%',
            padding: '1rem',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.875rem',
            lineHeight: 1.6,
            resize: 'vertical',
            outline: 'none'
          }}
        />
      </div>

      {/* Button Controls */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.75rem' }}>
        <button
          onClick={handleReset}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.5rem 0.9rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            color: 'var(--text-secondary)',
            border: '1px solid var(--border-color)',
            fontSize: '0.825rem',
            fontWeight: 600
          }}
        >
          <RotateCcw size={14} />
          <span>Reset</span>
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <button
            onClick={handleCopyExpected}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.5rem 0.9rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
              border: '1px solid var(--border-color)',
              fontSize: '0.825rem',
              fontWeight: 600
            }}
          >
            {copiedQuery ? <Check size={14} color="var(--accent-success)" /> : <Copy size={14} />}
            <span>{copiedQuery ? 'Copied ✓' : 'Copy Query'}</span>
          </button>

          <button
            onClick={() => setShowExpected(!showExpected)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              padding: '0.5rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: showExpected ? 'var(--bg-tertiary)' : 'var(--accent-primary)',
              color: showExpected ? 'var(--text-primary)' : '#ffffff',
              fontSize: '0.825rem',
              fontWeight: 600
            }}
          >
            <Eye size={14} />
            <span>{showExpected ? 'Hide Expected' : 'Show Expected Query'}</span>
          </button>
        </div>
      </div>

      {/* Expected Query Display */}
      {showExpected && (
        <div style={{ marginTop: '1.25rem' }}>
          <CodeBlock language="sql" value={problem.expectedQuery} />
          {problem.explanation && (
            <div style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(99, 102, 241, 0.08)',
              borderLeft: '3px solid var(--accent-primary)',
              fontSize: '0.85rem',
              color: 'var(--text-secondary)'
            }}>
              <strong style={{ color: 'var(--text-primary)' }}>Why this works: </strong>
              {problem.explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
