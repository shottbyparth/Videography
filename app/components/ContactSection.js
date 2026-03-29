'use client';
import { useState } from 'react';

export default function ContactSection({ contact }) {
  const [form, setForm] = useState({ name:'', email:'', message:'' });
  const [status, setStatus] = useState('idle');

  const send = async e => {
    e.preventDefault();
    setStatus('sending');
    try {
      const r = await fetch(`https://formspree.io/f/${contact.formspreeId}`, {
        method:'POST', headers:{'Content-Type':'application/json', Accept:'application/json'},
        body: JSON.stringify(form),
      });
      setStatus(r.ok ? 'ok' : 'err');
      if (r.ok) setForm({ name:'', email:'', message:'' });
    } catch { setStatus('err'); }
  };

  return (
    <section id="contact" className="bg-[#050505] border-t border-white/5 py-28 md:py-36">
      <div className="max-w-screen-xl mx-auto px-6 md:px-12">
        <div className="mb-16">
          <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/25 mb-4">Get In Touch</p>
          <h2 className="font-display text-6xl md:text-8xl uppercase text-white leading-none">
            Book A<br/><span className="text-white/20">Shoot</span>
          </h2>
        </div>
        <div className="w-full h-px bg-white/5 mb-16" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
          <div>
            <p className="font-body text-[11px] text-white/30 leading-loose tracking-wider max-w-xs mb-10">
              Weddings, commercial shoots, drone projects, celebrity campaigns — let's build something cinematic together.
            </p>
            <a href={`mailto:${contact.email}`}
              className="group flex flex-col gap-1">
              <span className="font-body text-[9px] tracking-[0.5em] uppercase text-white/20">Email</span>
              <span className="font-body text-sm text-white/40 group-hover:text-white transition-colors">{contact.email}</span>
            </a>
          </div>
          <form onSubmit={send} className="flex flex-col gap-8">
            {[['Name','name','text','Your name'],['Email','email','email','your@email.com']].map(([l,n,t,p]) => (
              <div key={n} className="flex flex-col gap-2">
                <label className="font-body text-[9px] tracking-[0.5em] uppercase text-white/25">{l}</label>
                <input type={t} name={n} value={form[n]} required placeholder={p}
                  onChange={e => setForm({...form,[n]:e.target.value})}
                  className="bg-transparent border-b border-white/10 text-white/60 font-body text-sm py-3 placeholder:text-white/15 focus:outline-none focus:border-white/30 transition-colors" />
              </div>
            ))}
            <div className="flex flex-col gap-2">
              <label className="font-body text-[9px] tracking-[0.5em] uppercase text-white/25">Message</label>
              <textarea name="message" value={form.message} rows={4} required
                placeholder="Tell me about your project..."
                onChange={e => setForm({...form,message:e.target.value})}
                className="bg-transparent border-b border-white/10 text-white/60 font-body text-sm py-3 placeholder:text-white/15 focus:outline-none focus:border-white/30 transition-colors resize-none" />
            </div>
            <div className="flex items-center gap-6">
              <button type="submit" disabled={status==='sending'}
                className="font-body text-[10px] tracking-[0.4em] uppercase px-8 py-3 bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white/20 transition-all duration-500 disabled:opacity-40">
                {status==='sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status==='ok' && <span className="font-body text-[10px] tracking-widest uppercase text-white/40">✓ Sent!</span>}
              {status==='err' && <span className="font-body text-[10px] tracking-widest uppercase text-red-400/50">Error — try email</span>}
            </div>
          </form>
        </div>
        <div className="border-t border-white/5 mt-24 pt-8 flex justify-between flex-wrap gap-4">
          <p className="font-display text-sm uppercase tracking-widest text-white/10">Shottbyparth © {new Date().getFullYear()}</p>
          <p className="font-body text-[9px] tracking-[0.4em] uppercase text-white/10">Shot with passion.</p>
        </div>
      </div>
    </section>
  );
}
