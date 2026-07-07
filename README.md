# AziAuth - Secure Authentication System with Clerk

A comprehensive, production-ready authentication system built with **Next.js**, **Clerk**, **TypeScript**, and **Tailwind CSS**.

## 🎯 Features

✅ **Secure Authentication**
- Email/password authentication
- Social login (Google, GitHub)
- Session management with Clerk's server-side cookies

✅ **Protected Routes**
- Middleware-based route protection
- Automatic redirection for unauthenticated users
- Public and private route configuration

✅ **User Profiles**
- Dashboard with user information
- User profile management interface
- Connected OAuth providers display

✅ **Server-Side Security**
- Next.js Server Actions for secure data fetching
- API routes with authentication checks
- Middleware for route protection

## 📋 Prerequisites

- Node.js 16+ 
- npm or yarn
- Clerk account (free at https://clerk.com)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Clerk

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your credentials:
   - `Publishable Key`
   - `Secret Key`
4. Update `.env.local` with your credentials:

```bash
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key_here
CLERK_SECRET_KEY=your_key_here
```

### 3. Configure OAuth Providers (Optional)

In Clerk Dashboard:
1. Go to **Social Connections**
2. Enable **Google** and **GitHub**
3. Add your OAuth credentials

### 4. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see your app!

## 📁 Project Structure

```
AziAuth/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── user/route.ts          # Get user session API
│   ├── sign-in/
│   │   └── [[...sign-in]]/page.tsx    # Sign-in page
│   ├── sign-up/
│   │   └── [[...sign-up]]/page.tsx    # Sign-up page
│   ├── dashboard/
│   │   └── page.tsx                   # Protected dashboard
│   ├── layout.tsx                     # Root layout with Clerk provider
│   ├── page.tsx                       # Home page
│   └── globals.css                    # Global styles
├── components/
│   └── Header.tsx                     # Navigation header
├── lib/
│   └── auth-actions.ts                # Server actions for auth
├── middleware.ts                      # Route protection middleware
├── .env.local                         # Environment variables
├── tailwind.config.js                 # Tailwind configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies
```

## 🔒 Authentication Flow

### User Registration
1. User visits `/sign-up`
2. Enters email/password or selects OAuth provider
3. Clerk handles verification
4. Redirects to `/dashboard` on success

### User Login
1. User visits `/sign-in`
2. Enters credentials or selects OAuth provider
3. Clerk validates session
4. Redirects to `/dashboard` on success

### Protected Routes
- Middleware checks authentication on every request
- Unauthenticated users redirected to `/sign-in`
- Session cookies stored securely

## 🛣️ Routes

### Public Routes
- `/` - Home page
- `/sign-in` - Sign-in page
- `/sign-up` - Sign-up page

### Protected Routes
- `/dashboard` - User dashboard (requires authentication)

### API Routes
- `GET /api/auth/user` - Get current user session

## 🔧 Key Components

### Middleware (`middleware.ts`)
- Protects routes using `authMiddleware` from Clerk
- Configures public routes that don't require authentication
- Handles redirection for unauthenticated users

### Server Actions (`lib/auth-actions.ts`)
- `getCurrentUser()` - Fetch authenticated user info
- `getUserProviders()` - Get connected OAuth providers
- `validateSession()` - Verify active session

### Clerk Components
- `<ClerkProvider>` - Wraps app with authentication context
- `<SignIn>` - Pre-built sign-in form
- `<SignUp>` - Pre-built sign-up form
- `<UserButton>` - User profile dropdown
- `<SignedIn>` / `<SignedOut>` - Conditional rendering

## 🎨 Customization

### Styling
- Tailwind CSS for utility-first styling
- Custom button and card components in `globals.css`
- Clerk component styling via `appearance` prop

### User Profile
- Edit profile information in dashboard
- View connected OAuth providers
- Manage security settings

### Environment Variables
Update `.env.local` to customize:
- Sign-in URL: `NEXT_PUBLIC_CLERK_SIGN_IN_URL`
- Sign-up URL: `NEXT_PUBLIC_CLERK_SIGN_UP_URL`
- After sign-in redirect: `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL`
- After sign-up redirect: `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL`

## 🚢 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Import project in Vercel
3. Set environment variables
4. Deploy!

```bash
vercel
```

### Update Clerk URLs

In Clerk Dashboard:
1. Go to **Application URLs**
2. Set:
   - Allowed origins: `https://yourdomain.com`
   - Redirect URLs: `https://yourdomain.com/sign-in/sso-callback`

## 📚 API Reference

### GET /api/auth/user

Returns current user's session information.

**Response:**
```json
{
  "userId": "user_123",
  "sessionId": "sess_456",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### Server Actions

#### getCurrentUser()
```typescript
const result = await getCurrentUser();
// Returns: { success: true, user: {...} }
```

#### getUserProviders()
```typescript
const result = await getUserProviders();
// Returns: { success: true, providers: [...] }
```

#### validateSession()
```typescript
const result = await validateSession();
// Returns: { success: true, valid: true, userId, sessionId }
```

## 🐛 Troubleshooting

### "Missing Clerk keys" error
- Ensure `.env.local` has `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- Restart development server after updating `.env.local`

### OAuth providers not showing
- Enable providers in Clerk Dashboard
- Add OAuth app credentials
- Wait for changes to sync (usually instant)

### Users redirected to sign-in unexpectedly
- Check middleware configuration
- Verify environment variables are set
- Clear browser cookies and try again

## 📖 Resources

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Server Actions Guide](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)

## 📄 License

MIT License - feel free to use this project as a template!

## 💡 Next Steps

1. ✅ Add database integration (Prisma + PostgreSQL)
2. ✅ Implement user preferences storage
3. ✅ Add email verification templates
4. ✅ Create admin dashboard
5. ✅ Add two-factor authentication
6. ✅ Implement audit logs

---

**Built with ❤️ using Next.js and Clerk**
