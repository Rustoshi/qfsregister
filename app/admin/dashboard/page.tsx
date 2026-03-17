"use client";

import { useSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Users, Settings, LogOut, Loader2, Save } from "lucide-react";

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [users, setUsers] = useState<any[]>([]);
  const [activationCode, setActivationCode] = useState("");
  const [defaultBalance, setDefaultBalance] = useState("");
  const [telegramLink, setTelegramLink] = useState("");
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [savingCode, setSavingCode] = useState(false);

  useEffect(() => {
    if (status === "unauthenticated" || (session && session.user.role !== "admin")) {
      router.push("/admin/login");
    }
  }, [status, session, router]);

  useEffect(() => {
    if (status === "authenticated" && session?.user.role === "admin") {
      fetchUsers();
      fetchSettings();
    }
  }, [status, session]);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (data.success) {
        setUsers(data.users);
      }
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoadingUsers(false);
    }
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch("/api/admin/settings");
      const data = await res.json();
      if (data.success && data.settings) {
        setActivationCode(data.settings.qfsActivationCode);
        setDefaultBalance(data.settings.defaultBalance || "653,000,000");
        setTelegramLink(data.settings.telegramLink || "https://t.me/qfscommunity");
      }
    } catch (error) {
      console.error("Failed to fetch settings", error);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSavingCode(true);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          qfsActivationCode: activationCode,
          defaultBalance: defaultBalance,
          telegramLink: telegramLink 
        })
      });
      const data = await res.json();
      if (data.success) {
        alert("Settings updated successfully!");
      }
    } catch (error) {
      console.error("Failed to save settings", error);
    } finally {
      setSavingCode(false);
    }
  };

  if (status === "loading" || !session || session.user.role !== "admin") {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-[#EAB308]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white px-4 py-5 sm:p-6 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-5 sm:space-y-6 md:space-y-8">
        
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-3 sm:gap-4 bg-[#111827] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6">
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="bg-[#1E293B] p-2.5 sm:p-3 rounded-lg sm:rounded-xl text-[#EAB308]">
              <Settings className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg md:text-xl font-black uppercase tracking-tight">Admin Dashboard</h1>
              <p className="text-slate-500 text-[10px] sm:text-xs font-bold uppercase">System Management Panel</p>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors px-3 sm:px-4 py-2.5 rounded-lg font-bold uppercase text-[11px] sm:text-xs"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-6 md:gap-8">
          
          {/* Main Area: User List */}
          <div className="lg:col-span-2 space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAB308]" />
              <h2 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-tight">Registered Users ({users.length})</h2>
            </div>
            
            <div className="bg-[#111827] border border-white/10 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              {loadingUsers ? (
                <div className="p-8 sm:p-12 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-[#1E293B] text-slate-400 text-[10px] sm:text-[11px] uppercase font-black tracking-widest">
                      <tr>
                        <th className="px-4 sm:px-6 py-3 sm:py-4">Full Name</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4">Phone Number</th>
                        <th className="px-4 sm:px-6 py-3 sm:py-4 text-right">Joined</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-4 sm:px-6 py-8 sm:py-12 text-center text-slate-500 font-medium text-sm">
                            No users registered yet.
                          </td>
                        </tr>
                      ) : (
                        users.map((u) => (
                          <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-4 sm:px-6 py-3 sm:py-4 font-bold text-xs sm:text-sm">{u.fullName}</td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-slate-300 font-mono text-[10px] sm:text-xs">{u.phone}</td>
                            <td className="px-4 sm:px-6 py-3 sm:py-4 text-right text-slate-500 text-[10px] sm:text-xs">
                              {new Date(u.createdAt).toLocaleDateString()}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar Area: Settings */}
          <div className="space-y-3 sm:space-y-4">
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-[#EAB308]" />
              <h2 className="text-sm sm:text-base md:text-lg font-black uppercase tracking-tight">System Configuration</h2>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-5 md:p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full" />
              
              <form onSubmit={handleSaveSettings} className="relative z-10 space-y-4 sm:space-y-5 md:space-y-6">
                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-black tracking-widest text-slate-500 mb-2 sm:mb-3">
                    Global QFS Activation Code
                  </label>
                  <p className="text-[11px] sm:text-xs text-slate-400 mb-3 sm:mb-4 font-medium leading-relaxed">
                    This is the code users must provide to pass the activation gate on their dashboard.
                  </p>
                  <input
                    type="text"
                    required
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value)}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white focus:outline-none focus:border-[#EAB308]/50 transition-colors font-mono"
                    placeholder="Enter activation code"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-black tracking-widest text-slate-500 mb-2 sm:mb-3">
                    Default User Balance
                  </label>
                  <p className="text-[11px] sm:text-xs text-slate-400 mb-3 sm:mb-4 font-medium leading-relaxed">
                    This balance will be displayed to all users on their dashboard.
                  </p>
                  <input
                    type="text"
                    required
                    value={defaultBalance}
                    onChange={(e) => setDefaultBalance(e.target.value)}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white focus:outline-none focus:border-[#EAB308]/50 transition-colors font-mono"
                    placeholder="e.g., 653,000,000"
                  />
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase font-black tracking-widest text-slate-500 mb-2 sm:mb-3">
                    Telegram Community Link
                  </label>
                  <p className="text-[11px] sm:text-xs text-slate-400 mb-3 sm:mb-4 font-medium leading-relaxed">
                    The Telegram link that users will see on their dashboard.
                  </p>
                  <input
                    type="url"
                    required
                    value={telegramLink}
                    onChange={(e) => setTelegramLink(e.target.value)}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 sm:py-3.5 text-sm sm:text-base text-white focus:outline-none focus:border-[#EAB308]/50 transition-colors font-mono"
                    placeholder="https://t.me/yourcommunity"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingCode}
                  className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-black font-black py-3.5 sm:py-4 rounded-xl uppercase text-[11px] sm:text-xs tracking-tight transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
                >
                  {savingCode ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {savingCode ? "Saving..." : "Update Settings"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
