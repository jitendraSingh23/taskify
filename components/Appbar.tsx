"use client";

import { useSession, signOut } from "next-auth/react";

export default function AppBar() {
  const { data: session } = useSession();

  return (
    <div className="border-b-2">
      <header className="pl-5 pr-5 py-3 flex items-center justify-between lg:px-10 ">
        <h1 className="text-black text-xl font-bold">Taskify</h1>

        {session ? (
          <div className="flex items-center space-x-4 w-auto justify-center">
            <span className="text-black font-medium text-xl">
              Welcome, {session.user?.name || "User"}!
            </span>
            <button
              onClick={() => signOut()}
              className=" text-black border-2 border-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-xs  px-3 py-1 text-center md:text-sm lg:text-sm lg:px-5">
              Sign Out
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4 w-auto justify-center animate-pulse W-FULL">
            <div className="h-6 bg-gray-200 rounded w-40 "></div>
            <div className="border-2 h-8 bg-gray-200 rounded w-24"></div>
          </div>
        )}
      </header>
    </div>
  );
}
