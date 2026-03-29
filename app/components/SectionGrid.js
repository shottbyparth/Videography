'use client';
import { useState } from 'react';
import Image from 'next/image';
import VideoModal from './VideoModal';

export default function SectionGrid({ sections }) {
  const [openSection, setOpenSection] = useState(null);
  const [openSub, setOpenSub] = useState(null);
  const [activeVideo, setActiveVideo] = useState(null);

  const currentSection = sections.find(s => s.id === openSection);
  const currentSub = currentSection?.subsections.find(s => s.id === openSub);

  return (
    <section id="work">
      {/* ── Two big tiles like the reference ── */}
      {!openSection && (
        <div className="flex flex-col md:flex-row w-full">
          {sections.map((sec, i) => (
            <SectionTile key={sec.id} section={sec} index={i} onClick={() => { setOpenSection(sec.id); setOpenSub(null); }} />
          ))}
        </div>
      )}

      {/* ── Subsection list view ── */}
      {openSection && !openSub && currentSection && (
        <div className="min-h-screen bg-[#050505]">
          {/* Back + header */}
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-24 pb-12">
            <button onClick={() => setOpenSection(null)}
              className="font-body text-[10px] tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors flex items-center gap-2 mb-12">
              ← Back
            </button>
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/25 mb-3">Select Category</p>
            <h2 className="font-display text-7xl md:text-9xl uppercase text-white leading-none">
              {currentSection.label}
            </h2>
          </div>

          <div className="w-full h-px bg-white/5" />

          {/* Subsection rows — editorial list style */}
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 divide-y divide-white/[0.04]">
            {currentSection.subsections.map((sub, i) => (
              <button key={sub.id} onClick={() => setOpenSub(sub.id)}
                className="w-full flex items-center justify-between py-7 group text-left">
                <div className="flex items-center gap-8">
                  <span className="font-body text-[10px] tracking-widest text-white/15">
                    {String(i + 1).padStart(2,'0')}
                  </span>
                  <span className="font-display text-3xl md:text-5xl uppercase text-white/50 group-hover:text-white transition-colors duration-300">
                    {sub.label}
                  </span>
                </div>
                <div className="flex items-center gap-6">
                  <span className="font-body text-[10px] tracking-widest uppercase text-white/20">
                    {sub.videos.length} {sub.videos.length === 1 ? 'Film' : 'Films'}
                  </span>
                  <span className="text-white/15 group-hover:text-white transition-colors text-xl">+</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Videos grid view ── */}
      {openSub && currentSub && (
        <div className="min-h-screen bg-[#050505]">
          <div className="max-w-screen-xl mx-auto px-6 md:px-12 pt-24 pb-12">
            {/* Breadcrumb back */}
            <div className="flex items-center gap-3 mb-12">
              <button onClick={() => setOpenSub(null)}
                className="font-body text-[10px] tracking-[0.4em] uppercase text-white/30 hover:text-white transition-colors">
                ← {currentSection.label}
              </button>
              <span className="text-white/15">/</span>
              <span className="font-body text-[10px] tracking-[0.4em] uppercase text-white/50">
                {currentSub.label}
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-7xl uppercase text-white leading-none mb-2">
              {currentSub.label}
            </h2>
            <p className="font-body text-[10px] tracking-widest uppercase text-white/20 mb-14">
              {currentSub.videos.length} {currentSub.videos.length === 1 ? 'Film' : 'Films'}
            </p>
          </div>

          <div className="w-full h-px bg-white/5 mb-8" />

          <div className="max-w-screen-xl mx-auto px-6 md:px-12 pb-24">
            {currentSub.videos.length === 0 ? (
              <EmptyState label={currentSub.label} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {currentSub.videos.map(video => (
                  <VideoCard key={video.id} video={video} onClick={() => setActiveVideo(video)} />
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeVideo && <VideoModal video={activeVideo} onClose={() => setActiveVideo(null)} />}
    </section>
  );
}

/* ── Big section tile ── */
function SectionTile({ section, index, onClick }) {
  return (
    <div className="section-cover w-full md:w-1/2 h-[50vh] md:h-screen relative" onClick={onClick}>
      <Image
        src={section.coverImage}
        alt={section.label}
        fill
        className="object-cover"
        style={{ filter: 'brightness(0.3)' }}
        sizes="(max-width:768px) 100vw, 50vw"
        priority={index === 0}
      />
      {/* Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />

      {/* Label — centered like the reference */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
        <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-white tracking-wider uppercase cover-label transition-opacity duration-500">
          {section.label}
        </h2>
        <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/30">
          {section.subsections.reduce((t, s) => t + s.videos.length, 0)} Films
        </p>
        <span className="cover-arrow font-body text-[10px] tracking-[0.4em] uppercase text-white/50 flex items-center gap-2 mt-2">
          Explore →
        </span>
      </div>

      {/* Thin border between tiles */}
      {index === 0 && <div className="hidden md:block absolute right-0 top-0 bottom-0 w-px bg-white/5" />}
    </div>
  );
}

/* ── Video card ── */
function VideoCard({ video, onClick }) {
  return (
    <div className="video-card group relative overflow-hidden bg-zinc-900 cursor-pointer"
      onClick={onClick} role="button" tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}>
      <div className="relative aspect-video overflow-hidden">
        {video.thumbnail ? (
          <img src={video.thumbnail} alt={video.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full bg-zinc-800 flex items-center justify-center">
            <svg className="w-8 h-8 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
              <path strokeLinecap="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-400 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full border border-white/40 flex items-center justify-center backdrop-blur-sm">
            <svg className="w-5 h-5 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        {video.duration && (
          <span className="absolute bottom-2 right-2 font-body text-[10px] text-white/60 bg-black/70 px-2 py-0.5 tracking-wider">
            {video.duration}
          </span>
        )}
      </div>
      <div className="px-3 py-3">
        <p className="font-body text-xs text-white/50 group-hover:text-white/80 transition-colors leading-snug tracking-wide">
          {video.title}
        </p>
      </div>
    </div>
  );
}

/* ── Empty state with instructions ── */
function EmptyState({ label }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-6 text-center">
      <div className="w-16 h-16 border border-white/10 flex items-center justify-center">
        <svg className="w-6 h-6 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeWidth={1} d="M12 4v16m8-8H4"/>
        </svg>
      </div>
      <div>
        <p className="font-display text-2xl text-white/20 uppercase tracking-wider mb-2">{label}</p>
        <p className="font-body text-[11px] text-white/20 tracking-wider">
          No films yet
        </p>
        <p className="font-body text-[10px] text-white/15 tracking-wider mt-1">
          Add videos via the Admin panel at /admin
        </p>
      </div>
    </div>
  );
}
