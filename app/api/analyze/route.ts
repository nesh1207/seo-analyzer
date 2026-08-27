import { NextRequest, NextResponse } from 'next/server';
import { fetchPageSpeedData, generateFallbackAnalysis } from '@/lib/pagespeed';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { url, strategy = 'mobile' } = body;

    if (!url || typeof url !== 'string' || !url.trim()) {
      return NextResponse.json(
        { error: 'Please provide a valid website URL.' },
        { status: 400 }
      );
    }

    const data = await fetchPageSpeedData(url, strategy);
    return NextResponse.json(data);
  } catch (error: any) {
    console.error('API /api/analyze error:', error);
    return NextResponse.json(
      { error: 'Failed to complete website analysis.', details: error?.message },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get('url');
  const strategy = (searchParams.get('strategy') as 'mobile' | 'desktop') || 'mobile';

  if (!url) {
    return NextResponse.json(
      { error: 'Missing required query parameter: url' },
      { status: 400 }
    );
  }

  try {
    const data = await fetchPageSpeedData(url, strategy);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to analyze URL', details: error?.message },
      { status: 500 }
    );
  }
}
