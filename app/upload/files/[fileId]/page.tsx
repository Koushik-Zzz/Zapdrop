"use client"
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { Loader2 } from 'lucide-react'
import dynamic from 'next/dynamic'
import React from 'react'

const UploadResult = dynamic(() => import('@/components/UploadResult'), {
  loading: () => <div className='flex h-screen w-full items-center justify-center'><Loader2 className='h-8 w-8 animate-spin text-pink-400' /></div>,
  ssr: false,
})

const result = () => {
  return (
    <div className='w-full min-h-screen relative'>

        <div className="fixed inset-0 -z-50 dark:bg-sidebar">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(closest-corner at 120px 36px, rgba(255, 1, 111, 0.19), rgba(255, 1, 111, 0.08)), linear-gradient(rgb(63, 51, 69) 15%, rgb(7, 3, 9))" }}></div>
          <div className="absolute inset-0 bg-noise"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <ProtectedRoute>
          <UploadResult />
        </ProtectedRoute>
    </div>
  )
}

export default result