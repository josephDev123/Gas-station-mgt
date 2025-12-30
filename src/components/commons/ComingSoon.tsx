import { motion } from "framer-motion";
import { Fuel, Zap } from "lucide-react";

export default function ComingSoon() {
  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-xl w-full text-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10 shadow-2xl"
      >
        {/* Icon */}
        <motion.div
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="flex justify-center mb-6"
        >
          <Fuel className="w-14 h-14 text-emerald-400" />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl font-bold text-white mb-4"
        >
          Fuel Station System
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-slate-300 mb-8"
        >
          Smart sales tracking, pump management, and real-time fuel monitoring —
          all in one platform.
        </motion.p>

        {/* Coming Soon Badge */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-medium"
        >
          <Zap className="w-4 h-4" />
          Coming Soon
        </motion.div>

        {/* Footer */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="text-xs text-slate-400 mt-10"
        >
          © {new Date().getFullYear()} Gas Station Management System
        </motion.p>
      </motion.div>
    </div>
  );
}
