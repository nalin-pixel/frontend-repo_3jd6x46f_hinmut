import { motion } from "framer-motion";
import Spline from "@splinetool/react-spline";

export default function Hero({ onEnter }) {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/EF7JOSsHLk16Tlw9/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70 pointer-events-none" />

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold tracking-tight"
        >
          The Time‑Traveler Codex
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="mt-4 max-w-2xl text-white/80"
        >
          An immersive, era‑shifting portfolio. Enter the Time Engine Chamber to begin your journey.
        </motion.p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          onClick={onEnter}
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-violet-600/80 hover:bg-violet-500 text-white px-6 py-3 backdrop-blur border border-white/10 shadow-lg"
        >
          Enter Timeline
          <span aria-hidden>→</span>
        </motion.button>
      </div>
    </div>
  );
}
