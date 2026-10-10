import React from 'react';
import {
  BarChart3,
  CheckCircle2,
  Bookmark,
  AlertTriangle,
  Brain,
  Code2,
  Database,
  Layers,
  Flame,
  Trophy,
  Star,
  Activity,
  Cloud,
  ShieldCheck,
  LogIn
} from 'lucide-react';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../context/AuthContext';
import ProgressBar from '../components/common/ProgressBar';
import GoogleLoginModal from '../components/auth/GoogleLoginModal';

export default function ProgressPage() {
  const analytics = useProgress();
  const { user, isAuthenticated } = useAuth();
  const [loginModalOpen, setLoginModalOpen] = React.useState(false);

  const metrics = [
    {
      title: 'Topics Completed',
      value: `${analytics.completedTopicsCount} / ${analytics.totalTopics}`,
      sub: `${analytics.remainingTopicsCount} topics remaining`,
      icon: CheckCircle2,
      color: 'var(--accent-success)'
    },
    {
      title: 'Current Streak',
      value: `${analytics.streak.currentStreak} Days`,
      sub: `Longest: ${analytics.streak.longestStreak} days`,
      icon: Flame,
      color: '#f97316'
    },
    {
      title: 'MCQ Accuracy',
      value: `${analytics.practice.mcqAccuracy}%`,
      sub: `${analytics.practice.totalMCQsAttempted} questions attempted`,
      icon: Brain,
      color: 'var(--accent-primary)'
    },
    {
      title: 'Coding Solved',
      value: `${analytics.practice.codingSolvedCount}`,
      sub: `${analytics.practice.codingReviewCount} flagged for review`,
      icon: Code2,
      color: 'var(--accent-secondary)'
    },
    {
      title: 'SQL Solved',
      value: `${analytics.practice.sqlSolvedCount}`,
      sub: `Relational schema drills`,
      icon: Database,
      color: '#3b82f6'
    },
    {
      title: 'Flashcards Reviewed',
      value: `${analytics.practice.flashcardsReviewedCount}`,
      sub: `Concept cards mastered`,
      icon: Layers,
      color: 'var(--accent-warning)'
    },
    {
      title: 'Bookmarked Topics',
      value: `${analytics.bookmarksCount}`,
      sub: `Pinned for rapid review`,
      icon: Bookmark,
      color: 'var(--accent-warning)'
    },
    {
      title: 'Needs Revision',
      value: `${analytics.difficultCount}`,
      sub: `Marked as difficult`,
      icon: AlertTriangle,
      color: 'var(--accent-danger)'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Preparation Analytics & Progress</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Comprehensive telemetry of your study pace, conceptual mastery, and practice consistency
        </p>

        {/* Account Sync Banner */}
        <div style={{
          marginTop: '1rem',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          background: isAuthenticated ? 'rgba(16, 185, 129, 0.1)' : 'var(--bg-secondary)',
          border: `1px solid ${isAuthenticated ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-color)'}`,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {isAuthenticated ? (
              <ShieldCheck size={20} color="var(--accent-success)" />
            ) : (
              <Cloud size={20} color="var(--accent-primary)" />
            )}
            <div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {isAuthenticated ? `Cloud Connected: ${user?.email}` : 'Guest Mode (Local Browser Storage)'}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                {isAuthenticated
                  ? 'Your study progress, bookmarks, and quiz attempts are backed up to MongoDB Atlas.'
                  : 'Sign in with Google to sync your study telemetry and bookmarks across all your devices.'}
              </div>
            </div>
          </div>

          {!isAuthenticated && (
            <button
              onClick={() => setLoginModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.45rem 0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.8rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <LogIn size={14} />
              <span>Sign In with Google</span>
            </button>
          )}
        </div>

        <GoogleLoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
      </div>

      {/* Hero Overview Card */}
      <div
        className="glass-panel"
        style={{
          padding: '2.25rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(16, 185, 129, 0.08) 100%)',
          border: '1px solid var(--border-glow)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              OVERALL READINESS INDEX
            </span>
            <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--text-primary)', lineHeight: 1.1, marginTop: '0.25rem' }}>
              {analytics.overallPercentage}%
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
              Interview Preparedness Status
            </span>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: analytics.overallPercentage > 60 ? 'var(--accent-success)' : 'var(--accent-warning)' }}>
              {analytics.overallPercentage > 75 ? '🔥 Interview Ready' : (analytics.overallPercentage > 40 ? '⚡ Solid Progress' : '🚀 Starting Up')}
            </div>
          </div>
        </div>

        <ProgressBar progress={analytics.overallPercentage} height={14} color="var(--accent-primary)" />
      </div>

      {/* Metrics Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.25rem'
      }}>
        {metrics.map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
                  {m.title}
                </span>
                <div style={{
                  padding: '0.5rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  color: m.color
                }}>
                  <Icon size={18} />
                </div>
              </div>
              <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {m.value}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                {m.sub}
              </div>
            </div>
          );
        })}
      </div>

      {/* Subject-Wise Progress Breakdown */}
      <div className="glass-panel" style={{ padding: '2rem' }}>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1.5rem' }}>
          Subject-Wise Completion Breakdown
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {analytics.subjectProgress.map((subj) => (
            <div key={subj.slug}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {subj.name}
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>
                  {subj.completed} / {subj.total} Topics ({subj.percent}%)
                </span>
              </div>
              <ProgressBar progress={subj.percent} height={8} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
