"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { useState } from "react";


const ProfilePage = () => {
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;
    
    const handleUserUpdate = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        
        const formData = new FormData(e.currentTarget);
        const newUserData = Object.fromEntries(formData.entries()) as {
            name: string;
            image: string;
        };
        
        await authClient.updateUser({
            ...newUserData,
        });
    };
    
    const [show,setShow]=useState(false);

    const handleShowForm=()=>{
        setShow(!show)
    }

  if (isPending) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-500">Loading profile...</p>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">Sign in to view your profile</h1>
          <p className="mt-2 text-slate-500">
            Your account details and profile settings are available after signing in.
          </p>
          <Link
            href="/signin"
            className="mt-6 inline-flex rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
          >
            Go to sign in
          </Link>
        </div>
      </main>
    );
  }



  const formatDate = (date: Date | string) =>
    new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-5xl">
        {/* Page Heading */}
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-widest text-indigo-600">
            Account Settings
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
            My Profile
          </h1>
          <p className="mt-2 text-slate-500">
            Manage your personal information and profile details.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-5">
          {/* Profile Card */}
          <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm lg:col-span-2">
            <div className="relative h-32 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
              <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border-[20px] border-white/10" />
              <div className="absolute -bottom-10 left-12 h-24 w-24 rounded-full bg-white/10 blur-xl" />
            </div>

            <div className="px-6 pb-7 text-center">
              <div className="relative mx-auto -mt-14 flex h-28 w-28 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-indigo-50 shadow-md">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.name}'s profile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-4xl font-bold text-indigo-600">
                    {user.name?.charAt(0) || "U"}
                  </span>
                )}
              </div>

              <h2 className="mt-4 break-words text-xl font-bold text-slate-900">
                {user.name}
              </h2>

              <p className="mt-1 break-all text-sm text-slate-500">
                {user.email}
              </p>

              <span
                className={`mt-4 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  user.emailVerified
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-amber-50 text-amber-700"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    user.emailVerified
                      ? "bg-emerald-500"
                      : "bg-amber-500"
                  }`}
                />
                {user.emailVerified
                  ? "Email Verified"
                  : "Email Not Verified"}
              </span>

              <div className="mt-7 border-t border-slate-100 pt-5 text-left">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Member Since
                </p>
                <p className="mt-2 font-medium text-slate-700">
                  {formatDate(user.createdAt)}
                </p>
              </div>
            </div>
          </section>

          {/* Update Profile Form */}
          <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8 lg:col-span-3">
            <div className="mb-7">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 20h9M16.5 3.5a2.12 2.12 0 0 1 3 3L8 18l-4 1 1-4Z"
                  />
                </svg>
              </div>

              <h2 className="text-xl font-bold text-slate-900">
                Update Profile
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-500">
                Change your display name and profile picture URL below.
              </p>
            </div>

            <button onClick={handleShowForm} className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.99]">✏️ Edit profile</button>
             

         { show &&   <form
              className="space-y-5 mt-2"
              onSubmit={handleUserUpdate}
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={user.name}
                  placeholder="Enter your name"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-2 block text-sm font-semibold text-slate-700"
                >
                  Profile Image URL
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  defaultValue={user.image ?? ""}
                  placeholder="https://example.com/photo.jpg"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:bg-white focus:ring-4 focus:ring-indigo-500/10"
                  required
                />
                <p className="mt-2 text-xs text-slate-400">
                  Enter a publicly accessible image URL.
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs leading-5 text-slate-500">
                  Account email and verification status are managed
                  separately from these profile fields.
                </p>
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/20 active:scale-[0.99]"
              >
                Save Changes
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m5 12 4 4L19 6"
                  />
                </svg>
              </button>
            </form>}
          </section>
        </div>

        {/* Account Details */}
        <section className="mt-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <h2 className="text-lg font-bold text-slate-900">
            Account Information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Your account details and activity.
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                User ID
              </p>
              <p className="mt-2 break-all font-mono text-sm text-slate-700">
                {user.id}
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Last Updated
              </p>
              <p className="mt-2 font-medium text-slate-700">
                {formatDate(user.updatedAt)}
              </p>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default ProfilePage;