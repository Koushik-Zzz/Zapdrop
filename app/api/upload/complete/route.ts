import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { completeSchema } from "@/lib/zod";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

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

        const nanoId = key.split("-")
        console.log("Share ID parts:", nanoId, "nanoid 5th element:", [nanoId[4]]);

        await prisma.file.create({
            data: {
                uniqueId: nanoId[4],
                originalName,
                key,
                fileSize,
                mimeType,
                expiresAt: new Date(expiresAt),
                uploadedById: session.user.id
            }
        })

        return NextResponse.json({ success: true, nanoId: nanoId[4], message: "File record created" });
    } catch (error) {
        console.error("Error in upload completion:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}