"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Loader2 } from "lucide-react";
import { updateResumeData } from "@/actions/resume";
import { useParams } from "next/navigation";

export const Education = ({ resumeInfo, setResumeInfo }: any) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const handleChange = (index: number, e: any) => {
    const { name, value } = e.target;
    const newEntries = resumeInfo.education ? [...resumeInfo.education] : [];
    newEntries[index] = { ...newEntries[index], [name]: value };
    setResumeInfo({ ...resumeInfo, education: newEntries });
  };

  const addNewEducation = () => {
    const emptyEdu = {
      universityName: "",
      degree: "",
      major: "",
      startDate: "",
      endDate: "",
    };
    setResumeInfo({
      ...resumeInfo,
      education: [...(resumeInfo?.education || []), emptyEdu],
    });
  };

  const onSave = async () => {
    setLoading(true);
    try {
      await updateResumeData(params.resumeId as string, resumeInfo);
      alert("Education saved! 🎓");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-sky-500 border-t-4 mt-10 bg-card text-foreground">
      <h2 className="font-bold text-lg">Education</h2>
      <div className="mt-5 space-y-6">
        {resumeInfo?.education?.map((item: any, index: number) => (
          <div
            key={index}
            className="border border-border p-4 rounded-xl bg-secondary/30 relative"
          >
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 text-red-400 hover:bg-red-500/10"
              onClick={() => {
                const updated = resumeInfo.education.filter(
                  (_: any, i: number) => i !== index,
                );
                setResumeInfo({ ...resumeInfo, education: updated });
              }}
            >
              <Trash2 size={18} />
            </Button>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  University Name
                </label>
                <Input
                  name="universityName"
                  value={item.universityName}
                  onChange={(e) => handleChange(index, e)}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Degree
                </label>
                <Input
                  name="degree"
                  placeholder="e.g. Bachelor"
                  value={item.degree}
                  onChange={(e) => handleChange(index, e)}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-muted-foreground uppercase">
                  Major
                </label>
                <Input
                  name="major"
                  placeholder="e.g. Computer Science"
                  value={item.major}
                  onChange={(e) => handleChange(index, e)}
                  className="bg-background border-border"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between mt-6">
        <button
          onClick={addNewEducation}
          className="text-sky-500 border border-sky-500 hover:bg-sky-500/10 flex gap-2 items-center px-4 py-2 rounded-xl text-sm font-medium transition-all"
        >
          <Plus size={16} /> Add More
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
