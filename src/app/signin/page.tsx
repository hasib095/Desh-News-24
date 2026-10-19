"use client"

import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import React from 'react';
import { Bounce, toast } from 'react-toastify';

const SignInPage = () => {


    const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries()) as {name: string, email:string, image:string, password:string};

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
    toast.success("signIn successful!")
      console.log(data);
      redirect("/");
    }

    if (error) {
    toast.error(error.message)
      console.log(error);
    }
  };

    return (
         <div className="max-w-md mx-auto mt-10 p-6">
            <h2 className="text-2xl font-bold text-center mb-6">
                সাইন ইন
            </h2>

            <form className="space-y-4" onSubmit={onSubmit}>
               

                <input
                    name='email'
                    type="email"
                    placeholder="ইমেইল ঠিকানা"
                    className="w-full border p-3 rounded"
                    required
                />

                <input
                    name='password'
                    type="password"
                    placeholder="পাসওয়ার্ড"
                    className="w-full border p-3 rounded"
                    required
                />

                <button
                    type="submit"
                    className="w-full bg-red-600 text-white p-3 rounded hover:bg-red-700"
                >
                    সাইন ইন 
                </button>
            </form>
        </div>
    );
};

export default SignInPage;