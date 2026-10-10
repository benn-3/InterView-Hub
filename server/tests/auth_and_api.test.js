import test from 'node:test';
import assert from 'node:assert/strict';
import { createApp } from '../src/app.js';
import { verifyGoogleIdToken } from '../src/services/googleAuthService.js';

test('Backend Health & Security Test Suite', async (t) => {
  const app = createApp();

  await t.test('1. Google ID Token Verification rejects missing or empty tokens', async () => {
    await assert.rejects(
      async () => {
        await verifyGoogleIdToken('');
      },
      {
        message: 'Missing or invalid Google ID token',
      }
    );

    await assert.rejects(
      async () => {
        await verifyGoogleIdToken(null);
      },
      {
        message: 'Missing or invalid Google ID token',
      }
    );
  });

  await t.test('2. /api/health endpoint returns 200 OK', async () => {
    const server = app.listen(0);
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/api/health`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.status, 'ok');
      assert.equal(data.service, 'interview-guide-backend');
    } finally {
      server.close();
    }
  });

  await t.test('3. /api/auth/me returns unauthenticated status for anonymous visitor', async () => {
    const server = app.listen(0);
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/api/auth/me`);
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.success, true);
      assert.equal(data.authenticated, false);
      assert.equal(data.user, null);
    } finally {
      server.close();
    }
  });

  await t.test('4. Protected endpoints reject requests without active session with 401', async () => {
    const server = app.listen(0);
    const port = server.address().port;

    try {
      // User Profile
      const resUser = await fetch(`http://localhost:${port}/api/users/me`);
      assert.equal(resUser.status, 401);
      const dataUser = await resUser.json();
      assert.equal(dataUser.authenticated, false);

      // Study Progress
      const resProgress = await fetch(`http://localhost:${port}/api/progress`);
      assert.equal(resProgress.status, 401);

      // Quiz History
      const resQuiz = await fetch(`http://localhost:${port}/api/quizzes/history`);
      assert.equal(resQuiz.status, 401);

      // Complete Lesson action
      const resComplete = await fetch(`http://localhost:${port}/api/progress/lessons/oop_poly/complete`, {
        method: 'POST',
      });
      assert.equal(resComplete.status, 401);
    } finally {
      server.close();
    }
  });

  await t.test('5. Non-existent API routes return 404', async () => {
    const server = app.listen(0);
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/api/non_existent_endpoint`);
      assert.equal(res.status, 404);
      const data = await res.json();
      assert.equal(data.success, false);
    } finally {
      server.close();
    }
  });

  await t.test('6. Dynamic streak tracking: handles first activity, same-day deduplication, consecutive days, missed days, and longest streak preservation', async () => {
    const { recordUserActivityStreak, computeActiveStreak, getCalendarDate } = await import('../src/services/streakService.js');

    const mockUser = {
      streak: {
        currentStreak: 0,
        longestStreak: 0,
        lastActivityDate: null,
        totalActivities: 0,
      },
    };

    // 1. Initial state (brand new user with no activity)
    const initialActive = computeActiveStreak(mockUser.streak, 'UTC');
    assert.equal(initialActive.currentStreak, 0);
    assert.equal(initialActive.longestStreak, 0);
    assert.equal(initialActive.isActiveToday, false);

    // 2. Day 1: User completes first qualifying activity
    // Simulate Day 1 as '2026-10-01'
    mockUser.streak.lastActivityDate = null;
    const day1Streak = recordUserActivityStreak(mockUser, 'UTC');
    assert.equal(mockUser.streak.currentStreak, 1);
    assert.equal(mockUser.streak.longestStreak, 1);
    assert.equal(mockUser.streak.totalActivities, 1);

    // 3. Day 1: Second activity on the exact same day (must not increment streak)
    recordUserActivityStreak(mockUser, 'UTC');
    assert.equal(mockUser.streak.currentStreak, 1);
    assert.equal(mockUser.streak.longestStreak, 1);
    assert.equal(mockUser.streak.totalActivities, 2);

    // 4. Consecutive day: Yesterday was Day 1, today is Day 2
    const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000);
    mockUser.streak.lastActivityDate = getCalendarDate(yesterday, 'UTC');
    // Before studying today, streak remains active (grace period)
    const morningActive = computeActiveStreak(mockUser.streak, 'UTC');
    assert.equal(morningActive.currentStreak, 1);
    assert.equal(morningActive.isActiveToday, false);

    // Now user completes activity today
    recordUserActivityStreak(mockUser, 'UTC');
    assert.equal(mockUser.streak.currentStreak, 2);
    assert.equal(mockUser.streak.longestStreak, 2);

    // 5. Missed calendar day: User missed yesterday (e.g. last active 3 days ago)
    const threeDaysAgo = new Date(Date.now() - 3 * 24 * 60 * 60 * 1000);
    mockUser.streak.lastActivityDate = getCalendarDate(threeDaysAgo, 'UTC');
    const brokenActive = computeActiveStreak(mockUser.streak, 'UTC');
    assert.equal(brokenActive.currentStreak, 0, 'Missed day must drop active streak to 0');
    assert.equal(brokenActive.longestStreak, 2, 'Longest streak must be preserved');

    // 6. User resumes today after broken streak: restarts at 1, longest preserved at 2
    recordUserActivityStreak(mockUser, 'UTC');
    assert.equal(mockUser.streak.currentStreak, 1);
    assert.equal(mockUser.streak.longestStreak, 2, 'Longest streak must never decrease');
  });

  await t.test('7. /api/progress/dashboard rejects unauthenticated requests with 401', async () => {
    const server = app.listen(0);
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/api/progress/dashboard`);
      assert.equal(res.status, 401);
      const data = await res.json();
      assert.equal(data.authenticated, false);
    } finally {
      server.close();
    }
  });

  await t.test('8. Root endpoints (GET /, HEAD /, GET /api) return 200 OK for Render and load balancers', async () => {
    const server = app.listen(0);
    const port = server.address().port;

    try {
      // Test GET /
      const resGetRoot = await fetch(`http://localhost:${port}/`);
      assert.equal(resGetRoot.status, 200);
      const rootData = await resGetRoot.json();
      assert.equal(rootData.status, 'ok');

      // Test HEAD / (Render health check probe)
      const resHeadRoot = await fetch(`http://localhost:${port}/`, { method: 'HEAD' });
      assert.equal(resHeadRoot.status, 200);

      // Test GET /api
      const resGetApi = await fetch(`http://localhost:${port}/api`);
      assert.equal(resGetApi.status, 200);
      const apiData = await resGetApi.json();
      assert.equal(apiData.status, 'ok');
      assert.ok(apiData.endpoints);
    } finally {
      server.close();
    }
  });

  await t.test('9. Reverse proxy headers (X-Forwarded-For) pass through rate limiter without error', async () => {
    const server = app.listen(0);
    const port = server.address().port;

    try {
      const res = await fetch(`http://localhost:${port}/api/health`, {
        headers: {
          'X-Forwarded-For': '203.0.113.195, 70.41.3.18',
          'X-Forwarded-Proto': 'https',
        },
      });
      assert.equal(res.status, 200);
      const data = await res.json();
      assert.equal(data.status, 'ok');
    } finally {
      server.close();
    }
  });

  await t.test('10. End-to-end SSO session cycle, user data isolation, and logout invalidation', async () => {
    const server = app.listen(0);
    const port = server.address().port;

    try {
      // 1. Authenticate Alice with verified Google token
      const aliceLoginRes = await fetch(`http://localhost:${port}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: 'mock_dev_token_alice' }),
      });
      assert.equal(aliceLoginRes.status, 200);
      const aliceLoginData = await aliceLoginRes.json();
      assert.equal(aliceLoginData.authenticated, true);
      assert.equal(aliceLoginData.user.email, 'dev.alice@gmail.com');

      // Extract Alice's session cookie
      const rawAliceCookie = aliceLoginRes.headers.get('set-cookie');
      assert.ok(rawAliceCookie, 'Session cookie must be returned on login');
      const aliceCookie = rawAliceCookie.split(';')[0];

      // 2. Restore session via /api/auth/me with Alice's cookie
      const aliceMeRes = await fetch(`http://localhost:${port}/api/auth/me`, {
        headers: { Cookie: aliceCookie },
      });
      assert.equal(aliceMeRes.status, 200);
      const aliceMeData = await aliceMeRes.json();
      assert.equal(aliceMeData.authenticated, true);
      assert.equal(aliceMeData.user.email, 'dev.alice@gmail.com');

      // 3. Save Alice's progress (sync completed lessons)
      const syncRes = await fetch(`http://localhost:${port}/api/progress`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Cookie: aliceCookie,
        },
        body: JSON.stringify({
          completedLessonIds: ['dsa_binary_search', 'sql_joins'],
          bookmarkedLessonIds: ['aws_ec2'],
        }),
      });
      assert.equal(syncRes.status, 200);

      // Verify Alice's saved progress
      const aliceProgRes = await fetch(`http://localhost:${port}/api/progress`, {
        headers: { Cookie: aliceCookie },
      });
      assert.equal(aliceProgRes.status, 200);
      const aliceProgData = await aliceProgRes.json();
      assert.deepEqual(aliceProgData.progress.completedLessonIds, ['dsa_binary_search', 'sql_joins']);

      // 4. Authenticate Bob with distinct Google account
      const bobLoginRes = await fetch(`http://localhost:${port}/api/auth/google`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken: 'mock_dev_token_bob' }),
      });
      assert.equal(bobLoginRes.status, 200);
      const bobLoginData = await bobLoginRes.json();
      assert.equal(bobLoginData.user.email, 'dev.bob@gmail.com');

      const rawBobCookie = bobLoginRes.headers.get('set-cookie');
      const bobCookie = rawBobCookie.split(';')[0];

      // 5. Verify User Isolation: Bob must NOT see Alice's data
      const bobProgRes = await fetch(`http://localhost:${port}/api/progress`, {
        headers: { Cookie: bobCookie },
      });
      assert.equal(bobProgRes.status, 200);
      const bobProgData = await bobProgRes.json();
      assert.deepEqual(bobProgData.progress.completedLessonIds, [], 'Bob cannot access Alice private progress');

      // 6. Sign out Alice via /api/auth/logout
      const aliceLogoutRes = await fetch(`http://localhost:${port}/api/auth/logout`, {
        method: 'POST',
        headers: { Cookie: aliceCookie },
      });
      assert.equal(aliceLogoutRes.status, 200);

      // 7. Verify Alice session is revoked: subsequent request must return 401
      const aliceRevokedRes = await fetch(`http://localhost:${port}/api/progress`, {
        headers: { Cookie: aliceCookie },
      });
      assert.equal(aliceRevokedRes.status, 401, 'Logged out session must reject requests with 401');
    } finally {
      server.close();
    }
  });
});
