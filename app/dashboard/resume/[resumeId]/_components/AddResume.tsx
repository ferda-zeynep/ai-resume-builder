"use client";
import { PlusSquare, Loader2 } from "lucide-react";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { createResume } from "@/actions/resume";

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setResumeTitle] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onCreate = async () => {
    setLoading(true);
    try {
      const newResume = await createResume(resumeTitle);

      if (newResume) {
        router.push("/dashboard/resume/" + newResume.id);
      }
    } catch (error) {
      console.error("Creation failed", error);
    } finally {
      setLoading(false);
      setOpenDialog(false);
    }
  };

  return (
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center 
                bg-slate-50 rounded-lg h-[280px] 
                hover:scale-105 transition-all hover:shadow-md
                cursor-pointer border-dashed border-slate-300 group"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare className="text-slate-400 group-hover:text-blue-600 transition-colors" />
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              Enter a title for your new professional resume.
              <Input
                className="my-3"
                placeholder="e.g. Full Stack Developer Resume"
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </DialogDescription>
            <div className="flex justify-end gap-5">
              <Button onClick={() => setOpenDialog(false)} variant="ghost">
                Cancel
              </Button>
              <Button disabled={!resumeTitle || loading} onClick={onCreate}>
                {loading ? <Loader2 className="animate-spin" /> : "Create"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddResume;
