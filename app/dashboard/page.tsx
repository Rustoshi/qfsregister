"use client";

import { useSession, signOut } from "next-auth/react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
    ShieldAlert,
    ExternalLink,
    ArrowUpRight,
    LogOut,
    CreditCard,
    Newspaper,
    Users,
    Share2,
    Calendar as CalendarIcon,
    TrendingUp,
    LayoutDashboard,
    Send
} from "lucide-react";

export default function Dashboard() {
    const { data: session } = useSession();
    const [isBarVisible, setIsBarVisible] = useState(true);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // 3 seconds delay for modal
        const modalTimer = setTimeout(() => {
            setShowModal(true);
        }, 3000);

        return () => clearTimeout(modalTimer);
    }, []);

    useEffect(() => {
        if (!isBarVisible) {
            const timer = setTimeout(() => {
                setIsBarVisible(true);
            }, 5 * 60 * 1000); // 5 minutes
            return () => clearTimeout(timer);
        }
    }, [isBarVisible]);

    // Simulated data based on design
    const balance = "653,000,000";
    const recentWithdrawal = {
        name: "Daniel Cooper",
        amount: "454,000,000",
        time: "13.03.2026 02:47"
    };

    const days = Array.from({ length: 31 }, (_, i) => i + 1);
    const currentDay = 13;

    return (
        <main className="relative min-h-screen text-white font-sans overflow-x-hidden">
            {/* Main Background Image */}
            <div
                className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: 'url(/main-bgx2.webp)' }}
            />

            {/* Content Wrapper */}
            <div className="relative z-10 p-4 md:p-8">
                {/* Header Section */}
                <header className="flex flex-wrap items-center justify-between gap-4 mb-8">
                    <div className="flex items-center gap-6">
                        <div className="bg-[#1E293B] px-4 py-2 rounded-lg font-heading font-bold text-xl tracking-tight">QFS</div>

                        {/* Status Bar */}
                        <div className="hidden lg:flex items-center bg-[#1E1B4B] border border-blue-500/20 rounded-md py-1.5 px-3 gap-3">
                            <ShieldAlert className="w-4 h-4 text-rose-500" />
                            <span className="text-[11px] font-medium text-slate-300 uppercase tracking-tight">QFS Account Not Ready for shift</span>
                            <button className="bg-[#2D3154] hover:bg-[#3D4174] transition-colors text-[10px] px-3 py-1 rounded text-white flex items-center gap-1 uppercase font-bold">
                                Get Code to Start
                            </button>
                        </div>

                        {/* Social Proof Ticker */}
                        <div className="hidden xl:flex flex-col text-[10px] border-l border-white/10 pl-6 leading-tight">
                            <span className="text-slate-500 uppercase tracking-widest font-bold mb-1">Last withdrawal {recentWithdrawal.time.split(' ')[0]}</span>
                            <div className="flex items-center gap-2">
                                <span className="text-slate-300 font-bold uppercase">{recentWithdrawal.name}</span>
                                <span className="text-white font-black">${recentWithdrawal.amount}</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <nav className="flex items-center bg-[#1E293B]/50 rounded-full p-1 border border-white/5">
                            <button className="flex items-center gap-2 px-4 py-1.5 text-[11px] font-bold uppercase hover:text-blue-400 transition-colors">
                                <CreditCard className="w-3.5 h-3.5" /> Withdraw
                            </button>
                            <button className="flex items-center gap-2 px-4 py-1.5 text-[11px] font-bold uppercase hover:text-blue-400 transition-colors">
                                <Newspaper className="w-3.5 h-3.5" /> Q News
                            </button>
                            <button className="flex items-center gap-2 px-4 py-1.5 text-[11px] font-bold uppercase hover:text-blue-400 transition-colors">
                                <Users className="w-3.5 h-3.5" /> Q Community
                            </button>
                            <button className="flex items-center gap-2 px-4 py-1.5 text-[11px] font-bold uppercase hover:text-blue-400 transition-colors">
                                <Share2 className="w-3.5 h-3.5" /> Referral System
                            </button>
                        </nav>
                        <div className="flex items-center gap-3 bg-[#111827] border border-white/10 rounded-lg px-4 py-2">
                            <span className="text-[12px] font-bold text-slate-300 uppercase">{session?.user?.name || "John Doe"}</span>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="hover:text-rose-400 transition-colors"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Hero Card */}
                <section className="w-full mb-8">
                    <div className="bg-black/40 border border-white/5 rounded-2xl p-8 md:p-12 relative overflow-hidden backdrop-blur-sm shadow-2xl">
                        <div className="relative z-10">
                            <p className="text-slate-400 text-sm font-medium mb-12">Current amount:</p>
                            <h2 className="text-6xl md:text-8xl font-heading font-black text-[#EAB308] tracking-tight mb-16 drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]">
                                $ {balance}
                            </h2>
                            <div className="flex items-center gap-4">
                                <button className="bg-[#EAB308] text-black font-black px-8 py-3 rounded-lg flex items-center gap-2 hover:scale-[1.02] transition-transform uppercase text-sm">
                                    Cash out <span className="bg-black/10 rounded-full p-1"><LogOut className="w-3.5 h-3.5" /></span>
                                </button>
                                <button className="bg-[#1E293B] hover:bg-[#2E394B] transition-colors border border-white/5 font-black px-8 py-3 rounded-lg flex items-center gap-2 uppercase text-sm">
                                    Increase amount <TrendingUp className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* QFS Coin Asset */}
                        <div className="absolute right-[-40px] top-1/2 -translate-y-1/2 w-[280px] h-[280px] md:w-[500px] md:h-[500px] pointer-events-none flex items-center justify-center">
                            <div
                                className="absolute inset-0 opacity-30 mix-blend-lighten scale-110"
                                style={{
                                    backgroundImage: 'url(/grid-bg.svg)',
                                    backgroundSize: 'contain',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundPosition: 'center'
                                }}
                            />
                            <div className="absolute inset-0 bg-[#EAB308]/15 blur-[80px] rounded-full" />
                            <motion.img
                                src="/big-coin-imgx4.webp"
                                alt="QFS Coin"
                                className="relative z-10 w-[65%] h-[65%] object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                                initial={{ rotate: -5, scale: 0.95, opacity: 0 }}
                                animate={{ rotate: 0, scale: 1, opacity: 1 }}
                                transition={{ duration: 1.2, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                </section>

                {/* Bottom Grid */}
                <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
                    {/* Status Card */}
                    <div className="bg-[#111827]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl flex flex-col justify-between min-h-[280px]">
                        <div>
                            <p className="text-slate-500 text-[11px] uppercase font-bold tracking-widest mb-8">Status:</p>
                            <div className="flex items-end justify-between">
                                <h3 className="text-5xl font-black text-white tracking-tighter">Basic</h3>
                                <div className="text-white text-3xl font-black mb-2 tracking-tighter">$*****</div>
                            </div>
                        </div>
                        <button className="bg-[#EAB308] text-black font-black py-4 rounded-xl w-full hover:shadow-[0_0_20px_rgba(234,179,8,0.2)] transition-all uppercase text-sm tracking-tight">
                            Unlock VIP Status
                        </button>
                    </div>

                    {/* Calendar Card */}
                    <div className="bg-[#111827]/80 border border-white/10 rounded-2xl p-8 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-8">
                            <p className="text-slate-500 text-[11px] uppercase font-bold tracking-widest">Calendar:</p>
                            <span className="text-white text-[11px] font-black font-heading uppercase">March 2026</span>
                        </div>
                        <div className="grid grid-cols-7 gap-y-3 text-center">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                <span key={d} className="text-[10px] text-slate-500 font-bold uppercase">{d}</span>
                            ))}
                            {days.map(d => (
                                <span key={d} className={`text-[12px] font-black py-2 ${d === currentDay ? 'bg-[#EAB308] text-black rounded-full' : 'text-slate-300'}`}>
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Market Updates */}
                    <div className="bg-[#111827]/80 border border-white/10 rounded-2xl p-6 backdrop-blur-xl flex flex-col gap-4">
                        <p className="text-slate-500 text-[11px] uppercase font-bold tracking-widest mb-2">Market updates:</p>
                        <div className="grid grid-cols-2 gap-4">
                            {/* QFS Marketcap */}
                            <div className="bg-[#020617] border border-white/5 rounded-xl p-4 relative overflow-hidden group min-h-[100px]">
                                <p className="text-[9px] text-slate-400 font-black uppercase mb-3">QFS marketcap:</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-lg font-black text-white tracking-tighter">$66,5 TLN</span>
                                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                                </div>
                                <img
                                    src="/gold-qfsx4.webp"
                                    alt="QFS Plate"
                                    className="absolute right-[-15px] top-[10px] w-24 h-auto opacity-90 transition-transform group-hover:scale-110"
                                />
                            </div>
                            {/* Gold Price */}
                            <div className="bg-[#020617] border border-white/5 rounded-xl p-4 relative overflow-hidden group min-h-[100px]">
                                <p className="text-[9px] text-slate-400 font-black uppercase mb-3">Gold Price:</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-lg font-black text-white tracking-tighter">$5 121,70</span>
                                    <ArrowUpRight className="w-3 h-3 text-emerald-400" />
                                </div>
                                <img
                                    src="/goldx4.webp"
                                    alt="Gold Bar"
                                    className="absolute right-[-15px] top-[10px] w-24 h-auto opacity-90 transition-transform group-hover:scale-110"
                                />
                            </div>
                        </div>
                        {/* Market Footer Banner */}
                        <div
                            className="mt-auto bg-cover bg-center border border-white/5 rounded-xl p-4 flex items-center justify-between relative overflow-hidden"
                            style={{ backgroundImage: 'url(/r-deskx4.webp)' }}
                        >
                            <div className="absolute inset-0 bg-black/40" />
                            <div className="relative z-10 flex items-center justify-center w-full gap-3">
                                <span className="text-white text-[11px] font-black flex items-center gap-2">
                                    Projected to go <span className="text-base text-[#EAB308]">500x</span> in next month
                                </span>
                                <TrendingUp className="w-4 h-4 text-white" />
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            {/* Sticky Activation Pending Bar */}
            <AnimatePresence>
                {isBarVisible && (
                    <motion.div
                        initial={{ y: 200, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 200, opacity: 0 }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed bottom-0 left-0 w-full p-4 z-[100]"
                    >
                        <div
                            className="max-w-[1200px] mx-auto bg-cover bg-center border border-white/10 rounded-2xl p-4 md:p-6 flex flex-wrap items-center justify-between gap-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                            style={{ backgroundImage: 'url(/l-deskx4.webp)' }}
                        >
                            <div className="absolute inset-0 bg-black/60" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                                {/* Scatter coins on left */}
                                <div className="hidden lg:flex items-center gap-4">
                                    <img src="/coin-l-desk.webp" alt="" className="w-12 h-12 object-contain" />
                                </div>

                                <div className="text-center md:text-left">
                                    <h4 className="text-[#EAB308] text-sm md:text-lg font-black uppercase tracking-tight mb-1">
                                        QFS ACTIVATION PENDING
                                    </h4>
                                    <p className="text-slate-200 text-[10px] md:text-xs font-bold uppercase tracking-tight opacity-90">
                                        Missing <span className="text-white">35pcs Of Gold QFS Coins</span> To get VIP and Account Ready on <span className="text-white">SHIFT Safe Servers</span>
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 flex items-center gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => setIsBarVisible(false)}
                                    className="flex-1 md:flex-initial bg-white/10 hover:bg-white/20 transition-colors text-white font-black px-8 py-3 rounded-lg uppercase text-xs"
                                >
                                    Close
                                </button>
                                <button className="flex-1 md:flex-initial bg-[#EAB308] text-black font-black px-8 py-3 rounded-lg uppercase text-xs hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all">
                                    Purchase Gold Coins
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Activation Modal */}
            <AnimatePresence>
                {showModal && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />

                        {/* Modal Card */}
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            transition={{ type: "spring", damping: 20, stiffness: 300 }}
                            className="relative w-full max-w-[550px] bg-[#111827] border border-white/10 rounded-2xl p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden"
                        >
                            {/* Decorative glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />

                            <div className="text-center mb-8">
                                <h3 className="text-xl md:text-2xl font-black text-white mb-3 tracking-tight">
                                    Account Not Ready For QFS Activation
                                </h3>
                                <p className="text-slate-400 text-xs md:text-sm font-medium">
                                    Contact Agent For QFS Activation Code{" "}
                                    <a href="https://t.me/Tesla_class_X_1" target="_blank" rel="noopener noreferrer" className="text-[#EAB308] hover:underline font-bold">
                                        @Tesla_class_X_1
                                    </a>
                                </p>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <label className="block text-[10px] uppercase font-black text-slate-500 tracking-widest mb-3">
                                        QFS Activation Code
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Enter code here"
                                        className="w-full bg-[#020617] border border-white/5 rounded-xl px-6 py-4 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a
                                        href="https://t.me/Tesla_class_X_1"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-[#1E293B] hover:bg-[#2E394B] transition-colors text-white font-black px-6 py-4 rounded-xl flex items-center justify-center gap-2 uppercase text-xs"
                                    >
                                        Get the Code <Send className="w-4 h-4" />
                                    </a>
                                    <button
                                        className="flex-1 bg-[#2D2D2D]/50 text-slate-500 font-black px-6 py-4 rounded-xl uppercase text-xs cursor-not-allowed"
                                        disabled
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
