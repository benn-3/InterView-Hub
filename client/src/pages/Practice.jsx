import React from 'react';
import { Link } from 'react-router-dom';
import {
  Brain,
  Code2,
  Database,
  Layers,
  MessageSquareCode,
  ArrowRight,
  CheckCircle2,
  Award,
  HelpCircle
} from 'lucide-react';
import { interviewQuestionsData } from '../data/interviewQuestions';
import { mcqsData } from '../data/mcqs';
import { codingProblemsData } from '../data/codingProblems';
import { sqlProblemsData } from '../data/sqlProblems';
import { flashcardsData } from '../data/flashcards';
import { useProgress } from '../hooks/useProgress';
import ProgressBar from '../components/common/ProgressBar';

export default function PracticeHub() {
  const progress = useProgress();

  const practiceSections = [
    {
      title: 'Technical Interview Q&A Library',
      desc: 'Master real MNC interview questions with detailed model answers, rubric points, and conceptual deep-dives.',
      icon: HelpCircle,
      color: '#6366f1',
      link: '/questions',
      stats: [
        { label: 'Available', value: interviewQuestionsData.length },
        { label: 'Domains', value: '15 Subjects' },
        { label: 'Model Answers', value: 'Full Rubric' }
      ],
      progressPercent: 100
    },
    {
      title: 'Multiple Choice Questions (MCQs)',
      desc: 'Test your conceptual fundamentals across all interview subjects with instant answers and explanations.',
      icon: Brain,
      color: 'var(--accent-primary)',
      link: '/practice/mcqs',
      stats: [
        { label: 'Available', value: mcqsData.length },
        { label: 'Attempted', value: progress.practice.totalMCQsAttempted },
        { label: 'Accuracy', value: `${progress.practice.mcqAccuracy}%` }
      ],
      progressPercent: mcqsData.length > 0 ? (progress.practice.totalMCQsAttempted / mcqsData.length) * 100 : 0
    },
    {
      title: 'Coding Practice Problems',
      desc: 'Classic Data Structure & Algorithm interview questions with Java implementations and complexity notes.',
      icon: Code2,
      color: 'var(--accent-secondary)',
      link: '/coding',
      stats: [
        { label: 'Available', value: codingProblemsData.length },
        { label: 'Solved', value: progress.practice.codingSolvedCount },
        { label: 'In Review', value: progress.practice.codingReviewCount }
      ],
      progressPercent: codingProblemsData.length > 0 ? (progress.practice.codingSolvedCount / codingProblemsData.length) * 100 : 0
    },
    {
      title: 'SQL Query Playground',
      desc: 'Real schema-based query questions with expected queries, scratchpads and explanations.',
      icon: Database,
      color: '#3b82f6',
      link: '/sql',
      stats: [
        { label: 'Available', value: sqlProblemsData.length },
        { label: 'Solved', value: progress.practice.sqlSolvedCount }
      ],
      progressPercent: sqlProblemsData.length > 0 ? (progress.practice.sqlSolvedCount / sqlProblemsData.length) * 100 : 0
    },
    {
      title: 'Interview Flashcards',
      desc: 'Active recall cards with reveal answers to cement definitions and key architectural concepts.',
      icon: Layers,
      color: 'var(--accent-warning)',
      link: '/flashcards',
      stats: [
        { label: 'Available', value: flashcardsData.length },
        { label: 'Reviewed', value: progress.practice.flashcardsReviewedCount }
      ],
      progressPercent: flashcardsData.length > 0 ? (progress.practice.flashcardsReviewedCount / flashcardsData.length) * 100 : 0
    },
    {
      title: 'Mock Interview Simulator',
      desc: 'Simulated 1-on-1 interview questions with technical rubric self-assessments.',
      icon: MessageSquareCode,
      color: 'var(--accent-important)',
      link: '/mock-interview',
      stats: [
        { label: 'Completed', value: progress.practice.mockSessionsCount }
      ],
      progressPercent: Math.min(100, progress.practice.mockSessionsCount * 25)
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Practice Hub</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Interactive self-assessment tools, coding problems, SQL drills and interview flashcards
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
        gap: '1.5rem'
      }}>
        {practiceSections.map((sec, idx) => {
          const Icon = sec.icon;
          return (
            <div
              key={idx}
              className="glass-panel"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                  <div style={{
                    padding: '0.65rem',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    color: sec.color
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>
                    {sec.title}
                  </h3>
                </div>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {sec.desc}
                </p>

                {/* Stats row */}
                <div style={{
                  display: 'flex',
                  gap: '1.25rem',
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  marginBottom: '1.25rem'
                }}>
                  {sec.stats.map((st, i) => (
                    <div key={i}>
                      <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>{st.label}</div>
                      <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>{st.value}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: '1.25rem' }}>
                  <ProgressBar progress={sec.progressPercent} color={sec.color} />
                </div>
              </div>

              <Link
                to={sec.link}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.45rem',
                  padding: '0.65rem 1.25rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  color: 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  border: '1px solid var(--border-color)',
                  transition: 'all var(--transition-fast)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = sec.color;
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'var(--bg-tertiary)';
                  e.currentTarget.style.color = 'var(--text-primary)';
                }}
              >
                <span>Start Practice</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
