import React, { useState } from 'react';
import { ArrowLeft, MessageSquareCode, Award, RotateCcw, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { interviewQuestionsData } from '../data/interviewQuestions';
import { saveMockResult } from '../utils/storage';
import { useProgress } from '../hooks/useProgress';
import MockInterviewCard from '../components/practice/MockInterviewCard';

export default function MockInterview() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [scores, setScores] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const progress = useProgress();

  const filteredQuestions = categoryFilter === 'all'
    ? interviewQuestionsData
    : interviewQuestionsData.filter(q => q.subject.toLowerCase() === categoryFilter.toLowerCase());

  const handleNext = (score) => {
    const updatedScores = [...scores, score];
    setScores(updatedScores);

    if (currentIdx + 1 < filteredQuestions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsCompleted(true);
      const sessionId = `session_${Date.now()}`;
      saveMockResult(sessionId, updatedScores);
      progress.refresh();
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setScores([]);
    setIsCompleted(false);
  };

  const averageScore = scores.length > 0 
    ? (scores.reduce((a, b) => a + b, 0) / scores.length).toFixed(1)
    : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <Link to="/practice" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          <ArrowLeft size={16} /> Back to Practice Hub
        </Link>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Mock Technical Interview Simulation</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
              Practice delivering precise technical explanations under interview conditions with self-rubrics
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <select
              value={categoryFilter}
              onChange={(e) => {
                setCategoryFilter(e.target.value);
                handleRestart();
              }}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem'
              }}
            >
              <option value="all">All Topics (Mixed Round)</option>
              <option value="oop">OOP</option>
              <option value="java">Java</option>
              <option value="dbms">DBMS</option>
              <option value="sql">SQL</option>
              <option value="devops">DevOps</option>
            </select>
          </div>
        </div>
      </div>

      {!isCompleted ? (
        filteredQuestions.length > 0 ? (
          <MockInterviewCard
            key={filteredQuestions[currentIdx].id}
            question={filteredQuestions[currentIdx]}
            questionNumber={currentIdx + 1}
            totalQuestions={filteredQuestions.length}
            onNextQuestion={handleNext}
          />
        ) : (
          <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
            No questions available for this category filter.
          </div>
        )
      ) : (
        /* Completed Session Summary */
        <div
          className="glass-panel"
          style={{
            maxWidth: '640px',
            margin: '0 auto',
            padding: '2.5rem',
            textAlign: 'center'
          }}
        >
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--accent-success-light)',
            color: 'var(--accent-success)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem auto'
          }}>
            <Award size={36} />
          </div>

          <h2 style={{ fontSize: '1.75rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Mock Interview Completed!
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
            Great effort! Here is your self-evaluation summary for this round:
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '2rem',
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            marginBottom: '2rem'
          }}>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Questions Answered</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800 }}>{filteredQuestions.length}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Average Self Score</div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--accent-primary)' }}>{averageScore} / 10</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button
              onClick={handleRestart}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.4rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.9rem'
              }}
            >
              <RotateCcw size={16} />
              <span>Start Another Round</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
