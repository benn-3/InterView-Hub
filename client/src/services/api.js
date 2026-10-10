// Centralized API client for Interview Hub backend

const API_BASE = (
  import.meta.env?.VITE_API_BASE_URL ||
  (typeof window !== 'undefined' && window.location.hostname === 'localhost' ? '/api' : 'https://interview-hub-1-1dah.onrender.com/api')
).replace(/\/+$/, '');

/**
 * Universal fetch wrapper enforcing JSON headers and credentials
 */
async function request(endpoint, options = {}) {
  const normalizedEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  const url = `${API_BASE}${normalizedEndpoint}`;

  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...options.headers,
    },
    credentials: 'include', // Mandated for HTTP-only cookie sessions
  };

  try {
    const res = await fetch(url, config);
    const data = await res.json().catch(() => ({}));

    if (!res.ok) {
      if (res.status === 401 && !normalizedEndpoint.includes('/auth/me')) {
        window.dispatchEvent(new CustomEvent('interview_session_expired'));
      }
      const error = new Error(data.error || `HTTP error ${res.status}`);
      error.status = res.status;
      error.details = data;
      throw error;
    }

    return data;
  } catch (err) {
    if (err.name === 'TypeError' && err.message.includes('Failed to fetch')) {
      console.warn(`[API] Network failure or server offline when reaching ${url}`);
    }
    throw err;
  }
}

// Authentication API
export const authApi = {
  getMe: () => request('/auth/me'),
  loginWithGoogle: (idToken) =>
    request('/auth/google', {
      method: 'POST',
      body: JSON.stringify({ idToken }),
    }),
  logout: () =>
    request('/auth/logout', {
      method: 'POST',
    }),
};

// User Profile API
export const userApi = {
  getProfile: () => request('/users/me'),
  updatePreferences: (preferences) =>
    request('/users/me/preferences', {
      method: 'PATCH',
      body: JSON.stringify(preferences),
    }),
};

// Study Progress API
export const progressApi = {
  getProgress: () => request('/progress'),
  syncProgress: (payload) =>
    request('/progress', {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),
  completeLesson: (lessonId) =>
    request(`/progress/lessons/${encodeURIComponent(lessonId)}/complete`, {
      method: 'POST',
    }),
  uncompleteLesson: (lessonId) =>
    request(`/progress/lessons/${encodeURIComponent(lessonId)}/uncomplete`, {
      method: 'POST',
    }),
  addBookmark: (contentId, type = 'lesson') =>
    request('/progress/bookmarks', {
      method: 'POST',
      body: JSON.stringify({ contentId, type }),
    }),
  removeBookmark: (contentId) =>
    request(`/progress/bookmarks/${encodeURIComponent(contentId)}`, {
      method: 'DELETE',
    }),
  updateFlashcard: (flashcardId, status) =>
    request(`/progress/flashcards/${encodeURIComponent(flashcardId)}`, {
      method: 'PUT',
      body: JSON.stringify({
        status,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    }),
  getDashboardStats: (timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone) =>
    request(`/progress/dashboard?timeZone=${encodeURIComponent(timeZone)}`),
  recordActivity: ({ activityType, contentId, subject, metadata }) =>
    request('/progress/activity', {
      method: 'POST',
      body: JSON.stringify({
        activityType,
        contentId,
        subject,
        metadata,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    }),
};

// Quiz Attempts & History API
export const quizApi = {
  saveAttempt: (attemptData) =>
    request('/quizzes/attempts', {
      method: 'POST',
      body: JSON.stringify(attemptData),
    }),
  getHistory: (page = 1, subject = 'all') => {
    const params = new URLSearchParams({ page: String(page) });
    if (subject && subject !== 'all') params.append('subject', subject);
    return request(`/quizzes/history?${params.toString()}`);
  },
};
