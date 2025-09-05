// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();
  
  // Vytvoříme novou URL pro Dynmap server
  const dynmapBaseUrl = 'http://map.craftmaga.cz:25238';

  // Zkontrolujeme, jestli cesta začíná na '/dynmap' nebo na '/up'
  if (url.pathname.startsWith('/dynmap') || url.pathname.startsWith('/up')) {
    // Přepíše celou URL tak, aby směřovala na server Dynmapy
    const rewriteUrl = new URL(url.pathname, dynmapBaseUrl);
    return NextResponse.rewrite(rewriteUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dynmap/:path*', '/up/:path*'],
};