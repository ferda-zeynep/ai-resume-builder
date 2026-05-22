"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2, Plus } from "lucide-react";
import { updateResumeData } from "@/actions/resume";
import { useParams } from "next/navigation";

export const Certifications = ({ resumeInfo, setResumeInfo }: any) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const onSave = async () => {
    setLoading(true);
    try {
      await updateResumeData(params.resumeId as string, resumeInfo);
      alert("Certifications saved! 🏆");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-sky-500 border-t-4 mt-10 bg-card text-foreground">
      <h2 className="font-bold text-lg">Certifications</h2>
      <div className="mt-5 space-y-4">
        {resumeInfo?.certifications?.map((item: any, index: number) => (
          <div
            key={index}
            className="flex gap-4 items-center border border-border p-3 rounded-lg bg-secondary/30 group hover:border-sky-500/50 transition-all"
          >
            <div className="flex-1">
              <label className="text-[10px] font-bold text-muted-foreground uppercase">
                Certification Name
              </label>
              <Input
                className="bg-background border-border"
                name="name"
                placeholder="e.g. Google Cloud Professional"
                value={item.name}
                onChange={(e) => {
                  const updated = [...resumeInfo.certifications];
                  updated[index].name = e.target.value;
                  setResumeInfo({ ...resumeInfo, certifications: updated });
                }}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const updated = resumeInfo.certifications.filter(
                  (_: any, i: number) => i !== index,
                );
                setResumeInfo({ ...resumeInfo, certifications: updated });
              }}
              className="text-red-400 hover:bg-red-500/10"
            >
              <Trash2 size={18} />
            </Button>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={() =>
            setResumeInfo({
              ...resumeInfo,
              certifications: [
                ...(resumeInfo?.certifications || []),
                { name: "" },
              ],
            })
          }
          className="text-sky-500 border border-sky-500 hover:bg-sky-500/10 flex gap-2 items-center px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          <Plus size={16} /> Add Certificate
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
