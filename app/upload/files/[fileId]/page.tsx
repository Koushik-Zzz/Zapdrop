import UploadResult from '@/components/UploadResult'
import React from 'react'

const result = () => {
  return (
    <div className='w-full min-h-screen relative'>

        <div className="fixed inset-0 -z-50 dark:bg-sidebar">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(closest-corner at 120px 36px, rgba(255, 1, 111, 0.19), rgba(255, 1, 111, 0.08)), linear-gradient(rgb(63, 51, 69) 15%, rgb(7, 3, 9))" }}></div>
          <div className="absolute inset-0 bg-noise"></div>
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        <UploadResult />
    </div>
  )
}

export default result