"use client";
import { Notebook, Trash2, Loader2, FileText } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";
import { deleteResume } from "@/actions/resume";

function ResumeCardItem({ resume }: any) {
  const [loading, setLoading] = useState(false);

  const themeColor = "#0ea5e9";

  const onDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (confirm("Are you sure you want to delete this resume?")) {
      setLoading(true);
      await deleteResume(resume.id);
      setLoading(false);
    }
  };

  return (
    <div className="relative group transition-all">
      <Link href={`/dashboard/resume/${resume.id}`}>
        <div
          className="relative p-14 bg-white flex items-center justify-center h-[280px] 
          border border-slate-200 rounded-xl hover:scale-105 transition-all hover:shadow-xl cursor-pointer overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-2 bg-sky-500" />
          <FileText className="w-12 h-12 text-sky-100 absolute transform -rotate-12 right-4 bottom-4" />

          <Notebook size={40} className="text-sky-500" />
        </div>
        <h2 className="text-center my-3 font-bold text-sm text-slate-700 truncate px-2">
          {resume.title}
        </h2>
      </Link>

      <button
        disabled={loading}
        onClick={onDelete}
        className="absolute bottom-12 right-4 p-2 bg-white rounded-full shadow-lg text-slate-400 hover:text-red-600 transition-all opacity-0 group-hover:opacity-100 border border-slate-100"
      >
        {loading ? (
          <Loader2 className="animate-spin w-4 h-4" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>
    </div>
  );
}

export default ResumeCardItem;
