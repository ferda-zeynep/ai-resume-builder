"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { updateResumeData } from "@/actions/resume";
import { useParams } from "next/navigation";

export const Languages = ({ resumeInfo, setResumeInfo }: any) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const addNewLanguage = () => {
    setResumeInfo({
      ...resumeInfo,
      languages: [...(resumeInfo?.languages || []), { name: "", level: "" }],
    });
  };

  const onSave = async () => {
    setLoading(true);
    try {
      await updateResumeData(params.resumeId as string, resumeInfo);
      alert("Languages saved! 🌍");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-sky-500 border-t-4 mt-10 bg-card text-foreground">
      <h2 className="font-bold text-lg">Languages</h2>
      <div className="mt-5 space-y-4">
        {resumeInfo?.languages?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex gap-4 items-end border border-border p-3 rounded-xl bg-secondary/30 group hover:border-sky-500/50 transition-all"
          >
            <div className="flex-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">
                Language Name
              </label>
              <Input
                className="bg-background border-border"
                placeholder="English"
                value={item.name}
                onChange={(e) => {
                  const updated = [...resumeInfo.languages];
                  updated[index].name = e.target.value;
                  setResumeInfo({ ...resumeInfo, languages: updated });
                }}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const updated = resumeInfo.languages.filter(
                  (_: any, i: number) => i !== index,
                );
                setResumeInfo({ ...resumeInfo, languages: updated });
              }}
              className="text-red-400 hover:bg-red-500/10 mb-0.5"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={addNewLanguage}
          className="text-sky-500 border border-sky-500 hover:bg-sky-500/10 flex gap-2 items-center px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          <Plus size={16} /> Add Language
        </button>
        <Button
          disabled={loading}
          onClick={onSave}
          className="bg-sky-500 hover:bg-sky-600 text-white px-10 rounded-xl shadow-md"
        >
          {loading ? <Loader2 className="animate-spin" /> : "Save Changes"}
        </Button>
      </div>
    </div>
  );
};
