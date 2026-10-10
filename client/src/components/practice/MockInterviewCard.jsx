import React, { useState } from 'react';
import {
  MessageSquare,
  Send,
  SkipForward,
  CheckCircle2,
  ListChecks,
  HelpCircle,
  Award
} from 'lucide-react';
import DifficultyBadge from '../common/DifficultyBadge';

export default function MockInterviewCard({
  question,
  questionNumber,
  totalQuestions,
  onNextQuestion
}) {
  const [userAnswer, setUserAnswer] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [checkedPoints, setCheckedPoints] = useState({});
  const [selfScore, setSelfScore] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!userAnswer.trim()) return;
    setIsSubmitted(true);
  };

  const handleSkip = () => {
    setIsSubmitted(true);
  };

  const handleToggleCheck = (index) => {
    const updated = { ...checkedPoints, [index]: !checkedPoints[index] };
    setCheckedPoints(updated);
    
    // Calculate self-score based on checked key points
    const pointsCount = question.keyPoints.length;
    const checkedCount = Object.values(updated).filter(Boolean).length;
    const computedScore = Math.min(10, Math.round((checkedCount / pointsCount) * 10));
    setSelfScore(computedScore);
  };

  const handleProceed = () => {
    setUserAnswer('');
    setIsSubmitted(false);
    setCheckedPoints({});
    setSelfScore(null);
    onNextQuestion(selfScore || 5);
  };

  return (
    <div
      className="glass-panel"
      style={{
        padding: '2rem',
        maxWidth: '820px',
        margin: '0 auto',
        borderTop: '4px solid var(--accent-primary)'
      }}
    >
      {/* Top Question Progress Counter */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)',
            background: 'var(--accent-primary-light)',
            color: 'var(--accent-primary)'
          }}>
            QUESTION {questionNumber} OF {totalQuestions}
          </span>
          <DifficultyBadge difficulty={question.difficulty} />
        </div>
        <span style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          {question.subject} • {question.category}
        </span>
      </div>

      {/* Interviewer Persona Card */}
      <div style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'flex-start',
        padding: '1.25rem',
        borderRadius: 'var(--radius-md)',
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-color)',
        marginBottom: '1.5rem'
      }}>
        <div style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--radius-full)',
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-violet) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          fontWeight: 700,
          flexShrink: 0
        }}>
          👔
        </div>
        <div>
          <span style={{
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '0.08em',
            color: 'var(--accent-secondary)',
            textTransform: 'uppercase'
          }}>
            Technical Interviewer:
          </span>
          <h3 style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginTop: '0.25rem',
            lineHeight: 1.4
          }}>
            "{question.interviewerPrompt}"
          </h3>
        </div>
      </div>

      {/* Answer Formulation Area */}
      {!isSubmitted ? (
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--text-secondary)',
              marginBottom: '0.5rem'
            }}>
              Your Technical Response:
            </label>
            <textarea
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="Type your explanation clearly as you would speak during a live technical round..."
              rows={6}
              style={{
                width: '100%',
                padding: '1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-code)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.95rem',
                lineHeight: 1.6,
                outline: 'none',
                resize: 'vertical'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <button
              type="button"
              onClick={handleSkip}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.6rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                color: 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              <SkipForward size={16} />
              <span>Skip & See Answer</span>
            </button>

            <button
              type="submit"
              disabled={!userAnswer.trim()}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.65rem 1.4rem',
                borderRadius: 'var(--radius-md)',
                background: userAnswer.trim() ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: userAnswer.trim() ? '#ffffff' : 'var(--text-muted)',
                fontSize: '0.9rem',
                fontWeight: 700,
                cursor: userAnswer.trim() ? 'pointer' : 'not-allowed'
              }}
            >
              <Send size={16} />
              <span>Submit Answer</span>
            </button>
          </div>
        </form>
      ) : (
        /* Evaluation & Comparison Section */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* User's Submitted Answer */}
          {userAnswer && (
            <div style={{
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color)'
            }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                Your Answer:
              </span>
              <p style={{ marginTop: '0.35rem', color: 'var(--text-primary)', fontSize: '0.925rem', whiteSpace: 'pre-wrap' }}>
                {userAnswer}
              </p>
            </div>
          )}

          {/* Ideal Answer */}
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent-primary-light)',
            borderLeft: '4px solid var(--accent-primary)'
          }}>
            <h4 style={{ fontSize: '0.9rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Ideal Technical Answer:
            </h4>
            <p style={{ fontSize: '0.95rem', color: 'var(--text-primary)', lineHeight: 1.65, whiteSpace: 'pre-wrap' }}>
              {question.idealAnswer}
            </p>
          </div>

          {/* Self-Evaluation Checklist */}
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <ListChecks size={18} color="var(--accent-secondary)" />
                <h4 style={{ fontSize: '0.9rem', fontWeight: 700, margin: 0 }}>
                  Compare with Key Interview Points:
                </h4>
              </div>
              {selfScore !== null && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-warning)', fontWeight: 700 }}>
                  <Award size={18} />
                  <span>Score: {selfScore}/10</span>
                </div>
              )}
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
              Check off the points you successfully mentioned in your answer for self-assessment:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {question.keyPoints.map((point, idx) => (
                <label
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.65rem',
                    fontSize: '0.875rem',
                    color: checkedPoints[idx] ? 'var(--text-primary)' : 'var(--text-secondary)',
                    cursor: 'pointer'
                  }}
                >
                  <input
                    type="checkbox"
                    checked={!!checkedPoints[idx]}
                    onChange={() => handleToggleCheck(idx)}
                    style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px' }}
                  />
                  <span>{point}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Next Question Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={handleProceed}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.7rem 1.5rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#ffffff',
                fontWeight: 700,
                fontSize: '0.95rem'
              }}
            >
              <span>{questionNumber < totalQuestions ? 'Next Question' : 'Complete Session'}</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
