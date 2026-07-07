import Link from 'next/link';
import { SignedIn, SignedOut } from '@clerk/nextjs';

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Welcome to <span className="text-blue-600">AziAuth</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8">
          A secure authentication system with Clerk. Login with social providers or email/password.
        </p>

        <div className="space-y-4">
          <SignedOut>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-in"
                className="btn btn-primary"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="btn btn-secondary"
              >
                Sign Up
              </Link>
            </div>
          </SignedOut>

          <SignedIn>
            <div className="card">
              <p className="text-lg text-gray-700 mb-4">
                You are already signed in!
              </p>
              <Link
                href="/dashboard"
                className="btn btn-primary inline-block"
              >
                Go to Dashboard
              </Link>
            </div>
          </SignedIn>
        </div>

        {/* Features Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <div className="text-3xl mb-4">🔐</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Secure Login
            </h3>
            <p className="text-gray-600">
              Industry-standard security with email/password authentication.
            </p>
          </div>

          <div className="card">
            <div className="text-3xl mb-4">🌐</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Social Login
            </h3>
            <p className="text-gray-600">
              Quick signup with Google and GitHub OAuth providers.
            </p>
          </div>

          <div className="card">
            <div className="text-3xl mb-4">👤</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              User Profiles
            </h3>
            <p className="text-gray-600">
              View and manage your profile information easily.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
