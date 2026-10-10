import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, ShieldCheck, Sparkles, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function GoogleLoginModal({ isOpen, onClose, onSuccess }) {
  const { loginWithGoogle, loading, authError } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [internalError, setInternalError] = useState(null);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [gisLoaded, setGisLoaded] = useState(!!window.google?.accounts?.id);
  const buttonContainerRef = useRef(null);

  // Read environment variable
  const rawClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID?.trim() || '';
  const isConfigured = Boolean(
    rawClientId &&
    !rawClientId.includes('your-google-client-id') &&
    rawClientId.endsWith('.apps.googleusercontent.com')
  );

  // Monitor GIS CDN script loading
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
    if (!isOpen) {
      setInternalError(null);
      setIsSigningIn(false);
      return;
    }

    // Safe development diagnostics (does not expose full client ID or secrets)
    if (!isConfigured) {
      console.warn(
        `[Google SSO Diagnostics] VITE_GOOGLE_CLIENT_ID is missing or using placeholder in root .env. ` +
        `Current origin: ${window.location.origin}. Please set VITE_GOOGLE_CLIENT_ID to your Google Cloud Web Client ID.`
      );
      return;
    }

    console.info(
      `[Google SSO Diagnostics] Initializing GIS for origin: ${window.location.origin} with Client ID ending in ...${rawClientId.slice(-15)}`
    );

    const handleCredentialResponse = async (response) => {
      try {
        setIsSigningIn(true);
        setInternalError(null);
        if (!response?.credential) {
          throw new Error('No credential token received from Google Identity Services.');
        }
        await loginWithGoogle(response.credential);
        onClose();
        if (onSuccess) {
          onSuccess();
        } else {
          const dest = location.state?.from?.pathname || '/dashboard';
          navigate(dest, { replace: true });
        }
      } catch (err) {
        setInternalError(err.message || 'Google sign-in failed');
      } finally {
        setIsSigningIn(false);
      }
    };

    if (window.google?.accounts?.id) {
      try {
        window.google.accounts.id.initialize({
          client_id: rawClientId,
          callback: handleCredentialResponse,
          auto_select: false,
          cancel_on_tap_outside: true,
        });

        if (buttonContainerRef.current) {
          buttonContainerRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(buttonContainerRef.current, {
            theme: 'filled_blue',
            size: 'large',
            shape: 'pill',
            text: 'continue_with',
            width: 280,
          });
        }
      } catch (e) {
        console.warn('[Google SSO] GIS initialization error:', e);
      }
    }
  }, [isOpen, isConfigured, rawClientId, gisLoaded, loginWithGoogle, onClose]);

  if (!isOpen) return null;

  // Development fast login helper for testing when Google Client ID is not yet provisioned
  const handleDevTestLogin = async (role = 'benny') => {
    try {
      setIsSigningIn(true);
      setInternalError(null);
      // Mock dev token format recognized by backend in non-production
      const mockToken = `mock_dev_token_${Date.now()}_${role}`;
      await loginWithGoogle(mockToken);
      onClose();
      if (onSuccess) {
        onSuccess();
      } else {
        const dest = location.state?.from?.pathname || '/dashboard';
        navigate(dest, { replace: true });
      }
    } catch (err) {
      setInternalError(err.message || 'Developer test login failed');
    } finally {
      setIsSigningIn(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        padding: '1rem',
      }}
      onClick={onClose}
    >
      <div
        className="glass-panel"
        style={{
          width: '100%',
          maxWidth: '440px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-xl)',
          padding: '2rem',
          boxShadow: 'var(--shadow-xl)',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'none',
            border: 'none',
            color: 'var(--text-muted)',
            cursor: 'pointer',
          }}
          aria-label="Close dialog"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(16, 185, 129, 0.2) 100%)',
              border: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem auto',
            }}
          >
            <ShieldCheck size={28} color="var(--accent-primary)" />
          </div>

          <h2 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Sign In to Interview Hub
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: '1.5' }}>
            Sync your lesson progress, saved questions, flashcard mastery, and quiz analytics to your cloud account.
          </p>
        </div>

        {/* Error notification */}
        {(authError || internalError) && (
          <div
            style={{
              padding: '0.75rem 1rem',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(239, 68, 68, 0.12)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: 'var(--accent-danger)',
              fontSize: '0.825rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginBottom: '1.25rem',
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{authError || internalError}</span>
          </div>
        )}

        {/* Google Official Button Container */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem', minHeight: '50px' }}>
          {!isConfigured ? (
            <div
              style={{
                width: '100%',
                padding: '0.875rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(234, 179, 8, 0.08)',
                border: '1px solid rgba(234, 179, 8, 0.25)',
                color: '#eab308',
                fontSize: '0.8rem',
                textAlign: 'left',
                lineHeight: 1.5,
              }}
            >
              <div style={{ fontWeight: 700, marginBottom: '0.25rem' }}>⚠️ Google Web Client ID Not Configured</div>
              <div style={{ color: 'var(--text-secondary)' }}>
                Set <code style={{ color: '#eab308', background: 'rgba(0,0,0,0.2)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>VITE_GOOGLE_CLIENT_ID</code> in root <code style={{ color: '#eab308', background: 'rgba(0,0,0,0.2)', padding: '0.1rem 0.3rem', borderRadius: '4px' }}>.env</code> with your OAuth Web Client ID and restart Vite.
              </div>
            </div>
          ) : isSigningIn ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-primary)', padding: '0.75rem' }}>
              <Loader2 size={20} className="spinning" />
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Verifying Google Account...</span>
            </div>
          ) : (
            <>
              <div ref={buttonContainerRef} style={{ display: 'flex', justifyContent: 'center', width: '100%' }} />
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Origin: <span style={{ color: 'var(--text-secondary)' }}>{window.location.origin}</span>
              </div>
            </>
          )}

          {/* Development / Testing Quick Sign-in */}
          <div
            style={{
              width: '100%',
              marginTop: '0.5rem',
              paddingTop: '1rem',
              borderTop: '1px dashed var(--border-color)',
              textAlign: 'center',
            }}
          >
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '0.5rem' }}>
              Developer & Evaluation Mode:
            </div>
            <button
              onClick={() => handleDevTestLogin('candidate')}
              disabled={isSigningIn}
              style={{
                width: '100%',
                padding: '0.6rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-tertiary)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-primary)',
                fontSize: '0.825rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
              }}
            >
              <Sparkles size={14} color="var(--accent-secondary)" />
              <span>Simulate Verified Google Sign-In</span>
            </button>
          </div>
        </div>

        {/* Privacy Note */}
        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '1.5rem', marginBottom: 0 }}>
          Your profile and learning data are secured with HTTP-only cookie sessions. We never share your data.
        </p>
      </div>
    </div>
  );
}
