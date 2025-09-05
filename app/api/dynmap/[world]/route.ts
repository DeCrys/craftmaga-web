// app/api/dynmap-proxy/route.ts
import { NextResponse } from 'next/server';
 
const DYNMAP_URL = 'http://map.craftmaga.cz:25238';
 
export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const apiPath = url.pathname.replace('/api/dynmap-proxy', '');
    const targetUrl = `${DYNMAP_URL}${apiPath}${url.search}`;
 
    const response = await fetch(targetUrl);
    
    if (!response.ok) {
        throw new Error(`Upstream server responded with status: ${response.status}`);
    }
    
    const headers = new Headers(response.headers);
    headers.set('Access-Control-Allow-Origin', '*'); 
 
    const data = await response.arrayBuffer();
 
    return new NextResponse(data, {
      status: response.status,
      headers: headers,
    });
 
  } catch (error) {
    console.error('Proxy error:', error);
    return new NextResponse('Proxy error: ' + (error as Error).message, {
      status: 500,
    });
  }
}