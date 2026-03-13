"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Building2, Globe, LockKeyhole, Zap, Globe2 } from "lucide-react";
import { ScarcityCounter } from "@/components/ScarcityCounter";
import { RegistrationForm } from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 md:px-8 py-12 md:py-24 font-sans bg-[#020617] text-white">
      {/* Background Aesthetic Layers */}
      <div className="grid-bg" />
      <div className="noise-bg" />
      <div className="radial-glow" />

      {/* Main Container - max width 1100px perfectly centered */}
      <div className="relative z-10 flex w-full max-w-[1100px] flex-col items-center justify-center h-full">
        
        {/* Hero Trust Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="flex flex-col items-center text-center w-full max-w-2xl mb-6"
        >
          <h1 className="font-heading text-[28px] md:text-[32px] leading-[1.15] font-semibold tracking-tight text-white mb-3 shadow-sm text-balance">
            Welcome To Your QFS Account
          </h1>
          <p className="text-[16px] md:text-[18px] text-slate-300 max-w-[600px] text-balance">
            It's quick and easy. Register now for free and start spending your QFS funds
          </p>
        </motion.div>

        {/* Scarcity Counter - Placed just above the form */}
        <ScarcityCounter />

        {/* Registration Card Component */}
        <RegistrationForm />

        {/* Security / Trust Badges (Below Card) */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-8 flex flex-col items-center gap-4"
        >
          {/* 3 Credibility Signals - Moved down */}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-[14px] md:text-[15px] font-medium text-slate-400">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-[18px] h-[18px] text-slate-500" />
              <span>Bank-grade security</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="w-[18px] h-[18px] text-slate-500" />
              <span>Institutional liquidity</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="w-[18px] h-[18px] text-slate-500" />
              <span>Global crypto access</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-[12px] font-medium text-slate-500/70 border-t border-white/5 pt-4">
            <div className="flex items-center gap-[6px]">
              <LockKeyhole className="w-[14px] h-[14px]" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <Zap className="w-[14px] h-[14px]" />
              <span>Instant Activation</span>
            </div>
            <div className="flex items-center gap-[6px]">
              <Globe2 className="w-[14px] h-[14px]" />
              <span>Global Platform</span>
            </div>
          </div>
        </motion.div>

      </div>
    </main>
  );
}
