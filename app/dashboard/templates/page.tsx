"use client";

import React, { useState } from "react";
import { Layout, Layers, FileText, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createResume } from "@/actions/resume";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const templateList = [
  {
    id: "modern",
    title: "Modern Bold",
    description:
      "High-contrast headers with a dynamic sidebar. Perfect for tech roles.",
    color: "bg-sky-500",
    icon: Layout,
    popular: true,
  },
  {
    id: "minimal",
    title: "Clean Minimal",
    description: "Distraction-free, single-column layout. 100% ATS-friendly.",
    color: "bg-slate-900 dark:bg-slate-800",
    icon: FileText,
    popular: false,
  },
  {
    id: "professional",
    title: "Executive Classic",
    description:
      "Traditional structured grid. Ideal for corporate and finance.",
    color: "bg-emerald-600",
    icon: Layers,
    popular: false,
  },
];

export default function TemplatesPage() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [resumeTitle, setResumeTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    if (!selectedTemplate) return;
    setLoading(true);
    try {
      const newResume = await createResume(resumeTitle, selectedTemplate);
      if (newResume) {
        router.push(`/dashboard/resume/${newResume.id}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 md:p-10 lg:px-20 max-w-7xl mx-auto min-h-screen bg-background text-foreground">
      <div className="mb-10">
        <h2 className="text-3xl font-extrabold tracking-tight">
          Resume Templates
        </h2>
        <p className="text-muted-foreground text-lg mt-1">
          Select a layout to start building your professional resume.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {templateList.map((template) => (
          <div
            key={template.id}
            className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col"
          >
            <div
              className={`aspect-[4/3] ${template.color} flex items-center justify-center relative overflow-hidden`}
            >
              <template.icon
                size={80}
                className="text-white/20 absolute -bottom-4 -right-4 rotate-12"
              />
              <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 shadow-2xl text-white">
                <template.icon size={48} />
              </div>
              {template.popular && (
                <span className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900 text-sky-600 dark:text-sky-400 text-[10px] font-black uppercase px-3 py-1 rounded-full shadow-sm">
                  Most Popular
                </span>
              )}
            </div>

            <div className="p-6 flex flex-col flex-grow bg-card">
              <h3 className="text-xl font-bold mb-2 text-foreground">
                {template.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed flex-grow">
                {template.description}
              </p>

              <div className="mt-6">
                <Button
                  onClick={() => setSelectedTemplate(template.id)}
                  className="w-full rounded-xl gap-2 bg-sky-500 hover:bg-sky-600 text-white shadow-lg shadow-sky-500/20 transition-all font-bold group"
                >
                  Use This{" "}
                  <ArrowRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog
        open={!!selectedTemplate}
        onOpenChange={() => setSelectedTemplate(null)}
      >
        <DialogContent className="bg-card text-foreground rounded-3xl border-border shadow-2xl">
          <DialogHeader className="space-y-4">
            <DialogTitle className="text-2xl font-bold">
              Name your masterpiece
            </DialogTitle>
            <DialogDescription className="text-muted-foreground text-lg">
              Give your new resume a title to stay organized.
            </DialogDescription>
            <Input
              className="h-12 text-lg bg-background border-border focus:ring-sky-500 rounded-xl"
              placeholder="e.g. Senior Developer CV"
              onChange={(e) => setResumeTitle(e.target.value)}
            />
            <div className="flex gap-3 pt-4">
              <Button
                onClick={() => setSelectedTemplate(null)}
                variant="ghost"
                className="flex-1 h-12 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                disabled={!resumeTitle || loading}
                onClick={handleCreate}
                className="flex-[2] h-12 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold shadow-lg shadow-sky-500/20"
              >
                {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                Create & Start Editing
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
