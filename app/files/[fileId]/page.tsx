"use client"
import axios, { isAxiosError } from 'axios';
import { Loader2, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'

/*
    * This page handles the file download process.
    * It fetches the file metadata and starts the download.
    * Displays status messages and handles errors.
*/

const FileDownloadPage = () => {
    const params = useParams();
    // Extracting fileId from params
    const fileId = params.fileId as string;
    
    const [status, setStatus] = useState<string>('Preparing your download...')
    const [error, setError] = useState<string | null>(null);
    const [downloadStarted, setDownloadStarted] = useState<boolean>(false);

    useEffect(() => {
        if (!fileId) return

        const startDownload = async () => {
            try {
                const response = await axios.get(`/api/download/${fileId}`);
                const { url, originalName } = response.data;

                if (!url) {
                    throw new Error("Could not retrieve download link.")
                }
                setStatus("Your download is starting...")

                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', originalName || 'download')
                document.body.appendChild(link)
                link.click();
                document.body.removeChild(link);

                setDownloadStarted(true);

                setTimeout(() => {
                    setStatus("Download started successfully. You can close this page.");
                }, 2000)
            } catch (error) {
                console.error("Download failed:", error);
                let errorMessage ="An unknown error occurred";
                if (isAxiosError(error)) {
                    errorMessage = error.response?.data?.error || "An unknown error occurred.";
                } else if (error instanceof Error){
                    errorMessage = error.message
                }
                setError(`Failed to start download: ${errorMessage}`)
                setStatus("Download failed")
            }
        }

        startDownload();
        
    }, [fileId]);

    const renderStatusIcon = () => {
        if (error) {
            return <div className="text-red-400 text-4xl">⚠️</div>
        }
        
        if (downloadStarted) {
            return <CheckCircle className="h-8 w-8 text-pink-400" />
        }
        
        return <Loader2 className="h-8 w-8 animate-spin text-pink-400" />
    }

    return (
        <div className='w-full min-h-screen relative'>
     
            <div className="fixed inset-0 -z-50 dark:bg-sidebar">
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(closest-corner at 120px 36px, rgba(255, 1, 111, 0.19), rgba(255, 1, 111, 0.08)), linear-gradient(rgb(63, 51, 69) 15%, rgb(7, 3, 9))" }}></div>
                <div className="absolute inset-0 bg-noise"></div>
                <div className="absolute inset-0 bg-black/40"></div>
            </div>


            <div className="w-full min-h-screen flex items-center justify-center p-6">
                <div className="text-center p-8 bg-black/40 border border-gray-700/50 backdrop-blur-sm rounded-lg max-w-md w-full">
                    <h1 className="text-2xl font-light text-white mb-4">ZapDrop</h1>
                    {error ? (
                        <div className="space-y-4">
                            <div className="flex justify-center mb-4">
                                {renderStatusIcon()}
                            </div>
                            <p className="text-red-400">{error}</p>
                            <button 
                                onClick={() => window.history.back()}
                                className="px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-lg transition-colors"
                            >
                                Go Back
                            </button>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center space-y-4">
                            <div className="flex justify-center">
                                {renderStatusIcon()}
                            </div>
                            <p className="text-lg text-gray-300">{status}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default FileDownloadPage;