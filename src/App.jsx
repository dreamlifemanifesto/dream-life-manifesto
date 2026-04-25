import { useState, useRef } from "react";

const QUOTES = [
  { q:"The best way to predict the future is to create it.", a:"Peter Drucker" },
  { q:"What you think, you become. What you feel, you attract. What you imagine, you create.", a:"Buddha" },
  { q:"Dream big and dare to fail.", a:"Norman Vaughan" },
  { q:"You are the author of your own life story.", a:"Unknown" },
  { q:"Believe you can and you're halfway there.", a:"Theodore Roosevelt" },
  { q:"Your vision will become clear only when you look into your own heart.", a:"Carl Jung" },
  { q:"Everything you've ever wanted is on the other side of fear.", a:"George Addair" },
  { q:"Act as if what you do makes a difference. It does.", a:"William James" },
  { q:"The secret of getting ahead is getting started.", a:"Mark Twain" },
  { q:"You didn't come this far to only come this far.", a:"Unknown" },
  { q:"Visualize your highest self and start showing up as that person.", a:"Unknown" },
  { q:"Your dreams are the blueprint. Your actions are the construction.", a:"Andre Knight" },
];

const CATS = [
  { id:"health",        label:"Health & Well-being",       emoji:"💪", color:"#0EA5E9",  quote:"Take care of your body. It's the only place you have to live.",                          author:"Jim Rohn",            instruction:"Reflect on and write down your health and well-being goals.",                              photoLabel:"Attach images that inspire a healthy lifestyle, vitality, and well-being" },
  { id:"spirituality",  label:"Spirituality & Mindfulness", emoji:"🙏", color:"#8B5CF6",  quote:"Faith is taking the first step even when you don't see the whole staircase.",             author:"Martin Luther King Jr.", instruction:"Reflect on and write down your spiritual goals.",                                        photoLabel:"Attach photos that evoke spirituality, serenity, or connection with the divine" },
  { id:"career",        label:"Career & Business",          emoji:"🚀", color:"#D4962A",  quote:"The best way to predict the future is to create it.",                                     author:"Peter Drucker",       instruction:"Reflect on and write down your career aspirations and business goals.",                  photoLabel:"Attach photos that represent your desired business achievements or career aspirations" },
  { id:"relationships", label:"Relationships & Connections", emoji:"❤️", color:"#EF4444",  quote:"The quality of your life is the quality of your relationships.",                          author:"Tony Robbins",        instruction:"Reflect on and write down your relationship goals and ways to nurture them.",            photoLabel:"Attach photos that represent love, friendship, and meaningful connections" },
  { id:"finances",      label:"Finances & Abundance",       emoji:"💰", color:"#10B981",  quote:"Wealth is not about having a lot of money. It is about having a lot of options.",        author:"Chris Rock",          instruction:"Reflect on and write down your financial goals.",                                       photoLabel:"Attach photos that symbolize abundance, financial prosperity, or your desired lifestyle" },
  { id:"travel",        label:"Travel & Adventure",         emoji:"✈️", color:"#06B6D4",  quote:"The world is a book and those who do not travel read only one page.",                    author:"Saint Augustine",     instruction:"Reflect on and write down your travel and adventure goals.",                            photoLabel:"Attach photos of dream travel destinations and thrilling activities" },
  { id:"hobbies",       label:"Hobbies & Creativity",       emoji:"🎨", color:"#F59E0B",  quote:"Creativity is intelligence having fun.",                                                  author:"Albert Einstein",     instruction:"Reflect on and write down your hobbies and creative pursuits.",                          photoLabel:"Attach photos related to your favourite hobbies and creative inspirations" },
  { id:"home",          label:"Home & Environment",         emoji:"🏡", color:"#84CC16",  quote:"Home is not a place. It is a feeling.",                                                   author:"Cecelia Ahern",       instruction:"Reflect on and write down your vision for your ideal living space.",                    photoLabel:"Attach photos of beautiful homes, interior designs, or serene natural settings" },
  { id:"contribution",  label:"Contribution & Legacy",      emoji:"🌍", color:"#6366F1",  quote:"We make a living by what we get but we make a life by what we give.",                    author:"Winston Churchill",   instruction:"Reflect on and write down ways to give back and make a positive impact.",               photoLabel:"Attach photos that symbolize acts of kindness and philanthropy" },
];

const INSPO = {
  health:       ["https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80","https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80","https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=400&q=80","https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80","https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=400&q=80","https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80"],
  spirituality: ["https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=400&q=80","https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=400&q=80","https://images.unsplash.com/photo-1528715471579-d1bcf0ba5e83?w=400&q=80","https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=400&q=80","https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&q=80","https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=400&q=80"],
  career:       ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80","https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&q=80","https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=80","https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&q=80","https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=400&q=80","https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=400&q=80"],
  relationships:["https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&q=80","https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?w=400&q=80","https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=400&q=80","https://images.unsplash.com/photo-1511988617509-a57c8a288659?w=400&q=80","https://images.unsplash.com/photo-1506863530036-1efeddceb993?w=400&q=80","https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=400&q=80"],
  finances:     ["https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&q=80","https://images.unsplash.com/photo-1604594849809-dfedbc827105?w=400&q=80","https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?w=400&q=80","https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=400&q=80","https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&q=80","https://images.unsplash.com/photo-1518458028785-8fbcd101ebb9?w=400&q=80"],
  travel:       ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&q=80","https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&q=80","https://images.unsplash.com/photo-1488085061387-422e29b40080?w=400&q=80","https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?w=400&q=80","https://images.unsplash.com/photo-1483729558449-99ef09a8c325?w=400&q=80","https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=400&q=80"],
  hobbies:      ["https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&q=80","https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&q=80","https://images.unsplash.com/photo-1586348943529-beaae6c28db9?w=400&q=80","https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=400&q=80","https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=400&q=80","https://images.unsplash.com/photo-1519681393784-d120267933ba?w=400&q=80"],
  home:         ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&q=80","https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&q=80","https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&q=80","https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&q=80","https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=400&q=80","https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?w=400&q=80"],
  contribution: ["https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400&q=80","https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=400&q=80","https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?w=400&q=80","https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&q=80","https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=400&q=80","https://images.unsplash.com/photo-1559026235-4e3faf1cc42c?w=400&q=80"],
};

const MS_EMOJIS = ["🌟","🏆","🎯","🚀","💫","✅","🙏","🎉","💰","❤️","🌍","🔑","👑","💎","🌈","⭐","🦋","🌺","🔥","💪"];

const BL  = "#38BDF8";
const BDK = "#0284C7";
const BG  = "#F0F9FF";
const WH  = "#FFFFFF";
const GD  = "#D4962A";
const TX  = "#0C1A2E";
const MT  = "#64748B";
const BD  = "#BAE6FD";
const BLT = "#E0F2FE";

const BASE = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0;}
  body{font-family:'Plus Jakarta Sans',sans-serif;background:${BG};color:${TX};-webkit-font-smoothing:antialiased;}
  input,textarea,button{font-family:'Plus Jakarta Sans',sans-serif;}
  @keyframes fadeUp{from{opacity:0;transform:translateY(16px);}to{opacity:1;transform:translateY(0);}}
  @keyframes float{0%,100%{transform:translateY(0);}50%{transform:translateY(-8px);}}
  .fade{animation:fadeUp .4s ease both;}
  .card-hover{transition:all .22s;cursor:pointer;}
  .card-hover:hover{transform:translateY(-3px);box-shadow:0 12px 32px rgba(2,132,199,.14);}
  @media(min-width:768px){.page-wrap{max-width:900px;margin:0 auto;}.cat-grid{grid-template-columns:repeat(3,1fr)!important;}}
`;

function Btn({onClick,children,style,disabled}){
  return <button onClick={onClick} disabled={disabled} style={{border:"none",borderRadius:12,padding:"14px 22px",fontSize:14,fontWeight:600,cursor:disabled?"not-allowed":"pointer",opacity:disabled?0.38:1,transition:"all .18s",...style}}>{children}</button>;
}

function Divider(){return <div style={{height:1,background:BD,margin:"24px 0"}}/>;}

function TabBar({active,onNav}){
  const tabs=[["home","🏠","Vision"],["milestones","🌟","Milestones"],["howto","📖","How To"],["install","📲","Install"]];
  return(
    <div style={{position:"fixed",bottom:0,left:0,right:0,background:WH,borderTop:`1px solid ${BD}`,display:"flex",zIndex:100,boxShadow:"0 -4px 20px rgba(0,0,0,.07)"}}>
      {tabs.map(([v,ic,lb])=>(
        <button key={v} onClick={()=>onNav(v)} style={{flex:1,background:"transparent",border:"none",cursor:"pointer",padding:"10px 4px",display:"flex",flexDirection:"column",alignItems:"center",gap:3,color:active===v?BDK:MT,fontSize:10,fontWeight:600,letterSpacing:.3,textTransform:"uppercase"}}>
          <span style={{fontSize:20}}>{ic}</span>{lb}
        </button>
      ))}
    </div>
  );
}

export default function App(){
  const [screen,setScreen]=useState("onboard");
  const [oStep,setOStep]=useState(0);
  const [uName,setUName]=useState("");
  const [uPhoto,setUPhoto]=useState(null);
  const [catData,setCatData]=useState({});
  const [lines,setLines]=useState({});
  const [activeCat,setActiveCat]=useState(null);
  const [showKit,setShowKit]=useState(false);
  const [kitQ,setKitQ]=useState("");
  const [kitRes,setKitRes]=useState([]);
  const [kitLoad,setKitLoad]=useState(false);
  const [revIdx,setRevIdx]=useState(0);
  const [milestones,setMilestones]=useState([]);
  const [msText,setMsText]=useState("");
  const [msEmoji,setMsEmoji]=useState("🌟");
  const profRef=useRef();
  const photoRef=useRef();

  function getD(id){return catData[id]||{photos:[],inspo:[]};}
  function getL(id){return lines[id]||["","","","",""];}
  function setD(id,v){setCatData(p=>({...p,[id]:v}));}
  function updateLine(id,i,v){const a=[...getL(id)];a[i]=v;setLines(p=>({...p,[id]:a}));}
  function addPhoto(id,file){const r=new FileReader();r.onload=ev=>{const d=getD(id);setD(id,{...d,photos:[...d.photos,ev.target.result]});};r.readAsDataURL(file);}
  function removePhoto(id,i){const d=getD(id);setD(id,{...d,photos:d.photos.filter((_,pi)=>pi!==i)});}
  function toggleInspo(id,url){const d=getD(id);const has=d.inspo.includes(url);setD(id,{...d,inspo:has?d.inspo.filter(u=>u!==url):[...d.inspo,url]});}
  function addFromKit(id,url){const d=getD(id);if(!d.inspo.includes(url))setD(id,{...d,inspo:[...d.inspo,url]});setShowKit(false);setKitQ("");setKitRes([]);}
  function searchPhotos(){if(!kitQ.trim())return;setKitLoad(true);const r=Array.from({length:9},(_,i)=>`https://source.unsplash.com/300x300/?${encodeURIComponent(kitQ)}&sig=${Date.now()+i}`);setTimeout(()=>{setKitRes(r);setKitLoad(false);},900);}

  const today=new Date().toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
  const hour=new Date().getHours();
  const greeting=hour<12?"morning":hour<17?"afternoon":"evening";
  const dq=QUOTES[new Date().getDate()%QUOTES.length];
  const totalPhotos=Object.values(catData).reduce((s,d)=>s+d.photos.length+d.inspo.length,0);
  const totalWritten=Object.values(lines).reduce((s,arr)=>s+arr.filter(v=>v.trim()).length,0);
  const revCats=CATS.filter(c=>{const d=getD(c.id);const l=getL(c.id);return d.photos.length+d.inspo.length>0||l.some(v=>v.trim());});

  function navTo(v){setShowKit(false);setKitQ("");setKitRes([]);if(v==="review")setRevIdx(0);setScreen(v);}

  // ── ONBOARDING ──────────────────────────────────────────────────────────────
  if(screen==="onboard") return(
    <>
    <style>{BASE}</style>
    <div style={{minHeight:"100vh",background:`linear-gradient(135deg,${BDK},${BL})`,display:"flex",alignItems:"center",justifyContent:"center",padding:24}}>
      <div style={{maxWidth:420,width:"100%"}}>
        {oStep===0&&(
          <div className="fade" style={{textAlign:"center"}}>
            <div style={{fontSize:72,marginBottom:24,animation:"float 3s ease-in-out infinite"}}>✨</div>
            <h1 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(42px,10vw,62px)",fontWeight:700,color:WH,lineHeight:1.05,marginBottom:16}}>Dream Life<br/><em>Manifesto</em></h1>
            <p style={{color:"rgba(255,255,255,.72)",fontSize:15,lineHeight:1.85,maxWidth:320,margin:"0 auto 36px"}}>A portable vision book for manifesting your dream life — always with you, everywhere you go.</p>
            <Btn onClick={()=>setOStep(1)} style={{background:WH,color:BDK,width:"100%",padding:16,fontSize:15,borderRadius:14}}>Begin My Journey →</Btn>
          </div>
        )}
        {oStep===1&&(
          <div className="fade" style={{background:WH,borderRadius:24,padding:32,textAlign:"center"}}>
            <div style={{fontSize:44,marginBottom:16}}>👑</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,marginBottom:6,color:TX}}>What is your name?</h2>
            <p style={{color:MT,fontSize:14,marginBottom:24}}>This manifesto is yours alone.</p>
            <input value={uName} onChange={e=>setUName(e.target.value)} placeholder="Your first name" style={{width:"100%",background:BG,border:`1.5px solid ${BD}`,borderRadius:10,padding:"14px",fontSize:20,textAlign:"center",outline:"none",marginBottom:20,color:TX}}/>
            <Btn onClick={()=>setOStep(2)} disabled={!uName.trim()} style={{background:BDK,color:WH,width:"100%",padding:15,borderRadius:14}}>Continue →</Btn>
          </div>
        )}
        {oStep===2&&(
          <div className="fade" style={{background:WH,borderRadius:24,padding:32,textAlign:"center"}}>
            <div style={{fontSize:44,marginBottom:16}}>📸</div>
            <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,marginBottom:6,color:TX}}>Add your photo</h2>
            <p style={{color:MT,fontSize:14,marginBottom:24}}>The face behind the dream.</p>
            <input type="file" accept="image/*" ref={profRef} onChange={e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=ev=>setUPhoto(ev.target.result);r.readAsDataURL(f);}} style={{display:"none"}}/>
            {uPhoto
              ?<img src={uPhoto} onClick={()=>profRef.current.click()} style={{width:110,height:110,borderRadius:"50%",objectFit:"cover",border:`3px solid ${BDK}`,marginBottom:24,cursor:"pointer"}}/>
              :<div onClick={()=>profRef.current.click()} style={{width:110,height:110,borderRadius:"50%",background:BLT,border:`2px dashed ${BDK}`,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",margin:"0 auto 24px",cursor:"pointer",gap:6}}>
                <span style={{fontSize:30}}>+</span>
                <span style={{fontSize:11,color:BDK,fontWeight:700}}>UPLOAD</span>
              </div>}
            <div style={{display:"flex",gap:10}}>
              <Btn onClick={()=>setScreen("home")} style={{flex:1,background:"transparent",color:MT,border:`1.5px solid ${BD}`}}>Skip</Btn>
              <Btn onClick={()=>setScreen("home")} style={{flex:2,background:BDK,color:WH,padding:15,borderRadius:14}}>Enter My Manifesto ✨</Btn>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );

  // ── CATEGORY EDITOR ─────────────────────────────────────────────────────────
  if(screen==="cat"&&activeCat){
    const cat=activeCat;
    const d=getD(cat.id);
    const l=getL(cat.id);
    const all=[...d.photos,...d.inspo];
    const filled=l.filter(v=>v.trim()).length;
    const pct=Math.round((filled/5)*100);
    if(typeof window!=="undefined")window.scrollTo(0,0);
    return(
      <>
      <style>{BASE}</style>
      <div style={{minHeight:"100vh",background:BG,paddingBottom:40}}>
        <div className="page-wrap">

          {/* ── CATEGORY HEADER ── */}
          <div style={{background:`linear-gradient(160deg,${cat.color}18,${cat.color}04)`,borderBottom:`2px solid ${cat.color}18`,padding:"28px 20px 22px"}}>
            <button onClick={()=>{setScreen("home");setShowKit(false);}} style={{background:"transparent",border:"none",color:MT,cursor:"pointer",fontSize:14,fontWeight:500,marginBottom:18,display:"flex",alignItems:"center",gap:6}}>← Back</button>
            <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:16}}>
              <div style={{width:56,height:56,borderRadius:16,background:`${cat.color}15`,border:`2px solid ${cat.color}25`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:28}}>{cat.emoji}</div>
              <div style={{flex:1}}>
                <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:22,fontWeight:600,color:TX,marginBottom:2}}>{cat.label}</h2>
                <p style={{fontSize:12,color:MT}}>{filled} of 5 written · {pct}% complete</p>
              </div>
              <svg width={52} height={52} style={{transform:"rotate(-90deg)",flexShrink:0}}>
                <circle cx={26} cy={26} r={20} fill="none" stroke={BD} strokeWidth={5}/>
                <circle cx={26} cy={26} r={20} fill="none" stroke={cat.color} strokeWidth={5} strokeDasharray={125.6} strokeDashoffset={125.6-(pct/100)*125.6} strokeLinecap="round" style={{transition:"stroke-dashoffset 1s"}}/>
              </svg>
            </div>
            <div style={{borderLeft:`3px solid ${cat.color}`,paddingLeft:14}}>
              <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:14,color:MT,lineHeight:1.7}}>"{cat.quote}"</p>
              <p style={{fontSize:11,color:cat.color,fontWeight:700,marginTop:4}}>— {cat.author}</p>
            </div>
          </div>

          {/* ── WRITING SECTION ── */}
          <div style={{padding:"24px 20px 0"}}>

            <p style={{fontSize:13,color:MT,lineHeight:1.65,marginBottom:18}}>{cat.instruction}</p>

            {/* Lightbulb tip box */}
            <div style={{background:BLT,borderRadius:12,padding:"12px 14px",marginBottom:22,display:"flex",gap:10,alignItems:"flex-start"}}>
              <span style={{fontSize:18,flexShrink:0}}>💡</span>
              <p style={{fontSize:12,color:BDK,lineHeight:1.65}}>Write in the <strong>present tense</strong> — as if it's already yours. Feel the emotion behind every word.</p>
            </div>

            {/* Guide line — OUTSIDE the box, stands alone above the numbered lines */}
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:17,color:cat.color,fontWeight:600,marginBottom:24,paddingBottom:14,borderBottom:`1.5px dashed ${cat.color}50`}}>
              I am so happy and grateful now that...
            </p>

            {/* 5 numbered blank lines */}
            {[0,1,2,3,4].map(i=>{
              const val=l[i]||"";
              return(
                <div key={i} style={{marginBottom:26,display:"flex",alignItems:"center",gap:14}}>
                  <div style={{width:30,height:30,borderRadius:"50%",flexShrink:0,background:val.trim()?cat.color:BDK,display:"flex",alignItems:"center",justifyContent:"center",transition:"background .25s",boxShadow:`0 2px 8px ${val.trim()?cat.color+"40":BDK+"30"}`}}>
                    <span style={{color:WH,fontSize:13,fontWeight:700}}>{i+1}</span>
                  </div>
                  <input value={val} onChange={e=>updateLine(cat.id,i,e.target.value)}
                    placeholder=""
                    style={{flex:1,background:"transparent",border:"none",borderBottom:`2px solid ${val.trim()?cat.color:BD}`,padding:"10px 4px",fontSize:16,color:TX,outline:"none",transition:"border-color .2s"}}/>
                </div>
              );
            })}

            <Divider/>

            {/* ── PHOTOS SECTION ── */}
            <p style={{fontSize:11,color:BDK,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:4}}>Inspirational Photos</p>
            <p style={{fontSize:13,color:MT,lineHeight:1.6,marginBottom:16}}>{cat.photoLabel}</p>

            <div style={{display:"flex",gap:10,marginBottom:16}}>
              <input type="file" accept="image/*" ref={photoRef} onChange={e=>{if(e.target.files[0])addPhoto(cat.id,e.target.files[0]);e.target.value="";}} style={{display:"none"}}/>
              <Btn onClick={()=>photoRef.current.click()} style={{flex:1,background:BLT,color:BDK,fontSize:13,padding:"11px 12px"}}>📷 Camera Roll</Btn>
              <Btn onClick={()=>setShowKit(s=>!s)} style={{flex:1,background:showKit?BDK:BLT,color:showKit?WH:BDK,fontSize:13,padding:"11px 12px"}}>🔍 Search Photos</Btn>
            </div>

            {/* Search kit */}
            {showKit&&(
              <div className="fade" style={{background:WH,border:`1px solid ${BD}`,borderRadius:16,padding:18,marginBottom:16}}>
                <p style={{fontWeight:700,fontSize:13,color:BDK,marginBottom:12}}>Find inspiration photos</p>
                <div style={{display:"flex",gap:8,marginBottom:14}}>
                  <input value={kitQ} onChange={e=>setKitQ(e.target.value)} onKeyDown={e=>e.key==="Enter"&&searchPhotos()} placeholder={`Search "${cat.label}" photos...`} style={{flex:1,background:BG,border:`1.5px solid ${BD}`,borderRadius:10,padding:"11px 14px",fontSize:14,outline:"none",color:TX}}/>
                  <Btn onClick={searchPhotos} style={{background:BDK,color:WH,padding:"11px 18px",fontSize:14,borderRadius:10}}>{kitLoad?"...":"Go"}</Btn>
                </div>
                {kitRes.length===0&&!kitLoad&&(
                  <>
                  <p style={{fontSize:11,color:MT,marginBottom:10,fontWeight:500}}>Or pick from our collection:</p>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                    {(INSPO[cat.id]||[]).map((url,i)=>(
                      <div key={i} onClick={()=>addFromKit(cat.id,url)} style={{aspectRatio:"1",borderRadius:10,overflow:"hidden",position:"relative",cursor:"pointer",border:`2px solid ${d.inspo.includes(url)?cat.color:"transparent"}`}}>
                        <img src={url} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>
                        {d.inspo.includes(url)&&<div style={{position:"absolute",top:5,right:5,background:cat.color,borderRadius:"50%",width:22,height:22,display:"flex",alignItems:"center",justifyContent:"center"}}><span style={{color:WH,fontSize:11,fontWeight:700}}>✓</span></div>}
                        <div style={{position:"absolute",bottom:4,right:4,background:"rgba(255,255,255,.9)",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700,color:TX}}>+ Add</div>
                      </div>
                    ))}
                  </div>
                  </>
                )}
                {kitRes.length>0&&(
                  <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:8}}>
                    {kitRes.map((url,i)=>(
                      <div key={i} onClick={()=>addFromKit(cat.id,url)} style={{aspectRatio:"1",borderRadius:10,overflow:"hidden",cursor:"pointer",background:BLT,position:"relative"}}>
                        <img src={url} style={{width:"100%",height:"100%",objectFit:"cover"}} alt="" onError={e=>e.target.style.display="none"}/>
                        <div style={{position:"absolute",bottom:4,right:4,background:"rgba(255,255,255,.9)",borderRadius:20,padding:"2px 8px",fontSize:10,fontWeight:700,color:TX}}>+ Add</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {all.length>0&&(
              <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10,marginBottom:20}}>
                {all.map((src,i)=>(
                  <div key={i} style={{aspectRatio:"1",borderRadius:12,overflow:"hidden",position:"relative"}}>
                    <img src={src} style={{width:"100%",height:"100%",objectFit:"cover"}} alt=""/>
                    <button onClick={()=>{if(i<d.photos.length)removePhoto(cat.id,i);else toggleInspo(cat.id,src);}} style={{position:"absolute",top:5,right:5,background:"rgba(0,0,0,.65)",border:"none",color:WH,borderRadius:"50%",width:24,height:24,cursor:"pointer",fontSize:12,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      </>
    );
  }

  // ── DAILY REVIEW ────────────────────────────────────────────────────────────
  if(screen==="review"){
    if(revCats.length===0) return(
      <>
      <style>{BASE}</style>
      <div style={{minHeight:"100vh",background:WH,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:24,textAlign:"center"}}>
        <div style={{fontSize:56,marginBottom:20}}>✨</div>
        <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:28,marginBottom:10,color:TX}}>Your manifesto awaits</h2>
        <p style={{color:MT,marginBottom:28,lineHeight:1.7}}>Write your affirmations or add photos to a category to begin your daily review.</p>
        <Btn onClick={()=>setScreen("home")} style={{background:BDK,color:WH,padding:"14px 28px"}}>Go to Vision Book</Btn>
      </div>
      </>
    );
    const cat=revCats[revIdx];
    const d=getD(cat.id);
    const l=getL(cat.id);
    const bg=[...d.photos,...d.inspo][0];
    const written=l.filter(v=>v.trim());
    return(
      <>
      <style>{BASE+`@keyframes revFade{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}.rev{animation:revFade .5s ease both;}`}</style>
      <div style={{position:"fixed",inset:0,zIndex:300,background:"#0C1A2E"}}>
        <div style={{position:"absolute",inset:0,overflow:"hidden"}}>
          {bg?<img src={bg} style={{width:"100%",height:"100%",objectFit:"cover",filter:"brightness(.28)"}} alt=""/>:<div style={{width:"100%",height:"100%",background:`linear-gradient(135deg,#0C1A2E,${cat.color}35)`}}/>}
          <div style={{position:"absolute",inset:0,background:"linear-gradient(to top,rgba(12,26,46,.97) 40%,rgba(12,26,46,.15) 100%)"}}/>
        </div>
        <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:"rgba(255,255,255,.1)"}}>
          <div style={{height:"100%",background:cat.color,width:`${((revIdx+1)/revCats.length)*100}%`,transition:"width .6s"}}/>
        </div>
        <div style={{position:"relative",zIndex:1,height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"clamp(32px,6vw,56px) clamp(20px,5vw,40px)"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <span style={{color:"rgba(255,255,255,.4)",fontSize:12,letterSpacing:2,textTransform:"uppercase"}}>{revIdx+1} / {revCats.length}</span>
            <button onClick={()=>{setScreen("home");setRevIdx(0);}} style={{background:"rgba(255,255,255,.15)",border:"none",color:WH,borderRadius:"50%",width:38,height:38,cursor:"pointer",fontSize:18,display:"flex",alignItems:"center",justifyContent:"center"}}>✕</button>
          </div>
          <div className="rev">
            <div style={{fontSize:48,marginBottom:16}}>{cat.emoji}</div>
            <p style={{color:cat.color,fontSize:11,letterSpacing:3,textTransform:"uppercase",marginBottom:10,fontWeight:700}}>{cat.label}</p>
            {written.length>0
              ?<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,5vw,38px)",color:WH,lineHeight:1.25,marginBottom:20}}>{written[0]}</h2>
              :<h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(22px,5vw,36px)",color:WH,lineHeight:1.2,marginBottom:20}}>Your {cat.label} vision is taking shape.</h2>}
            {written.slice(1,4).map((v,i)=>(
              <div key={i} style={{display:"flex",gap:10,marginBottom:10,alignItems:"flex-start"}}>
                <div style={{width:6,height:6,borderRadius:"50%",background:cat.color,marginTop:8,flexShrink:0}}/>
                <span style={{color:"rgba(255,255,255,.65)",fontSize:15,lineHeight:1.6}}>{v}</span>
              </div>
            ))}
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:14,color:"rgba(255,255,255,.35)",lineHeight:1.7,marginTop:24}}>"{cat.quote}" — {cat.author}</p>
          </div>
          <div style={{display:"flex",gap:12}}>
            {revIdx>0&&<Btn onClick={()=>setRevIdx(i=>i-1)} style={{flex:1,background:"rgba(255,255,255,.1)",color:WH,border:"1px solid rgba(255,255,255,.2)"}}>← Prev</Btn>}
            {revIdx<revCats.length-1
              ?<Btn onClick={()=>setRevIdx(i=>i+1)} style={{flex:2,background:cat.color,color:WH}}>Next →</Btn>
              :<Btn onClick={()=>{setScreen("home");setRevIdx(0);}} style={{flex:2,background:cat.color,color:WH}}>Complete ✨</Btn>}
          </div>
        </div>
      </div>
      </>
    );
  }

  // ── MILESTONES ──────────────────────────────────────────────────────────────
  if(screen==="milestones") return(
    <>
    <style>{BASE}</style>
    <div style={{minHeight:"100vh",background:BG,paddingBottom:90}}>
      <div className="page-wrap">
        <div style={{background:`linear-gradient(135deg,${BDK},${BL})`,padding:"48px 20px 28px"}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,6vw,38px)",color:WH,fontWeight:600,marginBottom:6}}>Manifestation<br/><em>Milestones</em></h2>
          <p style={{color:"rgba(255,255,255,.65)",fontSize:14,lineHeight:1.6}}>Your proof. Every win recorded here is evidence that manifestation works. Return here to recall your successes and feel the momentum.</p>
        </div>
        <div style={{padding:"20px 20px 0"}}>
          <div style={{background:WH,border:`1px solid ${BD}`,borderRadius:20,padding:22,marginBottom:24,boxShadow:"0 2px 12px rgba(0,0,0,.06)"}}>
            <p style={{fontSize:11,color:BDK,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:14}}>Record a Win</p>
            <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:14}}>
              {MS_EMOJIS.map(e=><button key={e} onClick={()=>setMsEmoji(e)} style={{background:msEmoji===e?BLT:"transparent",border:`1px solid ${msEmoji===e?BDK:BD}`,borderRadius:8,padding:"6px 8px",fontSize:18,cursor:"pointer",transition:"all .15s"}}>{e}</button>)}
            </div>
            <textarea value={msText} onChange={e=>setMsText(e.target.value)} placeholder="I manifested..." rows={3} style={{width:"100%",background:BG,border:`1.5px solid ${BD}`,borderRadius:12,padding:"13px 15px",fontSize:15,color:TX,outline:"none",resize:"none",lineHeight:1.6,marginBottom:14}}/>
            <Btn onClick={()=>{if(!msText.trim())return;setMilestones(m=>[{id:Date.now(),text:msText,emoji:msEmoji,date:new Date().toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"})},...m]);setMsText("");}} disabled={!msText.trim()} style={{width:"100%",background:GD,color:WH,padding:14,borderRadius:12,fontSize:15}}>
              Record This Milestone {msEmoji}
            </Btn>
          </div>
          {milestones.length===0
            ?<div style={{textAlign:"center",padding:"48px 20px",color:MT}}>
              <div style={{fontSize:52,marginBottom:16}}>🌟</div>
              <h3 style={{fontFamily:"'Playfair Display',serif",fontSize:22,marginBottom:8,color:TX}}>Your wins live here</h3>
              <p style={{fontSize:14,lineHeight:1.7}}>Every milestone you record becomes a reminder that your dreams are becoming reality.</p>
            </div>
            :<div style={{display:"flex",flexDirection:"column",gap:12}}>
              {milestones.map((m,i)=>(
                <div key={m.id} className="fade" style={{background:WH,border:`1px solid ${BD}`,borderRadius:16,padding:18,boxShadow:"0 2px 8px rgba(0,0,0,.05)",animationDelay:`${i*.04}s`}}>
                  <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
                    <span style={{fontSize:32,flexShrink:0}}>{m.emoji}</span>
                    <div style={{flex:1}}>
                      <p style={{fontSize:15,lineHeight:1.65,color:TX,marginBottom:6}}>{m.text}</p>
                      <p style={{color:GD,fontSize:11,fontWeight:700,letterSpacing:.5}}>{m.date}</p>
                    </div>
                    <button onClick={()=>setMilestones(ms=>ms.filter(x=>x.id!==m.id))} style={{background:"transparent",border:"none",color:MT,cursor:"pointer",fontSize:16,padding:4}}>✕</button>
                  </div>
                </div>
              ))}
            </div>}
        </div>
      </div>
      <TabBar active={screen} onNav={navTo}/>
    </div>
    </>
  );

  // ── HOW TO ──────────────────────────────────────────────────────────────────
  if(screen==="howto") return(
    <>
    <style>{BASE}</style>
    <div style={{minHeight:"100vh",background:BG,paddingBottom:90}}>
      <div className="page-wrap">
        <div style={{background:`linear-gradient(135deg,${BDK},${BL})`,padding:"48px 20px 28px"}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,6vw,38px)",color:WH,fontWeight:600,marginBottom:6}}>How To Use<br/><em>This Book</em></h2>
          <p style={{color:"rgba(255,255,255,.65)",fontSize:14,lineHeight:1.6}}>Follow these steps to make the most of your Dream Life Manifesto.</p>
        </div>
        <div style={{padding:"24px 20px 0"}}>
          {[
            {n:"1",title:"Set aside dedicated time",color:BDK,body:"Find a quiet and comfortable space where you can engage with the book without distractions. Set aside a specific time each day — morning works best."},
            {n:"2",title:"Get clear on your intentions",color:"#8B5CF6",body:"Clarify what you desire. What areas of your life do you want to transform? Be specific and authentic in identifying your true aspirations."},
            {n:"3",title:"Explore the categories",color:"#D4962A",body:"This book has 9 categories representing every significant area of your life. Explore each one, read the instruction, and reflect on how you envision your ideal future."},
            {n:"4",title:"Write in the present tense",color:"#EF4444",body:"Write as if your dreams are already true. 'I am so happy and grateful now that...' and complete the sentence. Feel the emotion behind every word."},
            {n:"5",title:"Add your vision photos",color:"#10B981",body:"Upload photos from your camera roll or search our free library for images that represent your dream life. Your vision comes to life visually."},
            {n:"6",title:"Do your daily review",color:"#06B6D4",body:"Tap the Review button daily and watch your dreams play in cinematic mode. This daily practice of seeing and feeling your dreams is what activates manifestation."},
            {n:"7",title:"Celebrate your milestones",color:"#F59E0B",body:"As you achieve your goals, head to the Milestones section and record every win. Over time this becomes your evidence that manifestation works."},
            {n:"8",title:"Regularly review and revise",color:"#6366F1",body:"Revisit your vision book regularly to update your goals and track your progress. Stay open to new insights and opportunities along the way."},
            {n:"9",title:"Trust the process",color:"#84CC16",body:"Manifestation is a journey. Trust the process, have faith in your visions, and believe in your ability to create the life you desire."},
          ].map(({n,title,color,body})=>(
            <div key={n} style={{background:WH,border:`1px solid ${BD}`,borderRadius:16,padding:20,marginBottom:14,display:"flex",gap:16,alignItems:"flex-start",boxShadow:"0 2px 8px rgba(0,0,0,.04)"}}>
              <div style={{width:36,height:36,borderRadius:12,background:color,color:WH,fontSize:16,fontWeight:800,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{n}</div>
              <div>
                <p style={{fontWeight:700,fontSize:15,color:color,marginBottom:6}}>{title}</p>
                <p style={{fontSize:13,color:MT,lineHeight:1.75}}>{body}</p>
              </div>
            </div>
          ))}
          <div style={{background:`linear-gradient(135deg,${BDK},${BL})`,borderRadius:20,padding:24,marginTop:8,marginBottom:24,textAlign:"center"}}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:17,color:WH,lineHeight:1.75,marginBottom:10}}>"Now, take a deep breath, open your heart, and begin this empowering journey of self-discovery, creation, and manifestation."</p>
            <p style={{color:"rgba(255,255,255,.55)",fontSize:13,fontWeight:600}}>— Dream Life Manifesto</p>
          </div>
        </div>
      </div>
      <TabBar active={screen} onNav={navTo}/>
    </div>
    </>
  );

  // ── INSTALL ──────────────────────────────────────────────────────────────────
  if(screen==="install") return(
    <>
    <style>{BASE}</style>
    <div style={{minHeight:"100vh",background:BG,paddingBottom:90}}>
      <div className="page-wrap">
        <div style={{background:`linear-gradient(135deg,${BDK},${BL})`,padding:"48px 20px 28px"}}>
          <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(26px,6vw,36px)",color:WH,fontWeight:600}}>Add to Home Screen</h2>
          <p style={{color:"rgba(255,255,255,.65)",fontSize:14,marginTop:6}}>Install like a real app. No App Store needed.</p>
        </div>
        <div style={{padding:"24px 20px"}}>
          {[
            {label:"🍎 iPhone / iPad — Use Safari",color:BDK,steps:["Open this link in Safari (not Chrome)","Tap the Share icon at the bottom — box with arrow pointing up","Scroll down and tap Add to Home Screen","Tap Add in the top right corner","Dream Life Manifesto appears on your home screen"]},
            {label:"🤖 Android — Use Chrome",color:"#34A853",steps:["Open this link in Chrome","Tap the 3-dot menu at the top right","Tap Add to Home screen","Tap Add to confirm","Dream Life Manifesto appears on your home screen"]},
          ].map(({label,color,steps})=>(
            <div key={label} style={{marginBottom:28}}>
              <div style={{background:color,borderRadius:12,padding:"12px 18px",marginBottom:12}}><span style={{color:WH,fontWeight:700,fontSize:14}}>{label}</span></div>
              {steps.map((s,i)=>(
                <div key={i} style={{background:WH,border:`1px solid ${BD}`,borderRadius:12,padding:"14px 16px",marginBottom:8,display:"flex",gap:14,alignItems:"flex-start"}}>
                  <div style={{width:28,height:28,borderRadius:"50%",background:color,color:WH,fontSize:13,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>{i+1}</div>
                  <p style={{fontSize:14,lineHeight:1.65,color:TX}}>{s}</p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <TabBar active={screen} onNav={navTo}/>
    </div>
    </>
  );

  // ── HOME ─────────────────────────────────────────────────────────────────────
  return(
    <>
    <style>{BASE}</style>
    <div style={{minHeight:"100vh",background:BG,paddingBottom:90}}>
      <div className="page-wrap">
        <div style={{background:`linear-gradient(135deg,${BDK},${BL})`,padding:"48px 20px 28px"}}>
          <div style={{display:"flex",alignItems:"center",gap:14,marginBottom:18}}>
            {uPhoto
              ?<img src={uPhoto} style={{width:56,height:56,borderRadius:"50%",objectFit:"cover",border:"3px solid rgba(255,255,255,.6)"}} alt=""/>
              :<div style={{width:56,height:56,borderRadius:"50%",background:"rgba(255,255,255,.2)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:26}}>✨</div>}
            <div>
              <p style={{color:"rgba(255,255,255,.55)",fontSize:12,marginBottom:2}}>{today}</p>
              <h2 style={{fontFamily:"'Playfair Display',serif",fontSize:"clamp(18px,4vw,24px)",color:WH,lineHeight:1.15}}>Good {greeting}, <em>{uName}</em></h2>
            </div>
          </div>
          <div style={{background:"rgba(255,255,255,.13)",borderRadius:16,padding:"16px 18px",marginBottom:18,backdropFilter:"blur(6px)"}}>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:14,color:"rgba(255,255,255,.92)",lineHeight:1.75,marginBottom:6}}>"{dq.q}"</p>
            <p style={{fontSize:11,color:"rgba(255,255,255,.5)",fontWeight:700,letterSpacing:.5}}>— {dq.a}</p>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:10}}>
            {[[totalPhotos,"Photos"],[totalWritten,"Written"],[milestones.length,"Manifested"]].map(([v,l])=>(
              <div key={l} style={{background:"rgba(255,255,255,.15)",borderRadius:14,padding:"12px 8px",textAlign:"center"}}>
                <div style={{fontFamily:"'Playfair Display',serif",fontSize:24,color:WH,fontWeight:600,lineHeight:1}}>{v}</div>
                <div style={{fontSize:10,color:"rgba(255,255,255,.6)",marginTop:5,letterSpacing:.5,textTransform:"uppercase",fontWeight:600}}>{l}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{padding:"18px 20px 0"}}>
          <Btn onClick={()=>{setRevIdx(0);setScreen("review");}} style={{width:"100%",padding:16,fontSize:15,background:GD,color:WH,borderRadius:14,marginBottom:6}}>▶ Start Daily Review</Btn>
          <p style={{textAlign:"center",color:MT,fontSize:12,marginBottom:24}}>Review your vision in cinematic mode</p>
          <p style={{fontSize:11,color:BDK,fontWeight:700,letterSpacing:1.5,textTransform:"uppercase",marginBottom:8}}>Your Vision Book</p>
          <p style={{fontSize:13,color:MT,marginBottom:16,lineHeight:1.5}}>Tap any category to write your affirmations and add your vision photos.</p>
          <div className="cat-grid" style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14,marginBottom:8}}>
            {CATS.map(cat=>{
              const d=getD(cat.id);
              const l=getL(cat.id);
              const pc=d.photos.length+d.inspo.length;
              const wc=l.filter(v=>v.trim()).length;
              const pct=Math.round((wc/5)*100);
              const cover=d.photos[0]||d.inspo[0];
              return(
                <div key={cat.id} className="card-hover" onClick={()=>{setActiveCat(cat);setScreen("cat");}} style={{background:WH,border:`1.5px solid ${BD}`,borderRadius:20,overflow:"hidden",position:"relative",minHeight:150,boxShadow:"0 2px 10px rgba(0,0,0,.05)"}}>
                  {cover&&<img src={cover} style={{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",filter:"brightness(.27)"}} alt=""/>}
                  <div style={{position:"absolute",top:0,left:0,right:0,height:3,background:cat.color}}/>
                  <div style={{position:"relative",zIndex:1,padding:"18px 16px 16px"}}>
                    <div style={{fontSize:30,marginBottom:10}}>{cat.emoji}</div>
                    <div style={{fontFamily:"'Playfair Display',serif",fontSize:15,fontWeight:600,lineHeight:1.3,marginBottom:8,color:cover?WH:TX}}>{cat.label}</div>
                    <div style={{display:"flex",gap:8,marginBottom:10,flexWrap:"wrap"}}>
                      <span style={{fontSize:11,color:cover?"rgba(255,255,255,.55)":MT}}>{pc} photos</span>
                      <span style={{fontSize:11,color:cover?"rgba(255,255,255,.55)":MT}}>{wc}/5 written</span>
                    </div>
                    <div style={{height:3,borderRadius:2,background:cover?"rgba(255,255,255,.2)":BD}}>
                      <div style={{height:"100%",width:`${pct}%`,background:cat.color,borderRadius:2,transition:"width .5s"}}/>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{textAlign:"center",padding:"36px 0 0"}}>
            <div style={{height:1,background:BD,marginBottom:24}}/>
            <p style={{fontFamily:"'Playfair Display',serif",fontStyle:"italic",fontSize:16,color:MT,lineHeight:1.85}}>"Your dreams are the blueprint.<br/>Your actions are the construction."</p>
            <p style={{color:GD,fontSize:12,fontWeight:700,marginTop:10}}>— Andre Knight</p>
            <p style={{color:MT,fontSize:11,marginTop:18}}>Dream Life Manifesto · dreamlifemanifesto.com</p>
          </div>
        </div>
      </div>
      <TabBar active={screen} onNav={navTo}/>
    </div>
    </>
  );
}
