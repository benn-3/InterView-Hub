import { dataService } from '../services/dataService.js';

/**
 * Middleware ensuring the request has an active, authenticated session.
 * Derives user ID strictly from the verified server-side session.
 */
export async function requireAuth(req, res, next) {
  if (!req.session || !req.session.userId) {
    return res.status(401).json({
      success: false,
      error: 'Authentication required. Please sign in with Google.',
      authenticated: false,
    });
  }

  try {
    const user = await dataService.findUserById(req.session.userId);

    if (!user) {
      // Session exists but user was deleted
      req.session.destroy(() => {});
      res.clearCookie('connect.sid');
      return res.status(401).json({
        success: false,
        error: 'User account no longer exists. Session invalidated.',
        authenticated: false,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('requireAuth error:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal authentication validation failure.',
    });
  }
}
