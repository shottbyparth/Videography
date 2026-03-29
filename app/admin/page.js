'use client';
import { useState, useEffect } from 'react';

// ─── CHANGE THIS PASSWORD ───────────────────────────────────────────
const ADMIN_PASSWORD = 'shottbyparth2024';
// ───────────────────────────────────────────────────────────────────

const DEFAULT_DATA = {
  site: { name:'Shottbyparth', tagline:'Videographer & Creative Director', heroVideoUrl:'YOUR_GOOGLE_DRIVE_VIDEO_EMBED_URL', heroSubtext:'Every frame tells a story' },
  sections: [
    { id:'drone', label:'DRONE', coverImage:'https://images.unsplash.com/photo-1508444845599-5c89863b1c44?w=1200', description:'Aerial cinematography from above',
      subsections: [
        { id:'drone-events', label:'Events', videos:[] },
        { id:'drone-nature', label:'Nature & Landscape', videos:[] },
        { id:'drone-urban', label:'Urban & City', videos:[] },
      ]
    },
    { id:'videography', label:'VIDEOGRAPHY', coverImage:'https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=1200', description:'Cinematic stories crafted on the ground',
      subsections: [
        { id:'vid-model', label:'Model Shoot', videos:[] },
        { id:'vid-wedding', label:'Weddings', videos:[] },
        { id:'vid-commercial', label:'Commercial', videos:[] },
        { id:'vid-celebs', label:'Celebs Edit', videos:[] },
        { id:'vid-events', label:'Events', videos:[] },
      ]
    }
  ],
  social: { instagram:'https://www.instagram.com/shottbyparth', youtube:'https://www.youtube.com/@shottbyparth' },
  contact: { email:'your@email.com', formspreeId:'YOUR_FORMSPREE_ID' }
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState('');
  const [pwErr, setPwErr] = useState(false);
  const [data, setData] = useState(null);
  const [tab, setTab] = useState('videos');
  const [saved, setSaved] = useState(false);
  const [addingTo, setAddingTo] = useState(null); // { sectionId, subId }
  const [newVideo, setNewVideo] = useState({ title:'', driveId:'', thumbnail:'', duration:'', type:'' });
  const [expandedSub, setExpandedSub] = useState(null);

  // Load data from localStorage (since we can't write files from browser)
  useEffect(() => {
    if (!authed) return;
    const saved = localStorage.getItem('sbp_content');
    if (saved) {
      try { setData(JSON.parse(saved)); } catch { setData(DEFAULT_DATA); }
    } else {
      setData(DEFAULT_DATA);
    }
  }, [authed]);

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwErr(false); }
    else { setPwErr(true); setPw(''); }
  };

  const save = () => {
    localStorage.setItem('sbp_content', JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'content.json'; a.click();
    URL.revokeObjectURL(url);
  };

  const addVideo = (sectionId, subId) => {
    if (!newVideo.title || !newVideo.driveId) return;
    const id = `v_${Date.now()}`;
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id !== sectionId ? sec : {
          ...sec,
          subsections: sec.subsections.map(sub =>
            sub.id !== subId ? sub : {
              ...sub,
              videos: [...sub.videos, { ...newVideo, id }]
            }
          )
        }
      )
    }));
    setNewVideo({ title:'', driveId:'', thumbnail:'', duration:'', type:'' });
    setAddingTo(null);
  };

  const deleteVideo = (sectionId, subId, videoId) => {
    if (!confirm('Delete this video?')) return;
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(sec =>
        sec.id !== sectionId ? sec : {
          ...sec,
          subsections: sec.subsections.map(sub =>
            sub.id !== subId ? sub : {
              ...sub,
              videos: sub.videos.filter(v => v.id !== videoId)
            }
          )
        }
      )
    }));
  };

  // ── Login screen ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center px-6">
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div className="text-center mb-4">
            <p className="font-display text-3xl tracking-[0.3em] uppercase text-white">Admin</p>
            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-white/25 mt-2">Shottbyparth Portfolio</p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="font-body text-[9px] tracking-[0.5em] uppercase text-white/30">Password</label>
            <input type="password" value={pw} onChange={e => setPw(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              placeholder="Enter password"
              className="bg-transparent border-b border-white/10 text-white/70 font-body text-sm py-3 placeholder:text-white/15 focus:outline-none focus:border-white/30 transition-colors" />
            {pwErr && <p className="font-body text-[10px] text-red-400/60 tracking-wider">Incorrect password</p>}
          </div>
          <button onClick={login}
            className="font-body text-[10px] tracking-[0.4em] uppercase px-8 py-3 bg-white text-black hover:bg-transparent hover:text-white hover:border hover:border-white/20 transition-all duration-500">
            Enter
          </button>
        </div>
      </div>
    );
  }

  if (!data) return <div className="min-h-screen bg-[#050505] flex items-center justify-center text-white/30">Loading...</div>;

  // ── Admin dashboard ──
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      {/* Top bar */}
      <div className="border-b border-white/5 px-6 md:px-10 py-4 flex items-center justify-between sticky top-0 bg-[#050505]/95 backdrop-blur z-10">
        <div>
          <p className="font-display text-xl tracking-[0.2em] uppercase">Admin Panel</p>
          <p className="font-body text-[9px] tracking-widest uppercase text-white/25">Shottbyparth Portfolio</p>
        </div>
        <div className="flex items-center gap-3">
          {saved && <span className="font-body text-[10px] tracking-widest uppercase text-white/40">✓ Saved</span>}
          <button onClick={save} className="font-body text-[10px] tracking-[0.3em] uppercase px-5 py-2 bg-white text-black hover:bg-white/80 transition-colors">
            Save
          </button>
          <button onClick={exportJson} className="font-body text-[10px] tracking-[0.3em] uppercase px-5 py-2 border border-white/20 text-white/50 hover:text-white hover:border-white/40 transition-colors">
            Export JSON
          </button>
          <a href="/" className="font-body text-[10px] tracking-[0.3em] uppercase text-white/25 hover:text-white transition-colors">
            View Site →
          </a>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-white/5 px-6 md:px-10 flex gap-8">
        {['videos','settings'].map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`font-body text-[10px] tracking-[0.4em] uppercase py-4 border-b-2 transition-colors ${tab===t ? 'border-white text-white' : 'border-transparent text-white/25 hover:text-white/60'}`}>
            {t === 'videos' ? 'Videos & Sections' : 'Site Settings'}
          </button>
        ))}
      </div>

      <div className="max-w-screen-xl mx-auto px-6 md:px-10 py-10">

        {/* ── VIDEOS TAB ── */}
        {tab === 'videos' && (
          <div className="flex flex-col gap-10">
            <div>
              <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/25 mb-2">Manage Your Films</p>
              <h2 className="font-display text-4xl uppercase">Videos & Sections</h2>
            </div>

            {/* Instructions */}
            <div className="border border-white/5 p-6 bg-white/[0.02]">
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">📌 How to add a video</p>
              <ol className="font-body text-xs text-white/30 leading-loose list-decimal list-inside space-y-1">
                <li>Upload your video to Google Drive</li>
                <li>Right-click → Share → "Anyone with the link can view"</li>
                <li>Copy the link: <span className="text-white/50">drive.google.com/file/d/<strong>FILE_ID</strong>/view</span></li>
                <li>Paste only the <strong className="text-white/60">FILE_ID</strong> part into the Drive ID field below</li>
                <li>Click Add Video, then click Save at the top</li>
                <li>Click Export JSON and upload the file to GitHub to update the live site</li>
              </ol>
            </div>

            {data.sections.map(sec => (
              <div key={sec.id} className="border border-white/5">
                {/* Section header */}
                <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                  <h3 className="font-display text-2xl uppercase tracking-wider">{sec.label}</h3>
                  <span className="font-body text-[10px] tracking-widest uppercase text-white/25">
                    {sec.subsections.reduce((t,s) => t+s.videos.length, 0)} total films
                  </span>
                </div>

                {sec.subsections.map(sub => (
                  <div key={sub.id} className="border-b border-white/5 last:border-b-0">
                    {/* Subsection header */}
                    <button className="w-full px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                      onClick={() => setExpandedSub(expandedSub === sub.id ? null : sub.id)}>
                      <div className="flex items-center gap-4">
                        <span className="font-body text-sm text-white/70 tracking-wide">{sub.label}</span>
                        <span className="font-body text-[10px] tracking-widest uppercase text-white/20">
                          {sub.videos.length} films
                        </span>
                      </div>
                      <span className="text-white/20 text-lg">{expandedSub === sub.id ? '−' : '+'}</span>
                    </button>

                    {expandedSub === sub.id && (
                      <div className="px-6 pb-6">
                        {/* Existing videos */}
                        {sub.videos.length > 0 && (
                          <div className="flex flex-col gap-2 mb-6">
                            {sub.videos.map(v => (
                              <div key={v.id} className="flex items-center justify-between bg-white/[0.03] px-4 py-3 border border-white/5">
                                <div>
                                  <p className="font-body text-sm text-white/60">{v.title}</p>
                                  <p className="font-body text-[10px] text-white/25 tracking-wider">ID: {v.driveId}</p>
                                </div>
                                <button onClick={() => deleteVideo(sec.id, sub.id, v.id)}
                                  className="font-body text-[10px] tracking-widest uppercase text-red-400/40 hover:text-red-400 transition-colors px-3 py-1.5 border border-red-400/10 hover:border-red-400/30">
                                  Delete
                                </button>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Add video form */}
                        {addingTo?.sectionId === sec.id && addingTo?.subId === sub.id ? (
                          <div className="border border-white/10 p-5 flex flex-col gap-4 bg-white/[0.02]">
                            <p className="font-body text-[10px] tracking-[0.4em] uppercase text-white/40">Add New Video</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <Field label="Video Title *" value={newVideo.title} onChange={v => setNewVideo({...newVideo,title:v})} placeholder="e.g. Mumbai Skyline Drone" />
                              <Field label="Google Drive File ID *" value={newVideo.driveId} onChange={v => setNewVideo({...newVideo,driveId:v})} placeholder="1BxiMVs0XRA5nFMd..." />
                              <Field label="Thumbnail URL (optional)" value={newVideo.thumbnail} onChange={v => setNewVideo({...newVideo,thumbnail:v})} placeholder="https://..." />
                              <Field label="Duration (optional)" value={newVideo.duration} onChange={v => setNewVideo({...newVideo,duration:v})} placeholder="3:45" />
                              <Field label="Type label (optional)" value={newVideo.type} onChange={v => setNewVideo({...newVideo,type:v})} placeholder="Drone / Edit / BTS" />
                            </div>
                            <div className="flex gap-3">
                              <button onClick={() => addVideo(sec.id, sub.id)}
                                disabled={!newVideo.title || !newVideo.driveId}
                                className="font-body text-[10px] tracking-[0.3em] uppercase px-6 py-2.5 bg-white text-black hover:bg-white/80 transition-colors disabled:opacity-30">
                                Add Video
                              </button>
                              <button onClick={() => setAddingTo(null)}
                                className="font-body text-[10px] tracking-[0.3em] uppercase px-6 py-2.5 border border-white/15 text-white/40 hover:text-white transition-colors">
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button onClick={() => { setAddingTo({ sectionId:sec.id, subId:sub.id }); setNewVideo({ title:'',driveId:'',thumbnail:'',duration:'',type:'' }); }}
                            className="font-body text-[10px] tracking-[0.4em] uppercase text-white/25 hover:text-white transition-colors flex items-center gap-2 border border-dashed border-white/10 hover:border-white/30 px-5 py-3 w-full justify-center">
                            + Add Video to {sub.label}
                          </button>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}

        {/* ── SETTINGS TAB ── */}
        {tab === 'settings' && (
          <div className="flex flex-col gap-10 max-w-xl">
            <div>
              <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/25 mb-2">Site Configuration</p>
              <h2 className="font-display text-4xl uppercase">Settings</h2>
            </div>

            <SettingsBlock title="Hero Video">
              <Field label="Google Drive Embed URL" value={data.site.heroVideoUrl}
                onChange={v => setData({...data, site:{...data.site, heroVideoUrl:v}})}
                placeholder="https://drive.google.com/file/d/FILE_ID/preview" />
              <p className="font-body text-[10px] text-white/20 tracking-wider">
                Format: https://drive.google.com/file/d/YOUR_FILE_ID/preview
              </p>
            </SettingsBlock>

            <SettingsBlock title="Site Info">
              <Field label="Hero Subtext" value={data.site.heroSubtext}
                onChange={v => setData({...data, site:{...data.site, heroSubtext:v}})}
                placeholder="Every frame tells a story" />
              <Field label="Tagline" value={data.site.tagline}
                onChange={v => setData({...data, site:{...data.site, tagline:v}})}
                placeholder="Videographer & Creative Director" />
            </SettingsBlock>

            <SettingsBlock title="Contact">
              <Field label="Email" value={data.contact.email}
                onChange={v => setData({...data, contact:{...data.contact, email:v}})}
                placeholder="your@email.com" />
              <Field label="Formspree ID (for contact form)" value={data.contact.formspreeId}
                onChange={v => setData({...data, contact:{...data.contact, formspreeId:v}})}
                placeholder="xrgvwkzp" />
            </SettingsBlock>

            <SettingsBlock title="Social Links">
              <Field label="Instagram URL" value={data.social.instagram}
                onChange={v => setData({...data, social:{...data.social, instagram:v}})}
                placeholder="https://instagram.com/..." />
              <Field label="YouTube URL" value={data.social.youtube}
                onChange={v => setData({...data, social:{...data.social, youtube:v}})}
                placeholder="https://youtube.com/@..." />
            </SettingsBlock>

            <div className="border border-white/5 p-6 bg-white/[0.02]">
              <p className="font-body text-[10px] tracking-[0.4em] uppercase text-white/30 mb-3">⚠️ To update the live website</p>
              <p className="font-body text-xs text-white/25 leading-loose">
                Changes saved here are stored in your browser. To publish to your live Vercel site:<br/>
                1. Click <strong className="text-white/40">Export JSON</strong> above<br/>
                2. Download the <code className="text-white/40">content.json</code> file<br/>
                3. Go to GitHub → your repo → open <code className="text-white/40">data/content.json</code><br/>
                4. Click the pencil icon → paste the new content → commit<br/>
                5. Vercel auto-redeploys in ~1 minute ✅
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="font-body text-[9px] tracking-[0.5em] uppercase text-white/25">{label}</label>
      <input type="text" value={value} placeholder={placeholder}
        onChange={e => onChange(e.target.value)}
        className="bg-transparent border-b border-white/10 text-white/60 font-body text-sm py-2.5 placeholder:text-white/15 focus:outline-none focus:border-white/30 transition-colors" />
    </div>
  );
}

function SettingsBlock({ title, children }) {
  return (
    <div className="border border-white/5 p-6 flex flex-col gap-5">
      <p className="font-body text-[10px] tracking-[0.5em] uppercase text-white/30">{title}</p>
      {children}
    </div>
  );
}
