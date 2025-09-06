// components/DynmapViewer.tsx
'use client';

import { useEffect, useState } from 'react';

const DYNMAP_PROXY_URL = '/mapa'; // Nová, jednoduchá adresa pro proxy

export default function DynmapViewer() {
  const [url, setUrl] = useState('');

  useEffect(() => {
    // Vytvoří dynamickou URL s parametry, které Dynmapa potřebuje
    const params = new URLSearchParams({
      worldname: 'spawn', // Můžeš změnit
      mapname: 'flat', // Můžeš změnit
      zoom: '4',
      x: '0',
      y: '64',
      z: '0',
    });
    setUrl(`${DYNMAP_PROXY_URL}?${params.toString()}`);
  }, []);

  return (
    <div style={{ width: '100%', height: '600px' }}>
      {url && (
        <iframe
          src={url}
          style={{ width: '100%', height: '100%', border: 'none' }}
          title="Dynmapa CraftMaga"
          allowFullScreen
        />
      )}
    </div>
  );
}