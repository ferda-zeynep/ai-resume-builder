"use server";

import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

/**
 * Creates a new resume record in the database.
 */
export async function createResume(title: string, template: string = "modern") {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const resume = await db.resume.create({
    data: {
      userId,
      title,
      content: {},
      template: template,
    },
  });

  revalidatePath("/dashboard/resumes");
  return resume;
}

/**
 * Deletes a specific resume after verifying ownership.
 */
export async function deleteResume(resumeId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  try {
    await db.resume.delete({
      where: {
        id: resumeId,
        userId: userId,
      },
    });
    revalidatePath("/dashboard/resumes");
    return { success: true };
  } catch (error) {
    console.error("Resume deletion error:", error);
    return { success: false };
  }
}

/**
 * Updates the JSON content of a specific resume.
 */
export async function updateResumeData(resumeId: string, data: any) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const updatedResume = await db.resume.update({
    where: {
      id: resumeId,
      userId: userId,
    },
    data: {
      content: data,
    },
  });

  revalidatePath(`/dashboard/resume/${resumeId}`);
  return updatedResume;
}

/*  Increments the download counter for a specific resume. */
export async function incrementDownloadCount(resumeId: string) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  await db.resume.update({
    where: {
      id: resumeId,
      userId: userId,
    },
    data: {
      downloadCount: {
        increment: 1,
      },
    },
  });

  revalidatePath("/dashboard");
}
