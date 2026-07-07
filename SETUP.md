# 🚀 AziAuth Setup Guide

Complete guide to set up and configure the AziAuth authentication system.

## 📋 Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Clerk Setup](#clerk-setup)
4. [Environment Configuration](#environment-configuration)
5. [Running the App](#running-the-app)
6. [Testing Authentication](#testing-authentication)
7. [Deployment](#deployment)

## Prerequisites

### Required
- **Node.js**: Version 16.x or higher
  - Download from [nodejs.org](https://nodejs.org)
  - Verify installation: `node --version`

- **npm or yarn**: Comes with Node.js
  - Verify: `npm --version`

### Accounts Needed
- **Clerk Account** (Free): [https://clerk.com](https://clerk.com)
- **GitHub Account** (Optional for OAuth): [https://github.com](https://github.com)
- **Google Account** (Optional for OAuth): [https://google.com](https://google.com)

## Installation

### Step 1: Navigate to Project Directory

```bash
cd path/to/AziAuth
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`:
- Next.js
- React
- Clerk (Authentication)
- Tailwind CSS
- TypeScript

## Clerk Setup

### Step 1: Create Clerk Account

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Sign up with your email or GitHub account
3. Click "Create Application"
4. Choose your preferred authentication methods

### Step 2: Get API Keys

1. In Clerk Dashboard, go to **API Keys** (left sidebar)
2. Copy the following:
   - **Publishable Key** (starts with `pk_`)
   - **Secret Key** (starts with `sk_`)

### Step 3: Set Up OAuth Providers (Optional)

#### Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google+ API
4. Create OAuth 2.0 credentials:
   - Application type: Web Application
   - Authorized redirect URIs: `http://localhost:3000/sso/oauth/google/callback`
5. Copy **Client ID** and **Client Secret**
6. In Clerk Dashboard:
   - Go to **Social Connections**
   - Click **Google**
   - Paste Client ID and Client Secret
   - Click **Save**

#### GitHub OAuth

1. Go to [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in:
   - **Application name**: AziAuth
   - **Homepage URL**: `http://localhost:3000`
   - **Authorization callback URL**: `http://localhost:3000/sso/oauth/github/callback`
4. Copy **Client ID** and **Client Secret**
5. In Clerk Dashboard:
   - Go to **Social Connections**
   - Click **GitHub**
   - Paste Client ID and Client Secret
   - Click **Save**

## Environment Configuration

### Step 1: Create `.env.local`

```bash
# Copy from .env.local template (already exists)
# Update with your Clerk credentials
```

### Step 2: Update `.env.local` with Your Keys

Open `.env.local` and replace placeholders:

```env
# Clerk API Keys (from Clerk Dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Clerk URLs (already configured)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### Step 3: Verify Configuration

Make sure `.env.local` includes:
- ✅ `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- ✅ `CLERK_SECRET_KEY`
- ✅ All `NEXT_PUBLIC_CLERK_*` URLs

## Running the App

### Development Server

```bash
npm run dev
```

Output should show:
```
> ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Access the App

Open your browser and go to: **http://localhost:3000**

### Building for Production

```bash
npm run build
npm start
```

## Testing Authentication

### Test Sign-Up

1. Click "Sign Up" button
2. Try different methods:
   - ✅ Email/Password registration
   - ✅ Google OAuth (if configured)
   - ✅ GitHub OAuth (if configured)
3. Create account and verify email (if needed)

### Test Sign-In

1. Click "Sign In" button
2. Enter credentials or use OAuth
3. Should redirect to `/dashboard`

### Test Protected Routes

1. Try accessing `/dashboard` without signing in
2. Should redirect to `/sign-in`
3. After signing in, should access `/dashboard`

### Test User Profile

1. Go to `/dashboard`
2. View your profile information:
   - Name, email, username
   - Profile picture (if set)
   - Account creation date
3. Click "Manage Your Profile" to edit information
4. View connected OAuth providers

### Test Sign-Out

1. Click your profile picture in top-right
2. Click "Sign Out"
3. Should redirect to home page
4. Should not be able to access `/dashboard`

## Common Issues & Solutions

### Issue: "Publishable key missing"

**Solution:**
1. Check `.env.local` has `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
2. Restart development server: `Ctrl+C` then `npm run dev`
3. Clear browser cache: `Ctrl+Shift+Delete`

### Issue: OAuth buttons not showing

**Solution:**
1. Verify OAuth provider is enabled in Clerk Dashboard
2. Check credentials are correct
3. Restart development server

### Issue: Redirect loops

**Solution:**
1. Clear browser cookies
2. Check middleware configuration in `middleware.ts`
3. Verify environment variables

### Issue: "User not found" error

**Solution:**
1. Ensure you're using a valid Clerk account
2. Check Clerk Dashboard > Users to see registered users
3. Try signing up again

## Deployment

### Deploy to Vercel

#### Step 1: Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit: AziAuth setup"
git remote add origin https://github.com/yourusername/AziAuth.git
git push -u origin main
```

#### Step 2: Deploy on Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Select your GitHub repository
4. Add environment variables:
   - `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
   - `CLERK_SECRET_KEY`
5. Click "Deploy"

#### Step 3: Update Clerk Configuration

1. In Clerk Dashboard, go to **Deployments**
2. Add your Vercel URL to **Allowed Origins**
3. Update OAuth redirect URIs if needed

### Deploy to Other Platforms

The app can be deployed to:
- **Netlify**: Supports Next.js with functions
- **Railway**: Full Node.js support
- **Heroku**: With buildpack configuration
- **AWS Amplify**: Next.js optimized

## Security Best Practices

✅ **Never commit `.env.local`** - Already in `.gitignore`

✅ **Rotate API Keys** - Periodically in Clerk Dashboard

✅ **Use HTTPS** - Always use HTTPS in production

✅ **Validate Sessions** - Middleware handles this automatically

✅ **Keep Dependencies Updated** - Run `npm update` regularly

## Next Steps

After successful setup:

1. **Customize Styling**
   - Edit `app/globals.css`
   - Modify Tailwind in `tailwind.config.js`

2. **Add Database**
   - Integrate Prisma + PostgreSQL
   - Store user preferences

3. **Enhance Features**
   - Add two-factor authentication
   - Implement email verification templates
   - Create admin dashboard

4. **Monitor & Maintain**
   - Check Clerk Dashboard for logs
   - Monitor server errors in console
   - Test regularly

## Support

- **Clerk Docs**: https://clerk.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind CSS**: https://tailwindcss.com/docs
- **GitHub Issues**: Create issue in repository

---

**Happy authenticating! 🔐**
