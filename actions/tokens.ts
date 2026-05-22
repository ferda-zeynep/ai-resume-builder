"use server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function getUserTokens() {
  const { userId } = await auth();
  if (!userId) return 0;

  const userToken = await db.userToken.findUnique({
    where: { userId },
  });

  if (!userToken) {
    const newUserToken = await db.userToken.create({
      data: { userId, tokens: 10 },
    });
    return newUserToken.tokens;
  }

  return userToken.tokens;
}

export async function useToken() {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const userToken = await db.userToken.findUnique({
    where: { userId },
  });

  if (!userToken || userToken.tokens <= 0) {
    throw new Error("Insufficient tokens");
  }

  await db.userToken.update({
    where: { userId },
    data: { tokens: userToken.tokens - 1 },
  });

  revalidatePath("/dashboard");
}
