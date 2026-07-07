# 🧪 Testing & Troubleshooting Guide

## 📋 Testing Checklist

### Pre-Deployment Testing

- [ ] Sign-up with email/password works
- [ ] Sign-up with Google OAuth works
- [ ] Sign-up with GitHub OAuth works
- [ ] Sign-in redirects to dashboard
- [ ] Sign-out works and redirects home
- [ ] Protected routes redirect to sign-in
- [ ] User profile displays correctly
- [ ] Profile can be edited
- [ ] Environment variables are configured

### Functional Tests

#### Test 1: Email/Password Registration

1. Navigate to `http://localhost:3000/sign-up`
2. Enter email and password
3. Click "Create account"
4. Verify email (if required)
5. Should be redirected to `/dashboard`
6. Verify user info is displayed

**Expected:**
- ✅ Account created in Clerk Dashboard
- ✅ User appears in Users list
- ✅ Session created automatically
- ✅ Redirect successful

#### Test 2: OAuth Registration (Google)

1. Navigate to `/sign-up`
2. Click "Google" button
3. Sign in with Google account
4. Grant permissions
5. Should be redirected to `/dashboard`

**Expected:**
- ✅ User account linked to Google
- ✅ Profile picture loaded from Google
- ✅ Email auto-filled from Google
- ✅ No additional password required

#### Test 3: OAuth Registration (GitHub)

1. Navigate to `/sign-up`
2. Click "GitHub" button
3. Authorize application
4. Should be redirected to `/dashboard`

**Expected:**
- ✅ User account linked to GitHub
- ✅ GitHub username displayed
- ✅ Avatar loaded from GitHub
- ✅ Authorization complete

#### Test 4: Login Flow

1. Sign out (if logged in)
2. Navigate to `/sign-in`
3. Enter credentials
4. Click "Sign in"
5. Should be redirected to `/dashboard`

**Expected:**
- ✅ Session created
- ✅ Redirect successful
- ✅ User data displayed
- ✅ No re-login required on refresh

#### Test 5: Protected Routes

1. Open new browser tab
2. Navigate directly to `/dashboard` (logged out)
3. Should be redirected to `/sign-in`
4. Login
5. Should be able to access `/dashboard`

**Expected:**
- ✅ Unauthenticated access blocked
- ✅ Redirect to sign-in page
- ✅ After login, dashboard accessible
- ✅ Page persists after F5 refresh

#### Test 6: Session Expiration

1. Login to application
2. Open DevTools > Application > Cookies
3. Find `__session` cookie
4. Delete the cookie
5. Refresh page
6. Should redirect to `/sign-in`

**Expected:**
- ✅ Session cookie removed
- ✅ Automatic redirect to sign-in
- ✅ Cannot access protected pages
- ✅ New login required

#### Test 7: Profile Management

1. Login and go to `/dashboard`
2. Click "Manage Your Profile"
3. Update user information:
   - First name
   - Last name
   - Profile picture
4. Save changes
5. Refresh page

**Expected:**
- ✅ Changes saved to Clerk
- ✅ Profile picture updated
- ✅ Changes persist after refresh
- ✅ No errors in console

#### Test 8: Sign Out

1. Login to application
2. Click user profile button (top-right)
3. Click "Sign out"
4. Should redirect to `/`
5. Should not see "Dashboard" link

**Expected:**
- ✅ Redirect to home page
- ✅ Session cleared
- ✅ Cannot access `/dashboard`
- ✅ Sign-in option available

---

## 🔧 Troubleshooting Guide

### Common Issues & Solutions

#### Issue 1: "Missing Clerk keys"

**Error:**
```
Error: NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY missing
```

**Causes:**
- `.env.local` not created
- Environment variable not set
- Typo in variable name
- Server not restarted after updating `.env.local`

**Solutions:**

1. Check `.env.local` exists:
   ```bash
   cat .env.local
   ```

2. Verify keys are present:
   ```bash
   grep CLERK .env.local
   ```

3. Restart development server:
   ```bash
   # Stop server: Ctrl+C
   npm run dev
   ```

4. Clear browser cache:
   - Chrome: Ctrl+Shift+Delete
   - Firefox: Ctrl+Shift+Delete
   - Safari: Cmd+Shift+Delete

5. Check in browser console for errors:
   - F12 > Console tab
   - Look for Clerk initialization errors

---

#### Issue 2: OAuth Buttons Not Showing

**Problem:**
- Sign-in page loads but OAuth buttons are missing
- Only "Email/Password" option available

**Causes:**
- OAuth provider not enabled in Clerk
- Invalid OAuth credentials
- Incorrect redirect URIs
- Cache issue

**Solutions:**

1. **Enable OAuth in Clerk:**
   - Go to Clerk Dashboard
   - Click Social Connections
   - Enable Google and/or GitHub
   - Add credentials

2. **Verify Redirect URIs:**
   - For Google: `http://localhost:3000/sso/oauth/google/callback`
   - For GitHub: `http://localhost:3000/sso/oauth/github/callback`

3. **Clear Clerk Cache:**
   - Open DevTools
   - Application > Cookies
   - Delete all Clerk cookies
   - Refresh page

4. **Check Configuration:**
   ```bash
   # Verify env variables
   echo $NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
   ```

---

#### Issue 3: "User Not Found" Error

**Problem:**
- Error after successful sign-up
- Cannot access user profile
- Dashboard shows error

**Causes:**
- Clerk not fully initialized
- User not synced to database
- Session not created

**Solutions:**

1. **Check User in Clerk Dashboard:**
   - Users > View all users
   - Search for your email
   - Verify account exists

2. **Restart Application:**
   ```bash
   # Stop dev server
   Ctrl+C
   
   # Restart
   npm run dev
   ```

3. **Check Logs:**
   - Terminal: Look for red errors
   - Browser console: F12 > Console

4. **Try Fresh Login:**
   - Clear all cookies
   - Sign out
   - Sign in again
   - Note any error messages

---

#### Issue 4: Redirect Loops

**Problem:**
- Redirecting between sign-in and dashboard
- Cannot stay on protected page
- Infinite loop in network requests

**Causes:**
- Invalid session handling
- Middleware misconfiguration
- Cookie issues
- Clerk not properly initialized

**Solutions:**

1. **Clear All Cookies:**
   ```javascript
   // In browser console:
   document.cookie.split(";").forEach(c => {
     document.cookie = c
       .replace(/^ +/, "")
       .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
   });
   location.reload();
   ```

2. **Check Middleware Configuration:**
   - Open `middleware.ts`
   - Verify `publicRoutes` array
   - Ensure `/sign-in` is in public routes

3. **Verify Environment Variables:**
   ```bash
   echo "NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=$NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL"
   ```

4. **Check Browser Network Tab:**
   - F12 > Network
   - Look for redirect chain
   - Check response codes (301, 302)
   - Verify redirect URLs

---

#### Issue 5: Profile Picture Not Loading

**Problem:**
- Profile picture shows broken image
- Avatar blank in header
- User initials showing instead of picture

**Causes:**
- Image URL invalid
- CORS issue
- Image URL configuration
- Slow image load

**Solutions:**

1. **Check Image URL:**
   - In browser, visit `user.imageUrl` directly
   - Should display user's profile picture
   - If 404, image doesn't exist

2. **Update next.config.js:**
   ```javascript
   images: {
     remotePatterns: [
       {
         protocol: 'https',
         hostname: '**.clerk.com',
       },
     ],
   }
   ```

3. **Use Image Component:**
   ```typescript
   import Image from 'next/image';
   
   <Image
     src={user.imageUrl}
     alt="User"
     width={40}
     height={40}
     onError={() => console.error('Image failed to load')}
   />
   ```

4. **Force Re-upload:**
   - Clerk Dashboard > Users
   - Select user
   - Re-upload profile picture
   - Refresh app

---

#### Issue 6: Server Action Errors

**Problem:**
- "Server Action failed"
- getCurrentUser() returns null
- TypeError in server action

**Causes:**
- Missing `'use server'` directive
- Incorrect import path
- Session not available
- Database connection issue

**Solutions:**

1. **Check `'use server'` Directive:**
   ```typescript
   // ✅ Correct
   'use server';
   
   export async function myAction() { }
   
   // ❌ Incorrect
   export async function myAction() {
     'use server'; // Too late!
   }
   ```

2. **Verify Auth Import:**
   ```typescript
   // Correct path
   import { auth } from '@clerk/nextjs';
   
   // Not from @clerk/clerk-react (client-side)
   ```

3. **Check Error Details:**
   - Look at server console output
   - Check browser DevTools
   - Review Clerk Dashboard logs

4. **Test with Simple Action:**
   ```typescript
   'use server';
   
   export async function test() {
     return { success: true };
   }
   ```

---

#### Issue 7: Email Not Verified

**Problem:**
- Account created but email unverified
- Cannot access application
- Verification email not sent

**Causes:**
- Email delivery disabled in Clerk
- Email address invalid
- User dismissed verification

**Solutions:**

1. **Resend Verification Email:**
   - Clerk Dashboard > Users
   - Select user
   - Click "Resend verification email"

2. **Skip Email Verification:**
   - Clerk Dashboard > Email Addresses
   - Toggle "Require email verification"
   - Off for development

3. **Check Email Settings:**
   - Verify email from address configured
   - Check spam folder for email
   - Verify domain DKIM/SPF records

---

### Debugging Techniques

#### Enable Debug Logging

```typescript
// In middleware.ts or route handler
if (process.env.DEBUG) {
  console.log('Session:', auth());
  console.log('User:', currentUser());
}
```

#### Use Browser DevTools

**Console Tab:**
- Look for red errors
- Check Clerk initialization messages
- Monitor network requests

**Network Tab:**
- Check API calls to Clerk
- Verify response status codes
- Look for failed requests
- Monitor cookies

**Application Tab:**
- View cookies (especially `__session`)
- Check local storage
- Review IndexedDB data

#### Monitor Server Logs

```bash
# Terminal shows server errors
npm run dev

# Look for:
# - Red error messages
# - Stack traces
# - Warnings
```

#### Check Clerk Logs

1. Clerk Dashboard > Logs
2. Filter by:
   - Event type
   - Date range
   - User
3. Look for:
   - Authentication events
   - OAuth events
   - Errors

---

## ✅ Verification Checklist

Before deploying to production:

- [ ] All test cases pass
- [ ] No console errors
- [ ] Environment variables set correctly
- [ ] OAuth configured in Clerk
- [ ] Email verification working
- [ ] Session management stable
- [ ] Error messages display properly
- [ ] Performance acceptable
- [ ] Mobile responsive
- [ ] Security headers present

---

## 📞 Support Resources

**Official Documentation:**
- [Clerk Docs](https://clerk.com/docs)
- [Clerk Discord](https://discord.gg/b5rXHjAg7b)
- [Next.js Docs](https://nextjs.org/docs)

**Issue Reporting:**
- Check existing issues first
- Provide error messages
- Include steps to reproduce
- Attach screenshots if visual issue

---

**Happy testing! Report any issues to improve the system.** 🧪
