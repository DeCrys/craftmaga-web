import { NextRequest, NextResponse } from 'next/server';

const DYNMAP_BASE_URL = 'http://178.63.161.182:25238';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    const path = params.path ? params.path.join('/') : '';
    const searchParams = request.nextUrl.searchParams.toString();
    const targetUrl = `${DYNMAP_BASE_URL}/${path}${searchParams ? `?${searchParams}` : ''}`;
    
    console.log('Proxying to:', targetUrl);
    
    const response = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        'User-Agent': 'Next.js Dynmap Proxy',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.text();
    
    // Check if it's JSON
    let jsonData;
    try {
      jsonData = JSON.parse(data);
      return NextResponse.json(jsonData);
    } catch {
      // If not JSON, return as text
      return new NextResponse(data, {
        headers: {
          'Content-Type': response.headers.get('Content-Type') || 'text/plain',
        },
      });
    }
  } catch (error) {
    console.error('Dynmap proxy error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch from dynmap server' },
      { status: 500 }
    );
  }
}