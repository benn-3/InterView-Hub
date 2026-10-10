import React, { useState, useMemo } from 'react';
import { Filter, CheckCircle2, Code2, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { codingProblemsData } from '../data/codingProblems';
import { getCodingProgress, setCodingStatus } from '../utils/storage';
import { useProgress } from '../hooks/useProgress';
import CodingProblemCard from '../components/practice/CodingProblemCard';

export default function CodingPractice() {
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const progress = useProgress();
  const codingProgress = getCodingProgress();

  const subjects = useMemo(() => {
    return Array.from(new Set(codingProblemsData.map(p => p.subject)));
  }, []);

  const filteredProblems = useMemo(() => {
    return codingProblemsData.filter(p => {
      if (selectedDifficulty !== 'all' && p.difficulty !== selectedDifficulty) return false;
      if (selectedSubject !== 'all' && p.subject !== selectedSubject) return false;
      return true;
    });
  }, [selectedDifficulty, selectedSubject]);

  const handleStatusChange = (problemId, status) => {
    setCodingStatus(problemId, status);
    progress.refresh();
  };

  const handleSaveNote = (problemId, note) => {
    setCodingStatus(problemId, null, note);
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
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Coding Interview Practice</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Standard algorithmic and design pattern problems tested in top tier interviews
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
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Total Problems</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{codingProblemsData.length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-success)' }}>Solved</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-success)' }}>{codingProgress.solved.length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-warning)' }}>For Review</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-warning)' }}>{codingProgress.forReview.length}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <Filter size={15} />
          <span>Filters:</span>
        </div>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontSize: '0.85rem'
          }}
        >
          <option value="all">All Subjects</option>
          {subjects.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        <select
          value={selectedDifficulty}
          onChange={(e) => setSelectedDifficulty(e.target.value)}
          style={{
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            color: 'var(--text-primary)',
            fontSize: '0.85rem'
          }}
        >
          <option value="all">All Difficulties</option>
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Problem list */}
      <div>
        {filteredProblems.map(p => (
          <CodingProblemCard
            key={p.id}
            problem={p}
            isSolved={codingProgress.solved.includes(p.id)}
            isForReview={codingProgress.forReview.includes(p.id)}
            savedNote={codingProgress.notes ? codingProgress.notes[p.id] : ''}
            onStatusChange={handleStatusChange}
            onSaveNote={handleSaveNote}
          />
        ))}
      </div>
    </div>
  );
}
