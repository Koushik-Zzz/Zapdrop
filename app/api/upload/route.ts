import { authOptions } from "@/lib/authOptions";
import { GetSignedUrl } from "@/lib/r2/GetSignedUrl";
import { fileSchema, hoursToSeconds } from "@/lib/zod";
import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";

/*
    * This route handles the file upload request.
    * It generates a pre-signed URL for uploading files to R2.
    * The URL is valid for a specified duration based on the user's input.
*/

export async function POST(request: Request) {
    try {
        const data = await request.json();
        
        
        const parseData = fileSchema.safeParse(data);

        const errorMessage = parseData.error?.errors.map((e)=> e.message).join(', ');
        

        if (!parseData.success) {
            console.error('Validation error:', parseData.error);
            return NextResponse.json(
                {
                    success: false,
                    error: errorMessage || "Invalid data format",
                },
                { status: 400 }
            )
        }
        const { file, expiry } = parseData.data;

        if (file.size > 100 * 1024 * 1024) {
            console.error("File size exceeds limit");
            return NextResponse.json(
                {
                    success: false,
                    error: "You can upload files up to 100MB"
                },
                { status: 413 }
            )
        }
        
        // Convert hours to seconds
        const expirySeconds = hoursToSeconds(expiry.hours);
        
        const session = await getServerSession(authOptions)

        if (!session || !session.user) {
            console.error("No session found")
            return NextResponse.json(
                {
                    success: false,
                    error: "Unauthorized",
                },
                { status: 401 }
            )
        }

        const key = session.user.id + crypto.randomUUID()
        
        const signedUrl = await GetSignedUrl({
            key: key,
            expiresIn: expirySeconds,
            contentType: file.type,
        })

        if (!signedUrl) {
            console.error("Failed to generate signed URL");
            return NextResponse.json(
                {
                    success: false,
                    error: "Failed to generate signed URL",
                }
            )
        }

        
        return NextResponse.json({ 
            success: true, 
            signedUrl: signedUrl,
            key: key
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to process request'
        }, { status: 500 });
    }
}