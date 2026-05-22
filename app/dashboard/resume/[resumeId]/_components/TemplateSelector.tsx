"use client";
import React from "react";
import { Layout, CheckCircle2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const templates = [
  { name: "modern", label: "Modern Bold", color: "bg-sky-500" },
  { name: "minimal", label: "Clean Minimal", color: "bg-slate-900" },
  { name: "professional", label: "Exec Classic", color: "bg-emerald-600" },
];

export function TemplateSelector({ resumeInfo, setResumeInfo }: any) {
  const currentTemplateLabel = templates.find(
    (t) => t.name === (resumeInfo?.template || "modern"),
  )?.label;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border-sky-200 !text-sky-500 hover:bg-sky-50 transition-all font-bold"
        >
          <Layout size={16} />
          <span>Layout: {currentTemplateLabel}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64 p-3 shadow-2xl border-slate-200 bg-white dark:bg-slate-900">
        <h3 className="font-bold text-sm mb-3 text-slate-800 dark:text-white">
          Choose a Template
        </h3>
        <div className="grid grid-cols-1 gap-2">
          {templates.map((t) => (
            <div
              key={t.name}
              onClick={() => setResumeInfo({ ...resumeInfo, template: t.name })}
              className={`p-3 border rounded-xl cursor-pointer flex items-center justify-between transition-all hover:bg-slate-50 dark:hover:bg-slate-800 ${
                (resumeInfo?.template || "modern") === t.name
                  ? "border-sky-500 bg-sky-50 dark:bg-sky-900/20 shadow-sm"
                  : "border-slate-100 dark:border-slate-800"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-3 h-10 rounded-full ${t.color}`} />
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                  {t.label}
                </span>
              </div>
              {(resumeInfo?.template || "modern") === t.name && (
                <CheckCircle2 size={16} className="text-sky-500" />
              )}
            </div>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
}
