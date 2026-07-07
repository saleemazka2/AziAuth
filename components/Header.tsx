'use client';

import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  // Don't show header on auth pages
  if (pathname?.includes('/sign-in') || pathname?.includes('/sign-up')) {
    return null;
  }

  return (
    <header className="bg-white shadow">
      <nav className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          AziAuth
        </Link>

        {/* Navigation */}
        <div className="flex items-center gap-6">
          <SignedOut>
            <Link
              href="/sign-in"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="btn btn-primary"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <Link
              href="/dashboard"
              className={`font-medium transition-colors ${
                pathname === '/dashboard'
                  ? 'text-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </Link>
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: 'w-10 h-10',
                },
              }}
            />
          </SignedIn>
        </div>
      </nav>
    </header>
  );
}
