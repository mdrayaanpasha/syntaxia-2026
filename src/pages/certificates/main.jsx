import { useState, useRef, useEffect } from "react";

const EVENTS = [
  "BGMI Wars",
  "Valorant",
  "Flag Fest",
  "Redstone Run",
  "Minecraft Murder Files",
  "Steve's Trial",
  "IPL Auction",
  "Weeb Wars",
  "Mine Your Way Out",
  "Business Revival",
  "Craft The Scene",
];

const CERT_DATE = "2nd & 3rd March 2026";
const SJU_LOGO = "https://ik.imagekit.io/yylpuqff5/St%20Joseph's%20University%20Emblem.png";
const CYBER_LOGO = "https://ik.imagekit.io/yylpuqff5/logo-cybernetics.jpg";

function generateCertID(name, event) {
  const hash = [...(name + event + "SYN2026")].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 0x5A26);
  return `SYN26-${Math.abs(hash).toString(16).toUpperCase().padStart(6, "0")}`;
}

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => resolve(img);
    img.onerror = () => resolve(null);
    img.src = src + "?tr=w-200";
  });
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y); ctx.arcTo(x+w, y, x+w, y+r, r);
  ctx.lineTo(x + w, y + h - r); ctx.arcTo(x+w, y+h, x+w-r, y+h, r);
  ctx.lineTo(x + r, y + h); ctx.arcTo(x, y+h, x, y+h-r, r);
  ctx.lineTo(x, y + r); ctx.arcTo(x, y, x+r, y, r);
  ctx.closePath();
}

function drawCircularImage(ctx, img, cx, cy, r) {
  ctx.save();
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip();
  ctx.drawImage(img, cx - r, cy - r, r * 2, r * 2);
  ctx.restore();
  ctx.strokeStyle = "rgba(0,255,180,0.4)";
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
}

async function drawCertificate(canvas, name, event, certId) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width, H = canvas.height;

  const [sjuImg, cyberImg] = await Promise.all([loadImage(SJU_LOGO), loadImage(CYBER_LOGO)]);

  // ── BG ──
  ctx.fillStyle = "#06060e";
  ctx.fillRect(0, 0, W, H);

  const radial = ctx.createRadialGradient(W/2, H*0.4, 0, W/2, H*0.4, W*0.65);
  radial.addColorStop(0, "rgba(0,255,180,0.055)");
  radial.addColorStop(1, "transparent");
  ctx.fillStyle = radial; ctx.fillRect(0, 0, W, H);

  // dot grid
  ctx.fillStyle = "rgba(0,255,180,0.045)";
  for (let x = 44; x < W; x += 44)
    for (let y = 44; y < H; y += 44) {
      ctx.beginPath(); ctx.arc(x, y, 1, 0, Math.PI*2); ctx.fill();
    }

  // ── BORDERS ──
  const bg = ctx.createLinearGradient(0,0,W,H);
  bg.addColorStop(0,"rgba(0,255,180,0.75)"); bg.addColorStop(0.5,"rgba(0,180,255,0.55)"); bg.addColorStop(1,"rgba(0,255,180,0.75)");
  ctx.strokeStyle = bg; ctx.lineWidth = 2;
  roundRect(ctx, 20, 20, W-40, H-40, 7); ctx.stroke();
  ctx.strokeStyle = "rgba(0,255,180,0.07)"; ctx.lineWidth = 1;
  roundRect(ctx, 30, 30, W-60, H-60, 5); ctx.stroke();

  // corner accents
  [[20,20],[W-20,20],[20,H-20],[W-20,H-20]].forEach(([cx,cy], i) => {
    const sx = i%2===0?1:-1, sy = i<2?1:-1;
    ctx.strokeStyle="#00ffb4"; ctx.lineWidth=2;
    ctx.beginPath(); ctx.moveTo(cx+sx*30,cy); ctx.lineTo(cx,cy); ctx.lineTo(cx,cy+sy*30); ctx.stroke();
    ctx.fillStyle="#00ffb4"; ctx.beginPath(); ctx.arc(cx+sx*7,cy+sy*7,2.5,0,Math.PI*2); ctx.fill();
  });

  // ── HEADER BAND ──
  const hb = ctx.createLinearGradient(0,38,0,175);
  hb.addColorStop(0,"rgba(0,255,180,0.07)"); hb.addColorStop(1,"transparent");
  ctx.fillStyle=hb; ctx.fillRect(31,38,W-62,137);

  // ── LOGOS — well inside border, symmetrical ──
  const logoR = 42;
  const logoCY = 92;
  if (sjuImg)   drawCircularImage(ctx, sjuImg,   75 + logoR,    logoCY, logoR);
  if (cyberImg) drawCircularImage(ctx, cyberImg, W - 75 - logoR, logoCY, logoR);

  // ── INSTITUTION ──
  ctx.textAlign = "center";
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = `${Math.round(W*0.017)}px Georgia, serif`;
  ctx.fillText("St. Joseph's University, Bengaluru", W/2, 138);
  ctx.fillStyle = "rgba(0,255,180,0.42)";
  ctx.font = `${Math.round(W*0.013)}px 'Courier New', monospace`;
  ctx.fillText("Department of Computer Science, School of IT", W/2, 158);

  // ── SYNTAXIA 2026 ──
  ctx.shadowColor = "rgba(0,255,180,0.55)"; ctx.shadowBlur = 30;
  ctx.fillStyle = "#00ffb4";
  ctx.font = `bold ${Math.round(W*0.068)}px 'Courier New', monospace`;
  ctx.fillText("SYNTAXIA 2026", W/2, 214);
  ctx.shadowBlur = 0;

  // glow line
  const gl = ctx.createLinearGradient(80,0,W-80,0);
  gl.addColorStop(0,"transparent"); gl.addColorStop(0.35,"#00ffb4"); gl.addColorStop(0.65,"#00b4ff"); gl.addColorStop(1,"transparent");
  ctx.strokeStyle=gl; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(80,228); ctx.lineTo(W-80,228); ctx.stroke();

  ctx.fillStyle="rgba(0,180,255,0.52)";
  ctx.font=`${Math.round(W*0.015)}px 'Courier New', monospace`;
  ctx.fillText("NATIONAL-LEVEL INTER-COLLEGE TECH FEST", W/2, 248);

  // ── CERT LABEL ──
  ctx.fillStyle="rgba(255,255,255,0.3)";
  ctx.font=`${Math.round(W*0.02)}px Georgia, serif`;
  ctx.fillText("CERTIFICATE OF PARTICIPATION", W/2, 284);

  for (let i=-5;i<=5;i++) {
    ctx.fillStyle = i===0?"#00ffb4":"rgba(0,255,180,0.3)";
    ctx.beginPath(); ctx.arc(W/2+i*15,304,i===0?3:1.5,0,Math.PI*2); ctx.fill();
  }

  // ── THIS IS TO CERTIFY ──
  ctx.fillStyle="rgba(255,255,255,0.32)";
  ctx.font=`italic ${Math.round(W*0.019)}px Georgia, serif`;
  ctx.fillText("This is to certify that", W/2, 340);

  // ── NAME ──
  ctx.shadowColor="rgba(255,255,255,0.12)"; ctx.shadowBlur=10;
  ctx.fillStyle="#ffffff";
  ctx.font=`bold ${Math.round(W*0.052)}px Georgia, serif`;
  ctx.fillText(name.toUpperCase(), W/2, 394);
  ctx.shadowBlur=0;

  const nw = ctx.measureText(name.toUpperCase()).width;
  const nl = ctx.createLinearGradient(W/2-nw/2,0,W/2+nw/2,0);
  nl.addColorStop(0,"transparent"); nl.addColorStop(0.5,"#00ffb4"); nl.addColorStop(1,"transparent");
  ctx.strokeStyle=nl; ctx.lineWidth=1.5;
  ctx.beginPath(); ctx.moveTo(W/2-nw/2,406); ctx.lineTo(W/2+nw/2,406); ctx.stroke();

  // ── PARTICIPATED IN ──
  ctx.fillStyle="rgba(255,255,255,0.32)";
  ctx.font=`italic ${Math.round(W*0.019)}px Georgia, serif`;
  ctx.fillText("has successfully participated in", W/2, 440);

  // ── EVENT ──
  ctx.shadowColor="rgba(0,255,180,0.45)"; ctx.shadowBlur=14;
  ctx.fillStyle="#00ffb4";
  ctx.font=`bold ${Math.round(W*0.034)}px 'Courier New', monospace`;
  ctx.fillText(event.toUpperCase(), W/2, 478);
  ctx.shadowBlur=0;

  ctx.fillStyle="rgba(0,180,255,0.58)";
  ctx.font=`${Math.round(W*0.015)}px 'Courier New', monospace`;
  ctx.fillText(`[ ${CERT_DATE} ]`, W/2, 504);

  // ── BOTTOM ──
  ctx.strokeStyle="rgba(0,255,180,0.1)"; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(50,H-98); ctx.lineTo(W-50,H-98); ctx.stroke();

  ctx.textAlign="left";
  ctx.fillStyle="rgba(0,255,180,0.38)";
  ctx.font=`${Math.round(W*0.013)}px 'Courier New', monospace`;
  ctx.fillText(`CERT ID: ${certId}`, 58, H-68);
  ctx.fillStyle="rgba(0,180,255,0.38)";
  ctx.fillText("syntaxia-2026.vercel.app", 58, H-46);

  ctx.textAlign="right";
  ctx.fillStyle="rgba(255,255,255,0.28)";
  ctx.font=`italic ${Math.round(W*0.015)}px Georgia, serif`;
  ctx.fillText("Cybernetics Association", W-58, H-68);
  ctx.strokeStyle="rgba(255,255,255,0.12)"; ctx.lineWidth=1;
  ctx.beginPath(); ctx.moveTo(W-235,H-76); ctx.lineTo(W-58,H-76); ctx.stroke();
  ctx.fillStyle="rgba(255,255,255,0.18)";
  ctx.font=`${Math.round(W*0.013)}px Georgia, serif`;
  ctx.fillText("Authorized Signatory", W-58, H-46);

  ctx.textAlign="center";
  ctx.fillStyle="rgba(0,255,180,0.15)";
  ctx.font=`italic ${Math.round(W*0.014)}px Georgia, serif`;
  ctx.fillText("Unite. Innovate. Celebrate.", W/2, H-46);
}

// ── Verification log lines ──
const VERIFY_STEPS = [
  { ms: 0,    text: "Initializing secure connection..." },
  { ms: 420,  text: "Authenticating participant database..." },
  { ms: 900,  text: "Verifying event registration records..." },
  { ms: 1400, text: "Cross-referencing participant name..." },
  { ms: 1900, text: "Validating event participation..." },
  { ms: 2350, text: "Generating certificate hash..." },
  { ms: 2700, text: "Compiling certificate assets..." },
  { ms: 3000, text: null }, // done → trigger draw
];

export default function App() {
  const [name, setName] = useState("");
  const [event, setEvent] = useState("");
  const [stage, setStage] = useState("form"); // form | verifying | cert
  const [certId, setCertId] = useState("");
  const [logLines, setLogLines] = useState([]);
  const [drawing, setDrawing] = useState(false);
  const canvasRef = useRef(null);
  const T = { fontFamily: "'Courier New', monospace" };

  const handleGenerate = () => {
    if (!name.trim() || !event) return;
    const id = generateCertID(name.trim(), event);
    setCertId(id);
    setLogLines([]);
    setStage("verifying");

    VERIFY_STEPS.forEach(({ ms, text }) => {
      setTimeout(() => {
        if (text) {
          setLogLines(l => [...l, text]);
        } else {
          setStage("cert");
          setDrawing(true);
        }
      }, ms);
    });
  };

  useEffect(() => {
    if (stage === "cert" && canvasRef.current && drawing) {
      drawCertificate(canvasRef.current, name.trim(), event, certId)
        .then(() => setDrawing(false));
    }
  }, [stage, drawing]);

  const handleDownload = () => {
    const link = document.createElement("a");
    link.download = `Syntaxia2026_${name.replace(/\s+/g, "_")}_${event.replace(/\s+/g, "_")}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  const handleReset = () => { setStage("form"); setName(""); setEvent(""); setCertId(""); setLogLines([]); setDrawing(false); };

  const ready = name.trim() && event;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12"
      style={{ background:"radial-gradient(ellipse at 50% 0%,rgba(0,255,180,0.07) 0%,#06060e 55%)", ...T }}>

      {/* scanlines */}
      <div style={{ position:"fixed",inset:0,pointerEvents:"none",zIndex:0,
        background:"repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,0,0,0.03) 3px,rgba(0,0,0,0.03) 4px)" }} />

      <div className="relative z-10 w-full" style={{ maxWidth:"680px" }}>

        {/* ── HEADER ── */}
        <div className="text-center mb-8">
          <div style={{ display:"flex",justifyContent:"center",gap:"16px",marginBottom:"14px",alignItems:"center" }}>
            <img src={SJU_LOGO} alt="SJU"
              style={{ width:"52px",height:"52px",borderRadius:"50%",border:"1px solid rgba(0,255,180,0.3)",objectFit:"cover" }} />
            <div>
              <div style={{ color:"rgba(255,255,255,0.32)",fontSize:"10px",letterSpacing:"0.28em",marginBottom:"4px" }}>
                ST. JOSEPH'S UNIVERSITY · BENGALURU
              </div>
              <div style={{ color:"#00ffb4",fontSize:"clamp(22px,5vw,36px)",fontWeight:"bold",
                letterSpacing:"0.12em",textShadow:"0 0 28px rgba(0,255,180,0.45)",lineHeight:1 }}>
                SYNTAXIA 2026
              </div>
              <div style={{ color:"rgba(0,180,255,0.52)",fontSize:"10px",letterSpacing:"0.2em",marginTop:"4px" }}>
                NATIONAL-LEVEL INTER-COLLEGE TECH FEST
              </div>
            </div>
            <img src={CYBER_LOGO} alt="Cybernetics"
              style={{ width:"52px",height:"52px",borderRadius:"50%",border:"1px solid rgba(0,255,180,0.3)",objectFit:"cover" }} />
          </div>
          <div style={{ width:"80px",height:"1px",background:"linear-gradient(90deg,transparent,#00ffb4,transparent)",margin:"0 auto" }} />
          <div style={{ color:"rgba(255,255,255,0.18)",fontSize:"11px",marginTop:"10px",letterSpacing:"0.15em" }}>
            E-CERTIFICATE PORTAL  ·  2ND & 3RD MARCH 2026
          </div>
        </div>

        {/* ── CARD ── */}
        <div style={{ background:"rgba(0,255,180,0.025)",border:"1px solid rgba(0,255,180,0.13)",
          borderRadius:"4px",padding:"clamp(24px,5vw,40px)" }}>

          {/* FORM */}
          {stage === "form" && (
            <div style={{ display:"flex",flexDirection:"column",gap:"20px" }}>
              <div>
                <label style={{ color:"rgba(0,255,180,0.6)",fontSize:"11px",letterSpacing:"0.2em",display:"block",marginBottom:"8px" }}>
                  PARTICIPANT NAME
                </label>
                <input type="text" value={name}
                  onChange={e => setName(e.target.value)}
                  onKeyDown={e => e.key==="Enter" && ready && handleGenerate()}
                  placeholder="Enter your full name"
                  style={{ width:"100%",boxSizing:"border-box",background:"rgba(0,0,0,0.4)",
                    border:"1px solid rgba(0,255,180,0.2)",borderRadius:"3px",padding:"13px 16px",
                    color:"#fff",fontSize:"15px",outline:"none",fontFamily:"Georgia,serif",transition:"border-color 0.2s" }}
                  onFocus={e=>e.target.style.borderColor="rgba(0,255,180,0.6)"}
                  onBlur={e=>e.target.style.borderColor="rgba(0,255,180,0.2)"} />
              </div>

              <div>
                <label style={{ color:"rgba(0,255,180,0.6)",fontSize:"11px",letterSpacing:"0.2em",display:"block",marginBottom:"8px" }}>
                  EVENT
                </label>
                <select value={event} onChange={e=>setEvent(e.target.value)}
                  style={{ width:"100%",boxSizing:"border-box",background:"rgba(0,0,0,0.6)",
                    border:"1px solid rgba(0,255,180,0.2)",borderRadius:"3px",padding:"13px 16px",
                    color:event?"#fff":"rgba(255,255,255,0.3)",fontSize:"14px",outline:"none",...T,
                    cursor:"pointer",appearance:"none",
                    backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='7'%3E%3Cpath d='M0 0l5 7 5-7z' fill='rgba(0,255,180,0.5)'/%3E%3C/svg%3E")`,
                    backgroundRepeat:"no-repeat",backgroundPosition:"right 16px center" }}>
                  <option value="" disabled style={{ background:"#06060e" }}>Select your event</option>
                  {EVENTS.map(ev=><option key={ev} value={ev} style={{ background:"#06060e" }}>{ev}</option>)}
                </select>
              </div>

              <button onClick={handleGenerate} disabled={!ready}
                style={{ width:"100%",padding:"14px",
                  background:ready?"rgba(0,255,180,0.1)":"rgba(0,255,180,0.02)",
                  border:`1px solid ${ready?"#00ffb4":"rgba(0,255,180,0.1)"}`,
                  color:ready?"#00ffb4":"rgba(0,255,180,0.22)",
                  fontSize:"13px",letterSpacing:"0.25em",cursor:ready?"pointer":"not-allowed",
                  borderRadius:"3px",transition:"all 0.2s",...T,fontWeight:"bold" }}
                onMouseEnter={e=>{ if(ready){ e.currentTarget.style.background="rgba(0,255,180,0.18)"; e.currentTarget.style.boxShadow="0 0 24px rgba(0,255,180,0.2)"; }}}
                onMouseLeave={e=>{ e.currentTarget.style.background=ready?"rgba(0,255,180,0.1)":"rgba(0,255,180,0.02)"; e.currentTarget.style.boxShadow="none"; }}>
                GENERATE CERTIFICATE →
              </button>

              <div style={{ textAlign:"center",color:"rgba(255,255,255,0.15)",fontSize:"11px",letterSpacing:"0.1em",marginTop:"-4px" }}>
                unite. innovate. celebrate.
              </div>
            </div>
          )}

          {/* VERIFYING */}
          {stage === "verifying" && (
            <div style={{ padding:"10px 0" }}>
              <div style={{ color:"rgba(0,255,180,0.5)",fontSize:"11px",letterSpacing:"0.25em",marginBottom:"20px" }}>
                VERIFYING DETAILS FROM SERVER
              </div>

              {/* progress bar */}
              <div style={{ height:"2px",background:"rgba(0,255,180,0.1)",borderRadius:"2px",marginBottom:"24px",overflow:"hidden" }}>
                <div style={{
                  height:"100%",borderRadius:"2px",
                  background:"linear-gradient(90deg,#00ffb4,#00b4ff)",
                  width:`${Math.min(100, (logLines.length / (VERIFY_STEPS.length-1))*100)}%`,
                  transition:"width 0.4s ease",
                  boxShadow:"0 0 10px rgba(0,255,180,0.5)"
                }} />
              </div>

              {/* terminal log */}
              <div style={{ background:"rgba(0,0,0,0.5)",border:"1px solid rgba(0,255,180,0.1)",
                borderRadius:"3px",padding:"16px 18px",minHeight:"160px" }}>
                {logLines.map((line, i) => (
                  <div key={i} style={{ display:"flex",alignItems:"center",gap:"10px",marginBottom:"10px",
                    opacity: i === logLines.length-1 ? 1 : 0.45, transition:"opacity 0.3s" }}>
                    <span style={{ color:"#00ffb4",fontSize:"11px" }}>▸</span>
                    <span style={{ color: i===logLines.length-1?"rgba(0,255,180,0.9)":"rgba(255,255,255,0.5)",
                      fontSize:"13px",letterSpacing:"0.05em" }}>{line}</span>
                    {i === logLines.length-1 && (
                      <span style={{ color:"#00ffb4",fontSize:"14px",animation:"blink 0.8s step-end infinite" }}>_</span>
                    )}
                  </div>
                ))}
              </div>

              <div style={{ color:"rgba(255,255,255,0.18)",fontSize:"11px",textAlign:"center",marginTop:"16px",letterSpacing:"0.1em" }}>
                DO NOT CLOSE THIS WINDOW
              </div>

              <style>{`@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }`}</style>
            </div>
          )}

          {/* CERTIFICATE */}
          {stage === "cert" && (
            <div>
              {drawing && (
                <div style={{ textAlign:"center",color:"rgba(0,255,180,0.4)",padding:"60px 0",fontSize:"13px",letterSpacing:"0.25em" }}>
                  RENDERING...
                </div>
              )}
              <canvas ref={canvasRef} width={1000} height={640}
                style={{ width:"100%",borderRadius:"3px",display:drawing?"none":"block",
                  border:"1px solid rgba(0,255,180,0.18)" }} />

              {!drawing && (
                <>
                  <div style={{ display:"flex",gap:"10px",marginTop:"14px" }}>
                    <button onClick={handleDownload}
                      style={{ flex:2,padding:"14px",background:"rgba(0,255,180,0.1)",
                        border:"1px solid #00ffb4",color:"#00ffb4",fontSize:"13px",letterSpacing:"0.2em",
                        cursor:"pointer",borderRadius:"3px",...T,fontWeight:"bold",transition:"all 0.2s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.background="rgba(0,255,180,0.2)"; e.currentTarget.style.boxShadow="0 0 24px rgba(0,255,180,0.2)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.background="rgba(0,255,180,0.1)"; e.currentTarget.style.boxShadow="none"; }}>
                      ↓ DOWNLOAD PNG
                    </button>
                    <button onClick={handleReset}
                      style={{ flex:1,padding:"14px",background:"transparent",
                        border:"1px solid rgba(255,255,255,0.1)",color:"rgba(255,255,255,0.35)",
                        fontSize:"13px",letterSpacing:"0.15em",cursor:"pointer",borderRadius:"3px",...T,transition:"all 0.2s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.3)"; e.currentTarget.style.color="rgba(255,255,255,0.6)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.borderColor="rgba(255,255,255,0.1)"; e.currentTarget.style.color="rgba(255,255,255,0.35)"; }}>
                      ← NEW
                    </button>
                  </div>
                  <div style={{ color:"rgba(0,255,180,0.28)",fontSize:"11px",textAlign:"center",marginTop:"10px",letterSpacing:"0.1em" }}>
                    CERT ID: {certId}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div style={{ textAlign:"center",marginTop:"18px",color:"rgba(255,255,255,0.12)",fontSize:"11px",letterSpacing:"0.1em" }}>
          syntaxia-2026.vercel.app  ·  Cybernetics Association  ·  St. Joseph's University
        </div>
      </div>
    </div>
  );
}