// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const DYNMAP_URL = 'http://map.craftmaga.cz:25238';

export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone();

  // Přesměruje všechny požadavky, které začínají na /up/, na Dynmap server.
  if (url.pathname.startsWith('/up/')) {
    const newUrl = new URL(url.pathname, DYNMAP_URL);
    return NextResponse.rewrite(newUrl);
  }

  // Přesměruje hlavní stránku mapy, pokud je volána přes /dynmap
  if (url.pathname.startsWith('/dynmap')) {
    const newUrl = new URL(url.pathname, DYNMAP_URL);
    return NextResponse.rewrite(newUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/up/:path*', '/dynmap/:path*'],
};