"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { updateResumeData } from "@/actions/resume";
import { useParams } from "next/navigation";
import { Loader2 } from "lucide-react";

export const PersonalDetails = ({ resumeInfo, setResumeInfo }: any) => {
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateResumeData(params.resumeId as string, resumeInfo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeInfo({ ...resumeInfo, [name]: value });
  };

  const fields = [
    { label: "First Name", name: "firstName", half: true },
    { label: "Last Name", name: "lastName", half: true },
    { label: "Job Title", name: "jobTitle", half: false },
    { label: "Address", name: "address", half: false },
    { label: "Phone", name: "phone", half: true },
    { label: "Email", name: "email", half: true },
  ];

  return (
    <div className="p-6 shadow-xl rounded-2xl border-t-4 border-sky-500 bg-card text-card-foreground transition-all duration-300">
      <h2 className="font-bold text-xl tracking-tight">Personal Details</h2>
      <p className="text-muted-foreground text-sm mb-6">
        Basic information about you
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {fields.map((field) => (
          <div key={field.name} className={field.half ? "" : "md:col-span-2"}>
            <label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground mb-1 block">
              {field.label}
            </label>
            <Input
              name={field.name}
              className="bg-background border-border text-foreground h-11 focus:ring-sky-500"
              value={resumeInfo?.[field.name] || ""}
              onChange={handleChange}
            />
          </div>
        ))}
      </div>

      <div className="mt-8 flex justify-end">
        <Button
          disabled={loading}
          onClick={handleSave}
          className="bg-sky-500 hover:bg-sky-600 text-white font-bold px-8 py-6 rounded-2xl shadow-lg shadow-sky-500/20"
        >
          {loading ? <Loader2 className="animate-spin mr-2" /> : null}
          Save Changes
        </Button>
      </div>
    </div>
  );
};
