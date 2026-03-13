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
        body: JSON.stringify({ qfsActivationCode: activationCode })
      });
      const data = await res.json();
      if (data.success) {
        alert("Activation Code updated successfully!");
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
    <div className="min-h-screen bg-[#020617] text-white p-4 md:p-8 font-sans">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex flex-wrap items-center justify-between gap-4 bg-[#111827] border border-white/10 rounded-2xl p-6">
          <div className="flex items-center gap-4">
            <div className="bg-[#1E293B] p-3 rounded-xl text-[#EAB308]">
              <Settings className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-black uppercase tracking-tight">Admin Dashboard</h1>
              <p className="text-slate-500 text-xs font-bold uppercase">System Management Panel</p>
            </div>
          </div>
          <button 
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center gap-2 bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors px-4 py-2 rounded-lg font-bold uppercase text-xs"
          >
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Area: User List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5 text-[#EAB308]" />
              <h2 className="text-lg font-black uppercase tracking-tight">Registered Users ({users.length})</h2>
            </div>
            
            <div className="bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              {loadingUsers ? (
                <div className="p-12 flex justify-center">
                  <Loader2 className="w-6 h-6 animate-spin text-slate-500" />
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-[#1E293B] text-slate-400 text-[10px] uppercase font-black tracking-widest">
                      <tr>
                        <th className="px-6 py-4">Full Name</th>
                        <th className="px-6 py-4">Phone Number</th>
                        <th className="px-6 py-4 text-right">Joined Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {users.length === 0 ? (
                        <tr>
                          <td colSpan={3} className="px-6 py-12 text-center text-slate-500 font-medium">
                            No users registered yet.
                          </td>
                        </tr>
                      ) : (
                        users.map((u) => (
                          <tr key={u._id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-4 font-bold">{u.fullName}</td>
                            <td className="px-6 py-4 text-slate-300 font-mono text-xs">{u.phone}</td>
                            <td className="px-6 py-4 text-right text-slate-500 text-xs">
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
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Settings className="w-5 h-5 text-[#EAB308]" />
              <h2 className="text-lg font-black uppercase tracking-tight">System Configuration</h2>
            </div>

            <div className="bg-[#111827] border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[50px] rounded-full" />
              
              <form onSubmit={handleSaveSettings} className="relative z-10 space-y-6">
                <div>
                  <label className="block text-[10px] uppercase font-black tracking-widest text-slate-500 mb-3">
                    Global QFS Activation Code
                  </label>
                  <p className="text-xs text-slate-400 mb-4 font-medium leading-relaxed">
                    This is the code users must provide to pass the activation gate on their dashboard.
                  </p>
                  <input
                    type="text"
                    required
                    value={activationCode}
                    onChange={(e) => setActivationCode(e.target.value)}
                    className="w-full bg-[#020617] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#EAB308]/50 transition-colors font-mono"
                    placeholder="Enter activation code"
                  />
                </div>

                <button
                  type="submit"
                  disabled={savingCode}
                  className="w-full bg-[#EAB308] hover:bg-[#FACC15] text-black font-black py-4 rounded-xl uppercase text-xs tracking-tight transition-colors disabled:opacity-70 flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,179,8,0.2)]"
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
