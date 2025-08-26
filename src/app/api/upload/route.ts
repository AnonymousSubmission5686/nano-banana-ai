import { NextRequest, NextResponse } from 'next/server';
import { falaiService } from '@/lib/falai';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Please upload JPEG, PNG, or WebP images.' },
        { status: 400 }
      );
    }

    // Validate file size (max 10MB)
    const maxSize = 10 * 1024 * 1024; // 10MB
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    console.log('Uploading image:', {
      name: file.name,
      type: file.type,
      size: file.size
    });

    // Upload to fal.ai storage
    const imageUrl = await falaiService.uploadImage(file);

    return NextResponse.json({
      success: true,
      imageUrl,
      fileName: file.name,
      fileSize: file.size
    });

  } catch (error) {
    console.error('Upload API Error:', error);
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Image Upload API',
    maxSize: '10MB',
    supportedFormats: ['JPEG', 'PNG', 'WebP'],
    timestamp: new Date().toISOString()
  });
}
