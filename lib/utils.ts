import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatFileSize = (size: number) => {
		if (size === 0) return '0 Bytes'
		const k = 1024
		const sizes = ['Bytes', 'KB', 'MB', 'GB']
		const i = Math.floor(Math.log(size) / Math.log(k))
		return (
			Number.parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
		)
	}