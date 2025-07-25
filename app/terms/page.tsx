import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, FileText, Shield, AlertTriangle, Scale, Clock, Users } from 'lucide-react'
import Link from 'next/link'

export default function TermsPage() {
  return (
    <div className='min-h-screen relative'>
      {/* Background */}
      <div className="fixed inset-0 -z-50 dark:bg-sidebar">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(closest-corner at 120px 36px, rgba(255, 1, 111, 0.19), rgba(255, 1, 111, 0.08)), linear-gradient(rgb(63, 51, 69) 15%, rgb(7, 3, 9))" }}></div>
        <div className="absolute inset-0 bg-noise"></div>
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      <div className='container mx-auto px-4 py-8 max-w-4xl'>
        {/* Header */}
        <div className='mb-8'>
          <Link 
            href="/" 
            className='inline-flex items-center text-gray-400 hover:text-white transition-colors mb-6'
          >
            <ArrowLeft className='w-4 h-4 mr-2' />
            Back to Home
          </Link>
          
          <div className='flex items-center gap-3 mb-4'>
            <div className='w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center'>
              <FileText className='w-6 h-6 text-pink-400' />
            </div>
            <div>
              <h1 className='text-3xl font-light text-white'>Terms of Service</h1>
              <p className='text-gray-400 text-sm'>Last updated: January 2025</p>
            </div>
          </div>
        </div>

        <Card className='bg-black/40 border-gray-700/50 backdrop-blur-sm'>
          <CardContent className='p-8 space-y-8'>
            {/* Introduction */}
            <section>
              <p className='text-gray-300 leading-relaxed'>
                Welcome to ZapDrop! These terms and conditions outline the rules and regulations for the use of 
                ZapDrop's Website, located at <span className='text-pink-400'>zapdrop.slyde.tech</span>.
              </p>
              <p className='text-gray-300 leading-relaxed mt-4'>
                By accessing this website we assume you accept these terms and conditions. Do not continue to use 
                ZapDrop if you do not agree to take all of the terms and conditions stated on this page.
              </p>
            </section>

            {/* License */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <Scale className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>License</h2>
              </div>
              <p className='text-gray-300 leading-relaxed'>
                Unless otherwise stated, ZapDrop and/or its licensors own the intellectual property rights for all material on 
                ZapDrop. All intellectual property rights are reserved. You may access this from ZapDrop for your own 
                personal use subjected to restrictions set in these terms and conditions.
              </p>
              <div className='mt-4 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
                <p className='text-sm text-gray-400'>
                  This project is open source and licensed under the MIT License. 
                  You can find the source code on <a href="https://github.com/Koushik-Zzz/zapdrop" className='text-pink-400 hover:underline'>GitHub</a>.
                </p>
              </div>
            </section>

            {/* File Sharing */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <Shield className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>File Sharing</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300 leading-relaxed'>
                  You are responsible for the files you share using our service. You must not upload any files that are illegal, 
                  malicious, or violate copyright laws.
                </p>
                <p className='text-gray-300 leading-relaxed'>
                  All files are automatically deleted from our servers after the expiration period you select (2 hours, 5 hours, or 1 day). 
                  We do not store your files permanently.
                </p>
                <div className='flex items-start gap-3 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg'>
                  <AlertTriangle className='w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0' />
                  <div>
                    <p className='text-amber-300 font-medium'>Important:</p>
                    <p className='text-amber-200 text-sm'>
                      Maximum file size is 100MB. Prohibited content includes malware, illegal materials, 
                      copyrighted content without permission, and personal information of others.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data and Privacy */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <Users className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>Data and Privacy</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300 leading-relaxed'>
                  We collect minimal data necessary to provide the service. This includes your Google account information 
                  for authentication and file metadata for sharing functionality.
                </p>
                <p className='text-gray-300 leading-relaxed'>
                  Your files are stored securely on Cloudflare R2 and are only accessible via the unique share links you generate. 
                  We do not access, scan, or analyze your file contents.
                </p>
              </div>
            </section>

            {/* Service Availability */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <Clock className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>Service Availability</h2>
              </div>
              <p className='text-gray-300 leading-relaxed'>
                While we strive to maintain 99.9% uptime, ZapDrop is provided "as is" without guarantees of continuous availability. 
                We may perform maintenance, updates, or experience technical difficulties that could temporarily affect service.
              </p>
            </section>

            {/* Disclaimer */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <AlertTriangle className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>Disclaimer</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300 leading-relaxed'>
                  To the maximum extent permitted by applicable law, we exclude all representations, warranties and 
                  conditions relating to our website and the use of this website. Nothing in this disclaimer will:
                </p>
                <ul className='space-y-2 text-gray-300 pl-6'>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    limit or exclude our or your liability for death or personal injury;
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    limit or exclude our or your liability for fraud or fraudulent misrepresentation;
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    limit any of our or your liabilities in any way that is not permitted under applicable law; or
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    exclude any of our or your liabilities that may not be excluded under applicable law.
                  </li>
                </ul>
              </div>
            </section>

            {/* Contact */}
            <section className='border-t border-gray-700/50 pt-8'>
              <h2 className='text-xl font-semibold text-white mb-4'>Contact Information</h2>
              <p className='text-gray-300 leading-relaxed'>
                If you have any questions about these Terms of Service, please contact us at{' '}
                <a href="mailto:koushik02269@gmail.com" className='text-pink-400 hover:underline'>
                  koushik02269@gmail.com
                </a>
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
