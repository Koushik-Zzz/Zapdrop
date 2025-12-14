"use client"
import axios, { isAxiosError } from 'axios';
import { Loader2, CheckCircle, Download, FileIcon, AlertCircle, Home, Clock, HardDrive } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
const FileDownloadPage = () => {
    const params = useParams();
    const router = useRouter();
    const fileId = params.fileId as string;
    
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [downloadStarted, setDownloadStarted] = useState<boolean>(false);
    const [downloadUrl, setDownloadUrl] = useState<string>('');
    const [fileData, setFileData] = useState<{
        fileName: string;
        fileSize: number;
        mimeType: string;
        expiresAt: string;
        uploadedAt: string;
    } | null>(null);

    useEffect(() => {
        if (!fileId) return

        const fetchFileData = async () => {
            try {
                const response = await axios.get(`/api/download/${fileId}`);
                const { url, originalName, fileSize, mimeType, expiresAt, uploadedAt } = response.data;

                if (!url) {
                    throw new Error("Could not retrieve download link.")
                }
                
                setDownloadUrl(url);
                setFileData({
                    fileName: originalName || 'Unknown File',
                    fileSize: fileSize,
                    mimeType: mimeType,
                    expiresAt: expiresAt,
                    uploadedAt: uploadedAt
                });
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch file:", error);
                let errorMessage ="An unknown error occurred";
                if (isAxiosError(error)) {
                    errorMessage = error.response?.data?.error || "An unknown error occurred.";
                } else if (error instanceof Error){
                    errorMessage = error.message
                }
                setError(errorMessage)
                setLoading(false);
            }
        }

        fetchFileData();
        
    }, [fileId]);

    const handleDownload = () => {
        if (!downloadUrl || !fileData) return;

        const link = document.createElement('a');
        link.href = downloadUrl;
        link.setAttribute('download', fileData.fileName || 'download')
        document.body.appendChild(link)
        link.click();
        document.body.removeChild(link);

        setDownloadStarted(true);
    }

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
    }

    const getTimeRemaining = (expiresAt: string): string => {
        const now = new Date().getTime();
        const expiry = new Date(expiresAt).getTime();
        const diff = expiry - now;

        if (diff <= 0) return 'Expired';

        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

        if (hours > 24) {
            const days = Math.floor(hours / 24);
            return `${days} day${days > 1 ? 's' : ''} remaining`;
        }
        if (hours > 0) {
            return `${hours}h ${minutes}m remaining`;
        }
        return `${minutes} minutes remaining`;
    }



    return (
        <div className='w-full min-h-screen relative'>
     
            <div className="fixed inset-0 -z-50 dark:bg-sidebar">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(closest-corner at 120px 36px, rgba(255, 1, 111, 0.19), rgba(255, 1, 111, 0.08)), linear-gradient(rgb(63, 51, 69) 15%, rgb(7, 3, 9))" }}></div>
                <div className="absolute inset-0 bg-noise"></div>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>

            <div className="w-full min-h-screen flex items-center justify-center p-6">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="max-w-lg w-full"
                >
                    <div className="bg-black/40 border border-gray-700/50 backdrop-blur-sm rounded-2xl overflow-hidden">
                        {/* Header */}
                        <div className="bg-pink-500/5 border-b border-gray-700/50 p-6">
                            <div className="flex items-center justify-between">
                                <h1 className="text-2xl font-light text-white">ZapDrop</h1>
                                <Link href="/">
                                    <Home className="w-5 h-5 text-gray-400 hover:text-white transition-colors cursor-pointer" />
                                </Link>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-8">
                            {loading ? (
                                // Loading State
                                <motion.div 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-center">
                                        <div className="w-20 h-20 rounded-full bg-pink-500/20 flex items-center justify-center">
                                            <Loader2 className="w-10 h-10 text-pink-400 animate-spin" />
                                        </div>
                                    </div>
                                    
                                    <div className="text-center space-y-2">
                                        <h2 className="text-xl font-medium text-white">Loading File</h2>
                                        <p className="text-gray-400">Fetching file information...</p>
                                    </div>
                                </motion.div>
                            ) : error ? (
                                // Error State
                                <motion.div 
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-center">
                                        <div className="w-20 h-20 rounded-full bg-red-500/20 flex items-center justify-center">
                                            <AlertCircle className="w-10 h-10 text-red-400" />
                                        </div>
                                    </div>
                                    
                                    <div className="text-center space-y-2">
                                        <h2 className="text-xl font-medium text-white">Download Failed</h2>
                                        <p className="text-gray-400">{error}</p>
                                    </div>

                                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                                        <p className="text-sm text-red-300">
                                            This file may have expired or been deleted. Files on ZapDrop are automatically removed after their expiration period.
                                        </p>
                                    </div>

                                    <div className="flex gap-3">
                                        <button 
                                            onClick={() => router.back()}
                                            className="flex-1 px-4 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors font-medium"
                                        >
                                            Go Back
                                        </button>
                                        <Link href="/" className="flex-1">
                                            <button className="w-full px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors font-medium">
                                                Upload New File
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : downloadStarted ? (
                                // Success State
                                <motion.div 
                                    initial={{ scale: 0.9 }}
                                    animate={{ scale: 1 }}
                                    className="space-y-6"
                                >
                                    <div className="flex justify-center">
                                        <motion.div 
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.2, type: "spring" }}
                                            className="w-20 h-20 rounded-full bg-pink-500/20 flex items-center justify-center"
                                        >
                                            <CheckCircle className="w-10 h-10 text-pink-400" />
                                        </motion.div>
                                    </div>
                                    
                                    <div className="text-center space-y-2">
                                        <h2 className="text-xl font-medium text-white">Download Started!</h2>
                                        <p className="text-gray-400">Your file is downloading now</p>
                                    </div>

                                    {fileData && (
                                        <div className="bg-gray-800/50 rounded-lg p-4 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                                <FileIcon className="w-5 h-5 text-pink-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-white truncate">{fileData.fileName}</p>
                                                <p className="text-xs text-gray-400">Downloaded successfully</p>
                                            </div>
                                        </div>
                                    )}

                                    <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <Clock className="w-5 h-5 text-pink-400 mt-0.5 shrink-0" />
                                            <div>
                                                <p className="text-sm font-medium text-pink-300">Temporary File</p>
                                                <p className="text-xs text-pink-200/70 mt-1">
                                                    This file will be automatically deleted after its expiration period for your privacy.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <Link href="/" className="block">
                                        <button className="w-full px-4 py-3 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors font-medium">
                                            Share Another File
                                        </button>
                                    </Link>
                                </motion.div>
                            ) : fileData ? (
                                // File Details State (Before Download)
                                <motion.div 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="space-y-6"
                                >
                                    {/* File Preview Card */}
                                    <div className="bg-pink-500/5 rounded-xl p-6 border border-gray-700/50">
                                        <div className="flex items-start gap-4">
                                            <div className="w-16 h-16 rounded-xl bg-pink-500/20 flex items-center justify-center shrink-0">
                                                <FileIcon className="w-8 h-8 text-pink-400" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h2 className="text-lg font-medium text-white truncate mb-1">
                                                    {fileData.fileName}
                                                </h2>
                                                <p className="text-sm text-gray-400">
                                                    Ready for download
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* File Information */}
                                    <div className="space-y-3">
                                        <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">
                                            File Information
                                        </h3>
                                        
                                        <div className="bg-gray-800/50 rounded-lg divide-y divide-gray-700/50">
                                            {/* File Size */}
                                            <div className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                                        <HardDrive className="w-4 h-4 text-pink-400" />
                                                    </div>
                                                    <span className="text-sm text-gray-300">File Size</span>
                                                </div>
                                                <span className="text-sm font-medium text-white">
                                                    {formatFileSize(fileData.fileSize)}
                                                </span>
                                            </div>

                                            {/* Expires */}
                                            <div className="p-4 flex items-center justify-between">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-lg bg-pink-500/20 flex items-center justify-center">
                                                        <Clock className="w-4 h-4 text-pink-400" />
                                                    </div>
                                                    <span className="text-sm text-gray-300">Expires</span>
                                                </div>
                                                <span className="text-sm font-medium text-pink-400">
                                                    {getTimeRemaining(fileData.expiresAt)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Download Button */}
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={handleDownload}
                                        className="w-full px-6 py-4 bg-gray-800/80 hover:bg-gray-700 border border-pink-500/30 text-pink-400 hover:text-pink-300 rounded-lg transition-all font-medium flex items-center justify-center gap-2"
                                    >
                                        <Download className="w-5 h-5" />
                                        Download File
                                    </motion.button>

                                    {/* Alternative Actions */}
                                    <div className="flex gap-3">
                                        <Link href="/" className="flex-1">
                                            <button className="w-full px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-gray-300 rounded-lg transition-colors text-sm">
                                                Go Home
                                            </button>
                                        </Link>
                                    </div>
                                </motion.div>
                            ) : null}
                        </div>
                    </div>

                    {/* Footer Info */}
                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-500">
                            Secured by <span className="text-pink-400">ZapDrop</span> · Files auto-delete after expiration
                        </p>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}

export default FileDownloadPage;