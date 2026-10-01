export const runtime = "nodejs";
export async function POST(req){
  const {messages}=await req.json();
  const OLLAMA_URL=process.env.OLLAMA_URL;
  const MODEL=process.env.OLLAMA_MODEL||"ailearnoconnect:latest";
  if(OLLAMA_URL){
    try{
      const r=await fetch(`${OLLAMA_URL}/api/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({model:MODEL,messages,stream:false})});
      const d=await r.json();
      return Response.json({reply:d.message?.content||JSON.stringify(d)});
    }catch(e){ return Response.json({reply:`Proxy error: ${e.message}`}) }
  }
  return Response.json({reply:`[MOCK MODE - Vercel demo]\nYou: ${messages[messages.length-1].content}\n\nTo connect real local ailearnoconnect:latest:\n1. PC: ollama serve\n2. PC: ngrok http 11434\n3. Vercel env: OLLAMA_URL=https://xxx.ngrok.io\n\nThen this ChatGPT UI talks to your real local model.`});
}
