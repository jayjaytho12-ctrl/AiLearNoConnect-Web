"use client";
import { useState, useRef, useEffect } from "react";
export default function Page(){
  const [messages,setMessages]=useState([{role:"assistant",content:"I am AiLearNoConnect (AiLearnSOUL).\n\nTelegram: NONE\nProduction: NONE\n\nExact ChatGPT layout. Ready to code."}]);
  const [input,setInput]=useState(""); const [loading,setLoading]=useState(false);
  const [sidebarOpen,setSidebarOpen]=useState(true); const bottomRef=useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"})},[messages,loading]);
  async function send(){
    if(!input.trim()||loading) return;
    const userMsg={role:"user",content:input}; setMessages(m=>[...m,userMsg]); setInput(""); setLoading(true);
    try{
      const res=await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({messages:[...messages,userMsg]})});
      const data=await res.json(); setMessages(m=>[...m,{role:"assistant",content:data.reply}]);
    }catch(e){ setMessages(m=>[...m,{role:"assistant",content:"Error: "+e.message}]) }
    setLoading(false);
  }
  return (
    <div className="flex h-screen w-screen bg-[#212121]">
      <div className={`${sidebarOpen?"w-[260px]":"w-0"} bg-[#171717] flex flex-col transition-all overflow-hidden shrink-0`}>
        <div className="p-3"><button onClick={()=>setMessages([{role:"assistant",content:"New chat - AiLearNoConnect ready"}])} className="w-full flex gap-3 px-3 py-3 rounded-lg hover:bg-[#212121] text-[14px]"><div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center font-bold">+</div>New chat</button></div>
        <div className="flex-1 px-2 space-y-1 text-[13px] overflow-y-auto">
          <div className="px-3 py-2 rounded-lg bg-[#212121]">Chat with AiLearNoConnect</div>
          <div className="px-3 py-2 hover:bg-[#212121] text-zinc-300">Crawl / Probe & Learn</div>
          <div className="px-3 py-2 hover:bg-[#212121] text-zinc-300">Logic — Approved / Proposed</div>
          <div className="px-3 py-2 hover:bg-[#212121] text-zinc-300">Memory & Knowledge</div>
          <div className="px-3 py-2 hover:bg-[#212121] text-zinc-300">Experiments</div>
          <div className="px-3 py-2 hover:bg-[#212121] text-zinc-300">Skills / Abilities</div>
          <div className="px-3 py-2 hover:bg-[#212121] text-zinc-300">Research Lab</div>
          <div className="px-3 py-2 hover:bg-[#212121] text-zinc-300">Evolution</div>
        </div>
        <div className="p-3 border-t border-white/10 text-[11px] text-zinc-500">STATUS: ONLINE<br/>Telegram NONE<br/>Prod NONE<br/>ailearnoconnect:latest</div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="h-[56px] flex items-center px-4 border-b border-white/5 gap-3"><button onClick={()=>setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-white/10 rounded">☰</button><div className="font-semibold">AiLearNoConnect</div><div className="text-[11px] bg-white/10 px-2 py-0.5 rounded-full">AiLearnSOUL</div></div>
        <div className="flex-1 overflow-y-auto"><div className="max-w-[768px] mx-auto">{messages.map((m,i)=><div key={i} className={`px-6 py-6 ${m.role==="user"?"bg-[#212121]":"bg-[#2f2f2f]"}`}><div className="flex gap-4"><div className={`w-7 h-7 rounded-full flex items-center justify-center text-[12px] font-bold ${m.role==="user"?"bg-[#19c37d]":"bg-white text-black"}`}>{m.role==="user"?"U":"AI"}</div><div className="whitespace-pre-wrap text-[15px] leading-7">{m.content}</div></div></div>)}{loading&&<div className="px-6 py-6 bg-[#2f2f2f] animate-pulse text-zinc-400">AiLearNoConnect thinking...</div>}<div ref={bottomRef}/></div></div>
        <div className="border-t border-white/5 p-4"><div className="max-w-[768px] mx-auto"><div className="bg-[#2f2f2f] rounded-[24px] flex items-end"><textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Message AiLearNoConnect" className="flex-1 bg-transparent outline-none px-5 py-4 text-[15px] resize-none min-h-[52px]"/><button onClick={send} className="m-2 w-8 h-8 rounded-full bg-white text-black">↑</button></div><div className="text-[11px] text-zinc-500 text-center mt-2">Telegram NONE / Production NONE / ailearnoconnect:latest</div></div></div>
      </div>
    </div>
  );
}
