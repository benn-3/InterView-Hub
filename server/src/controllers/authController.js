import { verifyGoogleIdToken } from '../services/googleAuthService.js';
import { dataService } from '../services/dataService.js';

/**
 * Handle Google Single Sign-On ID Token authentication
 * POST /api/auth/google
 */
export async function googleAuth(req, res, next) {
  try {
    const { idToken } = req.body;

    if (!idToken || typeof idToken !== 'string') {
      return res.status(400).json({
        success: false,
        error: 'Missing Google ID token in request body.',
      });
    }

    // 1. Verify token signature, audience, and claims
    const verifiedProfile = await verifyGoogleIdToken(idToken);

    // 2. Find or create user using the immutable googleSub identifier
    let user = await dataService.findUserBySub(verifiedProfile.googleSub);

    if (!user) {
      // Create new user
      user = await dataService.createUser({
        googleSub: verifiedProfile.googleSub,
        email: verifiedProfile.email,
        name: verifiedProfile.name,
        picture: verifiedProfile.picture,
        lastLoginAt: new Date(),
      });
      console.log(`[Auth] Registered new user via Google SSO: ${user.email} (sub: ${user.googleSub})`);
    } else {
      // Update existing user's last login and profile info
      user.lastLoginAt = new Date();
      if (verifiedProfile.name && user.name !== verifiedProfile.name) {
        user.name = verifiedProfile.name;
      }
      if (verifiedProfile.picture && user.picture !== verifiedProfile.picture) {
        user.picture = verifiedProfile.picture;
      }
      await user.save();
      console.log(`[Auth] Authenticated returning user: ${user.email}`);
    }

    // 3. Establish server-managed session with session regeneration (Fixation Protection)
    req.session.regenerate((err) => {
      if (err) {
        return next(err);
      }

      req.session.userId = user._id.toString();

      // Save session explicitly before sending response
      req.session.save((saveErr) => {
        if (saveErr) {
          return next(saveErr);
        }

        return res.status(200).json({
          success: true,
          authenticated: true,
          user: user.toPublicProfile(),
        });
      });
    });
  } catch (error) {
    console.error('[Auth] Google authentication failure:', error.message);
    return res.status(401).json({
      success: false,
      error: error.message || 'Google authentication verification failed.',
    });
  }
}

/**
 * Retrieve current authenticated user profile
 * GET /api/auth/me
 */
export async function getCurrentUser(req, res, next) {
  try {
    if (!req.session || !req.session.userId) {
      return res.status(200).json({
        success: true,
        authenticated: false,
        user: null,
      });
    }

    const user = await dataService.findUserById(req.session.userId);

    if (!user) {
      req.session.destroy(() => {});
      return res.status(200).json({
        success: true,
        authenticated: false,
        user: null,
      });
    }

    return res.status(200).json({
      success: true,
      authenticated: true,
      user: user.toPublicProfile(),
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Invalidate server-side session and clear session cookie
 * POST /api/auth/logout
 */
export function logout(req, res, next) {
  if (!req.session) {
    return res.status(200).json({
      success: true,
      message: 'Already signed out.',
    });
  }

  const cookieName = process.env.SESSION_COOKIE_NAME || 'interview_hub_sid';

  req.session.destroy((err) => {
    if (err) {
      return next(err);
    }
    res.clearCookie(cookieName, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    });
    return res.status(200).json({
      success: true,
      message: 'Logged out successfully.',
    });
  });
}
