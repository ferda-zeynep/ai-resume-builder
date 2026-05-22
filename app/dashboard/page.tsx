import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import {
  FileText,
  Download,
  Sparkles,
  Plus,
  LayoutTemplate,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { getUserTokens } from "@/actions/tokens";

export default async function DashboardOverview() {
  const { userId } = await auth();
  if (!userId) redirect("/");

  const resumes = await db.resume.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
    take: 3,
  });

  const totalResumes = await db.resume.count({ where: { userId } });
  const tokens = await getUserTokens();

  const allUserResumes = await db.resume.findMany({
    where: { userId },
    select: { downloadCount: true },
  });

  const totalDownloads = allUserResumes.reduce(
    (sum, res) => sum + (Number(res.downloadCount) || 0),
    0,
  );

  return (
    <div className="p-6 md:p-10 lg:px-20 space-y-10 bg-background text-foreground min-h-screen">
      {/* Profile Button */}
      <div className="fixed top-4 right-4 z-50">
        <UserButton />
      </div>

      {/* Title Section */}
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-extrabold tracking-tight text-foreground">
          Welcome back, Derya 👋
        </h2>
        <p className="text-muted-foreground text-lg">
          Here is your professional overview.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-sky-500/10 text-sky-500">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Total Resumes
            </p>
            <h4 className="text-2xl font-bold">{totalResumes}</h4>
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
            <Sparkles size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              AI Tokens
            </p>
            <h4 className="text-2xl font-bold">{tokens}</h4>
          </div>
        </div>

        <div className="p-6 bg-card border border-border rounded-2xl shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
            <Download size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              PDF Downloads
            </p>
            <h4 className="text-2xl font-bold">{totalDownloads}</h4>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold text-foreground">
              Recent Resumes
            </h3>
            <Link
              href="/dashboard/resumes"
              className="text-sm font-semibold text-sky-500 flex items-center gap-1 hover:underline"
            >
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {resumes.length > 0 ? (
              resumes.map((resume) => (
                <Link
                  href={`/dashboard/resume/${resume.id}`}
                  key={resume.id}
                  className="p-4 bg-card border border-border rounded-xl hover:border-sky-500/50 transition-all group"
                >
                  <div className="aspect-[3/4] bg-muted rounded-lg mb-3 flex items-center justify-center text-muted-foreground/30 group-hover:bg-sky-500/5 group-hover:text-sky-500 transition-colors">
                    <FileText size={48} />
                  </div>
                  <h4 className="font-bold text-sm truncate">
                    {resume.title || "Untitled Resume"}
                  </h4>
                  <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-tighter">
                    Last Edited:{" "}
                    {new Date(resume.updatedAt).toLocaleDateString()}
                  </p>
                </Link>
              ))
            ) : (
              <div className="col-span-full p-10 border border-dashed border-border rounded-xl text-center text-muted-foreground">
                No resumes found. Create your first one!
              </div>
            )}
          </div>
        </div>

        {/* Side Menu */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-foreground">Quick Actions</h3>
            <div className="flex flex-col gap-2">
              <Link href="/dashboard/resumes">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 border-border hover:bg-sky-500/5 hover:text-sky-500 transition-all"
                >
                  <Plus size={18} className="text-sky-500" /> New Resume
                </Button>
              </Link>
              <Link href="/dashboard/templates">
                <Button
                  variant="outline"
                  className="w-full justify-start gap-3 h-12 border-border hover:bg-purple-500/5 hover:text-purple-500 transition-all"
                >
                  <LayoutTemplate size={18} className="text-purple-500" />{" "}
                  Browse Templates
                </Button>
              </Link>
            </div>
          </div>

          <div className="p-6 bg-sky-500 rounded-2xl text-white space-y-3 shadow-lg shadow-sky-500/20">
            <div className="flex items-center gap-2">
              <Sparkles size={20} className="text-sky-200" />
              <h4 className="font-bold">AI Tip of the Day</h4>
            </div>
            <p className="text-sm text-sky-50 leading-relaxed italic">
              "Tailor your summary for each job description to pass ATS filters
              more effectively."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
