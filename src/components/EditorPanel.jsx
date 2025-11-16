import { useState } from "react";
import { api } from "../lib/api";

export default function EditorPanel({ onClose, onSeeded, content }) {
  const [tab, setTab] = useState("eras");
  const [form, setForm] = useState({});
  const eras = content?.eras || [];

  async function handleCreate(type) {
    try {
      if (type === 'era') {
        await api.createEra(form);
      } else if (type === 'project') {
        await api.createProject(form);
      } else if (type === 'skill') {
        await api.createSkill(form);
      } else if (type === 'achievement') {
        await api.createAchievement(form);
      } else if (type === 'profile') {
        await api.setProfile(form);
      } else if (type === 'styles') {
        await api.setStyles(form);
      }
      setForm({});
      onSeeded?.();
    } catch (e) {
      alert(e.message);
    }
  }

  async function seed() {
    try {
      await api.seed();
      onSeeded?.();
    } catch (e) {
      alert(e.message);
    }
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full sm:w-[520px] bg-slate-950 text-white border-l border-white/10 p-5 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">Codex Editor</h3>
          <button onClick={onClose} className="px-3 py-1 rounded bg-white/10 hover:bg-white/20">Close</button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {['eras','projects','skills','about','achievements','styles'].map(t => (
            <button key={t} onClick={()=>setTab(t)} className={`px-3 py-1 rounded ${tab===t?'bg-violet-600':'bg-white/10 hover:bg-white/20'}`}>{t}</button>
          ))}
          <button onClick={seed} className="ml-auto px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500">Seed Demo</button>
        </div>

        <div className="mt-6 space-y-6">
          {tab==='eras' && (
            <section>
              <h4 className="font-semibold mb-2">New Era</h4>
              <div className="space-y-2">
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="key (e.g., ancient)" value={form.key||''} onChange={e=>setForm({...form,key:e.target.value})} />
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="name" value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})} />
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="theme (ancient, medieval, industrial, cyber, cosmic, custom)" value={form.theme||''} onChange={e=>setForm({...form,theme:e.target.value})} />
                <textarea className="w-full px-3 py-2 rounded bg-white/10" rows={3} placeholder="description" value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})} />
                <button onClick={()=>handleCreate('era')} className="px-3 py-2 rounded bg-violet-600 hover:bg-violet-500">Create Era</button>
              </div>
              <div className="mt-6">
                <div className="text-sm text-white/60 mb-2">Existing</div>
                <div className="grid grid-cols-2 gap-2">
                  {eras.map(e => (
                    <div key={e.key} className="p-2 rounded bg-white/5 border border-white/10">
                      <div className="text-xs text-white/60">{e.key}</div>
                      <div className="font-medium">{e.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {tab==='projects' && (
            <section>
              <h4 className="font-semibold mb-2">New Project</h4>
              <div className="space-y-2">
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="title" value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})} />
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="era_key" value={form.era_key||''} onChange={e=>setForm({...form,era_key:e.target.value})} />
                <textarea className="w-full px-3 py-2 rounded bg-white/10" rows={3} placeholder="description" value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})} />
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="tech_stack (comma separated)" value={form.tech_stack_raw||''} onChange={e=>setForm({...form,tech_stack_raw:e.target.value, tech_stack:e.target.value.split(',').map(s=>s.trim()).filter(Boolean)})} />
                <button onClick={()=>handleCreate('project')} className="px-3 py-2 rounded bg-violet-600 hover:bg-violet-500">Create Project</button>
              </div>
            </section>
          )}

          {tab==='skills' && (
            <section>
              <h4 className="font-semibold mb-2">New Skill</h4>
              <div className="space-y-2">
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="name" value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})} />
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="level (0-100)" value={form.level||''} onChange={e=>setForm({...form,level:parseInt(e.target.value||'0')})} />
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="category" value={form.category||''} onChange={e=>setForm({...form,category:e.target.value})} />
                <button onClick={()=>handleCreate('skill')} className="px-3 py-2 rounded bg-violet-600 hover:bg-violet-500">Create Skill</button>
              </div>
            </section>
          )}

          {tab==='about' && (
            <section>
              <h4 className="font-semibold mb-2">Profile</h4>
              <div className="space-y-2">
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="name" value={form.name||''} onChange={e=>setForm({...form,name:e.target.value})} />
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="role" value={form.role||''} onChange={e=>setForm({...form,role:e.target.value})} />
                <textarea className="w-full px-3 py-2 rounded bg-white/10" rows={3} placeholder="bio" value={form.bio||''} onChange={e=>setForm({...form,bio:e.target.value})} />
                <button onClick={()=>handleCreate('profile')} className="px-3 py-2 rounded bg-violet-600 hover:bg-violet-500">Save Profile</button>
              </div>
            </section>
          )}

          {tab==='achievements' && (
            <section>
              <h4 className="font-semibold mb-2">New Achievement</h4>
              <div className="space-y-2">
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="title" value={form.title||''} onChange={e=>setForm({...form,title:e.target.value})} />
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="year" value={form.year||''} onChange={e=>setForm({...form,year:parseInt(e.target.value||'0')})} />
                <textarea className="w-full px-3 py-2 rounded bg-white/10" rows={3} placeholder="description" value={form.description||''} onChange={e=>setForm({...form,description:e.target.value})} />
                <button onClick={()=>handleCreate('achievement')} className="px-3 py-2 rounded bg-violet-600 hover:bg-violet-500">Create Achievement</button>
              </div>
            </section>
          )}

          {tab==='styles' && (
            <section>
              <h4 className="font-semibold mb-2">Global Style</h4>
              <div className="space-y-2">
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="theme (ancient, medieval, industrial, cyber, cosmic)" value={form.theme||''} onChange={e=>setForm({...form,theme:e.target.value})} />
                <input className="w-full px-3 py-2 rounded bg-white/10" placeholder="glow (0-1)" value={form.glow||''} onChange={e=>setForm({...form,glow:parseFloat(e.target.value||'0.6')})} />
                <button onClick={()=>handleCreate('styles')} className="px-3 py-2 rounded bg-violet-600 hover:bg-violet-500">Save Styles</button>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
