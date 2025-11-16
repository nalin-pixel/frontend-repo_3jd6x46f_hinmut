import { useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Book, Grid3X3, Star, User, Trophy, Menu } from "lucide-react";

export default function Codex({ content, onOpenEditor, selected, setSelected }) {
  const eras = content?.eras || [];
  const projects = content?.projects || [];
  const skills = content?.skills || [];
  const achievements = content?.achievements || [];
  const profile = content?.profile || {};

  const projectsByEra = useMemo(() => {
    const map = {};
    eras.forEach(e => (map[e.key] = []));
    projects.forEach(p => {
      const k = p.era_key || "unknown";
      if (!map[k]) map[k] = [];
      map[k].push(p);
    });
    return map;
  }, [eras, projects]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-black text-white">
      <div className="mx-auto max-w-7xl px-4 py-6 flex gap-6">
        <aside className="w-64 hidden md:block">
          <nav className="sticky top-6 space-y-2">
            <button onClick={() => setSelected("eras")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 ${selected==='eras'?'ring-2 ring-violet-500':''}`}><Grid3X3 size={18}/> Timelines</button>
            <button onClick={() => setSelected("projects")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 ${selected==='projects'?'ring-2 ring-violet-500':''}`}><Book size={18}/> Projects</button>
            <button onClick={() => setSelected("skills")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 ${selected==='skills'?'ring-2 ring-violet-500':''}`}><Star size={18}/> Skills</button>
            <button onClick={() => setSelected("about")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 ${selected==='about'?'ring-2 ring-violet-500':''}`}><User size={18}/> About Me</button>
            <button onClick={() => setSelected("achievements")} className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 ${selected==='achievements'?'ring-2 ring-violet-500':''}`}><Trophy size={18}/> Achievements</button>
            <button onClick={onOpenEditor} className="w-full mt-4 px-3 py-2 rounded-lg bg-violet-600/80 hover:bg-violet-500">Open Editor</button>
          </nav>
        </aside>
        <main className="flex-1">
          <AnimatePresence mode="wait">
            {selected === 'eras' && (
              <motion.section key="eras" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="space-y-6">
                <h2 className="text-2xl font-bold">Era Worlds</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {eras.map(e => (
                    <div key={e.key} className="rounded-xl bg-gradient-to-b from-white/10 to-white/5 p-4 border border-white/10">
                      <div className="text-sm text-white/70">{e.theme?.toUpperCase()}</div>
                      <div className="text-lg font-semibold">{e.name}</div>
                      <p className="text-white/70 text-sm mt-2">{e.description}</p>
                      <div className="mt-4 text-xs text-white/60">Projects: {projectsByEra[e.key]?.length || 0}</div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
            {selected === 'projects' && (
              <motion.section key="projects" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="space-y-6">
                <h2 className="text-2xl font-bold">Projects</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((p,i) => (
                    <div key={i} className="rounded-xl bg-white/5 hover:bg-white/10 transition p-4 border border-white/10">
                      <div className="text-xs text-white/60">{p.era_key}</div>
                      <div className="text-lg font-semibold">{p.title}</div>
                      <p className="text-white/70 text-sm mt-2 line-clamp-3">{p.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {(p.tech_stack||[]).map((t,ti)=>(<span key={ti} className="text-xs px-2 py-1 rounded bg-violet-600/30 border border-violet-500/40">{t}</span>))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
            {selected === 'skills' && (
              <motion.section key="skills" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="space-y-6">
                <h2 className="text-2xl font-bold">Chrono Abilities</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {skills.map((s,i)=>(
                    <div key={i} className="rounded-xl bg-white/5 p-4 border border-white/10">
                      <div className="font-semibold">{s.name}</div>
                      <div className="text-xs text-white/60">{s.category}</div>
                      <div className="mt-3 h-2 bg-white/10 rounded">
                        <div className="h-2 bg-violet-500 rounded" style={{width: `${s.level||70}%`}} />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
            {selected === 'about' && (
              <motion.section key="about" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="space-y-6">
                <h2 className="text-2xl font-bold">Time Traveler's Log</h2>
                <div className="rounded-xl bg-white/5 p-6 border border-white/10">
                  <div className="text-lg font-semibold">{profile?.name || 'Your Name'}</div>
                  <div className="text-white/70">{profile?.role || 'Your Role'}</div>
                  <p className="mt-4 text-white/80">{profile?.bio || 'Write a cinematic bio here.'}</p>
                  <div className="mt-6 grid sm:grid-cols-2 gap-3">
                    {(profile?.timeline||[]).map((t,i)=>(
                      <div key={i} className="bg-black/30 border border-white/10 rounded p-3">
                        <div className="text-sm text-white/60">{t.year}</div>
                        <div className="font-medium">{t.title}</div>
                        <div className="text-sm text-white/70">{t.text}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.section>
            )}
            {selected === 'achievements' && (
              <motion.section key="achievements" initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-10}} className="space-y-6">
                <h2 className="text-2xl font-bold">Time Capsules</h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {achievements.map((a,i)=>(
                    <div key={i} className="rounded-xl bg-gradient-to-b from-amber-500/20 to-orange-500/10 p-4 border border-amber-400/30">
                      <div className="text-sm text-white/70">{a.year}</div>
                      <div className="text-lg font-semibold">{a.title}</div>
                      <p className="text-white/80 text-sm mt-2">{a.description}</p>
                    </div>
                  ))}
                </div>
              </motion.section>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
