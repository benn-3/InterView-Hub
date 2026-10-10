import { authApi } from './api';

/**
 * Authentication service module for Google SSO and session management.
 */
export const authService = {
  /**
   * Retrieves the current authenticated user session from backend.
   */
  async getCurrentUser() {
    try {
      const data = await authApi.getMe();
      return data;
    } catch (err) {
      console.warn('[authService] Failed to retrieve current user session:', err);
      return { success: false, authenticated: false, user: null };
    }
  },

  /**
   * Exchanges Google ID Token (from Google Identity Services) for an HTTP-only session.
   * @param {string} idToken - Google credential string
   */
  async loginWithGoogle(idToken) {
    if (!idToken) {
      throw new Error('Google ID token is required for authentication');
    }
    return authApi.loginWithGoogle(idToken);
  },

  /**
   * Terminates active session and destroys session cookie.
   */
  async logout() {
    return authApi.logout();
  },

  /**
   * Verifies if user is authenticated without throwing network errors.
   */
  async checkAuthStatus() {
    try {
      const res = await authApi.getMe();
      return Boolean(res?.authenticated && res?.user);
    } catch {
      return false;
    }
  }
};

export default authService;
