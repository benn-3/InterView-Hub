import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Zap, ShieldCheck, ArrowRight, Loader2, AlertCircle, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const { user, isAuthenticated, loginWithGoogle, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [internalError, setInternalError] = useState(null);
  const [gisLoaded, setGisLoaded] = useState(!!window.google?.accounts?.id);
  const buttonContainerRef = useRef(null);

  const rawClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() || '';
  const isConfigured = Boolean(
    rawClientId &&
    !rawClientId.includes('your-google-client-id') &&
    rawClientId.endsWith('.apps.googleusercontent.com')
  );

  // If already authenticated, redirect to destination
  useEffect(() => {
    if (isAuthenticated) {
      const dest = location.state?.from?.pathname || '/dashboard';
      navigate(dest, { replace: true });
    }
  }, [isAuthenticated, location, navigate]);

  useEffect(() => {
    if (window.google?.accounts?.id) {
      setGisLoaded(true);
      return;
    }
    const interval = setInterval(() => {
      if (window.google?.accounts?.id) {
        setGisLoaded(true);
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isConfigured || !window.google?.accounts?.id) return;

    const handleCredentialResponse = async (response) => {
      try {
        setIsSigningIn(true);
        setInternalError(null);
        if (!response?.credential) {
          throw new Error('No credential token received from Google.');
        }
        await loginWithGoogle(response.credential);
        const dest = location.state?.from?.pathname || '/dashboard';
        navigate(dest, { replace: true });
      } catch (err) {
        setInternalError(err.message || 'Google sign-in failed');
      } finally {
        setIsSigningIn(false);
      }
    };

    try {
      window.google.accounts.id.initialize({
        client_id: rawClientId,
        callback: handleCredentialResponse,
        auto_select: false,
      });

      if (buttonContainerRef.current) {
        buttonContainerRef.current.innerHTML = '';
        window.google.accounts.id.renderButton(buttonContainerRef.current, {
          theme: 'filled_blue',
          size: 'large',
          shape: 'pill',
          text: 'continue_with',
          width: 300,
        });
      }
    } catch (err) {
      console.warn('[Login] GIS init error:', err);
    }
  }, [isConfigured, rawClientId, gisLoaded, loginWithGoogle, location, navigate]);

  const handleDevTestLogin = async () => {
    try {
      setIsSigningIn(true);
      setInternalError(null);
      const mockToken = `mock_dev_token_${Date.now()}_candidate`;
      await loginWithGoogle(mockToken);
      const dest = location.state?.from?.pathname || '/dashboard';
      navigate(dest, { replace: true });
    } catch (err) {
      setInternalError(err.message || 'Developer login failed');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-xl)',
          padding: '2.5rem 2rem',
          boxShadow: 'var(--shadow-xl)',
          textAlign: 'center',
        }}
      >
        {/* Brand */}
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.65rem',
            marginBottom: '1.75rem',
            textDecoration: 'none',
            color: 'var(--text-primary)',
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'linear-gradient(135deg, var(--accent-primary) 0%, var(--accent-secondary) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
            }}
          >
            <Zap size={22} fill="currentColor" />
          </div>
          <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.02em' }}>
            INTERVIEW<span style={{ color: 'var(--accent-secondary)' }}>HUB</span>
          </span>
        </Link>

        <h1 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Sign In to Your Account
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem', lineHeight: 1.5 }}>
          Access your personal learning telemetry, saved questions, flashcards, and 15 technical curriculum tracks.
        </p>

        {/* Error banner */}
        {(authError || internalError) && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--accent-danger)',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.5rem',
              textAlign: 'left',
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{authError || internalError}</span>
          </div>
        )}

        {/* Google sign-in container */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', minHeight: '60px' }}>
          {isSigningIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', padding: '1rem' }}>
              <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>Verifying credentials...</span>
            </div>
          ) : !isConfigured ? (
            <div
              style={{
                width: '100%',
                padding: '0.85rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(234, 179, 8, 0.08)',
                border: '1px solid rgba(234, 179, 8, 0.25)',
                color: '#eab308',
                fontSize: '0.825rem',
                textAlign: 'left',
                lineHeight: 1.5,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '0.2rem' }}>⚠️ Google OAuth Not Configured</div>
              <div style={{ color: 'var(--text-secondary)' }}>
                Set <code style={{ color: '#eab308' }}>VITE_GOOGLE_CLIENT_ID</code> in client configuration.
              </div>
            </div>
          ) : (
            <div ref={buttonContainerRef} style={{ display: 'flex', justifyContent: 'center', width: '100%' }} />
          )}

          {/* Dev mode login button */}
          <div
            style={{
              width: '100%',
              marginTop: '0.5rem',
              paddingTop: '1rem',
              borderTop: '1px dashed var(--border-color)',
            }}
          >
            <button
              onClick={handleDevTestLogin}
              disabled={isSigningIn}
              style={{
                width: '100%',
                padding: '0.65rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.45rem',
              }}
            >
              <Sparkles size={15} color="var(--accent-secondary)" />
              <span>Simulate Verified Google Sign-In</span>
            </button>
          </div>
        </div>

        <div style={{ marginTop: '2rem', fontSize: '0.825rem', color: 'var(--text-muted)' }}>
          <Link to="/" style={{ color: 'var(--accent-secondary)', textDecoration: 'none', fontWeight: 600 }}>
            ← Back to Public Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
