import prisma from "@/lib/prisma";
import { client } from "@/lib/r2/R2Client";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const AuthHeader = request.headers.get('Authorization');

    // verify the request is from the cron job using secret key from env
    if (!AuthHeader || AuthHeader !== process.env.CRON_SECRET) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }

    try {

        // Fetch all files that have expired
        const expiredFiles = await prisma.file.findMany({
            where: {
                expiresAt: {
                    lt: new Date()
                }
            }
        })

        if (expiredFiles.length === 0) {
            return NextResponse.json(
                { 
                    success: true,
                    message: "No expired files found to delete"
                }
            )
        }

        // Delete each expired file from R2 and remove metadata from PostgreSQL
        const DeletePromises = expiredFiles.map(async (file) => {
            const deleteCommand = new DeleteObjectCommand({
                Bucket: process.env.R2_BUCKET_NAME,
                Key: file.key
            })
            await client.send(deleteCommand)

            await prisma.file.delete({
                where: {
                    id: file.id
                }
            });

            return file.key
        })

        const deletedKeys = await Promise.all(DeletePromises)

        return NextResponse.json(
            {
                success: true,
                message: `Successfully deleted ${deletedKeys.length} expired files`,
                deletedKeys: deletedKeys
            }
        )
    } catch (error) {
        console.error("Cron job failed:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to delete expired files",
            },
            { status: 500 }
        )
    }

}