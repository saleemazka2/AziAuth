# ⚡ Quick Reference Guide

## 🚀 Getting Started in 5 Minutes

### 1. Install & Setup (2 min)
```bash
cd AziAuth
npm install
```

### 2. Configure Clerk (2 min)
```bash
# Edit .env.local
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

### 3. Start Development (1 min)
```bash
npm run dev
# Visit http://localhost:3000
```

---

## 📝 Common Commands

### Development

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

### File Locations

| Purpose | Location |
|---------|----------|
| Home page | `app/page.tsx` |
| Sign-in | `app/sign-in/[[...sign-in]]/page.tsx` |
| Sign-up | `app/sign-up/[[...sign-up]]/page.tsx` |
| Dashboard | `app/dashboard/page.tsx` |
| Styles | `app/globals.css` |
| Components | `components/` |
| Server Actions | `lib/auth-actions.ts` |
| Middleware | `middleware.ts` |
| Types | `types/auth.ts` |

---

## 🔐 Authentication Patterns

### Check if User is Authenticated

```typescript
// In Server Action or API route
import { auth } from '@clerk/nextjs';

const { userId } = auth();
if (!userId) {
  throw new Error('Not authenticated');
}
```

### Get Current User

```typescript
// In Server Action
import { currentUser } from '@clerk/nextjs';

const user = await currentUser();
const email = user?.emailAddresses[0]?.emailAddress;
```

### Conditional Rendering

```typescript
// Client Component
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Component() {
  return (
    <>
      <SignedIn>
        <p>Welcome back!</p>
      </SignedIn>
      <SignedOut>
        <a href="/sign-in">Sign In</a>
      </SignedOut>
    </>
  );
}
```

### Add Server Action

```typescript
// lib/my-actions.ts
'use server';

import { auth } from '@clerk/nextjs';

export async function myAction() {
  const { userId } = auth();
  if (!userId) return;
  
  // Your logic here
  return result;
}
```

### Use Server Action in Component

```typescript
// components/MyComponent.tsx
'use client';

import { myAction } from '@/lib/my-actions';

export default function Component() {
  const handleClick = async () => {
    const result = await myAction();
  };
  
  return <button onClick={handleClick}>Click Me</button>;
}
```

---

## 🎨 Styling Tips

### Add CSS Class

```css
/* app/globals.css */
.my-class {
  @apply flex items-center justify-between p-4 bg-white;
}
```

### Use Tailwind Classes

```jsx
<div className="flex items-center justify-between p-4 bg-white rounded-lg shadow">
  <span className="text-lg font-semibold text-gray-900">
    Title
  </span>
  <button className="btn btn-primary">
    Action
  </button>
</div>
```

### Dark Mode (Optional Setup)

```javascript
// tailwind.config.js
module.exports = {
  darkMode: 'class',
  theme: {
    extend: {},
  },
};
```

---

## 🔗 Environment Variables

### Required

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

### Optional

```env
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### How to Update

1. Edit `.env.local`
2. Restart dev server: `Ctrl+C` → `npm run dev`
3. Changes should take effect

---

## 🛠️ Customization Quick Wins

### Change Button Color

```jsx
// app/page.tsx
<button className="btn btn-primary">Sign In</button>

// Customize in globals.css
.btn-primary {
  @apply bg-purple-600 hover:bg-purple-700;
}
```

### Add New Page

```typescript
// app/new-page/page.tsx
export default function NewPage() {
  return <h1>New Page</h1>;
}
// Automatically accessible at /new-page
```

### Add New Component

```typescript
// components/MyComponent.tsx
export default function MyComponent() {
  return <div>Component</div>;
}

// Use it
import MyComponent from '@/components/MyComponent';

<MyComponent />
```

### Add Protected Route

```typescript
// app/protected/page.tsx
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

export default function Protected() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <h1>Protected Content</h1>;
}
```

---

## 🐛 Quick Fixes

| Problem | Solution |
|---------|----------|
| Keys not working | Restart dev server |
| OAuth not showing | Enable in Clerk Dashboard |
| Page not updating | Clear cache: `Ctrl+Shift+Del` |
| Type errors | Run `npm install` |
| "Not authenticated" | Check middleware config |
| Profile not loading | Check `auth()` in server action |
| Redirect loops | Clear cookies in DevTools |

---

## 📱 Responsive Design

### Mobile First

```jsx
<div className="flex flex-col md:flex-row gap-4">
  <div className="w-full md:w-1/2">Item 1</div>
  <div className="w-full md:w-1/2">Item 2</div>
</div>
```

### Common Breakpoints

| Prefix | Width |
|--------|-------|
| `sm:` | 640px |
| `md:` | 768px |
| `lg:` | 1024px |
| `xl:` | 1280px |
| `2xl:` | 1536px |

---

## 🚢 Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "Deploy AziAuth"
git push

# 2. Import on Vercel
# vercel.com/new

# 3. Add environment variables
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
# CLERK_SECRET_KEY

# 4. Deploy and done!
```

---

## 📚 File Templates

### New Server Action

```typescript
'use server';

import { auth } from '@clerk/nextjs';

/**
 * Description of what this does
 * @param {param} description
 * @returns {type} description
 */
export async function actionName(param: string) {
  const { userId } = auth();
  
  if (!userId) {
    return { success: false, error: 'Not authenticated' };
  }
  
  try {
    // Your logic here
    
    return { success: true };
  } catch (error) {
    console.error('Error:', error);
    return { success: false, error: String(error) };
  }
}
```

### New API Route

```typescript
// app/api/route-name/route.ts
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }
    
    // Your logic here
    
    return NextResponse.json({ data: result });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
```

### New Component

```typescript
'use client';

import { useState, useEffect } from 'react';

interface ComponentProps {
  title: string;
}

export default function MyComponent({ title }: ComponentProps) {
  const [state, setState] = useState('');
  
  useEffect(() => {
    // Setup
  }, []);
  
  return (
    <div>
      <h1>{title}</h1>
      {/* Content */}
    </div>
  );
}
```

---

## 💡 Pro Tips

1. **Use TypeScript** - Catch errors early
2. **Test Regularly** - Don't leave bugs for later
3. **Keep `.env.local` Secret** - Never commit it
4. **Use Server Actions** - Simpler than API routes
5. **Check Types** - `types/auth.ts` has interfaces
6. **Read Error Messages** - They're usually helpful
7. **Monitor Console** - F12 > Console for errors
8. **Use DevTools** - Network tab for debugging

---

## 🔗 Resources

- [Clerk Quickstart](https://clerk.com/docs/quickstarts/nextjs)
- [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations)
- [Tailwind CSS Docs](https://tailwindcss.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Need help? Check README.md, SETUP.md, and TESTING.md for detailed guides!** 🚀
