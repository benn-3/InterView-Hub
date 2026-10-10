import React, { useState } from 'react';
import {
  Sun,
  Moon,
  Laptop,
  Trash2,
  RotateCcw,
  Bookmark,
  FileEdit,
  CheckCircle2,
  ShieldAlert,
  ShieldCheck,
  Cloud,
  LogIn,
  LogOut,
  User as UserIcon
} from 'lucide-react';
import {
  getTheme,
  setTheme,
  clearBookmarks,
  clearNotes,
  resetProgress,
  resetAllData
} from '../utils/storage';
import { useProgress } from '../hooks/useProgress';
import { useAuth } from '../context/AuthContext';
import ConfirmModal from '../components/common/ConfirmModal';
import GoogleLoginModal from '../components/auth/GoogleLoginModal';

export default function SettingsPage() {
  const [currentTheme, setCurrentTheme] = useState(() => getTheme());
  const [confirmConfig, setConfirmConfig] = useState(null);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const progress = useProgress();
  const { user, isAuthenticated, logout, updatePreferences } = useAuth();

  const handleThemeChange = (newTheme) => {
    setCurrentTheme(newTheme);
    setTheme(newTheme);
    if (isAuthenticated) {
      updatePreferences({ theme: newTheme });
    }
    showNotice(`Theme updated to ${newTheme} mode.`);
  };

  const showNotice = (msg) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const triggerAction = (type) => {
    if (type === 'bookmarks') {
      setConfirmConfig({
        title: 'Clear All Bookmarks?',
        message: 'This will remove all saved topics from your bookmarks list. Your study completion status will not be touched.',
        confirmText: 'Clear Bookmarks',
        isDanger: false,
        onConfirm: () => {
          clearBookmarks();
          progress.refresh();
          setConfirmConfig(null);
          showNotice('Bookmarks cleared successfully.');
        }
      });
    } else if (type === 'notes') {
      setConfirmConfig({
        title: 'Clear All Personal Notes?',
        message: 'This will delete all personal notes you have written on study topics and coding problems.',
        confirmText: 'Clear Notes',
        isDanger: false,
        onConfirm: () => {
          clearNotes();
          progress.refresh();
          setConfirmConfig(null);
          showNotice('All personal notes have been deleted.');
        }
      });
    } else if (type === 'progress') {
      setConfirmConfig({
        title: 'Reset Study Progress?',
        message: 'This will reset your completed topics, MCQ scores, coding status, and flashcard masteries to 0.',
        confirmText: 'Reset Progress',
        isDanger: true,
        onConfirm: () => {
          resetProgress();
          progress.refresh();
          setConfirmConfig(null);
          showNotice('Study progress has been reset.');
        }
      });
    } else if (type === 'all') {
      setConfirmConfig({
        title: 'Reset All Application Data?',
        message: 'This will completely erase all stored preferences, bookmarks, streaks, notes, and study history from LocalStorage.',
        confirmText: 'Erase Everything',
        isDanger: true,
        onConfirm: () => {
          resetAllData();
          progress.refresh();
          setConfirmConfig(null);
          showNotice('Application data has been reset to factory state.');
        }
      });
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '780px' }}>
      <div>
        <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Preferences & Settings</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Configure application theme, data management, and storage controls
        </p>
      </div>

      {statusMessage && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.85rem 1.25rem',
          borderRadius: 'var(--radius-md)',
          background: 'var(--accent-success-light)',
          color: 'var(--accent-success)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          fontWeight: 600,
          fontSize: '0.9rem'
        }}>
          <CheckCircle2 size={18} />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Google Account & Cloud Synchronization */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {isAuthenticated ? <ShieldCheck size={20} color="var(--accent-success)" /> : <Cloud size={20} color="var(--accent-primary)" />}
          <span>Account & Cloud Sync</span>
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          {isAuthenticated
            ? 'Your account is connected via Google Single Sign-On. Study records are stored securely in MongoDB Atlas.'
            : 'Sign in with Google to backup your progress, sync bookmarks, and record quiz telemetry to your MongoDB Atlas cloud account.'}
        </p>

        {isAuthenticated ? (
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem',
            padding: '1rem 1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {user?.picture ? (
                <img src={user.picture} alt={user.name} style={{ width: '44px', height: '44px', borderRadius: '50%' }} />
              ) : (
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'var(--accent-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                  {user?.name?.charAt(0) || 'U'}
                </div>
              )}
              <div>
                <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--text-primary)' }}>{user?.name}</div>
                <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>{user?.email}</div>
                <div style={{ fontSize: '0.725rem', color: 'var(--accent-success)', fontWeight: 600, marginTop: '0.2rem' }}>
                  Google Sub: {user?.googleSub?.slice(0, 12)}... • Active Session
                </div>
              </div>
            </div>

            <button
              onClick={logout}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.5rem 1rem',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(239, 68, 68, 0.1)',
                color: 'var(--accent-danger)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                fontSize: '0.85rem',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              <LogOut size={15} />
              <span>Sign Out</span>
            </button>
          </div>
        ) : (
          <div style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Guest Mode</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Progress is currently saved only in your local browser storage.
              </div>
            </div>

            <button
              onClick={() => setLoginModalOpen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.55rem 1.15rem',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent-primary)',
                color: '#ffffff',
                border: 'none',
                fontSize: '0.875rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              <LogIn size={16} />
              <span>Sign In with Google</span>
            </button>
          </div>
        )}
      </div>

      <GoogleLoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />

      {/* Theme Selection */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Display Theme
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Select your preferred appearance mode for long study sessions.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          {[
            { id: 'dark', label: 'Dark Mode', icon: Moon },
            { id: 'light', label: 'Light Mode', icon: Sun }
          ].map(t => {
            const Icon = t.icon;
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '1rem',
                  borderRadius: 'var(--radius-md)',
                  background: isSelected ? 'var(--accent-primary-light)' : 'var(--bg-tertiary)',
                  border: `2px solid ${isSelected ? 'var(--accent-primary)' : 'var(--border-color)'}`,
                  color: isSelected ? 'var(--accent-primary)' : 'var(--text-primary)',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  transition: 'all var(--transition-fast)'
                }}
              >
                <Icon size={20} />
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Data Management Actions */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '0.5rem' }}>
          Data & LocalStorage Management
        </h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          All data is strictly stored in your local browser storage. No remote servers are used.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {/* Clear Bookmarks */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.925rem' }}>
                Clear Bookmarks
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Remove all pinned bookmarks from your repository
              </div>
            </div>
            <button
              onClick={() => triggerAction('bookmarks')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.825rem',
                fontWeight: 600
              }}
            >
              <Bookmark size={14} />
              <span>Clear Bookmarks</span>
            </button>
          </div>

          {/* Clear Notes */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.925rem' }}>
                Clear Personal Notes
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Delete all topic notes and code annotations
              </div>
            </div>
            <button
              onClick={() => triggerAction('notes')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-secondary)',
                fontSize: '0.825rem',
                fontWeight: 600
              }}
            >
              <FileEdit size={14} />
              <span>Clear Notes</span>
            </button>
          </div>

          {/* Reset Progress */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'var(--bg-tertiary)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', fontSize: '0.925rem' }}>
                Reset Preparation Progress
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Clear completion checks, MCQ scores and problem statuses
              </div>
            </div>
            <button
              onClick={() => triggerAction('progress')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.9rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-warning-light)',
                border: '1px solid rgba(245, 158, 11, 0.4)',
                color: 'var(--accent-warning)',
                fontSize: '0.825rem',
                fontWeight: 600
              }}
            >
              <RotateCcw size={14} />
              <span>Reset Progress</span>
            </button>
          </div>

          {/* Reset All Data */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem',
            borderRadius: 'var(--radius-md)',
            background: 'rgba(239, 68, 68, 0.06)',
            border: '1px solid rgba(239, 68, 68, 0.2)',
            flexWrap: 'wrap',
            gap: '0.75rem'
          }}>
            <div>
              <div style={{ fontWeight: 600, color: 'var(--accent-danger)', fontSize: '0.925rem' }}>
                Factory Reset (Delete Everything)
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Wipe all records, history, streaks, and settings permanently
              </div>
            </div>
            <button
              onClick={() => triggerAction('all')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.45rem 0.95rem',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-danger)',
                border: 'none',
                color: '#ffffff',
                fontSize: '0.825rem',
                fontWeight: 700
              }}
            >
              <Trash2 size={14} />
              <span>Reset All Data</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {confirmConfig && (
        <ConfirmModal
          isOpen={true}
          title={confirmConfig.title}
          message={confirmConfig.message}
          confirmText={confirmConfig.confirmText}
          isDanger={confirmConfig.isDanger}
          onConfirm={confirmConfig.onConfirm}
          onCancel={() => setConfirmConfig(null)}
        />
      )}
    </div>
  );
}
