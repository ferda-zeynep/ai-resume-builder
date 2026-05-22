"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Loader2, X } from "lucide-react";
import { updateResumeData } from "@/actions/resume";
import { generateSummaryAI } from "@/actions/ai";
import { useParams } from "next/navigation";

export const Summary = ({ resumeInfo, setResumeInfo }: any) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  const onGenerateAI = async () => {
    if (!resumeInfo?.jobTitle) return alert("Enter Job Title first!");
    setAiLoading(true);
    try {
      const data = await generateSummaryAI(resumeInfo.jobTitle);
      setAiSuggestions(data);
    } catch (error) {
      console.error(error);
    } finally {
      setAiLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-sky-500 border-t-4 mt-10 bg-card text-foreground">
      <div className="flex justify-between items-end mb-4">
        <h2 className="font-bold text-lg">Summary</h2>
        <Button
          variant="outline"
          onClick={onGenerateAI}
          disabled={aiLoading}
          className="border-purple-500 text-purple-500 hover:bg-purple-500/10 h-9 px-4 text-sm gap-2 rounded-full"
        >
          {aiLoading ? (
            <Loader2 className="animate-spin w-4 h-4" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          Generate with AI
        </Button>
      </div>

      <Textarea
        className="mt-2 min-h-[120px] bg-background border-border text-foreground"
        placeholder="Write a brief overview of your professional background..."
        value={resumeInfo?.summary || ""}
        onChange={(e) =>
          setResumeInfo({ ...resumeInfo, summary: e.target.value })
        }
      />

      {aiSuggestions.length > 0 && (
        <div className="mt-5 p-4 border border-dashed border-purple-300 rounded-xl bg-purple-50/5 dark:bg-purple-900/5 relative">
          <button
            onClick={() => setAiSuggestions([])}
            className="absolute top-2 right-2 text-muted-foreground hover:text-foreground"
          >
            <X size={16} />
          </button>
          <h3 className="text-sm font-bold text-purple-600 mb-3 uppercase tracking-tighter">
            AI Suggestions (Click to select)
          </h3>
          <div className="space-y-3">
            {aiSuggestions.map((item, index) => (
              <div
                key={index}
                onClick={() => {
                  setResumeInfo({ ...resumeInfo, summary: item });
                  setAiSuggestions([]);
                }}
                className="p-3 border border-border bg-background rounded-lg cursor-pointer hover:border-purple-500 transition-all text-sm leading-relaxed"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <Button
          onClick={async () => {
            setLoading(true);
            await updateResumeData(params.resumeId as string, resumeInfo);
            setLoading(false);
          }}
          className="bg-sky-500 hover:bg-sky-600 text-white px-10 rounded-xl"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
