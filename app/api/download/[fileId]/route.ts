import prisma from "@/lib/prisma";
import { GetSignedUrlForFile } from "@/lib/r2/GetSignedUrl";
import { redis } from "@/lib/redis";
import { File } from "@/types/index";
import { NextResponse } from "next/server";

export async function GET (
  request: Request, 
  { params }: { params: Promise<{ fileId: string }> }
) {
  const { fileId }  = await params
  const cacheKey = `file:${fileId}`;

  try {
    let file: File | null = await redis.get(cacheKey);
    console.log("file:", file);
    if (!file) {
      const dbFile = await prisma.file.findUnique({
        where: { uniqueId: fileId }
      });

      if (!dbFile) {
        return NextResponse.json({ error: "File not found" }, { status: 404 });
      }

      const expiryInSeconds = Math.floor((new Date(dbFile.expiresAt).getTime() - Date.now()) / 1000);
      if (expiryInSeconds > 0) {
        await redis.set(cacheKey, JSON.stringify(dbFile), { ex: expiryInSeconds });
      }
      file = dbFile;

    }
    
    if (new Date() > new Date(file.expiresAt)) {
      return NextResponse.json(
        { error: "File has expired" },
        { status: 410 }
      )
    }

    const SignedUrl = await GetSignedUrlForFile({
      key: file.key,
      FileName: file.originalName,
      expiresIn: 300
    })

    return NextResponse.json({ url: SignedUrl, originalName: file.originalName })
  } catch (error) {
    console.error("Failed to get download url", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}