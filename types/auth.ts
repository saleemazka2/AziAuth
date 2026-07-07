/**
 * Type definitions for the AziAuth application
 */

/**
 * User profile information
 */
export interface UserProfile {
  id: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  imageUrl?: string;
  username?: string;
  phoneNumber?: string;
  createdAt?: Date;
}

/**
 * OAuth provider information
 */
export interface OAuthProvider {
  provider: string;
  id: string;
  email?: string;
}

/**
 * User session information
 */
export interface UserSession {
  userId: string;
  sessionId: string;
  timestamp: string;
}

/**
 * API response format
 */
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Authentication action response
 */
export interface AuthActionResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

/**
 * User action response for server actions
 */
export interface UserActionResponse {
  success: boolean;
  user?: UserProfile;
  error?: string;
}

/**
 * Session validation response
 */
export interface SessionValidationResponse {
  success: boolean;
  valid: boolean;
  userId?: string;
  sessionId?: string;
  error?: string;
  message?: string;
}

/**
 * OAuth provider list response
 */
export interface ProvidersResponse {
  success: boolean;
  providers?: OAuthProvider[];
  error?: string;
}
