import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import GoogleLoginModal from './GoogleLoginModal';
import { Lock, LogIn } from 'lucide-react';

export default function ProtectedRoute({ children, fallbackRedirect = null }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();
  const [showLoginModal, setShowLoginModal] = useState(false);

  if (loading) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: '1rem', color: 'var(--text-secondary)' }}>
        <div style={{ width: '36px', height: '36px', border: '3px solid var(--border-color)', borderTopColor: 'var(--accent)', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
        <p>Verifying secure session...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    if (fallbackRedirect) {
      return <Navigate to={fallbackRedirect} state={{ from: location }} replace />;
    }

    return (
      <div style={{ maxWidth: '600px', margin: '4rem auto', padding: '2.5rem', background: 'var(--surface)', border: '1px solid var(--border-color)', borderRadius: '16px', textAlign: 'center', boxShadow: '0 8px 30px rgba(0,0,0,0.1)' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', color: 'var(--accent)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <Lock size={32} />
        </div>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.75rem', color: 'var(--text-primary)' }}>Sign In Required</h2>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '2rem' }}>
          This page requires an authenticated account to securely store your personal interview prep milestones, progress analytics, and cloud history in MongoDB Atlas.
        </p>
        <button
          onClick={() => setShowLoginModal(true)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.75rem 1.75rem',
            background: 'var(--accent)',
            color: '#fff',
            fontWeight: '600',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
            transition: 'transform 0.15s ease'
          }}
        >
          <LogIn size={18} />
          Sign In with Google
        </button>

        {showLoginModal && (
          <GoogleLoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    );
  }

  return children;
}
