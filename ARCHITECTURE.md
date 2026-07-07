# 🏗️ AziAuth Architecture & Security Guide

## 📚 Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Authentication Flow](#authentication-flow)
3. [Security Features](#security-features)
4. [Session Management](#session-management)
5. [Protected Routes](#protected-routes)
6. [Server Actions](#server-actions)
7. [Error Handling](#error-handling)

## Architecture Overview

### Technology Stack

```
┌─────────────────────────────────────────────┐
│              Frontend Layer                 │
│  - Next.js 14 (App Router)                 │
│  - React 18 (UI Components)                │
│  - Tailwind CSS (Styling)                  │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│         Clerk Authentication                │
│  - User Management                         │
│  - Session Handling                        │
│  - OAuth Integration                       │
└─────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────┐
│             Backend Layer                   │
│  - Server Actions (Next.js)                │
│  - API Routes (/api)                       │
│  - Middleware (Route Protection)           │
└─────────────────────────────────────────────┘
```

### Project Structure

```
AziAuth/
├── app/                      # Next.js app directory
│   ├── (auth)/              # Auth layout group
│   │   ├── sign-in/         # Sign-in page
│   │   └── sign-up/         # Sign-up page
│   ├── dashboard/           # Protected dashboard
│   ├── api/                 # API routes
│   │   └── auth/
│   │       └── user/        # Get user session endpoint
│   ├── layout.tsx           # Root layout with Clerk provider
│   ├── page.tsx             # Home page
│   └── globals.css          # Global styles
├── components/              # Reusable React components
│   └── Header.tsx           # Navigation header
├── lib/                     # Utility & server action functions
│   └── auth-actions.ts      # Server actions for auth
├── types/                   # TypeScript type definitions
│   └── auth.ts              # Auth-related types
├── utils/                   # Helper functions
│   └── auth-utils.ts        # Auth utility functions
├── middleware.ts            # Route protection middleware
├── .env.local               # Environment variables (local)
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.js       # Tailwind CSS configuration
└── package.json             # Dependencies
```

## Authentication Flow

### 1. User Registration

```
User visits /sign-up
        │
        ▼
Fills registration form
        │
        ▼
Submits to Clerk
        │
        ▼
Email verification (if required)
        │
        ▼
User account created
        │
        ▼
Redirect to /dashboard
```

### 2. User Login

```
User visits /sign-in
        │
        ▼
Selects auth method:
├── Email/Password
├── Google OAuth
└── GitHub OAuth
        │
        ▼
Clerk validates credentials
        │
        ▼
Session created & cookie set
        │
        ▼
Redirect to /dashboard
```

### 3. Protected Route Access

```
User requests /dashboard
        │
        ▼
Middleware intercepts request
        │
        ├─ Has valid session? ──Yes──▶ Allow access ──▶ User views dashboard
        │
        └─ No valid session ────▶ Redirect to /sign-in ──▶ User signs in
```

## Security Features

### 1. Session Management

**Cookie-based Sessions:**
- Clerk manages secure, HTTP-only cookies
- Session cookies are automatically validated
- Cookies expire after configurable time (default: 24 hours)
- Renewal happens transparently on API calls

```typescript
// Accessing session in server-side code
import { auth, currentUser } from '@clerk/nextjs';

export async function MyServerAction() {
  const { userId, sessionId } = auth(); // Secure session data
  const user = await currentUser();      // User from session
}
```

### 2. Route Protection

**Middleware-based Protection:**
- Runs on every request before reaching route handlers
- No unauthenticated user can reach protected routes
- Automatic redirection to sign-in page

```typescript
// middleware.ts
export default authMiddleware({
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)'],
});
```

### 3. Token Security

**Access Token Handling:**
- JWTs issued by Clerk for user identification
- Tokens verified on each API request
- Short-lived tokens (default: 15 minutes)
- Refresh tokens handled automatically

### 4. OAuth Security

**Social Provider Integration:**
- OAuth 2.0 authorization code flow
- No password sharing with third-party apps
- User consent required for data access
- Provider account linking to Clerk user

**Supported Providers:**
- ✅ Google (Gmail + Google Account)
- ✅ GitHub (Developer Accounts)
- ✅ Email/Password (Native)

### 5. CORS & CSRF Protection

- Clerk handles CORS automatically
- CSRF tokens embedded in forms
- SameSite cookie policy enforced
- Origin validation on API calls

## Session Management

### Creating Sessions

Clerk automatically creates sessions when:
- User completes sign-up
- User completes sign-in
- User links OAuth account

### Validating Sessions

```typescript
// Server Action - Secure validation
import { auth } from '@clerk/nextjs';

export async function validateSession() {
  const { userId, sessionId } = auth();
  
  if (!userId) {
    return { valid: false };
  }
  
  return { valid: true, userId, sessionId };
}
```

### Session Lifecycle

```
Session Created
    │
    ├─ Active for duration (default 24 hours)
    │
    ├─ On each request
    │  ├─ Validate token
    │  └─ Refresh if needed
    │
    └─ On expiration
       └─ User redirected to sign-in
```

### Handling Session Expiration

Users are automatically redirected to sign-in when:
- Session expires
- User signs out
- Session invalidated by admin
- Multiple sign-ins detected

## Protected Routes

### Route Configuration

**Public Routes** (no authentication required):
```
/ (home)
/sign-in
/sign-up
```

**Protected Routes** (authentication required):
```
/dashboard (user dashboard)
/api/auth/* (authentication endpoints)
```

### Implementing Route Protection

```typescript
// In middleware.ts
export default authMiddleware({
  publicRoutes: ['/', '/sign-in(.*)', '/sign-up(.*)'],
});

// Usage in components
import { SignedIn, SignedOut } from '@clerk/nextjs';

export function Component() {
  return (
    <>
      <SignedIn>
        {/* Only shown to authenticated users */}
      </SignedIn>
      
      <SignedOut>
        {/* Only shown to unauthenticated users */}
      </SignedOut>
    </>
  );
}
```

## Server Actions

### What Are Server Actions?

Server Actions are async functions that run on the server:
- ✅ Secure - Direct database/API access without exposure
- ✅ Private - Code never sent to browser
- ✅ Authenticated - Access to session data

### Creating Server Actions

```typescript
// lib/auth-actions.ts
'use server'; // Mark as server action

import { auth } from '@clerk/nextjs';

export async function getCurrentUser() {
  const { userId } = auth();
  
  if (!userId) {
    return null;
  }
  
  // Fetch from database (database not exposed)
  const user = await db.user.findUnique({
    where: { clerkId: userId }
  });
  
  return user;
}
```

### Using Server Actions from Client

```typescript
'use client';

import { getCurrentUser } from '@/lib/auth-actions';

export function Dashboard() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    getCurrentUser().then(setUser);
  }, []);
  
  return <div>{user?.name}</div>;
}
```

### Available Server Actions

1. **`getCurrentUser()`**
   - Fetches authenticated user info
   - Returns: User profile object

2. **`getUserProviders()`**
   - Gets connected OAuth providers
   - Returns: Array of provider info

3. **`validateSession()`**
   - Verifies active session
   - Returns: Session validation status

## Error Handling

### Authentication Errors

```typescript
// Sign-in error
try {
  await signInWithPassword({
    email,
    password,
  });
} catch (error) {
  // Handle error:
  // - Invalid credentials
  // - Account not found
  // - Too many attempts
}
```

### Session Errors

```typescript
// Session validation error
try {
  const { userId } = auth();
  if (!userId) {
    // User not authenticated
    // Redirect to sign-in
  }
} catch (error) {
  // Session error - redirect to sign-in
}
```

### API Error Responses

```typescript
// GET /api/auth/user
// Success (200)
{
  "userId": "user_123",
  "sessionId": "sess_456",
  "timestamp": "2024-01-15T10:30:00.000Z"
}

// Error (401)
{
  "error": "Unauthorized"
}

// Error (500)
{
  "error": "Internal server error"
}
```

## Security Best Practices

### ✅ Dos

- ✅ Always use `'use server'` for sensitive operations
- ✅ Validate user identity before operations
- ✅ Use environment variables for secrets
- ✅ Implement rate limiting for APIs
- ✅ Log security events
- ✅ Rotate API keys regularly
- ✅ Use HTTPS in production
- ✅ Keep dependencies updated

### ❌ Don'ts

- ❌ Never expose private keys in client code
- ❌ Don't trust client-side authentication
- ❌ Don't store passwords in databases (Clerk handles this)
- ❌ Don't ignore expired sessions
- ❌ Don't commit `.env.local` to repository
- ❌ Don't skip middleware setup
- ❌ Don't expose sensitive user data in logs
- ❌ Don't disable CORS validation

## Deployment Security

### Environment Variables

Set in production environment:
```
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY (public)
CLERK_SECRET_KEY (secret)
DATABASE_URL (if using database)
```

### HTTPS Enforcement

- Always use HTTPS URLs in production
- Set secure cookies flag
- Enable HSTS headers

### Monitoring

- Monitor authentication logs
- Track failed login attempts
- Alert on suspicious activity
- Review session management

---

**Security is everyone's responsibility. Review and update regularly!** 🔒
