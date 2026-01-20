'use client';

import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useAuthStore, formatDate } from '@app/core';

export default function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  if (!isAuthenticated || !user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <h1 className="ml-4 text-xl font-semibold text-gray-900">Profile</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold">
            {user.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2)}
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{user.name}</h2>
          <p className="text-gray-600">{user.email}</p>
          <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
            Verified
          </span>
        </div>

        {/* Profile Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-gray-500 text-sm">Posts</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">248</p>
            <p className="text-gray-500 text-sm">Followers</p>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 text-center">
            <p className="text-2xl font-bold text-gray-900">156</p>
            <p className="text-gray-500 text-sm">Following</p>
          </div>
        </div>

        {/* About Section */}
        <section className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
            <p className="text-gray-600">
              This is a demo profile page. In a real app, this would show the
              user's bio, social links, and other profile information.
            </p>
          </div>
        </section>

        {/* Account Information */}
        <section className="mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Account Information
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-500">User ID</span>
                <span className="text-gray-900 font-mono">{user.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Email</span>
                <span className="text-gray-900">{user.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Member since</span>
                <span className="text-gray-900">
                  {formatDate(user.createdAt, 'MMM yyyy')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Last updated</span>
                <span className="text-gray-900">
                  {formatDate(user.updatedAt, 'MMM d, yyyy')}
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Actions */}
        <div className="flex gap-3">
          <button className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
            Edit Profile
          </button>
          <Link
            href="/"
            className="flex-1 px-4 py-3 text-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            Go Back
          </Link>
        </div>
      </main>
    </div>
  );
}
