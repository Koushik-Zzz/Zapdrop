import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { ArrowLeft, Shield, Eye, Database, Lock, Trash2, Globe, UserCheck } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
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
              <Shield className='w-6 h-6 text-pink-400' />
            </div>
            <div>
              <h1 className='text-3xl font-light text-white'>Privacy Policy</h1>
              <p className='text-gray-400 text-sm'>Last updated: July 2025</p>
            </div>
          </div>
        </div>

        <Card className='bg-black/40 border-gray-700/50 backdrop-blur-sm'>
          <CardContent className='p-8 space-y-8'>
            {/* Introduction */}
            <section>
              <p className='text-gray-300 leading-relaxed'>
                At ZapDrop (<span className='text-pink-400'>zapdrop.slyde.tech</span>), we are committed to protecting your privacy and 
                being transparent about how we collect, use, and share your information. This Privacy Policy explains our practices 
                regarding your personal data when you use our file sharing service.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <Database className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>Information We Collect</h2>
              </div>
              <div className='space-y-6'>
                <div>
                  <h3 className='text-lg font-medium text-white mb-2'>Account Information</h3>
                  <p className='text-gray-300 leading-relaxed'>
                    When you sign in with Google OAuth, we collect:
                  </p>
                  <ul className='mt-2 space-y-1 text-gray-300 pl-6'>
                    <li className='flex items-start gap-2'>
                      <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                      Your Google account email address
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                      Your name and profile picture (if public)
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                      Unique user identifier for our system
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-lg font-medium text-white mb-2'>File Metadata</h3>
                  <p className='text-gray-300 leading-relaxed'>
                    For each file you upload, we store:
                  </p>
                  <ul className='mt-2 space-y-1 text-gray-300 pl-6'>
                    <li className='flex items-start gap-2'>
                      <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                      Original filename and file size
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                      MIME type and upload timestamp
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                      Expiration date and share link identifier
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                      Download access logs (timestamp only)
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className='text-lg font-medium text-white mb-2'>Technical Information</h3>
                  <p className='text-gray-300 leading-relaxed'>
                    We automatically collect certain technical information including IP address, browser type, 
                    and usage patterns to improve our service and prevent abuse.
                  </p>
                </div>
              </div>
            </section>

            {/* How We Use Your Information */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <Eye className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>How We Use Your Information</h2>
              </div>
              <div className='space-y-4'>
                <div className='p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg'>
                  <p className='text-blue-300 text-sm'>
                    <strong>Primary Purpose:</strong> We use your information solely to provide the file sharing service, 
                    authenticate your account, and enable secure file transfers.
                  </p>
                </div>
                <ul className='space-y-2 text-gray-300'>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    Authenticate and authorize your access to the service
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    Generate secure share links for your files
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    Automatically delete expired files to protect your privacy
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    Monitor for abuse and maintain service security
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    Improve our service performance and user experience
                  </li>
                </ul>
              </div>
            </section>

            {/* File Security */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <Lock className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>File Security & Storage</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300 leading-relaxed'>
                  Your files are stored securely on Cloudflare R2, a enterprise-grade object storage service with:
                </p>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
                    <h4 className='text-white font-medium mb-2'>Encryption</h4>
                    <p className='text-gray-300 text-sm'>
                      Files are encrypted in transit (HTTPS) and at rest using industry-standard encryption.
                    </p>
                  </div>
                  <div className='p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
                    <h4 className='text-white font-medium mb-2'>Access Control</h4>
                    <p className='text-gray-300 text-sm'>
                      Files are only accessible via unique, time-limited share links that you generate.
                    </p>
                  </div>
                  <div className='p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
                    <h4 className='text-white font-medium mb-2'>Content Privacy</h4>
                    <p className='text-gray-300 text-sm'>
                      We do not access, scan, or analyze the contents of your uploaded files.
                    </p>
                  </div>
                  <div className='p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
                    <h4 className='text-white font-medium mb-2'>Geographic Storage</h4>
                    <p className='text-gray-300 text-sm'>
                      Files are stored in geographically distributed data centers for reliability.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <Trash2 className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>Data Retention & Deletion</h2>
              </div>
              <div className='space-y-4'>
                <div className='p-4 bg-green-500/10 border border-green-500/20 rounded-lg'>
                  <p className='text-green-300 text-sm'>
                    <strong>Automatic Deletion:</strong> All uploaded files are automatically and permanently deleted 
                    after the expiration period you select (2 hours, 5 hours, or 1 day).
                  </p>
                </div>
                <div className='space-y-2 text-gray-300'>
                  <p><strong>Files:</strong> Permanently deleted from our servers after expiration</p>
                  <p><strong>File Metadata:</strong> Retained for 30 days after file deletion for system integrity</p>
                  <p><strong>Account Information:</strong> Retained while your account is active</p>
                  <p><strong>Access Logs:</strong> Automatically purged after 90 days</p>
                </div>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <Globe className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>Information Sharing</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300 leading-relaxed'>
                  We do not sell, trade, or rent your personal information to third parties. We only share information in these limited circumstances:
                </p>
                <ul className='space-y-2 text-gray-300'>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    <strong>Service Providers:</strong> Cloudflare (file storage), Vercel (hosting), and Upstash (caching) - all under strict data processing agreements
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    <strong>Legal Requirements:</strong> When required by law, court order, or to protect our rights and safety
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    <strong>Business Transfer:</strong> In the event of a merger or acquisition (with advance notice)
                  </li>
                </ul>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <UserCheck className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>Your Rights & Choices</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300 leading-relaxed'>
                  You have several rights regarding your personal information:
                </p>
                <div className='grid md:grid-cols-2 gap-4'>
                  <div className='p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
                    <h4 className='text-white font-medium mb-2'>Access & Export</h4>
                    <p className='text-gray-300 text-sm'>
                      Request a copy of all personal data we have about you.
                    </p>
                  </div>
                  <div className='p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
                    <h4 className='text-white font-medium mb-2'>Deletion</h4>
                    <p className='text-gray-300 text-sm'>
                      Request deletion of your account and all associated data.
                    </p>
                  </div>
                  <div className='p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
                    <h4 className='text-white font-medium mb-2'>Correction</h4>
                    <p className='text-gray-300 text-sm'>
                      Update or correct any inaccurate personal information.
                    </p>
                  </div>
                  <div className='p-4 bg-gray-800/50 rounded-lg border border-gray-700/50'>
                    <h4 className='text-white font-medium mb-2'>Portability</h4>
                    <p className='text-gray-300 text-sm'>
                      Export your data in a machine-readable format.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <div className='flex items-center gap-3 mb-4'>
                <Eye className='w-5 h-5 text-pink-400' />
                <h2 className='text-xl font-semibold text-white'>Cookies & Tracking</h2>
              </div>
              <div className='space-y-4'>
                <p className='text-gray-300 leading-relaxed'>
                  We use minimal cookies and tracking technologies:
                </p>
                <ul className='space-y-2 text-gray-300'>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    <strong>Authentication Cookies:</strong> To keep you signed in securely
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    <strong>Session Cookies:</strong> To maintain your session state
                  </li>
                  <li className='flex items-start gap-2'>
                    <span className='w-1.5 h-1.5 bg-pink-400 rounded-full mt-2 flex-shrink-0'></span>
                    <strong>Performance Analytics:</strong> Anonymous usage statistics via Vercel Analytics
                  </li>
                </ul>
                <p className='text-gray-300 text-sm'>
                  You can control cookies through your browser settings, though this may affect functionality.
                </p>
              </div>
            </section>

            {/* Contact & Updates */}
            <section className='border-t border-gray-700/50 pt-8'>
              <h2 className='text-xl font-semibold text-white mb-4'>Contact & Policy Updates</h2>
              <div className='space-y-4'>
                <p className='text-gray-300 leading-relaxed'>
                  If you have questions about this Privacy Policy or want to exercise your rights, contact us at{' '}
                  <a href="mailto:koushik02269@gmail.com" className='text-pink-400 hover:underline'>
                    koushik02269@gmail.com
                  </a>
                </p>
                <p className='text-gray-300 leading-relaxed'>
                  We may update this Privacy Policy occasionally. We&apos;ll notify users of significant changes via email 
                  or prominent notice on our website. Continued use after updates constitutes acceptance.
                </p>
                <div className='p-4 bg-pink-500/10 border border-pink-500/20 rounded-lg'>
                  <p className='text-pink-300 text-sm'>
                    <strong>Open Source:</strong> Our privacy practices are transparent. You can review our code and 
                    data handling on <a href="https://github.com/Koushik-Zzz/zapdrop" className='underline'>GitHub</a>.
                  </p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}