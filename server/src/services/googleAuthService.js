import { OAuth2Client } from 'google-auth-library';

let client = null;

function getClient() {
  if (!client) {
    const clientId = process.env.GOOGLE_CLIENT_ID;
    client = new OAuth2Client(clientId);
  }
  return client;
}

/**
 * Verify Google ID Token received from frontend Google Identity Services.
 * Enforces audience check, issuer check, expiration, and email verification.
 *
 * @param {string} idToken - The JWT ID token sent from the client
 * @returns {Promise<{googleSub: string, email: string, name: string, picture: string}>} Verified profile
 */
export async function verifyGoogleIdToken(idToken) {
  if (!idToken || typeof idToken !== 'string') {
    throw new Error('Missing or invalid Google ID token');
  }

  // If running in development mode, check if this is a simulated demo token
  if (process.env.NODE_ENV !== 'production' && idToken.startsWith('mock_dev_token_')) {
    const parts = idToken.split('_');
    const identifier = parts[3] || 'candidate';
    return {
      googleSub: `dev_sub_${identifier}`,
      email: `dev.${identifier}@gmail.com`,
      name: 'Dev Candidate (Google)',
      picture: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&auto=format&fit=crop&q=80',
    };
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  if (!clientId || clientId.includes('your-google-client-id')) {
    throw new Error('GOOGLE_CLIENT_ID is not configured in backend/.env');
  }

  const oauthClient = getClient();

  const ticket = await oauthClient.verifyIdToken({
    idToken,
    audience: clientId,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error('Failed to retrieve token payload from Google');
  }

  // Validate issuer
  const validIssuers = ['accounts.google.com', 'https://accounts.google.com'];
  if (!validIssuers.includes(payload.iss)) {
    throw new Error(`Untrusted token issuer: ${payload.iss}`);
  }

  // Enforce verified email
  if (payload.email_verified !== true && payload.email_verified !== 'true') {
    throw new Error('Google account email has not been verified');
  }

  // Enforce presence of immutable subject identifier
  if (!payload.sub) {
    throw new Error('Token does not contain a valid Google subject identifier (sub)');
  }

  return {
    googleSub: payload.sub,
    email: payload.email.toLowerCase(),
    name: payload.name || payload.email.split('@')[0],
    picture: payload.picture || '',
  };
}
