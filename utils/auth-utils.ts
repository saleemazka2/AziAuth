/**
 * Utility functions for authentication and session management
 */

/**
 * Check if user is authenticated
 * @param userId - User ID from Clerk
 * @returns boolean
 */
export const isAuthenticated = (userId: string | null | undefined): boolean => {
  return !!userId;
};

/**
 * Format user display name
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Formatted display name
 */
export const formatUserName = (firstName?: string, lastName?: string): string => {
  if (firstName && lastName) {
    return `${firstName} ${lastName}`;
  }
  return firstName || lastName || 'User';
};

/**
 * Format email for display
 * @param email - Email address
 * @returns Truncated email or full email
 */
export const formatEmail = (email: string, maxLength: number = 30): string => {
  if (email.length > maxLength) {
    return email.substring(0, maxLength) + '...';
  }
  return email;
};

/**
 * Get user initials for avatar
 * @param firstName - User's first name
 * @param lastName - User's last name
 * @returns Two letter initials
 */
export const getUserInitials = (firstName?: string, lastName?: string): string => {
  const first = firstName?.charAt(0) || '';
  const last = lastName?.charAt(0) || '';
  return (first + last).toUpperCase() || 'U';
};

/**
 * Format date for display
 * @param date - Date object or string
 * @returns Formatted date string
 */
export const formatDate = (date?: Date | string): string => {
  if (!date) return 'N/A';
  
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return dateObj.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Validate email format
 * @param email - Email to validate
 * @returns true if valid email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Truncate text with ellipsis
 * @param text - Text to truncate
 * @param maxLength - Maximum length
 * @returns Truncated text
 */
export const truncateText = (text: string, maxLength: number = 50): string => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copied
 */
export const copyToClipboard = async (text: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(text);
  } catch (err) {
    console.error('Failed to copy:', err);
    throw err;
  }
};
