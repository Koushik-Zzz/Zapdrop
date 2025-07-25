
/*
    * This file contains TypeScript interfaces and types used across the application.
*/

export interface fileData {
    fileName: string;
    fileSize: number;
    expiry: string;
}

export interface DownloadParam {
    params: {
        fileId: string;
    }
}

export interface GetSignedUrlOptions {
    key: string;
    expiresIn?: number;
    contentType?: string;
}

export interface GetSignedUrlForGetFile {
    key: string;
    FileName: string;
    expiresIn?: number;
}