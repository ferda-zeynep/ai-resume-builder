import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import ResumeEditor from "./_components/ResumeEditor";

export default async function ResumeEditorPage({
  params,
}: {
  params: Promise<{ resumeId: string }>;
}) {
  const { resumeId } = await params;

  const { userId } = await auth();
  if (!userId) redirect("/");

  const resumeData = await db.resume.findFirst({
    where: {
      id: resumeId,
      userId: userId,
    },
  });

  if (!resumeData) {
    redirect("/dashboard/resumes");
  }

  return (
    <div className="p-0">
      <ResumeEditor initialData={resumeData} />
    </div>
  );
}
