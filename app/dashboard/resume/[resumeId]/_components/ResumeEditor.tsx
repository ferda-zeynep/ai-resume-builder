"use client";

import { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Eye, FileText, Download, Save, Loader2 } from "lucide-react";
import { ResumePreview } from "./ResumePreview";
import { updateResumeData } from "@/actions/resume";
import { incrementDownloadCount } from "@/actions/resume";

// Formlar
import { PersonalDetails } from "./forms/PersonalDetails";
import { Summary } from "./forms/Summary";
import { Experience } from "./forms/Experience";
import { Skills } from "./forms/Skills";
import { Education } from "./forms/Education";
import { Languages } from "./forms/Languages";
import { Certifications } from "./forms/Certifications";
import { ThemeColor } from "./ThemeColor";
import { TemplateSelector } from "./TemplateSelector";

export default function ResumeEditor({ initialData }: { initialData: any }) {
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [resumeInfo, setResumeInfo] = useState<any>({
    ...initialData,
    ...(initialData?.content || {}),
  });

  const componentRef = useRef<any>(null);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: (resumeInfo?.firstName || "Resume") + "_CV",
    onAfterPrint: async () => {
      try {
        await incrementDownloadCount(params.resumeId as string);
      } catch (err) {
        console.error("Download count update failed:", err);
      }
    },
  });

  const onSave = async () => {
    setLoading(true);
    try {
      await updateResumeData(params.resumeId as string, resumeInfo);
      alert("Changes saved successfully! ✅");
    } catch (error) {
      console.error("Save Error:", error);
      alert("Failed to save changes. ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen max-w-full overflow-x-hidden transition-colors duration-300">
      {/* HEADER BAR */}
      <div className="bg-card p-3 md:p-4 border-b border-border flex justify-between items-center px-4 md:px-10 sticky top-0 z-50 shadow-sm no-print">
        <h2 className="text-lg md:text-xl font-bold flex gap-2 items-center text-sky-500">
          <span className="hidden sm:inline">AI Resume Editor:</span>
          <span className="text-muted-foreground font-normal truncate max-w-[120px]">
            {resumeInfo?.firstName || "Draft"}
          </span>
        </h2>

        <div className="flex gap-2 items-center">
          <TemplateSelector
            resumeInfo={resumeInfo}
            setResumeInfo={setResumeInfo}
          />
          <ThemeColor resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} />

          {/* Save Button */}
          <Button
            variant="outline"
            onClick={onSave}
            disabled={loading}
            size="sm"
            className="border-sky-200 !text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 font-bold transition-all"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4 mr-2" />
            )}
            <span className="hidden sm:inline">Save</span>
          </Button>

          {/* Download Button */}
          <Button
            variant="outline"
            onClick={() => handlePrint()}
            size="sm"
            className="border-sky-200 !text-sky-500 hover:bg-sky-50 dark:hover:bg-sky-900/20 font-bold transition-all shadow-sm"
          >
            <Download className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Download PDF</span>
          </Button>
        </div>
      </div>

      <div className="p-2 md:p-10 w-full mx-auto max-w-7xl">
        {/* MOBİL TABS */}
        <Tabs defaultValue="editor" className="w-full md:hidden mb-6 no-print">
          <TabsList className="grid w-full grid-cols-2 h-auto p-1 bg-muted">
            <TabsTrigger value="editor">
              <FileText className="w-4 h-4 mr-2" /> Edit
            </TabsTrigger>
            <TabsTrigger value="preview">
              <Eye className="w-4 h-4 mr-2" /> Preview
            </TabsTrigger>
          </TabsList>
          <TabsContent value="editor">
            <div className="flex flex-col gap-6">
              <PersonalDetails
                resumeInfo={resumeInfo}
                setResumeInfo={setResumeInfo}
              />
              <Summary resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} />
              <Experience
                resumeInfo={resumeInfo}
                setResumeInfo={setResumeInfo}
              />
              <Skills resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} />
              <Education
                resumeInfo={resumeInfo}
                setResumeInfo={setResumeInfo}
              />
              <Languages
                resumeInfo={resumeInfo}
                setResumeInfo={setResumeInfo}
              />
              <Certifications
                resumeInfo={resumeInfo}
                setResumeInfo={setResumeInfo}
              />
            </div>
          </TabsContent>
          <TabsContent value="preview">
            <div className="w-full bg-slate-200 dark:bg-slate-800 rounded-lg overflow-hidden flex justify-center p-4">
              <div className="origin-top scale-[0.6] sm:scale-[0.8]">
                <ResumePreview resumeInfo={resumeInfo} ref={componentRef} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* MASAÜSTÜ GRID */}
        <div className="hidden md:grid grid-cols-2 gap-10 w-full">
          <div className="flex flex-col gap-8 overflow-y-auto pb-20 no-print">
            <PersonalDetails
              resumeInfo={resumeInfo}
              setResumeInfo={setResumeInfo}
            />
            <Summary resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} />
            <Experience resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} />
            <Skills resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} />
            <Education resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} />
            <Languages resumeInfo={resumeInfo} setResumeInfo={setResumeInfo} />
            <Certifications
              resumeInfo={resumeInfo}
              setResumeInfo={setResumeInfo}
            />
          </div>

          {/* Preview Section */}
          <div className="sticky top-24 self-start">
            <div className="shadow-2xl rounded-sm overflow-hidden">
              <ResumePreview resumeInfo={resumeInfo} ref={componentRef} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
