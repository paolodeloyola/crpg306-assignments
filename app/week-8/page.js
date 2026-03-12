"use client";

import Link from "next/link";
import { useUserAuth } from "./_utils/auth-context";

export default function Page() {
  const { user, gitHubSignIn, firebaseSignOut } = useUserAuth();

  const handleSignIn = async () => {
    try {
      await gitHubSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await firebaseSignOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white border border-gray-300 rounded-md p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Login to view shopping list
        </h1>

        {!user ? (
          <button
            onClick={handleSignIn}
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            Sign in with GitHub
          </button>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700">
              Welcome, <strong>{user.displayName}</strong>
            </p>

            <Link
              href="/week-8/shopping-list"
              className="inline-block bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
              Go to Shopping List
            </Link>

            <div>
              <button
                onClick={handleSignOut}
                className="text-gray-600 underline hover:text-gray-800"
              >
                Log Out
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
