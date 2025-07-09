import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { client } from "./R2Client";
import { GetSignedUrlForGetFile, GetSignedUrlOptions } from "@/types";



// Function to generate a signed URL for uploading files to R2
export async function GetSignedUrl({key, expiresIn = 3600, contentType}: GetSignedUrlOptions) {
    const command = new PutObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        ContentType: contentType
    })

    const PreSignedUrl = await getSignedUrl(client,command, {expiresIn})
    return PreSignedUrl
}

/*
we will send this signed url to the client
and the client will use this url to upload the file directly to R2
This is useful for uploading large files directly to R2 without going through the server
*/

export async function GetSignedUrlForFile({key, FileName, expiresIn = 600}: GetSignedUrlForGetFile) {
    const command = new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME,
        Key: key,
        ResponseContentDisposition: `attachment; filename="${FileName}"`
    })

    const PreSignedUrl = await getSignedUrl(client, command, { expiresIn })
    return PreSignedUrl
}