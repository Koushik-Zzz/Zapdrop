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

        const { shareId, originalName, fileSize, mimeType, expiresAt } = parseData.data;

        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        await prisma.file.create({
            data: {
                originalName,
                shareId,
                fileSize,
                mimeType,
                expiresAt: new Date(expiresAt),
                uploadedById: session.user.id
            }
        })

        return NextResponse.json({ success: true, message: "File record created" });
    } catch (error) {
        console.error("Error in upload completion:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}