'use client';
import { useEffect } from 'react';

export default function LoadingScreen() {
  useEffect(() => {
    const el = document.getElementById('loading-screen');
    if (!el) return;
    setTimeout(() => el.classList.add('hidden'), 2200);
  }, []);

  return (
    <div id="loading-screen">
      <div className="flex flex-col items-center gap-6 w-56">
        <p className="font-display text-3xl tracking-[0.35em] text-white uppercase">Shottbyparth</p>
        <div className="w-full h-px bg-white/10 overflow-hidden">
          <div className="h-full bg-white/50" style={{ animation: 'barLoad 2s ease forwards' }} />
        </div>
        <p className="font-body text-[9px] tracking-[0.6em] uppercase text-white/20">Portfolio</p>
      </div>
    </div>
  );
}
