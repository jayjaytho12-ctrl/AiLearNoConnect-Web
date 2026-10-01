import { useState } from 'react';

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  async function send() {
    if (!input.trim()) return;
    const userMsg = { role: 'user', content: input };
    setMessages(m => [...m, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const res = await fetch('https://desktop-rhp90q6.tailff0323.ts.net/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ model: 'ailearnoconnect:latest', messages: [...messages, userMsg] })
      });
      const data = await res.json();
      setMessages(m => [...m, { role: 'assistant', content: data.message?.content || JSON.stringify(data) }]);
    } catch (e: any) {
      setMessages(m => [...m, { role: 'assistant', content: 'Error: ' + e.message + ' - Make sure ollama serve is running and OLLAMA_ORIGINS=*'}]);
    }
    setLoading(false);
  }

  return (
    <div style={{display:'flex',height:'100vh',fontFamily:'system-ui',background:'#212121',color:'white'}}>
      <div style={{width:'260px',background:'#171717',padding:'16px'}}>AiLearNoConnect - {loading ? 'Thinking...' : 'Ready'}</div>
      <div style={{flex:1,display:'flex',flexDirection:'column'}}>
        <div style={{flex:1,overflowY:'auto',padding:'24px'}}>
          {messages.map((m,i)=><div key={i} style={{marginBottom:'16px',whiteSpace:'pre-wrap'}}><b>{m.role}:</b> {m.content}</div>)}
        </div>
        <div style={{padding:'16px',display:'flex',gap:'8px'}}>
          <input value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter'&&send()} placeholder="Ask AiLearNoConnect..." style={{flex:1,padding:'12px',borderRadius:'8px',background:'#2f2f2f',color:'white',border:'none'}}/>
          <button onClick={send} style={{padding:'12px 24px',background:'white',color:'black',borderRadius:'8px'}}>Send</button>
        </div>
      </div>
    </div>
  );
}
