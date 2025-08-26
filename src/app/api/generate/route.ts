import { NextRequest, NextResponse } from 'next/server';
import { falaiService } from '@/lib/falai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { prompt, imageUrl, character, fusionMode, userId } = body;

    // Validate required fields
    if (!prompt || !character || !fusionMode) {
      return NextResponse.json(
        { error: 'Missing required fields: prompt, character, fusionMode' },
        { status: 400 }
      );
    }

    // TODO: Validate user credits from database
    // For now, we'll skip user validation in development

    console.log('Processing fusion request:', {
      prompt,
      character,
      fusionMode,
      hasImage: !!imageUrl
    });

    // Generate fusion using fal.ai
    const result = await falaiService.generateFusion({
      prompt,
      imageUrl,
      character,
      fusionMode
    });

    if (result.success) {
      // TODO: Save to database and update user credits
      console.log('Fusion generated successfully:', {
        imageUrl: result.imageUrl,
        processingTime: result.processingTime,
        creditsUsed: result.creditsUsed
      });

      return NextResponse.json({
        success: true,
        imageUrl: result.imageUrl,
        processingTime: result.processingTime,
        creditsUsed: result.creditsUsed
      });
    } else {
      return NextResponse.json(
        { error: result.error || 'Generation failed' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    message: 'Anime Fusion AI Generation API',
    status: 'active',
    timestamp: new Date().toISOString()
  });
}
