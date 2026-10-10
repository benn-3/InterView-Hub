import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, Home, ArrowLeft } from 'lucide-react';
import Footer from '../components/layout/Footer';
import { useAuth } from '../context/AuthContext';

export default function NotFound() {
  const { isAuthenticated } = useAuth();

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--bg-primary)',
      }}
    >
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '2rem',
          color: 'var(--text-primary)',
        }}
      >
      <div
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '14px',
          background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          marginBottom: '1.5rem',
          boxShadow: 'var(--shadow-glow)',
        }}
      >
        <Zap size={28} fill="currentColor" />
      </div>

      <h1
        style={{
          fontSize: '4.5rem',
          fontWeight: 900,
          lineHeight: 1,
          marginBottom: '0.75rem',
          fontFamily: 'var(--font-heading)',
          color: 'var(--accent-secondary)',
        }}
      >
        404
      </h1>

      <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.75rem' }}>
        Page Not Found
      </h2>

      <p
        style={{
          color: 'var(--text-secondary)',
          fontSize: '1rem',
          maxWidth: '460px',
          marginBottom: '2rem',
          lineHeight: 1.6,
        }}
      >
        The study guide, question, or lesson path you requested does not exist or has been moved.
      </p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link
          to={isAuthenticated ? '/dashboard' : '/'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.5rem',
            borderRadius: 'var(--radius-full)',
            background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
            color: '#ffffff',
            fontWeight: 700,
            textDecoration: 'none',
            fontSize: '0.9rem',
            boxShadow: 'var(--shadow-md)',
          }}
        >
          <Home size={16} />
          <span>{isAuthenticated ? 'Return to Dashboard' : 'Return to Homepage'}</span>
        </Link>
      </div>
      </div>
      <Footer />
    </div>
  );
}
