'use client';
import { useEffect } from 'react';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const fn = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', fn);
    document.body.style.overflow = 'hidden';
    return () => { window.removeEventListener('keydown', fn); document.body.style.overflow = ''; };
  }, [onClose]);

  const embedUrl = `https://drive.google.com/file/d/${video.driveId}/preview`;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/96 backdrop-blur-sm p-4 md:p-10"
      onClick={onClose}
      style={{ animation: 'fadeIn 0.3s ease' }}>
      <div className="relative w-full max-w-5xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-display text-2xl text-white uppercase tracking-wide">{video.title}</h3>
            {video.type && <span className="font-body text-[10px] tracking-[0.3em] uppercase text-white/30">{video.type}</span>}
          </div>
          <button onClick={onClose}
            className="font-body text-[10px] tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors flex items-center gap-2 border border-white/10 px-4 py-2">
            Close ×
          </button>
        </div>
        <div className="relative w-full bg-zinc-900" style={{ paddingTop: '56.25%' }}>
          <iframe src={embedUrl} className="absolute inset-0 w-full h-full"
            allow="autoplay; encrypted-media" allowFullScreen title={video.title} />
        </div>
        <p className="mt-2 font-body text-[9px] text-white/15 tracking-wider text-right">
          Press ESC or click outside to close
        </p>
      </div>
    </div>
  );
}
