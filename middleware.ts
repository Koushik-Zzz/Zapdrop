import { Ratelimit } from '@upstash/ratelimit'
import { Redis } from '@upstash/redis'
import { NextRequest, NextResponse } from 'next/server'


const redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN
})

const rateLimit = new Ratelimit({
    redis: redis,
    limiter: Ratelimit.slidingWindow(10, '10 s')
})



export async function  middleware(request: NextRequest) {
    const ip = request.headers.get('x-forwarded-for') ?? '127.0.0.1'
    
    const { success } = await rateLimit.limit(ip)
    if(!success) {
        return NextResponse.json(
            {error: "Too many requests"},
            { status: 429 }
        )
    }

    return NextResponse.next()
} 

export const config = {
    matcher: [
        '/api/upload',
        '/api/cron/delete-expired',
        '/api/files/:path*'
    ]
}