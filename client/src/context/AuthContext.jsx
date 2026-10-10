import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, progressApi, userApi } from '../services/api';
import {
  getCompletedTopics,
  getBookmarks,
  getFlashcardProgress,
  getCodingProgress,
  getSQLProgress,
  getLastStudiedTopic,
} from '../utils/storage';

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

  // Check existing session on application startup
  const checkSession = useCallback(async () => {
    try {
      setLoading(true);
      const data = await authApi.getMe();
      if (data.authenticated && data.user) {
        setUser(data.user);
      } else {
        setUser(null);
      }
      setAuthError(null);
    } catch (err) {
      // Backend may be offline or unreachable in local-only mode
      console.info('[Auth] Guest / offline session active.');
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  /**
   * Migrate anonymous localStorage data to backend on login
   */
  const migrateLocalProgress = async () => {
    try {
      const localCompleted = getCompletedTopics();
      const localBookmarks = getBookmarks();
      const localFlashcards = getFlashcardProgress();
      const localCoding = getCodingProgress();
      const localSql = getSQLProgress();
      const lastTopic = getLastStudiedTopic();

      const hasLocalData =
        localCompleted.length > 0 ||
        localBookmarks.length > 0 ||
        localFlashcards.known.length > 0 ||
        localCoding.solved.length > 0 ||
        localSql.solved.length > 0;

      if (hasLocalData) {
        console.log('[Auth] Syncing local anonymous progress to cloud MongoDB profile...');
        await progressApi.syncProgress({
          completedLessonIds: localCompleted,
          bookmarkedLessonIds: localBookmarks,
          flashcardProgress: localFlashcards,
          codingSolvedIds: localCoding.solved,
          sqlSolvedIds: localSql.solved,
          lastVisitedLessonId: lastTopic ? lastTopic.id : undefined,
        });
      }
    } catch (err) {
      console.warn('[Auth] Failed to sync local progress on login:', err.message);
    }
  };

  /**
   * Log in with verified Google ID Token
   */
  const loginWithGoogle = async (idToken) => {
    try {
      setLoading(true);
      setAuthError(null);
      const res = await authApi.loginWithGoogle(idToken);

      if (res.success && res.user) {
        setUser(res.user);

        // Synchronize local data to user's MongoDB profile
        await migrateLocalProgress();

        // Refresh UI state
        window.dispatchEvent(new Event('interview_storage_updated'));
        return res.user;
      } else {
        throw new Error(res.error || 'Authentication failed');
      }
    } catch (err) {
      console.error('[Auth] Login error:', err);
      const message = err.message || 'Failed to authenticate with Google';
      setAuthError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Sign out and invalidate session
   */
  const logout = async () => {
    try {
      setLoading(true);
      await authApi.logout();
    } catch (err) {
      console.warn('[Auth] Logout warning:', err.message);
    } finally {
      setUser(null);
      setLoading(false);
      window.dispatchEvent(new Event('interview_storage_updated'));
    }
  };

  /**
   * Update preferences on backend
   */
  const updatePreferences = async (newPreferences) => {
    if (!user) return;
    try {
      const res = await userApi.updatePreferences(newPreferences);
      if (res.success) {
        setUser((prev) => ({
          ...prev,
          preferences: { ...prev.preferences, ...res.preferences },
        }));
      }
    } catch (err) {
      console.error('[Auth] Failed to update preferences:', err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        loading,
        authError,
        loginWithGoogle,
        logout,
        updatePreferences,
        refreshSession: checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
