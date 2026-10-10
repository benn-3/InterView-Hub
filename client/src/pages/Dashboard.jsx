import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Flame,
  Trophy,
  CheckCircle2,
  BookOpen,
  Brain,
  Code2,
  Database,
  Layers,
  MessageSquareCode,
  Zap,
  Clock,
  HelpCircle
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { useProgress } from '../hooks/useProgress';
import { progressApi } from '../services/api';
import { getLastStudiedTopic, getRecentTopics, getTodayGoals, getCompletedTopics } from '../utils/storage';
import { getAllSubjects, allMarkdownTopics } from '../contentRegistry';
import SubjectCard from '../components/common/SubjectCard';
import ProgressBar from '../components/common/ProgressBar';

export default function Dashboard() {
  const { user, isAuthenticated } = useAuth();
  const [cloudStats, setCloudStats] = useState(null);
  const progress = useProgress();
  const subjects = useMemo(() => getAllSubjects(), []);
  const lastTopic = getLastStudiedTopic();
  const recentTopics = getRecentTopics();
  const todayGoals = getTodayGoals();
  const completedIds = getCompletedTopics();

  // Dynamic greeting based on current local hour
  const greeting = useMemo(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good morning';
    if (hour >= 12 && hour < 17) return 'Good afternoon';
    return 'Good evening';
  }, []);

  // Natural display name (first name or full display name)
  const displayName = useMemo(() => {
    if (!user?.name) return '';
    return user.name.split(' ')[0] || user.name;
  }, [user]);

  // Fetch live cloud statistics and streak from backend when signed in
  useEffect(() => {
    let isMounted = true;
    if (isAuthenticated) {
      progressApi.getDashboardStats()
        .then((res) => {
          if (isMounted && res.success) {
            setCloudStats(res);
          }
        })
        .catch(() => {});
    } else {
      setCloudStats(null);
    }
    return () => {
      isMounted = false;
    };
  }, [isAuthenticated, user?.id]);

  // Live streak values: cloud takes priority, fallback to local storage
  const currentStreak = cloudStats?.streak?.currentStreak ?? user?.streak?.currentStreak ?? progress.streak?.currentStreak ?? 0;
  const longestStreak = cloudStats?.streak?.longestStreak ?? user?.streak?.longestStreak ?? progress.streak?.longestStreak ?? 0;

  // Quick Practice cards configuration
  const quickPractice = [
    {
      title: 'Interview Q&A',
      desc: '120+ in-depth model answers',
      icon: HelpCircle,
      color: '#6366f1',
      link: '/questions'
    },
    {
      title: '10 MCQs',
      desc: 'Speed-run conceptual questions',
      icon: Brain,
      color: 'var(--accent-primary)',
      link: '/practice/mcqs'
    },
    {
      title: '5 Coding Problems',
      desc: 'Data structures & algorithms',
      icon: Code2,
      color: 'var(--accent-secondary)',
      link: '/coding'
    },
    {
      title: '5 SQL Questions',
      desc: 'Complex joins, aggregates & CTEs',
      icon: Database,
      color: '#3b82f6',
      link: '/sql'
    },
    {
      title: 'Flashcards',
      desc: 'Active recall spaced revision',
      icon: Layers,
      color: 'var(--accent-warning)',
      link: '/flashcards'
    },
    {
      title: 'Mock Interview',
      desc: 'Interactive interview simulation',
      icon: MessageSquareCode,
      color: 'var(--accent-important)',
      link: '/mock-interview'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      {/* Hero Welcome Bar */}
      <div
        className="glass-panel"
        style={{
          padding: '2.25rem',
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.12) 0%, rgba(6, 182, 212, 0.08) 100%)',
          border: '1px solid var(--border-glow)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '1.75rem' }}>👋</span>
            <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
              {isAuthenticated && displayName ? `${greeting}, ${displayName}!` : 'Welcome to Interview Hub'}
            </h1>
          </div>
          <p style={{ fontSize: '1.05rem', color: 'var(--text-secondary)' }}>
            Complete 15-subject technical interview preparation platform with study notes, Q&A, and practice drills.
          </p>
        </div>

        {/* Streaks Widget */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <div style={{
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            minWidth: '140px'
          }}>
            <Flame size={28} color="#f97316" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>CURRENT STREAK</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {currentStreak} {currentStreak === 1 ? 'Day' : 'Days'}
              </div>
            </div>
          </div>

          <div style={{
            padding: '0.85rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            minWidth: '140px'
          }}>
            <Trophy size={28} color="#eab308" />
            <div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>LONGEST STREAK</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                {longestStreak} {longestStreak === 1 ? 'Day' : 'Days'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row: Overall Progress + Today's Goal + Continue Learning */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '1.5rem'
      }}>
        {/* Overall Progress Card */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Overall Progress</h3>
            <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
              Curriculum Mastery
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {allMarkdownTopics.length > 0 ? Math.round((completedIds.length / allMarkdownTopics.length) * 100) : 0}%
            </span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              ({completedIds.length} / {allMarkdownTopics.length} Lessons Completed)
            </span>
          </div>

          <ProgressBar
            progress={allMarkdownTopics.length > 0 ? Math.round((completedIds.length / allMarkdownTopics.length) * 100) : 0}
            height={10}
            color="var(--accent-primary)"
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.25rem', fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
            <span>⭐ {progress.bookmarksCount} Bookmarks</span>
            <span>⚠ {progress.difficultCount} Needs Revision</span>
          </div>
        </div>

        {/* Today's Goal */}
        <div className="glass-panel" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Today's Goal</h3>
            <span style={{
              fontSize: '0.75rem',
              padding: '0.2rem 0.5rem',
              borderRadius: 'var(--radius-full)',
              background: 'var(--accent-success-light)',
              color: 'var(--accent-success)',
              fontWeight: 700
            }}>
              DAILY TARGET
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Topics Studied</span>
                <span style={{ fontWeight: 600 }}>{todayGoals.topicsStudied} / {todayGoals.targetTopics}</span>
              </div>
              <ProgressBar progress={(todayGoals.topicsStudied / todayGoals.targetTopics) * 100} height={6} color="var(--accent-success)" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Problems Solved</span>
                <span style={{ fontWeight: 600 }}>{todayGoals.questionsSolved} / {todayGoals.targetQuestions}</span>
              </div>
              <ProgressBar progress={(todayGoals.questionsSolved / todayGoals.targetQuestions) * 100} height={6} color="var(--accent-primary)" />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>MCQs Solved</span>
                <span style={{ fontWeight: 600 }}>{todayGoals.mcqsCompleted} / {todayGoals.targetMCQs}</span>
              </div>
              <ProgressBar progress={(todayGoals.mcqsCompleted / todayGoals.targetMCQs) * 100} height={6} color="var(--accent-violet)" />
            </div>
          </div>
        </div>

        {/* Continue Learning */}
        <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Clock size={16} color="var(--accent-primary)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
                Continue Learning
              </span>
            </div>

            {lastTopic ? (
              <div>
                <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
                  {lastTopic.subject}
                </span>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.25rem 0' }}>
                  {lastTopic.title}
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  Pick up right where you left off.
                </p>
              </div>
            ) : (
              <div>
                <h4 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0.25rem 0' }}>
                  Begin Your Preparation
                </h4>
                <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                  Explore OOP fundamentals, DBMS, or Cloud Computing.
                </p>
              </div>
            )}
          </div>

          <Link
            to={lastTopic ? `/topic/${lastTopic.id}` : '/subjects'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.5rem',
              padding: '0.65rem 1.25rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent-primary)',
              color: '#ffffff',
              fontWeight: 700,
              fontSize: '0.875rem',
              textDecoration: 'none',
              marginTop: '1.25rem'
            }}
          >
            <span>{lastTopic ? 'Resume Lesson' : 'Explore Subjects'}</span>
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>

      {/* Quick Practice Hub */}
      <div>
        <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem' }}>
          Interactive Practice Drills
        </h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.25rem'
        }}>
          {quickPractice.map((qp, idx) => {
            const Icon = qp.icon;
            return (
              <Link
                key={idx}
                to={qp.link}
                className="glass-panel"
                style={{
                  padding: '1.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <div style={{
                  padding: '0.75rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  color: qp.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.2rem' }}>
                    {qp.title}
                  </h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    {qp.desc}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Subject Curriculum Cards */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: 700 }}>Curriculum Library</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
              15 comprehensive technical domains ({allMarkdownTopics.length} Lessons Available)
            </p>
          </div>
          <Link
            to="/subjects"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--accent-primary)'
            }}
          >
            <span>View All 15 Subjects</span>
            <ArrowRight size={15} />
          </Link>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem'
        }}>
          {subjects.slice(0, 6).map((subj) => {
            const completedCount = subj.topics.filter(t => completedIds.includes(t.id)).length;
            const percent = subj.topics.length > 0
              ? Math.round((completedCount / subj.topics.length) * 100)
              : 0;

            return (
              <SubjectCard
                key={subj.slug}
                subject={subj}
                progress={percent}
                completedCount={completedCount}
              />
            );
          })}
        </div>
      </div>

      {/* Recently Studied Topics */}
      {recentTopics.length > 0 && (
        <div>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 700, marginBottom: '1rem' }}>
            Recently Studied
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem'
          }}>
            {recentTopics.slice(0, 4).map((topic) => (
              <Link
                key={topic.id}
                to={`/topic/${topic.id}`}
                className="glass-panel"
                style={{
                  padding: '1.25rem',
                  textDecoration: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.725rem', fontWeight: 700, color: 'var(--accent-secondary)' }}>
                    {topic.subject}
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
                    {topic.title}
                  </h4>
                </div>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.25rem',
                  color: 'var(--accent-primary)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  marginTop: '0.75rem'
                }}>
                  <span>Resume</span>
                  <ArrowRight size={13} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
