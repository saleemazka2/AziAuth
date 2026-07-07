'use client';

import { UserProfile, SignOutButton } from '@clerk/nextjs';
import { useUser } from '@clerk/nextjs';
import Link from 'next/link';
import Image from 'next/image';

export default function DashboardPage() {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900">
            Welcome, {user?.firstName || user?.username || 'User'}! 👋
          </h1>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
            ← Back Home
          </Link>
        </div>

        {/* User Profile Card */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Quick Profile Info */}
          <div className="lg:col-span-1">
            <div className="card">
              <div className="flex flex-col items-center">
                {user?.imageUrl ? (
                  <Image
                    src={user.imageUrl}
                    alt={user?.username || 'User'}
                    width={80}
                    height={80}
                    className="rounded-full mb-4"
                  />
                ) : (
                  <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center mb-4">
                    <span className="text-3xl text-white font-bold">
                      {user?.firstName?.charAt(0) || 'U'}
                    </span>
                  </div>
                )}
                <h2 className="text-2xl font-bold text-gray-900">
                  {user?.firstName} {user?.lastName}
                </h2>
                <p className="text-gray-600 mt-2">@{user?.username}</p>
              </div>

              <div className="mt-6 space-y-3 border-t pt-6">
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-gray-900 font-medium">
                    {user?.emailAddresses[0]?.emailAddress}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">User ID</p>
                  <p className="text-gray-900 font-mono text-sm break-all">
                    {user?.id}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Account Created</p>
                  <p className="text-gray-900 font-medium">
                    {user?.createdAt?.toLocaleDateString()}
                  </p>
                </div>
              </div>

              <SignOutButton>
                <button className="w-full mt-6 btn btn-primary">
                  Sign Out
                </button>
              </SignOutButton>
            </div>
          </div>

          {/* Full Profile Manager */}
          <div className="lg:col-span-2 card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              Manage Your Profile
            </h3>
            <UserProfile
              appearance={{
                baseTheme: undefined,
                elements: {
                  cardBox: 'shadow-none',
                  card: 'bg-transparent',
                  navbarButton: 'text-blue-600',
                  profileSection: 'border-gray-200',
                  formFieldInput:
                    'border-2 border-gray-300 rounded focus:border-blue-600',
                  formButtonPrimary: 'bg-blue-600 hover:bg-blue-700',
                },
              }}
            />
          </div>
        </div>

        {/* Activity Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="card">
            <div className="text-3xl mb-2">📱</div>
            <h4 className="font-semibold text-gray-900">Connected Devices</h4>
            <p className="text-sm text-gray-600 mt-2">
              View and manage devices connected to your account
            </p>
          </div>

          <div className="card">
            <div className="text-3xl mb-2">🔐</div>
            <h4 className="font-semibold text-gray-900">Security Settings</h4>
            <p className="text-sm text-gray-600 mt-2">
              Update your password and security preferences
            </p>
          </div>

          <div className="card">
            <div className="text-3xl mb-2">✅</div>
            <h4 className="font-semibold text-gray-900">Verified Providers</h4>
            <p className="text-sm text-gray-600 mt-2">
              Connected OAuth providers: Google, GitHub, and more
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
