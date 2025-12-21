import prisma from "@/lib/prisma";
import { client } from "@/lib/r2/R2Client";
import { redis } from "@/lib/redis";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    // Support both header and query parameter for authentication
    const AuthHeader = request.headers.get('Authorization');
    const url = new URL(request.url);
    const secretFromQuery = url.searchParams.get('secret');

    const providedSecret = AuthHeader?.replace('Bearer ', '') || secretFromQuery;

    if (!providedSecret || providedSecret !== process.env.CRON_SECRET) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        )
    }

    try {
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

        const redisKeysToDelete = expiredFiles.map(file => `file:${file.uniqueId}`);
        if (redisKeysToDelete.length > 0) {
            await redis.del(...redisKeysToDelete);
        }

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