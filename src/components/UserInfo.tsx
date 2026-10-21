'use client';

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
 
  const { data: session } = authClient.useSession();
  const user = session?.user;
  //console.log(user);

  const handleSignout = async () => {
    await authClient.signOut();
  };

  return (
    <div className="absolute right-4 top-4 z-50">
      {user ? (
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white/95 p-2 shadow-lg shadow-gray-200/50 backdrop-blur-md transition-all duration-300 hover:shadow-xl">
         
          {/* Profile Image */}
          <Link
            href="/profile"
            className="group relative shrink-0"
          >
            <div className="h-11 w-11 overflow-hidden rounded-full border-2 border-red-600 p-0.5 transition-transform duration-300 group-hover:scale-105">
              {user.image ? (
                <img
                  src={user.image as string}
                  alt="User profile"
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                <div className="flex h-full w-full items-center justify-center rounded-full bg-red-50 text-lg font-bold text-red-700">
                  {user.name?.charAt(0)?.toUpperCase() || "U"}
                </div>
              )}
            </div>

            {/* Online Indicator */}
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
          </Link>

          {/* User Details */}
          <div className="hidden min-w-0 sm:block">
            <p className="max-w-32 truncate text-sm font-bold text-gray-900">
              {user.name}
            </p>
            <Link
              href="/profile"
              className="text-xs font-medium text-gray-500 transition-colors hover:text-red-700"
            >
              প্রোফাইল দেখুন
            </Link>
          </div>

          {/* Sign Out */}
          <button
            onClick={handleSignout}
            className="rounded-xl bg-red-50 px-3 py-2 text-xs font-bold text-red-700 transition-all duration-200 hover:bg-red-700 hover:text-white active:scale-95"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-white/95 p-1.5 shadow-lg shadow-gray-200/40 backdrop-blur-md">
          {/* Sign In */}
          <Link
            href="/signin"
            className="rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-100 hover:text-red-700"
          >
            সাইন ইন
          </Link>

          {/* Sign Up */}
          <Link
            href="/signup"
            className="rounded-xl bg-red-700 px-4 py-2 text-sm font-bold text-white shadow-md shadow-red-700/20 transition-all duration-200 hover:bg-red-800 hover:shadow-lg active:scale-95"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
