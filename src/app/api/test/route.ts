import { NextResponse } from 'next/server';
import { testDatabaseConnection } from '@/lib/db';

export async function GET() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test basic connection
    const isConnected = await testDatabaseConnection();
    
    const response = {
      status: 'success',
      timestamp: new Date().toISOString(),
      database: {
        connected: isConnected,
        url: process.env.DATABASE_URL ? 'configured' : 'not configured',
      },
      environment: {
        node_env: process.env.NODE_ENV,
        fal_key: process.env.FAL_KEY ? 'configured' : 'not configured',
        nextauth_secret: process.env.NEXTAUTH_SECRET ? 'configured' : 'not configured',
        supabase_url: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'configured' : 'not configured',
      }
    };
    
    console.log('📊 Test results:', response);
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('❌ Test failed:', error);
    
    return NextResponse.json({
      status: 'error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
}
