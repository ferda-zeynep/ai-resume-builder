"use client";

import React from "react";
import Link from "next/link";
import { Sparkles, Layout, ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserButton, useUser } from "@clerk/nextjs";

export default function Home() {
  const { isSignedIn } = useUser();

  const primaryBlue = "text-sky-500";
  const primaryBg = "bg-sky-500";
  const primaryHover = "hover:bg-sky-600";

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* --- NAVBAR --- */}
      <nav className="flex items-center justify-between px-6 py-6 md:px-20 border-b border-slate-50 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="flex items-center gap-2">
          <div
            className={`${primaryBg} p-2 rounded-lg shadow-lg shadow-sky-200`}
          >
            <Layout className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-black tracking-tighter text-slate-800 uppercase">
            AI RESUME
          </span>
        </div>

        <div className="flex items-center gap-6">
          {!isSignedIn ? (
            <>
              <Link
                href="/sign-in"
                className="text-sm font-semibold text-slate-600 hover:text-sky-500 transition-colors"
              >
                Sign In
              </Link>
              <Link href="/sign-up">
                <Button
                  className={`${primaryBg} ${primaryHover} text-white rounded-full px-6 shadow-lg shadow-sky-100`}
                >
                  Get Started
                </Button>
              </Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="text-sm font-semibold text-slate-600 hover:text-sky-500"
                >
                  Dashboard
                </Button>
              </Link>
              <UserButton />
            </div>
          )}
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative px-6 pt-12 pb-32 md:px-20 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-20">
          <div className="absolute top-10 left-1/4 w-72 h-72 bg-sky-200 rounded-full blur-[100px]" />
          <div className="absolute bottom-10 right-1/4 w-80 h-80 bg-blue-100 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-50 text-sky-600 text-xs font-bold uppercase tracking-widest border border-sky-100">
            <Sparkles size={14} /> AI-Powered Career Builder
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight">
            Elevate your career <br />
            <span className={primaryBlue}>with smart AI resumes.</span>
          </h1>

          <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Build high-quality, ATS-friendly resumes in minutes. Our AI helps
            you write professional summaries and experience bullet points that
            get you hired.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
              <Button
                size="lg"
                className={`${primaryBg} ${primaryHover} text-white text-lg px-10 h-14 rounded-2xl shadow-xl shadow-sky-200 gap-2 group transition-all`}
              >
                {isSignedIn ? "Go to Dashboard" : "Create My Resume"}
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>

            {/* Explore Templates Button */}
            <Link href="/dashboard/templates">
              <Button
                size="lg"
                variant="ghost"
                className="text-slate-600 hover:text-sky-500 h-14 px-8 font-semibold"
              >
                Explore Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="bg-slate-50/50 py-24 px-6 md:px-20 border-y border-slate-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mx-auto md:mx-0">
                <Zap className="text-sky-500 w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">
                Quick Builder
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Just enter your details and let our smart layout system handle
                the rest. No design skills needed.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mx-auto md:mx-0">
                <Sparkles className="text-sky-500 w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">
                AI Assistance
              </h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                Struggling with words? Use our AI to generate professional
                summaries and skill suggestions instantly.
              </p>
            </div>

            <div className="space-y-4">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 mx-auto md:mx-0">
                <ShieldCheck className="text-sky-500 w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">ATS Friendly</h4>
              <p className="text-slate-500 text-sm leading-relaxed">
                All templates are optimized for Applicant Tracking Systems,
                ensuring your CV actually gets read.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="py-12 px-6 md:px-20 text-center bg-white">
        <div className="flex flex-col items-center gap-6">
          <div className="flex items-center gap-2 opacity-80">
            <div className={`${primaryBg} p-1.5 rounded-md`}>
              <Layout className="text-white w-4 h-4" />
            </div>
            <span className="font-black tracking-tighter uppercase">
              AI RESUME
            </span>
          </div>
          <p className="text-slate-400 text-xs tracking-widest uppercase font-bold">
            Built with Next.js 15 & AI Technology
          </p>
          <div className="flex gap-8 text-slate-400 text-sm font-semibold">
            <Link href="#" className="hover:text-sky-500 transition-colors">
              Twitter
            </Link>
            <Link href="#" className="hover:text-sky-500 transition-colors">
              LinkedIn
            </Link>
            <Link href="#" className="hover:text-sky-500 transition-colors">
              GitHub
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
