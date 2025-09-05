// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const url = new URL(request.url);
  
  // Zkontroluj, jestli cesta začíná na /api/dynmap-proxy
  if (url.pathname.startsWith('/api/dynmap-proxy')) {
    // Přepiš URL na dynmap server a přidej zbytek cesty a parametry
    const newUrl = new URL(
      url.pathname.replace('/api/dynmap-proxy', '') + url.search,
      'http://map.craftmaga.cz:25238'
    );
    return NextResponse.rewrite(newUrl);
  }
  return NextResponse.next();
}