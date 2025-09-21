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

export interface File {
  id: string;
  originalName: string;
  fileSize: number;
  mimeType: string;
  uniqueId: string;
  key: string;
  expiresAt: string | Date;
  isExpired: boolean;
  uploadedAt: string | Date;
  lastAccessedAt: string | Date | null;
  uploadedById: string;
}