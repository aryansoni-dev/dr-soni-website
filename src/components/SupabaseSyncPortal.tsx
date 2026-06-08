import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Database, 
  RefreshCw, 
  Copy, 
  Check, 
  Wifi, 
  WifiOff, 
  DatabaseBackup, 
  Layers, 
  CheckCircle2, 
  AlertTriangle,
  Download,
  Terminal,
  Send,
  X
} from "lucide-react";
import { testSupabaseConnection, syncOfflineData } from "../lib/supabase";

export default function SupabaseSyncPortal() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"status" | "queue" | "sql">("status");
  const [isTesting, setIsTesting] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [copied, setCopied] = useState(false);
  
  // Real-time status states
  const [dbStatus, setDbStatus] = useState<{
    connected: boolean;
    hasConsultationsTable: boolean;
    hasBookingsTable: boolean;
    hasLeadsTable: boolean;
    hasSubscribersTable: boolean;
    anyConsultationTable: boolean;
    errors: {
      consultations: string | null;
      bookings: string | null;
      leads: string | null;
      subscribers: string | null;
    };
  } | null>(null);

  // Buffer queue states
  const [offlineConsultations, setOfflineConsultations] = useState<any[]>([]);
  const [offlineSubscribers, setOfflineSubscribers] = useState<any[]>([]);
  const [syncLogs, setSyncLogs] = useState<string>("");
  const [showPortalButton, setShowPortalButton] = useState(false);

  // Periodically refresh browser local storage queue numbers
  const refreshLocalQueues = () => {
    try {
      const consultationsBackup = localStorage.getItem("backup_consultations") || "[]";
      const subscribersBackup = localStorage.getItem("backup_subscribers") || "[]";
      setOfflineConsultations(JSON.parse(consultationsBackup));
      setOfflineSubscribers(JSON.parse(subscribersBackup));
    } catch (e) {
      console.error("Failed to parse queue from local storage:", e);
    }
  };

  const checkDatabaseStatus = async () => {
    setIsTesting(true);
    try {
      const status = await testSupabaseConnection() as any;
      setDbStatus(status);
    } catch (err) {
      console.error("Failed database connectivity diagnostics:", err);
    } finally {
      setIsTesting(false);
    }
  };

  useEffect(() => {
    refreshLocalQueues();
    checkDatabaseStatus();

    // Check if url contains admin or debug parameters to show the dashboard
    const params = new URLSearchParams(window.location.search);
    const isDevUrl = window.location.hostname.includes("localhost") || window.location.hostname.includes("ais-dev");
    const hasAdminQuery = params.get("admin") === "true" || 
                          params.get("debug") === "true" || 
                          params.get("setup") === "true" ||
                          params.get("database") === "true";
    
    // Show only under admin mode/query, ensuring general viewers see nothing
    setShowPortalButton(hasAdminQuery);

    // Listen to local storage changes to keep badge updated in real-time
    const handleStorageChange = () => {
      refreshLocalQueues();
    };
    window.addEventListener("storage", handleStorageChange);
    // Standard custom event trigger setup
    const interval = setInterval(refreshLocalQueues, 2500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // Automatic silent background synchronization effect
  useEffect(() => {
    const attemptSilentSync = async () => {
      try {
        const consultationsBackup = localStorage.getItem("backup_consultations") || "[]";
        const subscribersBackup = localStorage.getItem("backup_subscribers") || "[]";
        const qCount = JSON.parse(consultationsBackup).length + JSON.parse(subscribersBackup).length;
        
        if (qCount > 0) {
          console.log(`[Auto-Sync] Detected ${qCount} pending offline queue entries. Auto-syncing with Supabase...`);
          const syncResult = await syncOfflineData();
          if (syncResult.consultationsSynced > 0 || syncResult.subscribersSynced > 0) {
            console.log(`[Auto-Sync] Silently synchronized ${syncResult.consultationsSynced} consultation rows and ${syncResult.subscribersSynced} newsletter signups.`);
            refreshLocalQueues();
            // Trigger a silent status refresh too
            const status = await testSupabaseConnection() as any;
            setDbStatus(status);
          }
        }
      } catch (err) {
        console.debug("[Auto-Sync] Silent background batch deferred:", err);
      }
    };

    // run immediately on boot
    setTimeout(attemptSilentSync, 1000);

    // set background poller (every 15 seconds)
    const backgroundSyncInterval = setInterval(attemptSilentSync, 15000);

    return () => clearInterval(backgroundSyncInterval);
  }, []);

  const totalQueued = offlineConsultations.length + offlineSubscribers.length;

  const handleCopySQL = () => {
    const sqlText = `-- Create consultations table (for bookings and consultation forms)
CREATE TABLE IF NOT EXISTS public.consultations (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  city text,
  service text,
  message text,
  preferred_date text,
  preferred_time text,
  source text NOT NULL DEFAULT 'contact_form',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create subscribers table (for newsletter signups)
CREATE TABLE IF NOT EXISTS public.subscribers (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) so tables are secure in production
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (needed so guests can submit consultation bookings)
CREATE POLICY "Allow public insert to consultations" 
ON public.consultations FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous newsletter registration
CREATE POLICY "Allow public insert to subscribers" 
ON public.subscribers FOR INSERT TO anon WITH CHECK (true);

-- Restrict read permissions to authenticated website managers only
CREATE POLICY "Allow authenticated read consultations" 
ON public.consultations FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read subscribers" 
ON public.subscribers FOR SELECT TO authenticated USING (true);`;

    navigator.clipboard.writeText(sqlText);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleForceSync = async () => {
    if (totalQueued === 0) return;
    setIsSyncing(true);
    setSyncLogs("Initiating background transaction payload sync to Supabase...");
    
    try {
      const syncResult = await syncOfflineData();
      refreshLocalQueues();
      await checkDatabaseStatus();
      
      let message = `Sync operation completed successfully!
• ${syncResult.consultationsSynced} consultation bookings synchronized.
• ${syncResult.subscribersSynced} newsletter subscribers synchronized.`;
      
      if (syncResult.errors.length > 0) {
        message += `\n\nIssues encountered:\n` + syncResult.errors.join("\n");
      } else if (syncResult.consultationsSynced === 0 && syncResult.subscribersSynced === 0) {
        message += `\n(Ensure your table definitions match the required SQL schema exactly before pushing changes!)`;
      }
      setSyncLogs(message);
    } catch (err: any) {
      setSyncLogs(`Transactions batch failed: ${err.message || err}`);
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({
      consultations: offlineConsultations,
      subscribers: offlineSubscribers,
      exportedAt: new Date().toISOString()
    }, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `dr_soni_database_backups_${new Date().toISOString().substring(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <>
      {/* 1. Collapsed Floating Badge (Bottom-Left Corner) */}
      {showPortalButton && (
        <div className="fixed bottom-6 left-4 md:bottom-8 md:left-8 z-45">
          <motion.button
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`flex items-center gap-2 px-4 py-3 rounded-full shadow-lg border text-xs font-bold font-sans uppercase tracking-wider backdrop-blur-md cursor-pointer transition-all ${
              totalQueued > 0 
                ? "bg-amber-500 hover:bg-amber-400 border-amber-600/30 text-charcoal animate-pulse" 
                : dbStatus?.anyConsultationTable && dbStatus?.hasSubscribersTable
                  ? "bg-navy-light/90 hover:bg-navy border-gold/40 text-gold"
                  : "bg-red-950/90 hover:bg-red-900 border-red-500/40 text-red-100"
            }`}
            title="Supabase Database Status Checker"
          >
            <Database className="w-4 h-4" />
            <span>Supabase Status</span>
            
            {/* Circular Red Notification Indicator Badge if items are queued locally */}
            {totalQueued > 0 && (
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-red-600 text-white text-[10px] font-black tracking-normal leading-none font-sans ml-1">
                {totalQueued}
              </span>
            )}

            {/* Connected Icon */}
            <span className="flex items-center justify-center">
              {dbStatus?.anyConsultationTable && dbStatus?.hasSubscribersTable ? (
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block ring-4 ring-emerald-500/20" />
              ) : (
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 inline-block ring-4 ring-red-500/20" />
              )}
            </span>
          </motion.button>
        </div>
      )}

      {/* 2. Full Dashboard Dialog Modal Backdrop Panel */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-55 flex items-center justify-center overflow-hidden p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-navy/80 backdrop-blur-md"
            />

            {/* Main Widget Portal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-navy border border-gold/40 rounded-xl shadow-2xl overflow-hidden z-20 flex flex-col max-h-[85vh]"
            >
              <div className="h-1 bg-gradient-to-r from-gold-dark via-gold to-gold-light" />
              
              {/* Header */}
              <div className="p-5 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <Database className="w-6 h-6 text-gold" />
                  <div>
                    <h3 className="font-serif text-lg font-bold text-white">Supabase Setup Diagnostics</h3>
                    <p className="font-sans text-xs text-white/50">Configure & sync forms for project: drddmxtnaglvljymavfe</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-white/60 hover:text-gold hover:bg-white/5 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-white/10 text-xs font-bold font-sans uppercase tracking-wider bg-white/[0.01]">
                <button
                  onClick={() => { setActiveTab("status"); checkDatabaseStatus(); }}
                  className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                    activeTab === "status"
                      ? "border-gold text-gold bg-white/[0.03]"
                      : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Wifi className="w-3.5 h-3.5" />
                    Connection & Schema
                  </span>
                </button>
                <button
                  onClick={() => { setActiveTab("sql"); }}
                  className={`flex-1 py-3 text-center border-b-2 transition-all cursor-pointer ${
                    activeTab === "sql"
                      ? "border-gold text-gold bg-white/[0.03]"
                      : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5" />
                    SQL Setup Script
                  </span>
                </button>
                <button
                  onClick={() => { setActiveTab("queue"); refreshLocalQueues(); }}
                  className={`flex-1 py-3 text-center border-b-2 transition-all relative cursor-pointer ${
                    activeTab === "queue"
                      ? "border-gold text-gold bg-white/[0.03]"
                      : "border-transparent text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="flex items-center justify-center gap-1.5">
                    <DatabaseBackup className="w-3.5 h-3.5" />
                    Offline Queue
                    {totalQueued > 0 && (
                      <span className="px-1.5 py-0.5 rounded-full bg-amber-500 text-charcoal font-black text-[9px] font-sans">
                        {totalQueued}
                      </span>
                    )}
                  </span>
                </button>
              </div>

              {/* Expanded Tabs Body Grid */}
              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                
                {/* A. Status View */}
                {activeTab === "status" && (
                  <div className="space-y-4">
                    <div className="p-4 bg-white/[0.02] border border-white/5 rounded-lg space-y-3">
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="text-white/50">Database Endpoint URL:</span>
                        <span className="font-mono text-white/80 select-all font-semibold">https://drddmxtnaglvljymavfe.supabase.co</span>
                      </div>
                      <div className="flex items-center justify-between text-xs font-sans">
                        <span className="text-white/50">Database Status:</span>
                        {dbStatus?.connected ? (
                          <span className="flex items-center gap-1 text-emerald-400 font-bold">
                            <Wifi className="w-3.5 h-3.5" /> Connection Established
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-red-400 font-bold">
                            <WifiOff className="w-3.5 h-3.5" /> offline fallback triggered
                          </span>
                        )}
                      </div>
                    </div>

                    <h4 className="font-serif text-sm font-bold text-gold uppercase tracking-wider mb-2">Detected Schema Tables</h4>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* consultations box */}
                      <div className={`p-4 rounded-lg border flex flex-col justify-between ${
                        dbStatus?.anyConsultationTable 
                          ? "bg-emerald-500/5 border-emerald-500/20" 
                          : "bg-red-500/5 border-red-500/20"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-sm font-bold text-white">consultations</span>
                            {dbStatus?.anyConsultationTable ? (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">Active</span>
                            ) : (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-bold">Missing</span>
                            )}
                          </div>
                          <p className="text-xs text-white/60 leading-normal font-sans">
                            Stores booking credentials, consultation fields, chosen dates, times, and phone callback indices.
                          </p>
                        </div>
                        
                        {!dbStatus?.anyConsultationTable && (
                          <div className="text-[11px] text-red-300 mt-2 flex items-center gap-1 font-sans font-light">
                            <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
                            <span>Action Required: Run SQL script</span>
                          </div>
                        )}
                      </div>

                      {/* subscribers box */}
                      <div className={`p-4 rounded-lg border flex flex-col justify-between ${
                        dbStatus?.hasSubscribersTable 
                          ? "bg-emerald-500/5 border-emerald-500/20" 
                          : "bg-red-500/5 border-red-500/20"
                      }`}>
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-mono text-sm font-bold text-white">subscribers</span>
                            {dbStatus?.hasSubscribersTable ? (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-bold">Active</span>
                            ) : (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-bold">Missing</span>
                            )}
                          </div>
                          <p className="text-xs text-white/60 leading-normal font-sans">
                            Stores newsletter subscriptions, client emails, and enrollment milestones.
                          </p>
                        </div>

                        {!dbStatus?.hasSubscribersTable && (
                          <div className="text-[11px] text-red-300 mt-2 flex items-center gap-1 font-sans font-light">
                            <AlertTriangle className="w-3 h-3 text-red-400 flex-shrink-0" />
                            <span>Action Required: Run SQL script</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Diagnose Action Footer */}
                    {(!dbStatus?.anyConsultationTable || !dbStatus?.hasSubscribersTable) ? (
                      <div className="p-3 bg-amber-500/5 border border-amber-500/20 text-amber-300 text-xs rounded-lg font-sans leading-relaxed flex items-start gap-2.5">
                        <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold">Important Notice:</span> Some database tables could not be located in your Supabase database schema cache. The web client is securely storing bookings locally in your web browser memory to keep customers moving. Head to the <span className="text-gold underline font-semibold cursor-pointer" onClick={() => setActiveTab("sql")}>SQL Setup Script</span> tab and run the script on your Supabase dashboard to complete your database setup.
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/20 text-emerald-400 text-xs rounded-lg font-sans flex items-center gap-2 font-medium">
                        <CheckCircle2 className="w-4 h-4" />
                        All database tables are successfully provisioned and connected! Active leads will write straight to Supabase.
                      </div>
                    )}

                    <button
                      onClick={checkDatabaseStatus}
                      disabled={isTesting}
                      className="w-full h-11 bg-white/[0.04] hover:bg-white/[0.08] active:scale-98 border border-white/10 text-white font-bold font-sans text-xs uppercase tracking-widest rounded transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                    >
                      <RefreshCw className={`w-3.5 h-3.5 text-gold ${isTesting ? "animate-spin" : ""}`} />
                      <span>{isTesting ? "Testing Connection..." : "Perform Database Refresh Check"}</span>
                    </button>
                  </div>
                )}

                {/* B. SQL Script Setup Instructions */}
                {activeTab === "sql" && (
                  <div className="space-y-4">
                    <div className="text-xs text-white/70 space-y-2 leading-relaxed font-sans text-left">
                      <p className="font-serif text-sm font-bold text-white mb-2">How to Setup Your Supabase Database in 10 Seconds:</p>
                      <ol className="list-decimal list-inside space-y-1.5 text-white/80">
                        <li>Log in to your <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-gold underline hover:text-gold-light">Supabase Dashboard</a> and choose the <strong className="text-white">Dr. J Soni Life Advisor</strong> project.</li>
                        <li>On the left navigation menu, click the <strong className="text-white">SQL Editor</strong> tab (it looks like <code className="font-mono bg-white/5 px-1 py-0.5">SQL icon</code>).</li>
                        <li>Click <strong className="text-white">New Query</strong>, paste the copied code block below, and click <strong className="text-white">Run</strong>!</li>
                        <li>Return here, verify schema on "Connection & Schema" tab, and sync offline bookings instantly.</li>
                      </ol>
                    </div>

                    {/* Copy SQL section */}
                    <div className="relative border border-white/10 rounded-lg overflow-hidden bg-black/40">
                      <div className="flex items-center justify-between px-4 py-2 border-b border-white/5 bg-white/[0.02]">
                        <span className="font-mono text-[10px] text-white/40 uppercase font-semibold">Supabase SQL Editor Script</span>
                        <button
                          onClick={handleCopySQL}
                          className="flex items-center gap-1 text-[11px] py-1 px-2.5 bg-gold/10 text-gold hover:bg-gold hover:text-charcoal rounded transition-all font-bold font-sans cursor-pointer"
                        >
                          {copied ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Copied SQL!</span>
                            </>
                          ) : (
                            <>
                              <Copy className="w-3.5 h-3.5" />
                              <span>Copy Script</span>
                            </>
                          )}
                        </button>
                      </div>

                      <pre className="p-4 overflow-x-auto text-[10px] sm:text-[11px] text-amber-200/90 font-mono leading-relaxed select-all max-h-60 text-left">
{`-- Create consultations table (for bookings and consultation forms)
CREATE TABLE IF NOT EXISTS public.consultations (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  city text,
  service text,
  message text,
  preferred_date text,
  preferred_time text,
  source text NOT NULL DEFAULT 'contact_form',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create subscribers table (for newsletter signups)
CREATE TABLE IF NOT EXISTS public.subscribers (
  id bigint GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  email text NOT NULL UNIQUE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS (Row Level Security) so tables are secure in production
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts (needed so guests can submit consultation bookings)
CREATE POLICY "Allow public insert to consultations" 
ON public.consultations FOR INSERT TO anon WITH CHECK (true);

-- Allow anonymous newsletter registration
CREATE POLICY "Allow public insert to subscribers" 
ON public.subscribers FOR INSERT TO anon WITH CHECK (true);

-- Restrict read permissions to authenticated website managers only
CREATE POLICY "Allow authenticated read consultations" 
ON public.consultations FOR SELECT TO authenticated USING (true);

CREATE POLICY "Allow authenticated read subscribers" 
ON public.subscribers FOR SELECT TO authenticated USING (true);`}
                      </pre>
                    </div>
                  </div>
                )}

                {/* C. Queue view */}
                {activeTab === "queue" && (
                  <div className="space-y-5 text-left">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-serif text-sm font-bold text-white uppercase tracking-wider">Locally Preserved Offline Buffer</h4>
                        <p className="text-xs text-white/50 font-sans">Active entries queued inside browser storage pending table setup.</p>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-1 bg-white/5 text-white/70 rounded h-fit font-bold uppercase">
                        {totalQueued} Items Stored
                      </span>
                    </div>

                    {totalQueued > 0 ? (
                      <div className="space-y-4">
                        {/* Summary details */}
                        <div className="max-h-56 overflow-y-auto space-y-2 border border-white/10 rounded-lg p-3 bg-black/20">
                          {offlineConsultations.map((item, idx) => (
                            <div key={`c-${idx}`} className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between text-xs gap-2">
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-black text-white">{item.fullName}</span>
                                  <span className="px-1.5 py-0.2 bg-gold/10 text-gold rounded text-[9px] font-bold uppercase">{item.source}</span>
                                </div>
                                <div className="font-mono text-[10px] text-white/55 mt-1">
                                  📞 {item.phone} | ✉️ {item.email || "No Email"} | Service: {item.service || "audit"}
                                </div>
                              </div>
                              <span className="text-[10px] text-white/40 align-self-end sm:align-self-center font-mono">
                                {new Date(item.savedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          ))}

                          {offlineSubscribers.map((item, idx) => (
                            <div key={`s-${idx}`} className="p-2.5 rounded bg-white/[0.02] border border-white/5 flex items-center justify-between text-xs">
                              <div>
                                <span className="font-black text-emerald-400">Newsletter Subscription:</span>
                                <span className="font-mono text-white/80 ml-2">{item.email}</span>
                              </div>
                              <span className="text-[10px] text-white/40 font-mono">
                                {new Date(item.savedAt || new Date()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                          ))}
                        </div>

                        {/* Synchronize controls */}
                        <div className="p-4 bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs rounded-lg font-sans leading-relaxed space-y-3">
                          <p className="font-bold">🔌 Synchronize Pending Data back to Supabase</p>
                          <p className="text-amber-200/80 font-light">
                            If you have successfully pasted the schema script in your Supabase SQL Editor and run it, these client leads can now be written directly back to the live server.
                          </p>

                          <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                            <button
                              onClick={handleForceSync}
                              disabled={isSyncing}
                              className="flex-1 h-10 bg-gold hover:bg-gold-light active:scale-98 text-charcoal font-black rounded text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2 transition-all shadow"
                            >
                              <Send className="w-3.5 h-3.5" />
                              <span>{isSyncing ? "Transferring Rows..." : "Sync Buffered Leads to Supabase"}</span>
                            </button>

                            <button
                              onClick={handleExportJSON}
                              className="px-4 h-10 bg-white/[0.05] hover:bg-white/[0.1] active:scale-98 text-white border border-white/10 font-bold rounded text-xs uppercase tracking-wider cursor-pointer flex items-center justify-center gap-1.5 transition-all"
                            >
                              <Download className="w-3.5 h-3.5 text-gold" />
                              <span>JSON Export Backup</span>
                            </button>
                          </div>
                        </div>

                        {/* Sync console output logs box */}
                        {syncLogs && (
                          <div className="p-3 bg-black/50 rounded-lg text-white font-mono text-[10px] whitespace-pre-wrap leading-relaxed border border-white/5 max-h-32 overflow-y-auto">
                            {syncLogs}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="py-12 border border-dashed border-white/10 rounded-lg flex flex-col items-center justify-center text-center text-white/40">
                        <Layers className="w-10 h-10 text-white/10 mb-2" />
                        <p className="text-xs font-serif font-bold text-white/50">Local Buffer is currently empty</p>
                        <p className="text-[11px] font-sans text-white/30 max-w-[280px] mt-1">Submit mock bookings, callback items, or subscription fields to populate this diagnostic queue.</p>
                      </div>
                    )}
                  </div>
                )}

              </div>

              {/* Footer */}
              <div className="p-4 border-t border-white/10 bg-white/[0.01] flex items-center justify-between text-[11px] text-white/40 font-mono">
                <span>Supabase: Public Anonymous Access Mode</span>
                <span>Active Endpoint Schema: public</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
