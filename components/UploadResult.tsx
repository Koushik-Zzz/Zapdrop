"use client"
import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Check, Clock, Copy, Download, File, Share2, UploadCloud } from 'lucide-react'
import { Badge } from './ui/badge'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { cn, formatFileSize } from '@/lib/utils'
import { useParams } from 'next/navigation'
import { fileData } from '@/types'
import axios from 'axios'
import { QRCodeSVG } from 'qrcode.react'

const UploadResult = () => {
    const [copied, setCopied] = useState(false)
    const [fileData, setFileData] = useState<fileData>({
        fileName: "",
        fileSize: 0,
        expiry: "",
    })
    const params = useParams()

    const id = params.fileId

    const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/files/${id}`

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)    

        } catch (error) {
            console.error("Failed to copy to clipboard:", error)
        }
    }

    useEffect(() => {
        setFileData({
            fileName: localStorage.getItem('fileName') || "",
            fileSize: Number(localStorage.getItem('fileSize')) || 0,
            expiry: localStorage.getItem('expiry') || "",
        })
    }, [])

    const handleDownload = async () => {
        try {
            const response = await axios.get(`/api/download/${id}`)

            const { url } = response.data

            const link = document.createElement('a')
            link.href = url

            link.setAttribute('download', fileData.fileName || 'download')

            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)

        } catch (error) {
            console.error("Download failed:", error)
        }
        

    }


  return (
    <div className='w-full min-h-screen flex flex-col items-center justify-center p-2'>
        <div className='max-w-4xl w-full space-y-6'>
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-2xl font-light text-white mb-2">File Uploaded Successfully</h1>
                <p className="text-gray-400 text-sm">Your file is ready to share</p>
            </div>

            {/* Main Content */}
            <div className='grid lg:grid-cols-3 gap-6'>
                {/* File Details - 2 columns */}
                <div className='lg:col-span-2'>
                    <Card className='bg-black/40 border-gray-700/50 backdrop-blur-sm'>
                        <CardHeader className='pb-4'>
                            <CardTitle className='flex items-center gap-3 text-white text-lg font-medium'>
                                <div className='w-8 h-8 bg-pink-500/20 rounded-lg flex items-center justify-center'>
                                    <File className='w-4 h-4 text-pink-400' />
                                </div>
                                File Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            {/* File Name */}
                            <div className='space-y-2'>
                                <p className='text-xs text-gray-400 uppercase tracking-wide font-medium'>File Name</p>
                                <div className='bg-gray-800/50 rounded-lg p-3 border border-gray-700'>
                                    <p className='text-white break-all'>{fileData.fileName}</p>
                                </div>
                            </div>

                            {/* File Stats */}
                            <div className='grid grid-cols-2 gap-4'>
                                <div className='space-y-2'>
                                    <p className='text-xs text-gray-400 uppercase tracking-wide font-medium'>Size</p>
                                    <div className='bg-gray-800/50 rounded-lg p-3 border border-gray-700'>
                                        <p className='text-white'>{formatFileSize(fileData.fileSize)}</p>
                                    </div>
                                </div> 
                                <div className='space-y-2'>
                                    <p className='text-xs text-gray-400 uppercase tracking-wide font-medium'>Expires</p>
                                    <div className='bg-gray-800/50 rounded-lg p-3 border border-gray-700'>
                                        <div className='flex items-center gap-2'>
                                            <Clock className='w-4 h-4 text-pink-400' />
                                            <Badge className="bg-pink-500/10 text-pink-400 border-pink-500/30 text-xs">
                                                {fileData.expiry}
                                            </Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Share Link */}
                            <div className='space-y-2'>
                                <p className='text-xs text-gray-400 uppercase tracking-wide font-medium'>Share Link</p>
                                <div className='flex gap-2'>
                                    <Input 
                                        value={shareUrl}
                                        readOnly
                                        className='font-mono text-sm bg-gray-800/50 border-gray-700 text-gray-300 focus:border-pink-500'
                                    />
                                    <Button
                                        onClick={copyToClipboard}
                                        variant="outline"
                                        size="icon"
                                        className={cn(
                                            "border-2 transition-all duration-200",
                                            copied
                                                ? "border-green-500 bg-green-500/10 text-green-400"
                                                : "border-gray-700 bg-transparent text-gray-400 hover:border-pink-500 hover:text-pink-400"
                                        )}                                   
                                    >
                                        {copied ? <Check className='w-4 h-4' /> : <Copy className='w-4 h-4' />}
                                    </Button>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className='flex gap-3 pt-2'>
                                <Button
                                    onClick={() => console.log("TODO: share file")}
                                    className={cn(
                                        "flex-1 border-2 transition-all duration-200 h-10",
                                        "border-pink-500 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 hover:border-pink-400",
                                        "font-medium"
                                    )}
                                >
                                    <Share2 className='w-4 h-4 mr-2' />
                                    Share
                                </Button>
                                <Button
                                    onClick={handleDownload}
                                    variant="outline"
                                    className='flex-1 border-2 border-gray-700 bg-transparent text-gray-300 hover:border-gray-600 hover:bg-gray-800/50 h-10'
                                >
                                    <Download className='w-4 h-4 mr-2' />
                                    Download
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* QR Code - 1 column */}
                <div className='lg:col-span-1'>
                    <Card className='bg-black/40 border-gray-700/50 backdrop-blur-sm h-full'>
                        <CardHeader className='pb-4'>
                            <CardTitle className='text-white text-lg font-medium'>QR Code</CardTitle>
                        </CardHeader>
                        <CardContent className='flex flex-col items-center space-y-3'>
                            <div className='bg-white rounded-lg p-4 w-40 h-40 flex items-center justify-center'>
                                <QRCodeSVG value={shareUrl} bgColor={"#ffffff"} />
                            </div>
                            <p className='text-xs text-gray-400 text-center'>
                                Scan to access file on mobile
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </div>

            {/* Upload Another File */}
            <div className='text-center pt-4'>
                <p className='text-gray-400 text-sm mb-3'>Need to upload another file?</p>
                <Button 
                    onClick={() => console.log("TODO: upload new file")}
                    variant="outline"
                    className='border-2 border-gray-700 bg-transparent text-gray-300 hover:border-gray-600 hover:bg-gray-800/50 px-6 h-10'
                >
                    <UploadCloud className='w-4 h-4 mr-2' />
                    Upload New File
                </Button>
            </div>
        </div>
    </div>
  )
}   

export default UploadResult