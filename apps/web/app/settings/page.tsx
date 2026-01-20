'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore, useUIStore, useLogout } from '@app/core';

export default function SettingsPage() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const theme = useUIStore((state) => state.theme);
  const setTheme = useUIStore((state) => state.setTheme);
  const { mutate: logout, isPending: isLoggingOut } = useLogout();

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    logout(undefined, {
      onSuccess: () => {
        router.push('/');
      },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              ← Back
            </Link>
            <h1 className="ml-4 text-xl font-semibold text-gray-900">Settings</h1>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Account Section */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Account
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
            <Link
              href={isAuthenticated ? '/profile' : '/login'}
              className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">👤</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Profile</p>
                  <p className="text-sm text-gray-500">
                    {user?.email || 'Not signed in'}
                  </p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </Link>

            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🔔</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Notifications</p>
                  <p className="text-sm text-gray-500">Manage push notifications</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🔒</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Privacy & Security</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </div>
        </section>

        {/* Appearance Section */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Appearance
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between p-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🌙</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Dark Mode</p>
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={theme === 'dark'}
                  onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
              </label>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="mb-8">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-4">
            Support
          </h2>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 divide-y divide-gray-100">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">❓</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Help Center</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">💬</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Contact Us</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">📄</span>
                </div>
                <div className="ml-4">
                  <p className="font-medium text-gray-900">Terms of Service</p>
                </div>
              </div>
              <span className="text-gray-400">→</span>
            </div>
          </div>
        </section>

        {/* Sign Out */}
        {isAuthenticated && (
          <section>
            <div className="bg-white rounded-xl shadow-sm border border-red-200">
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="w-full flex items-center p-4 hover:bg-red-50 transition-colors"
              >
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <span className="text-lg">🚪</span>
                </div>
                <p className="ml-4 font-medium text-red-600">
                  {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                </p>
              </button>
            </div>
          </section>
        )}

        {/* Version */}
        <p className="text-center text-gray-500 text-sm mt-8">Version 1.0.0</p>
      </main>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Sign Out</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to sign out?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 transition-colors"
              >
                {isLoggingOut ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
