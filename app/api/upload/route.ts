import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const {file, expiry} = await request.json();

        if (!file || !expiry) {
            return NextResponse.json(
                { error: 'File and expiry are required' },
                { status: 400 }
            )
        }
        console.log('File received:', file);
        console.log('Expiry setting:', expiry);
        
        // Log detailed file information
        if (file) {
            console.log('File details:');
            console.log('- Name:', file.name);
            console.log('- Size:', file.size);
            console.log('- Type:', file.type);
        }
        
        return NextResponse.json({ 
            success: true, 
            message: 'File details received',
            fileInfo: file
        });

    } catch (error) {
        console.error('API error:', error);
        return NextResponse.json({
            success: false,
            error: 'Failed to process request'
        }, { status: 500 });
    }
}