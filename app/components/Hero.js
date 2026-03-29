'use client';

export default function Hero({ site }) {
  const isDrive = site.heroVideoUrl?.includes('drive.google.com');
  const isPlaceholder = site.heroVideoUrl === 'YOUR_GOOGLE_DRIVE_VIDEO_EMBED_URL';

  return (
    <section id="hero" className="relative w-full h-screen flex items-end overflow-hidden bg-black">
      {/* Video background */}
      <div className="absolute inset-0 z-0">
        {!isPlaceholder && isDrive ? (
          <iframe src={site.heroVideoUrl} className="absolute inset-0 w-full h-full"
            style={{ transform:'scale(1.1)', filter:'brightness(0.25)', pointerEvents:'none' }}
            allow="autoplay" title="Hero" />
        ) : !isPlaceholder ? (
          <video src={site.heroVideoUrl} autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ filter:'brightness(0.25)' }} />
        ) : (
          /* Placeholder gradient when no video set */
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-900" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-screen-xl mx-auto px-6 md:px-12 pb-20 md:pb-28">
        <p className="font-body text-[10px] tracking-[0.55em] uppercase text-white/30 mb-5 opacity-0"
          style={{ animation: 'fadeUp 1s ease 0.4s forwards' }}>
          Creative Videography & Direction
        </p>
        <h1 className="font-display leading-none uppercase opacity-0"
          style={{ fontSize: 'clamp(4rem, 14vw, 14rem)', animation: 'fadeUp 1.2s cubic-bezier(0.16,1,0.3,1) 0.6s forwards' }}>
          <span className="text-white">SHOTT</span><br/>
          <span className="text-white/20">BY</span><br/>
          <span className="text-white">PARTH</span>
        </h1>
        <div className="flex items-center gap-6 mt-8 opacity-0"
          style={{ animation: 'fadeUp 1s ease 1.1s forwards' }}>
          <div className="w-10 h-px bg-white/20" />
          <p className="font-body text-[11px] tracking-[0.35em] uppercase text-white/30">
            {site.heroSubtext}
          </p>
          <button onClick={() => document.getElementById('work')?.scrollIntoView({ behavior:'smooth' })}
            className="ml-auto font-body text-[10px] tracking-[0.4em] uppercase px-8 py-3 border border-white/20 text-white/60 hover:bg-white hover:text-black transition-all duration-500">
            View Work
          </button>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute right-8 bottom-20 z-10 flex flex-col items-center gap-2 opacity-0"
        style={{ animation: 'fadeIn 1s ease 2s forwards' }}>
        <div className="w-px h-14 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
