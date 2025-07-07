import { authOptions } from "@/lib/authOptions";
import prisma from "@/lib/prisma";
import { GetSignedUrl } from "@/lib/r2/GetSignedUrl";
import { fileSchema, hoursToSeconds } from "@/lib/zod";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        console.log(data);
        
        const parseData = fileSchema.safeParse(data);
        
        if (!parseData.success) {
            console.error('Validation error:', parseData.error);
            return NextResponse.json(
                {
                    success: false,
                    error: "Invalid data format",
                    details: parseData.error.errors
                },
                { status: 400 }
            )
        }
        const { file, expiry } = parseData.data;
        
        // Convert hours to seconds securely
        const expirySeconds = hoursToSeconds(expiry.hours);
        
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            console.error("No session found")
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                    details: "User session not found"
                },
                { status: 401 }
            )
        }

        const user = await prisma.user.findUnique({
            where: {
                id: session?.user?.id || ''
            }
        })
        
        const key = user?.id + crypto.randomUUID()
        
        const signedUrl = await GetSignedUrl({
            key: key,
            expiresIn: expirySeconds
        })
        console.log('Signed URL:', signedUrl);

        if (!signedUrl) {
            console.error("Failed to generate signed URL");
            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to generate signed URL",
                    details: "Could not create signed URL for file upload"
                }
            )
        }

        await prisma.file.create({
            data: {
                originalName: file.name,
                fileName: file.name,
                fileSize: file.size,
                mimeType: file.type,
                shareId: key,
                uploadedById: user?.id || '',
                expiresAt: new Date(Date.now() + expirySeconds * 1000)

            }
        })
        
        return NextResponse.json({ 
            success: true, 
            message: 'Success',
            signedUrl: signedUrl,
            expirySeconds
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to process request'
        }, { status: 500 });
    }
}