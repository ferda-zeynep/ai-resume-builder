"use client";
import React from "react";

export const ResumePreview = React.forwardRef(
  ({ resumeInfo }: any, ref: any) => {
    const themeColor = resumeInfo?.themeColor || "#0ea5e9";
    const template = resumeInfo?.template || "modern";

    const renderExperience = () =>
      (resumeInfo?.experience || []).map((exp: any, index: number) => (
        <div key={index} className="mb-4 text-black">
          <div className="flex justify-between items-baseline">
            <h4 className="text-[15px] font-bold">{exp.title}</h4>
            <span className="text-[11px] font-bold text-slate-500">
              {exp.startDate} — {exp.endDate || "Present"}
            </span>
          </div>
          <p className="text-[13px] font-semibold text-slate-700">
            {exp.companyName}
          </p>
          <p className="text-[12px] text-slate-600 mt-1 whitespace-pre-line">
            {exp.workSummary}
          </p>
        </div>
      ));

    const renderEducation = () =>
      (resumeInfo?.education || []).map((edu: any, index: number) => (
        <div key={index} className="mb-3 text-black">
          <div className="flex justify-between items-baseline">
            <h4 className="text-[14px] font-bold">{edu.universityName}</h4>
            <span className="text-[11px] text-slate-500 italic">
              {edu.startDate} — {edu.endDate}
            </span>
          </div>
          <p className="text-[13px] text-slate-600">
            {edu.degree} in {edu.major}
          </p>
        </div>
      ));

    const renderSkills = () => (
      <div className="space-y-2">
        {(resumeInfo?.skills || []).map((skill: any, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-[12px] font-semibold text-slate-700">
              {skill.name}
            </span>
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <div
                  key={star}
                  className={`h-1 w-4 rounded-full ${star <= (skill?.rating || 0) ? "" : "bg-slate-200"}`}
                  style={{
                    backgroundColor:
                      star <= (skill?.rating || 0) ? themeColor : "",
                  }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    );

    const renderLanguages = () => (
      <div className="grid grid-cols-1 gap-1">
        {(resumeInfo?.languages || []).map((lang: any, index: number) => (
          <div key={index} className="flex flex-col">
            <span className="text-[12px] font-bold text-slate-800">
              {lang.name}
            </span>
            <span className="text-[10px] text-slate-500 uppercase">
              {lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    );

    const renderCertifications = () =>
      (resumeInfo?.certifications || []).map((cert: any, index: number) => (
        <div key={index} className="mb-2">
          <h4 className="text-[12px] font-bold text-slate-800">{cert.name}</h4>
          <p className="text-[10px] text-slate-500">{cert.issuer}</p>
        </div>
      ));

    // --- LAYOUTS ---
    const ModernLayout = () => (
      <div className="flex flex-col gap-2">
        <div className="text-center mb-6">
          <h2
            className="text-3xl font-extrabold uppercase"
            style={{ color: themeColor }}
          >
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h2>
          <p className="text-md font-bold text-slate-800">
            {resumeInfo?.jobTitle}
          </p>
          <div className="flex justify-center gap-3 text-[10px] text-slate-500 mt-2">
            <span>{resumeInfo?.address}</span>
            <span>•</span>
            <span>{resumeInfo?.phone}</span>
            <span>•</span>
            <span>{resumeInfo?.email}</span>
          </div>
        </div>
        <section>
          <h3
            className="font-bold border-b-2 text-sm mb-2 uppercase"
            style={{ color: themeColor, borderColor: themeColor + "30" }}
          >
            Summary
          </h3>
          <p className="text-[12px] text-slate-600 leading-relaxed">
            {resumeInfo?.summary}
          </p>
        </section>
        <div className="grid grid-cols-1 gap-6 mt-4">
          <section>
            <h3
              className="font-bold border-b-2 text-sm mb-3 uppercase"
              style={{ color: themeColor, borderColor: themeColor + "30" }}
            >
              Experience
            </h3>
            {renderExperience()}
          </section>
          <section>
            <h3
              className="font-bold border-b-2 text-sm mb-3 uppercase"
              style={{ color: themeColor, borderColor: themeColor + "30" }}
            >
              Education
            </h3>
            {renderEducation()}
          </section>
        </div>
        <div className="grid grid-cols-2 gap-10 mt-6">
          <section>
            <h3
              className="font-bold border-b-2 text-sm mb-3 uppercase"
              style={{ color: themeColor, borderColor: themeColor + "30" }}
            >
              Skills
            </h3>
            {renderSkills()}
          </section>
          <div className="flex flex-col gap-6">
            {(resumeInfo?.languages || []).length > 0 && (
              <section>
                <h3
                  className="font-bold border-b-2 text-sm mb-2 uppercase"
                  style={{ color: themeColor, borderColor: themeColor + "30" }}
                >
                  Languages
                </h3>
                {renderLanguages()}
              </section>
            )}
            {(resumeInfo?.certifications || []).length > 0 && (
              <section>
                <h3
                  className="font-bold border-b-2 text-sm mb-2 uppercase"
                  style={{ color: themeColor, borderColor: themeColor + "30" }}
                >
                  Certifications
                </h3>
                {renderCertifications()}
              </section>
            )}
          </div>
        </div>
      </div>
    );

    const MinimalLayout = () => (
      <div className="flex flex-col gap-6">
        <div className="border-l-8 pl-4" style={{ borderColor: themeColor }}>
          <h2 className="text-2xl font-bold text-slate-900">
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h2>
          <p className="text-lg text-slate-600">{resumeInfo?.jobTitle}</p>
        </div>
        <section>
          <h3 className="text-xs font-black uppercase text-slate-400 mb-2">
            Background
          </h3>
          <p className="text-[12px] text-slate-700">{resumeInfo?.summary}</p>
        </section>
        <section>
          <h3 className="text-xs font-black uppercase text-slate-400 mb-4">
            Experience
          </h3>
          {renderExperience()}
        </section>
        <div className="grid grid-cols-2 gap-8">
          <section>
            <h3 className="text-xs font-black uppercase text-slate-400 mb-2">
              Skills
            </h3>
            {renderSkills()}
          </section>
          <section>
            <h3 className="text-xs font-black uppercase text-slate-400 mb-2">
              Education
            </h3>
            {renderEducation()}
          </section>
        </div>
      </div>
    );

    const ProfessionalLayout = () => (
      <div className="flex flex-col gap-5">
        <div
          className="text-center border-b-4 pb-4"
          style={{ borderColor: themeColor }}
        >
          <h2 className="text-2xl font-black text-slate-900 uppercase">
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h2>
          <p className="text-[12px] font-bold text-slate-700 uppercase tracking-widest">
            {resumeInfo?.jobTitle}
          </p>
        </div>
        <section>
          <h3
            className="text-sm font-black uppercase"
            style={{ color: themeColor }}
          >
            Experience
          </h3>
          {renderExperience()}
        </section>
        <section>
          <h3
            className="text-sm font-black uppercase"
            style={{ color: themeColor }}
          >
            Education
          </h3>
          {renderEducation()}
        </section>
        <div className="grid grid-cols-2 gap-4">
          <section>
            <h3
              className="text-sm font-black uppercase"
              style={{ color: themeColor }}
            >
              Skills
            </h3>
            {renderSkills()}
          </section>
          <section>
            <h3
              className="text-sm font-black uppercase"
              style={{ color: themeColor }}
            >
              Languages
            </h3>
            {renderLanguages()}
          </section>
        </div>
      </div>
    );

    return (
      <div
        ref={ref}
        id="print-area"
        className="p-10 border shadow-2xl bg-white min-h-[297mm] w-full max-w-[210mm] mx-auto flex flex-col gap-2 overflow-hidden"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {template === "modern" && <ModernLayout />}
        {template === "minimal" && <MinimalLayout />}
        {template === "professional" && <ProfessionalLayout />}
      </div>
    );
  },
);

ResumePreview.displayName = "ResumePreview";
