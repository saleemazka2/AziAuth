'use server';

import { auth, currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

/**
 * Get current authenticated user
 * Server Action that fetches user data with secure cookie session
 */
export async function getCurrentUser() {
  try {
    const { userId } = auth();

    if (!userId) {
      redirect('/sign-in');
    }

    const user = await currentUser();

    return {
      success: true,
      user: {
        id: user?.id,
        email: user?.emailAddresses[0]?.emailAddress,
        firstName: user?.firstName,
        lastName: user?.lastName,
        imageUrl: user?.imageUrl,
        username: user?.username,
        phoneNumber: user?.phoneNumbers[0]?.phoneNumber,
        createdAt: user?.createdAt,
      },
    };
  } catch (error) {
    console.error('Error fetching user:', error);
    return {
      success: false,
      error: 'Failed to fetch user data',
    };
  }
}

/**
 * Get user's connected OAuth providers
 * Server Action for fetching linked external accounts
 */
export async function getUserProviders() {
  try {
    const user = await currentUser();

    if (!user) {
      return {
        success: false,
        error: 'User not found',
      };
    }

    const providers = user.externalAccounts.map((account) => ({
      provider: account.provider,
      id: account.externalId,
      email: account.emailAddress,
    }));

    return {
      success: true,
      providers,
    };
  } catch (error) {
    console.error('Error fetching providers:', error);
    return {
      success: false,
      error: 'Failed to fetch OAuth providers',
    };
  }
}

/**
 * Validate user session
 * Server Action to verify active session
 */
export async function validateSession() {
  try {
    const { userId, sessionId } = auth();

    if (!userId || !sessionId) {
      return {
        success: false,
        valid: false,
        message: 'No active session',
      };
    }

    return {
      success: true,
      valid: true,
      userId,
      sessionId,
    };
  } catch (error) {
    console.error('Session validation error:', error);
    return {
      success: false,
      valid: false,
      error: 'Session validation failed',
    };
  }
}
