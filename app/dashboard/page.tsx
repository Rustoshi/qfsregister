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
    const [showCashoutModal, setShowCashoutModal] = useState(false);
  
    // Activation State
    const [inputCode, setInputCode] = useState("");
    const [isVerifying, setIsVerifying] = useState(false);
    const [errorCode, setErrorCode] = useState("");
    const [activationSuccess, setActivationSuccess] = useState(false);

    useEffect(() => {
        // Check if already activated
        const isActivated = localStorage.getItem("qfs_account_activated") === "true";
        if (isActivated) {
            setActivationSuccess(true);
            return;
        }

        // 3 seconds delay for modal if not activated
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

    const handleVerifyCode = async () => {
      setIsVerifying(true);
      setErrorCode("");
      
      try {
        const res = await fetch("/api/public/settings");
        const data = await res.json();
        
        if (data.success) {
          if (inputCode.trim() === data.code) {
            setActivationSuccess(true);
            localStorage.setItem("qfs_account_activated", "true");
            setShowModal(false); // Hide the modal on success
          } else {
            setErrorCode("Invalid Activation Code");
          }
        }
      } catch (error) {
        setErrorCode("System error. Please try again.");
      } finally {
        setIsVerifying(false);
      }
    };

    const handleCashoutClick = () => {
      if (activationSuccess) {
        setShowCashoutModal(true);
      }
    };

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
            <div className="relative z-10 px-4 py-5 sm:p-6 md:p-8 lg:pt-12">
                {/* Header Section */}
                <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 sm:gap-6 mb-6 sm:mb-8 lg:mb-12">
                    <div className="flex items-center justify-between lg:justify-start gap-4 sm:gap-6">
                        <div className="bg-[#1E293B] px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-heading font-bold text-base sm:text-lg md:text-xl tracking-tight shadow-lg shadow-black/20">QFS</div>

                        {/* Status Bar */}
                        <div className="hidden md:flex items-center bg-[#1E1B4B] border border-blue-500/20 rounded-md py-1.5 px-3 gap-3">
                            <ShieldAlert className="w-4 h-4 text-rose-500" />
                            <span className="text-[10px] lg:text-[11px] font-medium text-slate-300 uppercase tracking-tight truncate max-w-[150px] lg:max-w-none">QFS Account Not Ready for shift</span>
                            <button className="bg-[#2D3154] hover:bg-[#3D4174] transition-colors text-[9px] lg:text-[10px] px-3 py-1 rounded text-white flex items-center gap-1 uppercase font-bold whitespace-nowrap">
                                Get Code
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

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                        <nav className="flex items-center bg-[#1E293B]/50 rounded-full p-1 border border-white/5 overflow-x-auto no-scrollbar scroll-smooth -mx-1 sm:mx-0">
                            <div className="flex items-center min-w-max">
                                <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-[10px] sm:text-[11px] md:text-xs font-bold uppercase hover:text-blue-400 transition-colors">
                                    <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Withdraw
                                </button>
                                <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-[10px] sm:text-[11px] md:text-xs font-bold uppercase hover:text-blue-400 transition-colors">
                                    <Newspaper className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> News
                                </button>
                                <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-[10px] sm:text-[11px] md:text-xs font-bold uppercase hover:text-blue-400 transition-colors">
                                    <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Community
                                </button>
                                <button className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-2 text-[10px] sm:text-[11px] md:text-xs font-bold uppercase hover:text-blue-400 transition-colors">
                                    <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> Referral
                                </button>
                            </div>
                        </nav>
                        <div className="flex items-center justify-between sm:justify-start gap-3 bg-[#111827] border border-white/10 rounded-lg px-3 sm:px-4 py-2.5 shadow-inner shadow-black/40">
                            <span className="text-xs sm:text-[13px] font-bold text-slate-300 uppercase truncate max-w-[120px] sm:max-w-[100px]">{session?.user?.name || "User"}</span>
                            <button
                                onClick={() => signOut({ callbackUrl: '/' })}
                                className="text-slate-500 hover:text-rose-400 transition-colors p-1"
                                aria-label="Sign out"
                            >
                                <LogOut className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </header>

                {/* Main Hero Card */}
                <section className="w-full mb-6 sm:mb-8">
                    <div className="bg-black/40 border border-white/5 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-10 lg:p-12 relative overflow-hidden backdrop-blur-sm shadow-2xl min-h-[280px] sm:min-h-[320px] md:min-h-[400px] flex flex-col justify-center">
                        <div className="relative z-10">
                            <p className="text-slate-500 text-[11px] sm:text-xs md:text-sm font-black uppercase tracking-[0.15em] sm:tracking-[0.2em] mb-3 sm:mb-4 md:mb-8">Current balance:</p>
                            <h2 className="text-[28px] sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-heading font-black text-[#EAB308] tracking-tighter mb-6 sm:mb-8 md:mb-16 drop-shadow-[0_0_20px_rgba(234,179,8,0.4)]">
                                $ {balance}
                            </h2>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                                <button 
                                  onClick={handleCashoutClick}
                                  className={`bg-[#EAB308] text-black font-black px-5 py-3.5 sm:px-8 sm:py-4 rounded-xl flex items-center justify-center gap-2 uppercase text-xs sm:text-sm shadow-lg shadow-[#EAB308]/10 active:scale-95 transition-all ${activationSuccess ? 'hover:scale-[1.02] hover:bg-[#FACC15]' : 'cursor-not-allowed grayscale-[0.5]'}`}
                                >
                                    Cash out <span className="bg-black/10 rounded-full p-1"><LogOut className="w-4 h-4" /></span>
                                </button>
                                <button className="bg-[#1E293B]/80 hover:bg-[#2E394B] transition-all border border-white/10 font-black px-5 py-3.5 sm:px-8 sm:py-4 rounded-xl flex items-center justify-center gap-2 uppercase text-xs sm:text-sm active:scale-95">
                                    Increase amount <TrendingUp className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* QFS Coin Asset */}
                        <div className="absolute right-[-80px] sm:right-[-40px] top-1/2 -translate-y-1/2 w-[240px] h-[240px] sm:w-[320px] sm:h-[320px] md:w-[500px] md:h-[500px] pointer-events-none flex items-center justify-center opacity-40 md:opacity-100">
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
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-32 sm:mb-24">
                    {/* Status Card */}
                    <div className="bg-[#111827]/80 border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 backdrop-blur-xl flex flex-col justify-between min-h-[200px] sm:min-h-[240px] md:min-h-[280px]">
                        <div>
                            <p className="text-slate-500 text-[11px] sm:text-xs uppercase font-bold tracking-widest mb-4 sm:mb-6">Account Status:</p>
                            <div className="flex items-end justify-between gap-3 mb-4 sm:mb-6">
                                <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tighter">Basic</h3>
                                <div className="text-white text-xl sm:text-2xl md:text-3xl font-black tracking-tighter">$*****</div>
                            </div>
                        </div>
                        <button className="bg-[#EAB308] hover:bg-[#FACC15] text-black font-black py-3.5 sm:py-4 rounded-xl w-full hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all uppercase text-xs sm:text-sm tracking-tight active:scale-95">
                            Unlock VIP Status
                        </button>
                    </div>

                    {/* Calendar Card */}
                    <div className="bg-[#111827]/80 border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 backdrop-blur-xl">
                        <div className="flex items-center justify-between mb-5 sm:mb-6">
                            <p className="text-slate-500 text-[11px] sm:text-xs uppercase font-bold tracking-widest">Calendar:</p>
                            <span className="text-white text-[11px] sm:text-xs font-black font-heading uppercase">March 2026</span>
                        </div>
                        <div className="grid grid-cols-7 gap-y-1.5 sm:gap-y-2 md:gap-y-3 text-center">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                                <span key={d} className="text-[10px] sm:text-[11px] text-slate-500 font-bold uppercase">{d}</span>
                            ))}
                            {days.map(d => (
                                <span key={d} className={`text-[11px] sm:text-xs font-black py-1.5 sm:py-2 ${d === currentDay ? 'bg-[#EAB308] text-black rounded-full' : 'text-slate-300'}`}>
                                    {d}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Market Updates */}
                    <div className="bg-[#111827]/80 border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 backdrop-blur-xl flex flex-col gap-4 sm:col-span-2 lg:col-span-1">
                        <p className="text-slate-500 text-[11px] sm:text-xs uppercase font-bold tracking-widest">Market updates:</p>
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {/* QFS Marketcap */}
                            <div className="bg-[#020617] border border-white/5 rounded-xl p-4 relative overflow-hidden group min-h-[90px] sm:min-h-[100px]">
                                <p className="text-[10px] sm:text-[11px] text-slate-400 font-black uppercase mb-2">QFS marketcap:</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-base sm:text-lg font-black text-white tracking-tighter">$66,5 TLN</span>
                                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                                </div>
                                <img
                                    src="/gold-qfsx4.webp"
                                    alt="QFS Plate"
                                    className="absolute right-[-10px] top-[8px] w-14 sm:w-20 md:w-24 h-auto opacity-90 transition-transform group-hover:scale-110"
                                />
                            </div>
                            {/* Gold Price */}
                            <div className="bg-[#020617] border border-white/5 rounded-xl p-4 relative overflow-hidden group min-h-[90px] sm:min-h-[100px]">
                                <p className="text-[10px] sm:text-[11px] text-slate-400 font-black uppercase mb-2">Gold Price:</p>
                                <div className="flex items-center gap-1">
                                    <span className="text-base sm:text-lg font-black text-white tracking-tighter">$5 121,70</span>
                                    <ArrowUpRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                                </div>
                                <img
                                    src="/goldx4.webp"
                                    alt="Gold Bar"
                                    className="absolute right-[-10px] top-[8px] w-14 sm:w-20 md:w-24 h-auto opacity-90 transition-transform group-hover:scale-110"
                                />
                            </div>
                        </div>
                        {/* Market Footer Banner */}
                        <div
                            className="mt-auto bg-cover bg-center border border-white/5 rounded-xl p-4 flex items-center justify-center relative overflow-hidden"
                            style={{ backgroundImage: 'url(/r-deskx4.webp)' }}
                        >
                            <div className="absolute inset-0 bg-black/50" />
                            <div className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                                <span className="text-white text-[11px] sm:text-xs font-black leading-tight">
                                    Projected to go <span className="text-sm sm:text-base text-[#EAB308]">500x</span> in next month
                                </span>
                                <TrendingUp className="w-4 h-4 text-[#EAB308] animate-pulse" />
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
                        className="fixed bottom-0 left-0 w-full p-3 sm:p-4 z-[100]"
                    >
                        <div
                            className="max-w-[1200px] mx-auto bg-cover bg-center border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                            style={{ backgroundImage: 'url(/l-deskx4.webp)' }}
                        >
                            <div className="absolute inset-0 bg-black/70" />

                            <div className="relative z-10 flex flex-col md:flex-row items-center gap-3 md:gap-6">
                                {/* Scatter coins on left */}
                                <div className="hidden lg:flex items-center gap-4 shrink-0">
                                    <img src="/coin-l-desk.webp" alt="" className="w-12 h-12 object-contain" />
                                </div>

                                <div className="text-center md:text-left">
                                    <h4 className="text-[#EAB308] text-sm sm:text-base md:text-lg font-black uppercase tracking-tight mb-1">
                                        QFS ACTIVATION PENDING
                                    </h4>
                                    <p className="text-slate-200 text-[10px] sm:text-[11px] md:text-xs font-bold uppercase tracking-wide opacity-90 max-w-[400px]">
                                        Missing <span className="text-white">35pcs Of Gold QFS Coins</span> To get VIP and Account Ready on <span className="text-white">SHIFT Safe Servers</span>
                                    </p>
                                </div>
                            </div>

                            <div className="relative z-10 flex flex-row items-center gap-2 sm:gap-3 w-full md:w-auto">
                                <button
                                    onClick={() => setIsBarVisible(false)}
                                    className="flex-1 md:flex-none bg-white/10 hover:bg-white/20 transition-colors text-white font-black px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl uppercase text-[11px] sm:text-xs"
                                >
                                    Close
                                </button>
                                <button className="flex-1 md:flex-none bg-[#EAB308] hover:bg-[#FACC15] text-black font-black px-4 sm:px-6 py-3 sm:py-3.5 rounded-xl uppercase text-[11px] sm:text-xs hover:shadow-[0_0_20px_rgba(234,179,8,0.4)] transition-all shadow-lg active:scale-95">
                                    Purchase Coins
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
                          className="relative w-full max-w-[500px] bg-[#111827] border border-white/10 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden mx-auto"
                        >
                            {/* Decorative glow */}
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
                            
                            <div className="text-center mb-5 sm:mb-6">
                                <h3 className="text-lg sm:text-xl md:text-2xl font-black text-white mb-2 tracking-tight leading-tight">
                                  {activationSuccess ? "Account Activated!" : "Account Not Ready For QFS Activation"}
                                </h3>
                                {!activationSuccess && (
                                  <p className="text-slate-400 text-[11px] sm:text-xs md:text-sm font-medium">
                                    Contact Agent For QFS Activation Code{" "}
                                    <a href="https://t.me/Tesla_class_X_1" target="_blank" rel="noopener noreferrer" className="text-[#EAB308] hover:underline uppercase font-bold whitespace-nowrap">
                                      @Tesla_class_X_1
                                    </a>
                                  </p>
                                )}
                            </div>

                            {!activationSuccess ? (
                              <div className="space-y-4 sm:space-y-5">
                                  <div>
                                      <label className="block text-[10px] sm:text-[11px] uppercase font-black text-slate-500 tracking-widest mb-2">
                                        QFS Activation Code
                                      </label>
                                      <input 
                                        type="text" 
                                        value={inputCode}
                                        onChange={(e) => {
                                          setInputCode(e.target.value);
                                          setErrorCode("");
                                        }}
                                        placeholder="Enter code here"
                                        className={`w-full bg-[#020617] border ${errorCode ? 'border-rose-500' : 'border-white/5'} rounded-xl px-4 py-3.5 text-white placeholder:text-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors text-sm sm:text-base`}
                                      />
                                      {errorCode && (
                                        <p className="text-rose-500 text-[10px] sm:text-[11px] mt-2 font-bold uppercase tracking-wider">{errorCode}</p>
                                      )}
                                  </div>

                                  <div className="flex flex-row gap-3">
                                      <a 
                                        href="https://t.me/Tesla_class_X_1" 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="flex-1 bg-[#1E293B] hover:bg-[#2E394B] transition-colors text-white font-black py-3.5 rounded-xl flex items-center justify-center gap-2 uppercase text-[11px] sm:text-xs"
                                      >
                                          Get Code <Send className="w-4 h-4" />
                                      </a>
                                      <button 
                                        onClick={handleVerifyCode}
                                        disabled={!inputCode.trim() || isVerifying}
                                        className="flex-1 bg-[#EAB308] hover:bg-[#FACC15] text-black font-black py-3.5 rounded-xl uppercase text-[11px] sm:text-xs transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#EAB308]/10"
                                      >
                                          {isVerifying ? "Verifying..." : "Verify Code"}
                                      </button>
                                  </div>
                              </div>
                            ) : (
                              <div className="text-center">
                                <button 
                                  onClick={() => setShowModal(false)}
                                  className="bg-[#EAB308] hover:bg-[#FACC15] text-black font-black px-6 py-3.5 rounded-xl uppercase text-xs sm:text-sm shadow-lg shadow-[#EAB308]/10 transition-all active:scale-95"
                                >
                                  Continue to Dashboard
                                </button>
                              </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Cashout Modal */}
            <AnimatePresence>
                {showCashoutModal && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                          onClick={() => setShowCashoutModal(false)}
                        />
                        
                        <motion.div 
                          initial={{ scale: 0.9, opacity: 0, y: 20 }}
                          animate={{ scale: 1, opacity: 1, y: 0 }}
                          exit={{ scale: 0.9, opacity: 0, y: 20 }}
                          transition={{ type: "spring", damping: 20, stiffness: 300 }}
                          className="relative w-full max-w-[440px] bg-[#1a1f3c] border border-blue-500/20 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden mx-auto"
                        >
                            {/* Close Button */}
                            <button 
                              onClick={() => setShowCashoutModal(false)}
                              className="absolute top-3 right-3 sm:top-4 sm:right-4 text-slate-400 hover:text-white transition-colors p-1"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>

                            <div className="flex flex-col items-center text-center">
                                {/* Alert Icon in distinct circle */}
                                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-rose-500/20 flex items-center justify-center mb-4 sm:mb-5 shadow-[0_0_30px_rgba(244,63,94,0.3)]">
                                    <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-rose-500 flex items-center justify-center">
                                        <span className="text-white font-black text-lg sm:text-xl">!</span>
                                    </div>
                                </div>
                                
                                <h3 className="text-xl sm:text-2xl font-bold text-rose-500 mb-1">Action Required</h3>
                                <p className="text-slate-400 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest mb-4 sm:mb-5">WITHDRAWAL BLOCKED</p>

                                <div className="w-full bg-[#242b4d] border border-white/5 rounded-xl p-4 sm:p-5 mb-4 sm:mb-5">
                                    <p className="text-white font-bold mb-1.5 text-sm sm:text-base">
                                        <span className="text-rose-500">SHIFT and VIP</span> not yet activated
                                    </p>
                                    <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                        Contact your QFS Agent immediately to activate and unlock your withdrawal
                                    </p>
                                </div>

                                <a 
                                  href="https://t.me/Tesla_class_X_1" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-black font-black py-3.5 sm:py-4 rounded-xl uppercase text-xs sm:text-sm tracking-tight transition-colors shadow-lg active:scale-95"
                                >
                                    Contact QFS Agent Now
                                </a>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </main>
    );
}
