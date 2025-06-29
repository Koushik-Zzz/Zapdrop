"use client"
import React, { useCallback, useState } from 'react'
import { Card, CardContent } from './ui/card'
import { AlertCircle, Clock, File, Loader2, Upload, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Progress } from './ui/progress'
import AnimatedButton from './AnimatedButton'

const EXPIRY_OPTIONS = [
	{ label: '2 Hours', value: '2h', hours: 2 },
	{ label: '5 Hours', value: '5h', hours: 5 },
	{ label: '1 Day', value: '1d', hours: 24 },
]

const UploadCard = () => {
	const [isDragOver, setIsDragOver] = useState(false)
	const [selectedFile, setSelectedFile] = useState<File | null>(null)
	const [error, setError] = useState<string | null>(null)
	const [isUploading, setIsUploading] = useState(false)
	const [selectedExpiry, setSelectedExpiry] = useState(EXPIRY_OPTIONS[0])
	const [uploadProgress, setUploadProgress] = useState(0)

	const handleDragOver = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setIsDragOver(true)
	}, [])

	const handleDragLeave = useCallback((e: React.DragEvent) => {
		e.preventDefault()
		setIsDragOver(false)
	}, [])

	const handleDrop = useCallback(
		(e: React.DragEvent) => {
			e.preventDefault()
			setIsDragOver(false)
			setError(null)
			// TODO: Handle file drop
			console.log('TODO: handle file drop')
		},
		[]
	)

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		// TODO: Handle file selection
		console.log('TODO: handle file selection')
	}

	const handleUpload = () => {
		// TODO: Handle file upload
		console.log('TODO: handle file upload')
	}

	const formatFileSize = (size: number) => {
		if (size === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(size) / Math.log(k))
		return (
			Number.parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
		)
	}

	return (
		<div className='max-w-xl w-full mx-auto p-6'>
			{/* Header */}
			<div className='text-center mb-8'>
				<h1 className='text-3xl font-light text-white mb-2'>Upload File</h1>
				<p className='text-gray-400 text-sm'>
					Share files securely with auto-expiry
				</p>
			</div>

			<Card className='bg-black/40 border-gray-700/50 backdrop-blur-sm'>
				<CardContent className='p-6 space-y-6'>
					{/* Upload Area */}
					<div
						className={cn(
							'border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 cursor-pointer',
							isDragOver
								? 'border-pink-400 bg-pink-500/10'
								: 'border-gray-600 hover:border-gray-500',
							selectedFile && 'border-pink-500 bg-pink-500/10'
						)}
						onDragOver={handleDragOver}
						onDragLeave={handleDragLeave}
						onDrop={handleDrop}
						onClick={() => document.getElementById('fileInput')?.click()}
					>
						<input
							id='fileInput'
							type='file'
							className='hidden'
							onChange={handleFileSelect}
							disabled={isUploading}
						/>

						{selectedFile ? (
							<div className='space-y-4'>
								<div className='w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto'>
									<File className='w-6 h-6 text-pink-400' />
								</div>
								<div>
									<p className='font-medium text-white'>
										{selectedFile.name}
									</p>
									<p className='text-gray-400 text-sm mt-1'>
										{formatFileSize(selectedFile.size)}
									</p>
								</div>
								<Button
									variant='ghost'
									size='sm'
									onClick={(e) => {
										e.stopPropagation()
										setSelectedFile(null)
										setError(null)
									}}
									disabled={isUploading}
									className='text-gray-400 hover:text-white hover:bg-gray-800/50'
								>
									<X className='w-4 h-4 mr-2' />
									Remove
								</Button>
							</div>
						) : (
							<div className='space-y-4'>
								<div className='w-12 h-12 bg-gray-700/50 rounded-lg flex items-center justify-center mx-auto'>
									<Upload className='w-6 h-6 text-gray-400' />
								</div>
								<div>
									<p className='text-lg font-medium text-white mb-1'>
										Drop files here
									</p>
									<p className='text-gray-400 text-sm'>
										or click to browse
									</p>
								</div>
								<Badge
									variant='secondary'
									className='bg-gray-700/50 text-gray-300 border-0'
								>
									Max 50MB
								</Badge>
							</div>
						)}
					</div>

					{/* Error Display */}
					{error && (
						<div className='flex items-center gap-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg'>
							<AlertCircle className='w-4 h-4 text-red-400' />
							<p className='text-sm text-red-400'>{error}</p>
						</div>
					)}

					{/* Expiry Selection */}
					<div className='space-y-3'>
						<div className='flex items-center gap-2'>
							<Clock className='w-4 h-4 text-pink-400' />
							<label className='text-sm font-medium text-gray-300'>
								Auto-delete after:
							</label>
						</div>
						<div className='flex gap-2'>
							{EXPIRY_OPTIONS.map((option) => (
								<AnimatedButton
									key={option.value}
									variant='outline'
									size='sm'
									onClick={() => setSelectedExpiry(option)}
									disabled={isUploading}
									className={cn(
										'relative border-2 transition-all duration-200 bg-transparent',
										selectedExpiry.value === option.value
											? 'border-pink-500 text-pink-400 bg-pink-500/10'
											: 'border-gray-600 text-gray-300 hover:border-gray-500 hover:bg-gray-700/30'
									)}
								>
									{option.label}
								</AnimatedButton>
							))}
						</div>
					</div>

					{/* Upload Progress */}
					{isUploading && (
						<div className='space-y-3'>
							<div className='flex justify-between items-center'>
								<span className='text-gray-400 text-sm'>Uploading...</span>
								<span className='text-white text-sm font-medium'>
									{Math.round(uploadProgress)}%
								</span>
							</div>
							<Progress value={uploadProgress} className='h-2 bg-gray-700/50' />
						</div>
					)}

					{/* Upload Button */}
					<Button
						className={cn(
							'w-full relative border-2 transition-all duration-200 h-12',
							'border-pink-500 bg-pink-500/10 text-pink-400 hover:bg-pink-500/20 hover:border-pink-400',
							'disabled:opacity-50 disabled:cursor-not-allowed',
							'font-medium'
						)}
						disabled={!selectedFile || isUploading}
						onClick={handleUpload}
					>
						{isUploading ? (
							<div className='flex items-center gap-2'>
								<Loader2 className='w-4 h-4 animate-spin' />
								Uploading...
							</div>
						) : (
							<div className='flex items-center gap-2'>
								<Upload className='w-4 h-4' />
								Upload & Generate Link
							</div>
						)}
					</Button>
				</CardContent>
			</Card>
		</div>
	)
}

export default UploadCard