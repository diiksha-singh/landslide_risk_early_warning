"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { Mountain, ArrowLeft, Lock, Mail, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    async function handleSignup(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setLoading(true);
        setMessage("");
        setIsSuccess(false);

        const supabase = createClient();

        const { error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            setMessage(error.message);
            setIsSuccess(false);
        } else {
            setIsSuccess(true);
            setMessage(
                "Account created successfully. You can now log in."
            );
        }

        setLoading(false);
    }

    return (
        <main className="relative flex min-h-screen w-full items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden bg-[#0a111e]">
            {/* Landslide Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 transform scale-105"
                style={{ backgroundImage: `url('/images/landslide-bg.jpg')` }}
            />

            {/* Dark Semi-Transparent Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#0a111e]/90 via-[#0f172a]/85 to-[#0a111e]/95 backdrop-blur-[2px] z-10" />

            {/* Top Bar Home Link */}
            <div className="absolute top-6 left-6 z-20">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 rounded-xl bg-slate-900/60 px-4 py-2 text-xs font-semibold text-slate-300 border border-slate-700/60 hover:bg-slate-800/80 hover:text-white transition-all backdrop-blur-md"
                >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Back to Home</span>
                </Link>
            </div>

            {/* Centered Glassmorphic Authentication Card */}
            <div className="relative z-20 w-full max-w-md rounded-2xl border border-white/15 bg-slate-900/80 p-8 sm:p-10 shadow-2xl backdrop-blur-xl">
                {/* Branding Badge */}
                <div className="flex flex-col items-center text-center mb-8">
                    <img
                        src="/images/logo.png"
                        alt="Landslide Early Warning Logo"
                        className="h-16 w-16 rounded-full object-cover shadow-xl border border-white/20 mb-3"
                    />
                    <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                        Landslide Early Warning
                    </span>
                    <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                        Create Your Account
                    </h1>
                    <p className="mt-1.5 text-xs sm:text-sm text-slate-400 max-w-xs">
                        Join the Landslide Early Warning System.
                    </p>
                </div>

                <form onSubmit={handleSignup} className="space-y-5">
                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                            Email Address
                        </label>
                        <div className="relative">
                            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-300">
                            Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-slate-400" />
                            <input
                                type="password"
                                required
                                minLength={6}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl border border-slate-700/80 bg-slate-950/70 pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30 transition-all"
                                placeholder="Minimum 6 characters"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-3 font-semibold text-sm text-white shadow-lg shadow-blue-600/30 hover:from-blue-500 hover:to-indigo-500 active:scale-[0.99] disabled:opacity-50 transition-all cursor-pointer"
                    >
                        {loading ? "Creating account..." : "Sign Up"}
                    </button>
                </form>

                {message && (
                    <div
                        className={`mt-5 rounded-xl border p-3.5 text-xs flex items-start gap-2.5 ${
                            isSuccess
                                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                                : "border-rose-500/30 bg-rose-500/10 text-rose-300"
                        }`}
                    >
                        {isSuccess ? (
                            <CheckCircle2 className="h-4 w-4 shrink-0 mt-0.5 text-emerald-400" />
                        ) : (
                            <ShieldAlert className="h-4 w-4 shrink-0 mt-0.5 text-rose-400" />
                        )}
                        <span>{message}</span>
                    </div>
                )}

                <p className="mt-8 text-center text-xs text-slate-400 border-t border-slate-800 pt-6">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-blue-400 hover:text-blue-300 underline underline-offset-4 transition-colors"
                    >
                        Log in
                    </Link>
                </p>
            </div>
        </main>
    );
}