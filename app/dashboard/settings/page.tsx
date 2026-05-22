"use client";

import React from "react";
import { useUser, useClerk } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Settings,
  Moon,
  Sun,
  Trash2,
  User,
  Palette,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

const SettingsPage = () => {
  const { user } = useUser();
  const { openUserProfile } = useClerk();
  const { setTheme, theme } = useTheme();

  const colors = [
    "#334155",
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#84cc16",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#d946ef",
    "#f43f5e",
  ];

  return (
    <div className="p-10 md:px-20 lg:px-32">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <Settings className="w-10 h-10 text-[#06b6d4]" />
        <h2 className="font-bold text-3xl tracking-tight">Settings</h2>
      </div>
      <p className="text-gray-500 mt-2">Manage your account and look.</p>

      <div className="mt-10 space-y-12">
        {/* 1. Account Information */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <User className="w-6 h-6 text-[#06b6d4]" />
            <h3 className="font-semibold text-xl">Account Information</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl">
            {/* Full Name Field */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Full Name
              </label>
              <Input
                placeholder="John Doe"
                className="dark:bg-slate-800 h-11 rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#06b6d4]"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col gap-2.5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Email Address
              </label>
              <Input
                placeholder="john.doe@example.com"
                className="dark:bg-slate-800 h-11 rounded-lg border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-[#06b6d4]"
              />
            </div>
          </div>

          <Button
            onClick={() => openUserProfile()}
            className="mt-8 bg-[#06b6d4] hover:bg-[#0891b2] flex gap-2 px-6 h-11 rounded-xl shadow-md shadow-cyan-500/20 transition-all active:scale-95"
          >
            Edit Profile <ExternalLink size={16} />
          </Button>
        </section>

        <Separator className="opacity-50" />

        {/* 2. Appearance */}
        <section>
          <div className="flex items-center gap-2 mb-8">
            <Palette className="w-6 h-6 text-[#06b6d4]" />
            <h3 className="font-semibold text-xl">Appearance</h3>
          </div>

          <div className="space-y-10">
            <div className="flex items-center justify-between max-w-md border border-slate-100 dark:border-slate-800 p-6 rounded-2xl bg-white dark:bg-slate-900 shadow-sm">
              <div className="flex flex-col gap-1">
                <span className="font-semibold">Theme Mode</span>
                <span className="text-sm text-gray-500">Light or Dark?</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full w-12 h-12 border-slate-200 dark:border-slate-700"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-amber-500" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
              </Button>
            </div>

            <div className="flex flex-col gap-5">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">
                Brand Color
              </label>
              <div className="flex flex-wrap gap-4">
                {colors.map((color) => (
                  <div
                    key={color}
                    className={`w-9 h-9 rounded-full cursor-pointer border-4 transition-all hover:scale-125 hover:shadow-lg ${
                      color === "#06b6d4"
                        ? "border-slate-900 dark:border-white scale-110"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </section>

        <Separator className="opacity-50" />

        {/* 3. Danger Zone */}
        <section className="bg-red-50 dark:bg-red-950/10 border border-red-100 dark:border-red-900/30 p-8 rounded-3xl transition-colors">
          <div className="flex items-center gap-2 mb-3 text-red-600">
            <AlertTriangle className="w-6 h-6" />
            <h3 className="font-bold text-xl">Danger Zone</h3>
          </div>
          <p className="text-sm text-red-500/80 mb-8 font-medium">
            Permanently delete your account and all data. This action cannot be
            undone.
          </p>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="rounded-xl px-8 h-11 font-bold shadow-lg shadow-red-500/20 transition-transform active:scale-95"
              >
                Delete My Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="rounded-2xl border-none">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-bold">
                  Are you absolutely sure?
                </AlertDialogTitle>
                <AlertDialogDescription className="text-slate-500">
                  This will permanently delete your account and remove all of
                  your saved resumes from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-4 gap-3">
                <AlertDialogCancel className="rounded-xl border-slate-200">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => openUserProfile()}
                  className="bg-red-600 text-white hover:bg-red-700 rounded-xl px-6"
                >
                  Yes, Delete Forever
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </section>
      </div>
    </div>
  );
};

export default SettingsPage;
