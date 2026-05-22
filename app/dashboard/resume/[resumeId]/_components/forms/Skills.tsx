"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Sparkles, Loader2, Star } from "lucide-react"; // Burası düzeldi
import { updateResumeData } from "@/actions/resume";
import { generateSkillsAI } from "@/actions/ai";
import { useParams } from "next/navigation";

export const Skills = ({ resumeInfo, setResumeInfo }: any) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [userInput, setUserInput] = useState("");

  const onGenerateAI = async () => {
    const query = userInput || resumeInfo?.jobTitle;

    if (!query) {
      alert("Please enter a skill area (e.g., React) or a Job Title first!");
      return;
    }

    setAiLoading(true);
    try {
      const result = await generateSkillsAI(query);
      const newSkills = result.map((skill: string) => ({
        name: skill,
        rating: 3,
      }));

      setResumeInfo({
        ...resumeInfo,
        skills: [...(resumeInfo?.skills || []), ...newSkills],
      });
      setUserInput("");
    } catch (error) {
      console.error("AI Skill Error:", error);
      alert("Failed to generate skills. Please try again.");
    } finally {
      setAiLoading(false);
    }
  };

  const handleChange = (index: number, name: string, value: any) => {
    const newSkills = resumeInfo.skills ? [...resumeInfo.skills] : [];
    newSkills[index] = { ...newSkills[index], [name]: value };
    setResumeInfo({ ...resumeInfo, skills: newSkills });
  };

  const addSkill = () => {
    setResumeInfo({
      ...resumeInfo,
      skills: [...(resumeInfo?.skills || []), { name: "", rating: 0 }],
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateResumeData(params.resumeId as string, resumeInfo);
      alert("Skills saved successfully! ⭐");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 shadow-xl rounded-2xl border-t-4 border-sky-500 bg-card text-foreground mt-10">
      <div className="mb-6">
        <h2 className="font-bold text-xl tracking-tight">Skills</h2>
        <p className="text-muted-foreground text-sm mb-4">
          Rate your professional expertise using the stars.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 p-4 bg-secondary/20 rounded-xl border border-dashed border-sky-200 dark:border-sky-900">
          <div className="flex-1">
            <label className="text-[10px] font-bold uppercase text-sky-600 mb-1 block">
              AI Skill Suggestion
            </label>
            <Input
              placeholder="e.g. Backend, Frontend, Soft Skills..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="bg-background border-sky-100 dark:border-sky-900"
            />
          </div>
          <Button
            variant="outline"
            onClick={onGenerateAI}
            disabled={aiLoading}
            className="self-end border-purple-500 text-purple-500 hover:bg-purple-500/10 gap-2 h-10 px-6 rounded-xl transition-all shadow-sm"
          >
            {aiLoading ? (
              <Loader2 className="animate-spin w-4 h-4" />
            ) : (
              <Sparkles className="w-4 h-4" />
            )}
            Generate
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        {resumeInfo?.skills?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex flex-col md:flex-row md:items-center gap-4 border border-border p-4 rounded-xl bg-background/50 relative group"
          >
            <div className="flex-1">
              <label className="text-[10px] font-black uppercase text-muted-foreground block mb-1">
                Skill Name
              </label>
              <Input
                value={item.name}
                className="bg-background border-border"
                onChange={(e) => handleChange(index, "name", e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-1 min-w-[120px]">
              <label className="text-[10px] font-black uppercase text-muted-foreground block mb-1">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={20}
                    className={`cursor-pointer transition-all ${
                      star <= item.rating
                        ? "text-amber-400 fill-amber-400"
                        : "text-slate-300 dark:text-slate-700"
                    }`}
                    onClick={() => handleChange(index, "rating", star)}
                  />
                ))}
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 md:static text-destructive hover:bg-destructive/10"
              onClick={() => {
                const updated = resumeInfo.skills.filter(
                  (_: any, i: number) => i !== index,
                );
                setResumeInfo({ ...resumeInfo, skills: updated });
              }}
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-between">
        <Button
          variant="outline"
          onClick={addSkill}
          className="border-sky-500 text-sky-500 hover:bg-sky-500/10 rounded-xl"
        >
          <Plus size={16} className="mr-2" /> Add Skill
        </Button>

        <Button
          onClick={handleSave}
          disabled={loading}
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-10 rounded-xl"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
