'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const go = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };

  return (
    <>
      <nav className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : ''}`}>
        <div className="max-w-screen-xl mx-auto px-6 md:px-10 h-14 flex items-center justify-between">
          <button onClick={() => go('hero')} className="font-display text-lg tracking-[0.2em] uppercase text-white">
            Shottbyparth
          </button>
          <div className="hidden md:flex items-center gap-8">
            {['work','contact'].map(id => (
              <button key={id} onClick={() => go(id)}
                className="font-body text-[10px] tracking-[0.35em] uppercase text-white/40 hover:text-white transition-colors">
                {id === 'work' ? 'Work' : 'Contact'}
              </button>
            ))}
            <a href="https://www.instagram.com/shottbyparth" target="_blank" rel="noopener noreferrer"
              className="font-body text-[10px] tracking-[0.35em] uppercase text-white/40 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="https://www.youtube.com/@shottbyparth" target="_blank" rel="noopener noreferrer"
              className="font-body text-[10px] tracking-[0.35em] uppercase text-white/40 hover:text-white transition-colors">
              YouTube
            </a>
          </div>
          <button className="md:hidden text-white/50" onClick={() => setOpen(!open)}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open
                ? <path strokeLinecap="round" strokeWidth={1.2} d="M6 18L18 6M6 6l12 12"/>
                : <path strokeLinecap="round" strokeWidth={1.2} d="M4 8h16M4 16h16"/>}
            </svg>
          </button>
        </div>
      </nav>
      {open && (
        <div className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center gap-10">
          {['Work','Contact'].map(l => (
            <button key={l} onClick={() => go(l.toLowerCase())}
              className="font-display text-5xl uppercase tracking-wider text-white hover:text-white/40 transition-colors">
              {l}
            </button>
          ))}
          <div className="flex gap-8 mt-4">
            <a href="https://www.instagram.com/shottbyparth" target="_blank" rel="noopener noreferrer"
              className="font-body text-[10px] tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors">
              Instagram ↗
            </a>
            <a href="https://www.youtube.com/@shottbyparth" target="_blank" rel="noopener noreferrer"
              className="font-body text-[10px] tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors">
              YouTube ↗
            </a>
          </div>
        </div>
      )}
    </>
  );
}
