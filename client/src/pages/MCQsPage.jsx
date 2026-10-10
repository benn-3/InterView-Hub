import React, { useState, useMemo } from 'react';
import { ArrowLeft, Filter, Award, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import { Link } from 'react-router-dom';
import { mcqsData } from '../data/mcqs';
import { getMCQProgress, saveMCQAttempt } from '../utils/storage';
import { quizApi } from '../services/api';
import { useProgress } from '../hooks/useProgress';
import MCQCard from '../components/practice/MCQCard';
import ProgressBar from '../components/common/ProgressBar';

export default function MCQsPage() {
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const progress = useProgress();
  const mcqProgress = getMCQProgress();

  const subjects = useMemo(() => {
    return Array.from(new Set(mcqsData.map(m => m.subject)));
  }, []);

  const filteredMCQs = useMemo(() => {
    return mcqsData.filter(m => {
      if (selectedSubject !== 'all' && m.subject !== selectedSubject) return false;
      if (selectedDifficulty !== 'all' && m.difficulty !== selectedDifficulty) return false;
      return true;
    });
  }, [selectedSubject, selectedDifficulty]);

  const handleAttempt = (questionId, selectedIdx, isCorrect) => {
    saveMCQAttempt(questionId, selectedIdx, isCorrect);
    quizApi.saveAttempt({
      quizId: `mcq_${questionId}`,
      subject: selectedSubject !== 'all' ? selectedSubject : 'MCQs',
      totalQuestions: 1,
      correctAnswers: isCorrect ? 1 : 0,
      scorePercentage: isCorrect ? 100 : 0,
      answers: [{ questionId, selectedOption: selectedIdx, isCorrect }]
    }).catch(() => {});
    progress.refresh();
  };

  const attemptedCount = Object.keys(mcqProgress.attempted || {}).length;
  const accuracy = attemptedCount > 0 
    ? Math.round(((mcqProgress.correctCount || 0) / attemptedCount) * 100) 
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Link to="/practice" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> Back to Practice Hub
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Interview MCQs Practice</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Sharpen your core knowledge with real MNC and service-company multiple choice questions
            </p>
          </div>

          {/* Real-time score indicator */}
          <div style={{
            display: 'flex',
            gap: '1rem',
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)'
          }}>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Attempted</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800 }}>{attemptedCount} / {mcqsData.length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-success)' }}>Correct</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-success)' }}>{mcqProgress.correctCount || 0}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-danger)' }}>Incorrect</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-danger)' }}>{mcqProgress.incorrectCount || 0}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)' }}>Accuracy</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent-secondary)' }}>{accuracy}%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter bar */}
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

      {/* Questions list */}
      <div>
        {filteredMCQs.map(q => (
          <MCQCard
            key={q.id}
            question={q}
            savedAttempt={mcqProgress.attempted ? mcqProgress.attempted[q.id] : null}
            onAttempt={handleAttempt}
          />
        ))}
      </div>
    </div>
  );
}
