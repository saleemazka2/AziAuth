import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

/**
 * GET /api/auth/user
 * Retrieves current user session information using Clerk auth
 */
export async function GET() {
  try {
    const { userId, sessionId } = auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      userId,
      sessionId,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Auth error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
