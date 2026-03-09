"use client";

import { signOut } from "next-auth/react";

export function SignOutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/login" })}
            className="w-full py-2.5 px-4 bg-red-500/10 text-red-500 font-medium rounded-lg hover:bg-red-500/20 transition-colors flex items-center justify-center"
        >
            Sign Out
        </button>
    );
}
