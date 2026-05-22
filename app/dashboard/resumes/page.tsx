import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import AddResume from "@/app/dashboard/resume/[resumeId]/_components/AddResume";
import ResumeCardItem from "@/app/dashboard/resume/[resumeId]/_components/ResumeCardItem";

export default async function MyResumesPage() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const resumeList = await db.resume.findMany({
    where: { userId: userId },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen bg-background p-6 md:p-10 lg:px-20 text-foreground">
      <div className="flex justify-between items-center mb-10">
        <div>
          <h2 className="font-bold text-3xl tracking-tight">My Resumes</h2>
          <p className="text-muted-foreground mt-1">
            Manage and organize your AI-generated resumes.
          </p>
        </div>
        <UserButton />
      </div>

      <div className="relative mb-8 max-w-2xl">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
        <Input
          placeholder="Search resumes..."
          className="pl-10 h-12 bg-card border-border rounded-xl focus-visible:ring-sky-500"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        <AddResume />
        {resumeList &&
          resumeList.map((resume: any) => (
            <ResumeCardItem resume={resume} key={resume.id} />
          ))}
      </div>
    </div>
  );
}
