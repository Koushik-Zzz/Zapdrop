import prisma from "@/lib/prisma";
import { GetSignedUrlForFile } from "@/lib/r2/GetSignedUrl";
import { DownloadParam } from "@/types";
import { NextResponse } from "next/server";

export async function GET (request: Request, context: DownloadParam) {
  const { fileId } = await context.params;

  try {
    const file = await prisma.file.findUnique({
      where: { uniqueId: fileId }
    })

    if (!file) {
      return NextResponse.json(
        { error: "File not found" },
        { status: 404 }
      )
    }
    
    if (new Date() > new Date(file.expiresAt)) {
      return NextResponse.json(
        { error: "File has expired" },
        { status: 410 }
      )
    }

    const SignedUrl = await GetSignedUrlForFile({
      key: file.shareId,
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