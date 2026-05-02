import React, { useState, useEffect } from 'react';
import { Search, Activity, ShieldCheck, AlertTriangle } from 'lucide-react';

const BACKEND_URL = "https://your-backend-on-render.com"; // UPDATE THIS

export default function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("Vayu");

  const search = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/api/insight/${query}`);
      const json = await res.json();
      setData(json);
    } catch (e) { console.error("Connection failed"); }
  };

  useEffect(() => { search(); }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 p-4 md:p-8">
      <nav className="max-w-5xl mx-auto flex justify-between items-center mb-10">
        <h1 className="text-2xl font-black text-blue-600 tracking-tighter italic">UBID.IO</h1>
        <div className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-[10px] font-bold">SECURE ENGINE</div>
      </nav>

      <div className="max-w-2xl mx-auto mb-10">
        <div className="relative">
          <Search className="absolute left-4 top-4 text-slate-400" />
          <input 
            className="w-full p-4 pl-12 rounded-2xl shadow-xl border-none focus:ring-2 focus:ring-blue-500 transition-all"
            placeholder="Search Industrial Entity..."
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && search()}
          />
        </div>
      </div>

      {data && (
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm md:flex justify-between items-center">
            <div>
              <p className="text-blue-600 font-bold text-xs mb-1">{data.ubid}</p>
              <h2 className="text-4xl font-black">{data.primary_name}</h2>
              <p className="text-slate-400 text-sm mt-1">📍 {data.location}</p>
            </div>
            <div className="mt-6 md:mt-0 bg-slate-900 text-white p-6 rounded-2xl text-center">
              <p className="text-[10px] text-slate-400 font-bold uppercase">Confidence Score</p>
              <p className="text-4xl font-black text-blue-400">{data.trust_score * 100}%</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
              <h3 className="text-xs font-bold text-slate-400 mb-6 flex items-center gap-2 uppercase"><Activity size={14}/> Activity Pulse</h3>
              <div className="h-32 flex items-end gap-1 px-2">
                {data.activity_pulse.map((v, i) => (
                  <div key={i} style={{ height: `${v}%` }} className="flex-1 bg-blue-500 rounded-t-sm opacity-80"></div>
                ))}
              </div>
            </div>

            <div className={`p-6 rounded-3xl border shadow-sm ${data.conflicts.length > 0 ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-200'}`}>
              <h3 className="text-xs font-bold mb-4 flex items-center gap-2 uppercase"><AlertTriangle size={14}/> Alerts</h3>
              {data.conflicts.length > 0 ? data.conflicts.map((c, i) => (
                <p key={i} className="text-xs text-amber-800 font-medium">{c}</p>
              )) : <p className="text-xs text-slate-400">Deterministic Match Verified.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
