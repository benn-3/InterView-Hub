import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Zap,
  BookOpen,
  HelpCircle,
  Layers,
  Bookmark,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  Sun,
  Moon,
  Database,
  Terminal,
  Cloud,
  Workflow,
  Cpu,
  Network,
  Globe,
  Table,
  Boxes,
  Binary,
  Code2,
  Lock,
  LogOut,
  ChevronRight,
  CheckCircle2,
  Flame,
  Award,
  Github
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { getTheme, setTheme } from '../utils/storage';
import { CURRICULUM_SUBJECTS } from '../contentRegistry';
import GoogleLoginModal from '../components/auth/GoogleLoginModal';
import './LandingPage.css';

// Subject icon lookup
const ICON_MAP = {
  Boxes,
  Binary,
  Database,
  Table,
  Cpu,
  Network,
  Globe,
  Terminal,
  Cloud,
  Workflow,
  Layers,
  Code2,
};

export default function LandingPage() {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [theme, setCurrentTheme] = useState(() => getTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setCurrentTheme(nextTheme);
    setTheme(nextTheme);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubjectClick = (slug) => {
    if (isAuthenticated) {
      navigate(`/subjects/${slug}`);
    } else {
      setLoginModalOpen(true);
    }
  };

  const handleSignOut = async () => {
    await logout();
  };

  // 12 featured subjects from curriculum
  const featuredSubjects = CURRICULUM_SUBJECTS.slice(0, 12);

  return (
    <div className="landing-page">
      {/* 1. Public Top Navigation */}
      <header className="landing-navbar">
        <div className="landing-nav-container">
          <Link to="/" className="landing-brand">
            <div className="landing-brand-icon">
              <Zap size={22} fill="currentColor" />
            </div>
            <div className="landing-brand-text">
              <span className="landing-brand-title">
                INTERVIEW<span>HUB</span>
              </span>
              <span className="landing-brand-subtitle">Technical Prep</span>
            </div>
          </Link>

          <nav>
            <ul className="landing-nav-links">
              <li>
                <a
                  href="#features"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('features');
                  }}
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#subjects"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('subjects');
                  }}
                >
                  Subjects
                </a>
              </li>
              <li>
                <a
                  href="#how-it-works"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('how-it-works');
                  }}
                >
                  How It Works
                </a>
              </li>
            </ul>
          </nav>

          <div className="landing-nav-actions">
            <button
              className="theme-btn-round"
              onClick={handleToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {isAuthenticated ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                <Link to="/dashboard" className="dashboard-nav-btn">
                  <span>Go to Dashboard</span>
                  <ArrowRight size={15} />
                </Link>
                <button
                  onClick={handleSignOut}
                  className="signout-nav-btn"
                  title="Sign out"
                  aria-label="Sign out"
                >
                  <LogOut size={14} />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <button
                className="google-auth-btn"
                onClick={() => setLoginModalOpen(true)}
                aria-label="Continue with Google"
              >
                <svg width="17" height="17" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="landing-hero">
        <div className="hero-glow-bg" />

        <div className="hero-pill-badge">
          <span className="hero-pill-dot" />
          <span>Complete Technical Interview Engineering Curriculum</span>
        </div>

        <h1 className="hero-title">
          Prepare Smarter.{' '}
          <span className="gradient-text">Interview With Confidence.</span>
        </h1>

        <p className="hero-description">
          Master 15 high-impact engineering disciplines — from Core Computer Science and System Design
          to SQL, Linux, and Cloud DevOps. Practice with real company questions, interactive MCQs,
          smart flashcards, and track your daily streaks.
        </p>

        <div className="hero-cta-group">
          {isAuthenticated ? (
            <Link to="/dashboard" className="hero-continue-btn">
              <span>Go to Dashboard</span>
              <ArrowRight size={18} />
            </Link>
          ) : (
            <button
              className="hero-primary-btn"
              onClick={() => setLoginModalOpen(true)}
              aria-label="Continue with Google"
            >
              <svg width="19" height="19" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          )}

          <button
            className="hero-secondary-btn"
            onClick={() => scrollToSection('features')}
          >
            <span>Explore Features</span>
            <ChevronRight size={17} />
          </button>
        </div>

        {/* Highlights strip */}
        <div className="hero-highlights-strip">
          <div className="highlight-item">
            <div className="highlight-item-icon">
              <BookOpen size={16} />
            </div>
            <span>15 Curated Tracks</span>
          </div>

          <div className="highlight-item">
            <div className="highlight-item-icon">
              <HelpCircle size={16} />
            </div>
            <span>500+ Interview Q&As</span>
          </div>

          <div className="highlight-item">
            <div className="highlight-item-icon">
              <Layers size={16} />
            </div>
            <span>Spaced Flashcards</span>
          </div>

          <div className="highlight-item">
            <div className="highlight-item-icon">
              <Flame size={16} />
            </div>
            <span>Daily Streak Engine</span>
          </div>

          <div className="highlight-item">
            <div className="highlight-item-icon">
              <ShieldCheck size={16} />
            </div>
            <span>Google SSO Secured</span>
          </div>
        </div>
      </section>

      {/* 3. Features Section */}
      <section id="features" className="landing-section">
        <div className="section-header">
          <span className="section-tag">Platform Features</span>
          <h2 className="section-title">Everything You Need to Ace Technical Interviews</h2>
          <p className="section-description">
            Structured, interactive tools engineered for deep retention, conceptual clarity, and
            mock interview readiness.
          </p>
        </div>

        <div className="features-grid">
          {/* Feature 1 */}
          <div className="feature-card">
            <div
              className="feature-icon-wrapper"
              style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)' }}
            >
              <BookOpen size={26} />
            </div>
            <h3 className="feature-title">Study Materials</h3>
            <p className="feature-text">
              Comprehensive architectural guides, clear markdown study notes, syntax references,
              and interview cheatsheets for all core subjects.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="feature-card">
            <div
              className="feature-icon-wrapper"
              style={{ background: 'rgba(6, 182, 212, 0.15)', color: 'var(--accent-secondary)' }}
            >
              <HelpCircle size={26} />
            </div>
            <h3 className="feature-title">Interview Questions</h3>
            <p className="feature-text">
              Curated library of real company questions categorized by difficulty, topic, and
              seniority with detailed explanations and sample answers.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="feature-card">
            <div
              className="feature-icon-wrapper"
              style={{ background: 'rgba(16, 185, 129, 0.15)', color: 'var(--accent-success)' }}
            >
              <Award size={26} />
            </div>
            <h3 className="feature-title">MCQ Quizzes</h3>
            <p className="feature-text">
              Diagnostic multi-choice quizzes with timer options, instant correctness feedback,
              and detailed answer rationales to test quick recall.
            </p>
          </div>

          {/* Feature 4 */}
          <div className="feature-card">
            <div
              className="feature-icon-wrapper"
              style={{ background: 'rgba(245, 158, 11, 0.15)', color: 'var(--accent-warning)' }}
            >
              <Layers size={26} />
            </div>
            <h3 className="feature-title">Concept Flashcards</h3>
            <p className="feature-text">
              Interactive flip cards covering essential definitions, algorithmic time complexities,
              and system design trade-offs with spaced repetition.
            </p>
          </div>

          {/* Feature 5 */}
          <div className="feature-card">
            <div
              className="feature-icon-wrapper"
              style={{ background: 'rgba(236, 72, 153, 0.15)', color: 'var(--accent-important)' }}
            >
              <Bookmark size={26} />
            </div>
            <h3 className="feature-title">Smart Bookmarks</h3>
            <p className="feature-text">
              Save tricky problems, complex database queries, and revision notes to your private
              account for quick review right before interview rounds.
            </p>
          </div>

          {/* Feature 6 */}
          <div className="feature-card">
            <div
              className="feature-icon-wrapper"
              style={{ background: 'rgba(139, 92, 246, 0.15)', color: 'var(--accent-violet)' }}
            >
              <BarChart3 size={26} />
            </div>
            <h3 className="feature-title">Progress & Streaks</h3>
            <p className="feature-text">
              Real-time completion analytics, streak calculation across calendar days, and
              persistent cloud storage synced via your Google account.
            </p>
          </div>
        </div>
      </section>

      {/* 4. Subject Previews Section */}
      <section id="subjects" className="landing-section">
        <div className="section-header">
          <span className="section-tag">Curriculum Tracks</span>
          <h2 className="section-title">Subjects Supported Across the Platform</h2>
          <p className="section-description">
            Explore 15 rigorous technical disciplines. Browse subject descriptions publicly, and sign in
            with Google to access full lesson modules and coding problems.
          </p>
        </div>

        <div className="subjects-preview-grid">
          {featuredSubjects.map((sub) => {
            const IconComponent = ICON_MAP[sub.icon] || BookOpen;
            return (
              <div key={sub.id} className="subject-preview-card">
                <div className="subject-card-top">
                  <div
                    className="subject-icon-box"
                    style={{
                      background: `${sub.color}20`,
                      color: sub.color,
                      border: `1px solid ${sub.color}40`,
                    }}
                  >
                    <IconComponent size={22} />
                  </div>
                  <span className="subject-category-badge">{sub.category}</span>
                </div>

                <h3 className="subject-card-title">{sub.title}</h3>
                <p className="subject-card-desc">{sub.description}</p>

                <div className="subject-card-action">
                  <span style={{ color: 'var(--text-muted)' }}>{sub.shortTitle} Curriculum</span>
                  <button
                    onClick={() => handleSubjectClick(sub.slug)}
                    className="subject-action-btn"
                  >
                    {isAuthenticated ? 'Open Track' : 'Unlock Track'}
                    {isAuthenticated ? <ArrowRight size={14} /> : <Lock size={13} />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. How It Works Section */}
      <section id="how-it-works" className="landing-section">
        <div className="section-header">
          <span className="section-tag">Learning Methodology</span>
          <h2 className="section-title">How Interview Hub Works</h2>
          <p className="section-description">
            A proven, structured 3-step cycle designed to maximize conceptual recall under pressure.
          </p>
        </div>

        <div className="steps-container">
          <div className="step-card">
            <span className="step-number">01</span>
            <div className="step-icon-box">
              <BookOpen size={24} />
            </div>
            <h3 className="step-title">1. Choose Your Subject Path</h3>
            <p className="step-desc">
              Select any of the 15 targeted engineering tracks. Dive into deep architectural notes,
              illustrated flowcharts, and syntax breakdowns.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">02</span>
            <div className="step-icon-box" style={{ color: 'var(--accent-secondary)', background: 'rgba(6, 182, 212, 0.12)' }}>
              <Layers size={24} />
            </div>
            <h3 className="step-title">2. Test Retention & Practice</h3>
            <p className="step-desc">
              Reinforce understanding with interactive MCQs, flip flashcards for key definitions,
              and solve real interview coding and SQL challenges.
            </p>
          </div>

          <div className="step-card">
            <span className="step-number">03</span>
            <div className="step-icon-box" style={{ color: 'var(--accent-success)', background: 'rgba(16, 185, 129, 0.12)' }}>
              <Flame size={24} />
            </div>
            <h3 className="step-title">3. Build Streaks & Land Offers</h3>
            <p className="step-desc">
              Keep your daily study streak alive, monitor mastery percentages on your dashboard, and
              walk into your technical interviews with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Call to Action Banner */}
      <section className="landing-section" style={{ paddingBottom: '2rem' }}>
        <div className="landing-cta-banner">
          <h2 className="cta-title">Ready to Ace Your Next Interview?</h2>
          <p className="cta-desc">
            Sign in with Google to unlock full access to all 15 curriculum tracks, quizzes, flashcards,
            and personal streak analytics.
          </p>

          {isAuthenticated ? (
            <Link to="/dashboard" className="hero-continue-btn" style={{ padding: '0.9rem 2.2rem' }}>
              <span>Go to Dashboard</span>
              <ArrowRight size={18} />
            </Link>
          ) : (
            <button
              className="google-auth-btn"
              onClick={() => setLoginModalOpen(true)}
              style={{ padding: '0.85rem 1.85rem', fontSize: '1rem', fontWeight: 700 }}
              aria-label="Continue with Google"
            >
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Continue with Google</span>
            </button>
          )}
        </div>
      </section>

      {/* 7. Public Footer */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand-info">
              <div className="landing-brand">
                <div className="landing-brand-icon">
                  <Zap size={20} fill="currentColor" />
                </div>
                <div className="landing-brand-text">
                  <span className="landing-brand-title">
                    INTERVIEW<span>HUB</span>
                  </span>
                </div>
              </div>
              <p className="footer-brand-desc">
                Production-grade full-stack interview preparation portal for technical interviews,
                DSA, SQL, Cloud DevOps, and System Design.
              </p>
            </div>

            <div className="footer-links-group">
              <div>
                <h4 className="footer-col-title">Platform</h4>
                <ul className="footer-links-list">
                  <li>
                    <a
                      href="#features"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('features');
                      }}
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#subjects"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('subjects');
                      }}
                    >
                      Curriculum
                    </a>
                  </li>
                  <li>
                    <a
                      href="#how-it-works"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection('how-it-works');
                      }}
                    >
                      How It Works
                    </a>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Core Tracks</h4>
                <ul className="footer-links-list">
                  <li>
                    <span
                      style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                      onClick={() => handleSubjectClick('dsa')}
                    >
                      Data Structures & Algorithms
                    </span>
                  </li>
                  <li>
                    <span
                      style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                      onClick={() => handleSubjectClick('sql')}
                    >
                      SQL & Databases
                    </span>
                  </li>
                  <li>
                    <span
                      style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                      onClick={() => handleSubjectClick('aws')}
                    >
                      AWS & Cloud Computing
                    </span>
                  </li>
                  <li>
                    <span
                      style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                      onClick={() => handleSubjectClick('docker')}
                    >
                      Docker & Kubernetes
                    </span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Authentication</h4>
                <ul className="footer-links-list">
                  <li>
                    <span
                      style={{ cursor: 'pointer', color: 'var(--text-muted)' }}
                      onClick={() => setLoginModalOpen(true)}
                    >
                      Google Sign-In
                    </span>
                  </li>
                  <li>
                    <Link to="/login" style={{ color: 'var(--text-muted)' }}>
                      Dedicated Login
                    </Link>
                  </li>
                  <li>
                    <span style={{ color: 'var(--accent-success)', fontSize: '0.8rem', fontWeight: 600 }}>
                      ✓ HTTP-only Cookies
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <span>© 2026 Interview Hub. All rights reserved.</span>

            <div className="footer-credits">
              <span>Developed with ❤️ by </span>
              <a
                href="https://github.com/benn-3"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-author-link"
              >
                Benny Hinn
              </a>
            </div>

            <div className="footer-contact">
              <a
                href="https://github.com/benn-3"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-contact-link"
              >
                <Github size={15} />
                <span>Contact on GitHub</span>
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Google Login Modal */}
      <GoogleLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />
    </div>
  );
}
