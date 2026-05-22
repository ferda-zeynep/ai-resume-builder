"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2, Sparkles, Loader2, X } from "lucide-react";
import { updateResumeData } from "@/actions/resume";
import { generateExperienceAI } from "@/actions/ai";
import { useParams } from "next/navigation";

export const Experience = ({ resumeInfo, setResumeInfo }: any) => {
  const params = useParams();
  const [loading, setLoading] = useState<any>(null);
  const [saveLoading, setSaveLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<{
    [key: number]: string[];
  }>({});

  const onGenerateAI = async (index: number) => {
    const jobTitle = resumeInfo.experience[index]?.title;
    if (!jobTitle) return alert("Enter Job Title first!");
    setLoading(index);
    try {
      const data = await generateExperienceAI(jobTitle);
      setAiSuggestions({ ...aiSuggestions, [index]: data });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(null);
    }
  };

  const handleSave = async () => {
    setSaveLoading(true);
    try {
      await updateResumeData(params.resumeId as string, resumeInfo);
      alert("Experience saved! 🎉");
    } finally {
      setSaveLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-sky-500 border-t-4 mt-10 bg-card text-foreground transition-all duration-300">
      <h2 className="font-bold text-lg">Professional Experience</h2>
      <div className="mt-5 space-y-6">
        {resumeInfo?.experience?.map((item: any, index: number) => (
          <div
            key={index}
            className="border border-border p-4 rounded-xl bg-transparent relative"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-destructive hover:bg-destructive/10"
              onClick={() => {
                const updated = resumeInfo.experience.filter(
                  (_: any, i: number) => i !== index,
                );
                setResumeInfo({ ...resumeInfo, experience: updated });
              }}
            >
              <Trash2 size={18} />
            </Button>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Job Title
                </label>
                <Input
                  className="bg-background border-border mt-1"
                  value={item.title || ""}
                  onChange={(e) => {
                    const newEntries = [...resumeInfo.experience];
                    newEntries[index].title = e.target.value;
                    setResumeInfo({ ...resumeInfo, experience: newEntries });
                  }}
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-muted-foreground">
                  Company Name
                </label>
                <Input
                  className="bg-background border-border mt-1"
                  value={item.companyName || ""}
                  onChange={(e) => {
                    const newEntries = [...resumeInfo.experience];
                    newEntries[index].companyName = e.target.value;
                    setResumeInfo({ ...resumeInfo, experience: newEntries });
                  }}
                />
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-muted-foreground">
                  Work Summary
                </label>
                <Button
                  variant="outline"
                  onClick={() => onGenerateAI(index)}
                  disabled={loading === index}
                  className="border-purple-500 text-purple-500 hover:bg-purple-500/10 h-8 px-3 text-xs gap-2 rounded-full"
                >
                  {loading === index ? (
                    <Loader2 className="animate-spin w-3 h-3" />
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  AI Suggestions
                </Button>
              </div>
              <Textarea
                className="min-h-[100px] bg-background border-border"
                value={item.workSummary || ""}
                onChange={(e) => {
                  const newEntries = [...resumeInfo.experience];
                  newEntries[index].workSummary = e.target.value;
                  setResumeInfo({ ...resumeInfo, experience: newEntries });
                }}
              />
            </div>

            {/* AI LIST*/}
            {aiSuggestions[index]?.length > 0 && (
              <div className="mt-3 p-3 border border-dashed border-purple-300 rounded-lg bg-purple-50/5 relative">
                <h4 className="text-[10px] font-bold text-purple-500 uppercase mb-2">
                  AI Generated Points:
                </h4>
                <div className="flex flex-col gap-2">
                  {aiSuggestions[index].map((s, i) => (
                    <div
                      key={i}
                      onClick={() => {
                        const newExp = [...resumeInfo.experience];

                        newExp[index].workSummary = s;
                        setResumeInfo({ ...resumeInfo, experience: newExp });

                        const newSugg = { ...aiSuggestions };
                        delete newSugg[index];
                        setAiSuggestions(newSugg);
                      }}
                      className="p-2 border border-border bg-background rounded-md text-[11px] cursor-pointer hover:border-purple-500 hover:bg-purple-50/10 transition-all italic"
                    >
                      {s}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          className="border-sky-500 text-sky-500 hover:bg-sky-500/10 rounded-xl"
          onClick={() =>
            setResumeInfo({
              ...resumeInfo,
              experience: [
                ...(resumeInfo?.experience || []),
                { title: "", companyName: "", workSummary: "" },
              ],
            })
          }
        >
          <Plus size={16} className="mr-2" /> Add Experience
        </Button>
        <Button
          onClick={handleSave}
          disabled={saveLoading}
          className="bg-sky-500 hover:bg-sky-600 text-white px-10 rounded-xl shadow-md"
        >
          {saveLoading ? <Loader2 className="animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
