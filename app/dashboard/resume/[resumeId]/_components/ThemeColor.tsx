"use client";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Palette } from "lucide-react";
import { useParams } from "next/navigation";
import { updateResumeData } from "@/actions/resume";

export const ThemeColor = ({ resumeInfo, setResumeInfo }: any) => {
  const colors = [
    "#334155",
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#84cc16",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#d946ef",
    "#f43f5e",
  ];

  const { resumeId } = useParams();
  const [loading, setLoading] = useState(false);

  const onColorSelect = async (color: string) => {
    setLoading(true);
    const updatedInfo = { ...resumeInfo, themeColor: color };
    setResumeInfo(updatedInfo);
    try {
      if (resumeId) {
        await updateResumeData(resumeId as string, updatedInfo);
      }
    } catch (error) {
      console.error("Database save failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex gap-2 border-sky-200 !text-sky-500 hover:bg-sky-50 transition-all font-bold"
        >
          <Palette size={16} />
          <span>Theme Color</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit bg-white dark:bg-slate-900 border-slate-200 shadow-2xl">
        <h2 className="mb-3 text-sm font-bold border-b pb-2 text-slate-800 dark:text-white">
          Select Theme Color
        </h2>
        <div className="grid grid-cols-4 gap-3">
          {colors.map((color, index) => (
            <div
              key={index}
              onClick={() => onColorSelect(color)}
              className={`h-7 w-7 cursor-pointer rounded-full border-2 transition-all hover:scale-125 ${
                resumeInfo?.themeColor === color
                  ? "border-sky-500 scale-110 shadow-md"
                  : "border-transparent hover:border-slate-300"
              }`}
              style={{ backgroundColor: color }}
            />
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};
