export default function SocialBar({ social }) {
  return (
    <section className="bg-[#050505] border-t border-white/5 py-28">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        {/* Marquee */}
        <div className="marquee-wrap mb-20 opacity-[0.04]">
          <div className="marquee-track">
            {Array(10).fill(null).map((_, i) => (
              <span key={i} className="font-display text-[10vw] uppercase whitespace-nowrap text-white">
                Shottbyparth &nbsp;·&nbsp;
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/25 mb-4">Find Me On</p>
            <h2 className="font-display text-6xl md:text-8xl uppercase text-white leading-none">
              Social
            </h2>
          </div>
          <div className="flex flex-col gap-5 md:items-end">
            <SocialLink href={social.instagram} label="Instagram" handle="@shottbyparth"
              icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="5" strokeWidth="1.5"/><circle cx="12" cy="12" r="4" strokeWidth="1.5"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>} />
            <SocialLink href={social.youtube} label="YouTube" handle="@shottbyparth"
              icon={<svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>} />
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialLink({ href, label, handle, icon }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      className="group flex items-center gap-4 border border-white/10 px-6 py-4 hover:border-white/30 hover:bg-white hover:text-black transition-all duration-500 w-full md:w-72">
      <span className="text-white group-hover:text-black transition-colors">{icon}</span>
      <div className="flex-1">
        <p className="font-body text-[10px] tracking-[0.35em] uppercase text-white/40 group-hover:text-black/50 transition-colors">{label}</p>
        <p className="font-body text-sm text-white/70 group-hover:text-black transition-colors">{handle}</p>
      </div>
      <span className="font-body text-white/20 group-hover:text-black transition-colors">↗</span>
    </a>
  );
}
