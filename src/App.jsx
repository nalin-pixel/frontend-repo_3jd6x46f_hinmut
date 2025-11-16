import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Hero from './components/Hero'
import Codex from './components/Codex'
import EditorPanel from './components/EditorPanel'
import { api } from './lib/api'

function App() {
  const [phase, setPhase] = useState('hero') // hero -> warp -> codex
  const [content, setContent] = useState(null)
  const [showEditor, setShowEditor] = useState(false)
  const [selected, setSelected] = useState('eras')

  async function load() {
    try {
      const data = await api.getContent()
      setContent(data)
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => { load() }, [])

  function handleEnter() {
    setPhase('warp')
    setTimeout(() => setPhase('codex'), 1100)
  }

  return (
    <div className="min-h-screen">
      <AnimatePresence mode="wait">
        {phase === 'hero' && (
          <motion.div key="hero" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <Hero onEnter={handleEnter} />
          </motion.div>
        )}
        {phase === 'warp' && (
          <motion.div key="warp" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-50 flex items-center justify-center bg-black">
            <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 animate-pulse opacity-40" />
            <div className="relative">
              <div className="w-[70vmin] h-[70vmin] rounded-full bg-gradient-to-tr from-fuchsia-400/40 to-cyan-400/40 blur-2xl animate-ping" />
            </div>
          </motion.div>
        )}
        {phase === 'codex' && (
          <motion.div key="codex" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <header className="sticky top-0 z-40 backdrop-blur bg-black/40 border-b border-white/10">
              <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between text-white">
                <div className="font-bold tracking-wide">The Time‑Traveler Codex</div>
                <div className="flex items-center gap-2">
                  <button onClick={()=>setShowEditor(true)} className="px-3 py-1 rounded bg-violet-600/80 hover:bg-violet-500">Edit Content</button>
                </div>
              </div>
            </header>
            <Codex content={content||{}} onOpenEditor={()=>setShowEditor(true)} selected={selected} setSelected={setSelected} />
          </motion.div>
        )}
      </AnimatePresence>

      {showEditor && (
        <EditorPanel onClose={()=>setShowEditor(false)} onSeeded={load} content={content||{}} />)
      }
    </div>
  )
}

export default App
