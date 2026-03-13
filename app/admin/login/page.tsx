"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LockKeyhole, Loader2 } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError("Invalid admin credentials");
        setIsLoading(false);
      } else {
        router.push("/admin/dashboard");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white flex items-center justify-center p-4">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-[url('/main-bgx2.webp')] bg-cover bg-center opacity-20 pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-[#111827] border border-white/10 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
          
          <div className="flex flex-col items-center mb-8">
            <div className="bg-[#1E293B] p-3 rounded-xl mb-4 text-[#EAB308]">
              <LockKeyhole className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black uppercase tracking-tight text-white mb-2">Admin Portal</h1>
            <p className="text-slate-400 text-sm font-medium">Secure Access Only</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-500 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-[11px] uppercase font-black tracking-widest text-slate-500 mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="admin@qfs.com"
              />
            </div>

            <div>
              <label className="block text-[11px] uppercase font-black tracking-widest text-slate-500 mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-black font-black py-4 rounded-xl uppercase text-sm tracking-tight transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center shadow-[0_0_20px_rgba(234,179,8,0.2)] mt-8"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Authenticate"}
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
