import React, { useState } from 'react';
import { ArrowLeft, Database, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { sqlProblemsData } from '../data/sqlProblems';
import { getSQLProgress, setSQLSolved } from '../utils/storage';
import { useProgress } from '../hooks/useProgress';
import SQLPracticeCard from '../components/practice/SQLPracticeCard';

export default function SQLPractice() {
  const progress = useProgress();
  const sqlProgress = getSQLProgress();

  const handleMarkSolved = (problemId, query) => {
    setSQLSolved(problemId, query);
    progress.refresh();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Link to="/practice" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> Back to Practice Hub
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>SQL Practice Playground</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Master high-frequency SQL interview queries, aggregations, window functions and joins
            </p>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Problems</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{sqlProblemsData.length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-success)' }}>Solved</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-success)' }}>{sqlProgress.solved.length}</div>
            </div>
          </div>
        </div>
      </div>

      <div>
        {sqlProblemsData.map(problem => (
          <SQLPracticeCard
            key={problem.id}
            problem={problem}
            isSolved={sqlProgress.solved.includes(problem.id)}
            savedQuery={sqlProgress.savedQueries ? sqlProgress.savedQueries[problem.id] : ''}
            onMarkSolved={handleMarkSolved}
          />
        ))}
      </div>
    </div>
  );
}
