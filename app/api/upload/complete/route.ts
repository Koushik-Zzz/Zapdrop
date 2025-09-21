import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { completeSchema } from "@/lib/zod";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import ShortUniqueId from "short-unique-id"
export async function POST(request: Request) {
    try {
        const data = await request.json();
        const parseData = completeSchema.safeParse(data);

        if (!parseData.success) {
            return NextResponse.json( {error: "Invalid data format"}, { status: 400 });
        }
        
        const { key, originalName, fileSize, mimeType, expiresAt } = parseData.data;

        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const uid = new ShortUniqueId({ length: 6 })
        const nanoId = uid.rnd();

        const fileRecord = await prisma.file.create({
            data: {
                uniqueId: nanoId,
                originalName,
                key,
                fileSize,
                mimeType,
                expiresAt: new Date(expiresAt),
                uploadedById: session.user.id
            }
        })

        const cacheKey = `file:${fileRecord.uniqueId}`;
        const expiryInSeconds = Math.floor((new Date(expiresAt).getTime() - Date.now()) / 1000);

        if (expiryInSeconds > 0) {
            await redis.set(cacheKey, JSON.stringify(fileRecord), {
                ex: expiryInSeconds
            })
        }

        return NextResponse.json({ success: true, nanoId: nanoId, message: "File record created" });
    } catch (error) {
        console.error("Error in upload completion:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}