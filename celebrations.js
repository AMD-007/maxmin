// ============================================================
// MAXMIN CELEBRATIONS ENGINE v6.0 — PRODUCTION
// Auto date detection · vx.mp4 · mx-x.png
// ============================================================
// Update RAYA_DATES every year!
// ============================================================
(function(){
'use strict';

// ─── RAYA DATES — UPDATE EVERY YEAR ─────────────────────
const RAYA_DATES      = ['2026-03-19','2026-03-20','2026-03-21'];
const RAYA_HAJI_DATES = ['2026-05-27','2026-05-28'];

const FIXED_DAYS = {
  '01-01':'newyear',
  '03-18':'birthday',
  '08-31':'merdeka',
  '09-16':'malaysia',
  '12-25':'christmas',
  '12-31':'newyear',
};

function getTodayTheme(){
  // Use Malaysia timezone (UTC+8) to get correct date
  const now    = new Date();
  const offset = 8 * 60; // Malaysia = UTC+8
  const local  = new Date(now.getTime() + (offset - now.getTimezoneOffset()) * 60000);
  const mmdd   = String(local.getMonth()+1).padStart(2,'0')+'-'+String(local.getDate()).padStart(2,'0');
  const full   = local.toISOString().split('T')[0];
  if(RAYA_DATES.includes(full))       return 'raya';
  if(RAYA_HAJI_DATES.includes(full))  return 'raya';
  return FIXED_DAYS[mmdd]||null;
}

const TODAY_THEME = getTodayTheme();
if(!TODAY_THEME) return;

// ─── THEMES ──────────────────────────────────────────────
const THEMES={
  birthday:{
    tag:'ULANG TAHUN MAXMIN',
    headline:'HAPPY BIRTHDAY',
    sub:'Ulang Tahun Berkhidmat untuk Perniagaan Terengganu, Malaysia',
    cta:'JEMPUT MASUK',
    tint:'rgba(60,0,30,.60)',
    vidFilter:'hue-rotate(280deg) saturate(1.8) brightness(.55)',
    c1:'#FF3CAC',c2:'#FFD700',c3:'#9B59B6',
    glow:'255,60,172',
    emojis:['🎂','🎉','🎊','🎈','🎁','✨','🌟','💫','🥳','🎀','🎶','💝'],
    canvas:paintBirthday,
  },
  merdeka:{
    tag:'HARI KEBANGSAAN · 31 OGOS',
    headline:'SELAMAT HARI MERDEKA',
    sub:'Tanah Tumpah Darahku · Malaysia ke-69',
    cta:'MASUK KE WEBSITE',
    tint:'rgba(0,25,0,.65)',
    vidFilter:'hue-rotate(100deg) saturate(2) brightness(.45)',
    c1:'#FFD700',c2:'#CC0001',c3:'#004400',
    glow:'255,215,0',
    emojis:['🇲🇾','⭐','🌙','❤️','💛','🌿','🟡','⚪','🎆','🎇'],
    canvas:paintMerdeka,
  },
  raya:{
    tag:'HARI RAYA AIDILFITRI',
    headline:'SELAMAT HARI RAYA',
    sub:'Maaf Zahir & Batin · Daripada Keluarga MaxMin',
    cta:'MASUK KE WEBSITE',
    tint:'rgba(35,18,0,.66)',
    vidFilter:'hue-rotate(35deg) saturate(1.6) brightness(.45)',
    c1:'#FFD700',c2:'#2ECC71',c3:'#C8860A',
    glow:'255,215,0',
    emojis:['🌙','⭐','🕌','✨','💚','💛','🌟','🎆','🌺','💫'],
    canvas:paintRaya,
  },
  newyear:{
    tag:'TAHUN BARU',
    headline:'SELAMAT TAHUN BARU',
    sub:'Semoga Tahun Baru Membawa Lebih Banyak Kejayaan',
    cta:'MASUK KE WEBSITE',
    tint:'rgba(0,0,35,.68)',
    vidFilter:'hue-rotate(200deg) saturate(1.5) brightness(.4)',
    c1:'#00F5FF',c2:'#FFD700',c3:'#0044FF',
    glow:'0,245,255',
    emojis:['🎆','🎇','✨','⭐','💫','🌟','🎉','🥂','🍾','🎊'],
    canvas:paintNewYear,
  },
  christmas:{
    tag:'HARI KRISMAS',
    headline:'CHRISTMAS DAY',
    sub:'Selamat Bercuti · Dari Seluruh Team MaxMin',
    cta:'MASUK KE WEBSITE',
    tint:'rgba(0,18,5,.67)',
    vidFilter:'hue-rotate(120deg) saturate(1.4) brightness(.42)',
    c1:'#FF4444',c2:'#FFD700',c3:'#00CC55',
    glow:'255,68,68',
    emojis:['🎄','⭐','❄️','🎅','🎁','🦌','🔔','✨','🕯️','⛄'],
    canvas:paintChristmas,
  },
  malaysia:{
    tag:'HARI MALAYSIA · 16 SEPTEMBER',
    headline:'SELAMAT HARI MALAYSIA',
    sub:'Bersatu Teguh, Bercerai Roboh · Malaysia',
    cta:'MASUK KE WEBSITE',
    tint:'rgba(0,18,0,.66)',
    vidFilter:'hue-rotate(100deg) saturate(2) brightness(.45)',
    c1:'#FFD700',c2:'#CC0001',c3:'#005CB8',
    glow:'255,215,0',
    emojis:['🇲🇾','⭐','🌙','❤️','💛','💙','🌿','⚪','🎆'],
    canvas:paintMerdeka,
  },
};

// ─── CANVAS PAINTERS ─────────────────────────────────────

function paintBirthday(canvas,t){
  const ctx=canvas.getContext('2d');
  let frame=0;
  const streamers=Array.from({length:80},()=>({
    x:Math.random()*canvas.width,y:(Math.random()-1.3)*canvas.height,
    vx:(Math.random()-.5)*1.8,vy:.5+Math.random()*2.2,
    len:10+Math.random()*55,angle:Math.random()*Math.PI*2,
    spin:(Math.random()-.5)*.13,
    color:[t.c1,t.c2,t.c3,'#FF8FD8','#FFFFFF','#FFB3E6'][Math.floor(Math.random()*6)],
    w:2+Math.random()*5,wind:0,windT:(Math.random()-.5)*.4,
  }));
  const rings=Array.from({length:12},(_,i)=>({
    x:Math.random()*canvas.width,y:Math.random()*canvas.height,
    r:0,maxR:80+Math.random()*150,speed:.3+Math.random()*.8,
    color:[t.c1,t.c2,t.c3][i%3],born:Math.random()*200,
  }));
  return function(){
    frame++;
    const W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);
    const gWind=Math.sin(frame*.007)*.22;
    rings.forEach(r=>{
      if(frame<r.born)return;
      r.r+=r.speed;
      const a=Math.max(0,1-r.r/r.maxR);
      if(r.r>r.maxR){r.r=0;r.x=Math.random()*W;r.y=Math.random()*H;r.born=frame+Math.random()*280;}
      ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);
      ctx.strokeStyle=r.color+Math.floor(a*55).toString(16).padStart(2,'0');
      ctx.lineWidth=1;ctx.stroke();
    });
    streamers.forEach(s=>{
      s.windT+=(Math.random()-.5)*.04;
      s.windT=Math.max(-.7,Math.min(.7,s.windT));
      s.wind+=(s.windT-s.wind)*.025;
      s.x+=s.vx+gWind+s.wind;s.y+=s.vy;s.angle+=s.spin;
      s.vy=Math.min(s.vy+.008,3.5);
      if(s.y>H+80){s.y=-80;s.x=Math.random()*W;s.vy=.5+Math.random()*2;}
      ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.angle);
      const g=ctx.createLinearGradient(0,-s.len/2,0,s.len/2);
      g.addColorStop(0,s.color+'00');g.addColorStop(.45,s.color+'EE');
      g.addColorStop(.55,s.color+'FF');g.addColorStop(1,s.color+'00');
      ctx.fillStyle=g;ctx.fillRect(-s.w/2,-s.len/2,s.w,s.len);ctx.restore();
    });
    if(frame%6===0){
      const x=Math.random()*W,y=Math.random()*H;
      for(let i=0;i<4;i++){
        const a=Math.random()*Math.PI*2,d=2+Math.random()*9;
        ctx.beginPath();ctx.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,Math.random()*1.8,0,Math.PI*2);
        ctx.fillStyle=(Math.random()>.5?t.c1:t.c2)+'BB';ctx.fill();
      }
    }
  };
}

function paintMerdeka(canvas,t){
  const ctx=canvas.getContext('2d');
  let frame=0;
  const stars=Array.from({length:180},()=>({
    x:Math.random()*canvas.width,y:Math.random()*canvas.height,
    r:.15+Math.random()*1.8,pulse:Math.random()*Math.PI*2,
    speed:.012+Math.random()*.038,drift:Math.random()*Math.PI*2,
  }));
  const beams=Array.from({length:18},(_,i)=>({
    angle:(i/18)*Math.PI*2,speed:.0016+Math.random()*.0025,
    color:i%2===0?t.c1:t.c2,w:20+Math.random()*20,
  }));
  return function(){
    frame++;
    const W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);
    const cx=W*.5,cy=H*.36;
    beams.forEach(b=>{
      b.angle+=b.speed;
      ctx.beginPath();ctx.moveTo(cx,cy);
      ctx.lineTo(cx+Math.cos(b.angle)*W*1.9,cy+Math.sin(b.angle)*H*1.9);
      ctx.strokeStyle=b.color+'0B';ctx.lineWidth=b.w;ctx.stroke();
    });
    stars.forEach(s=>{
      s.pulse+=s.speed;s.drift+=.004;s.x+=Math.sin(s.drift)*.06;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,215,0,${.1+.48*Math.sin(s.pulse)})`;ctx.fill();
    });
    const mx=W*.8,my=H*.16,mr=58;
    ctx.beginPath();ctx.arc(mx,my,mr,0,Math.PI*2);ctx.fillStyle=t.c1+'18';ctx.fill();
    ctx.beginPath();ctx.arc(mx+22,my-11,mr*.81,0,Math.PI*2);ctx.fillStyle='rgba(0,8,0,.96)';ctx.fill();
    ctx.save();ctx.translate(mx-38,my+54);
    for(let i=0;i<14;i++){
      ctx.rotate(Math.PI/7);ctx.beginPath();
      ctx.moveTo(0,-7);ctx.lineTo(1.2,0);ctx.lineTo(0,7);ctx.lineTo(-1.2,0);
      ctx.closePath();ctx.fillStyle=t.c1+'50';ctx.fill();
    }
    ctx.restore();
  };
}

function paintRaya(canvas,t){
  const ctx=canvas.getContext('2d');
  let frame=0;
  const lanterns=Array.from({length:16},(_,i)=>({
    x:(i/16)*canvas.width+Math.random()*55-27,
    y:canvas.height*.02+Math.random()*canvas.height*.28,
    r:12+Math.random()*22,sway:Math.random()*Math.PI*2,
    swaySpeed:.007+Math.random()*.011,
    color:[t.c1,t.c2,'#FF9900'][i%3],glow:Math.random()*Math.PI*2,
  }));
  const stars=Array.from({length:130},()=>({
    x:Math.random()*canvas.width,y:Math.random()*canvas.height*.65,
    r:.15+Math.random()*2,twinkle:Math.random()*Math.PI*2,speed:.018+Math.random()*.055,
  }));
  const tiles=Array.from({length:22},()=>({
    x:Math.random()*canvas.width,y:Math.random()*canvas.height,
    size:16+Math.random()*40,alpha:.03+Math.random()*.055,rot:Math.random()*Math.PI*.25,
  }));
  return function(){
    frame++;
    const W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);
    tiles.forEach(tile=>{
      ctx.save();ctx.translate(tile.x,tile.y);ctx.rotate(tile.rot);
      ctx.strokeStyle=t.c1+Math.floor(tile.alpha*255).toString(16).padStart(2,'0');
      ctx.lineWidth=.45;
      const s=tile.size;
      ctx.beginPath();
      for(let i=0;i<8;i++){
        const a=(i/8)*Math.PI*2-Math.PI/8,r2=i%2===0?s:s*.42;
        i===0?ctx.moveTo(Math.cos(a)*r2,Math.sin(a)*r2):ctx.lineTo(Math.cos(a)*r2,Math.sin(a)*r2);
      }
      ctx.closePath();ctx.stroke();ctx.restore();
    });
    stars.forEach(s=>{
      s.twinkle+=s.speed;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,215,0,${.1+.6*Math.abs(Math.sin(s.twinkle))})`;ctx.fill();
    });
    lanterns.forEach(l=>{
      l.sway+=l.swaySpeed;l.glow+=.04;
      const x=l.x+Math.sin(l.sway)*14,y=l.y;
      const gp=.7+.3*Math.sin(l.glow);
      ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,y-l.r-2);
      ctx.strokeStyle=l.color+'30';ctx.lineWidth=.8;ctx.stroke();
      const grd=ctx.createRadialGradient(x,y,0,x,y,l.r*3.5);
      grd.addColorStop(0,l.color+Math.floor(gp*42).toString(16).padStart(2,'0'));
      grd.addColorStop(1,'transparent');
      ctx.beginPath();ctx.arc(x,y,l.r*3.5,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();
      ctx.beginPath();ctx.ellipse(x,y-l.r,l.r*.48,l.r*.13,0,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,.13)';ctx.fill();
      ctx.beginPath();ctx.ellipse(x,y,l.r*.64,l.r,0,0,Math.PI*2);
      ctx.fillStyle=l.color+Math.floor(gp*175).toString(16).padStart(2,'0');ctx.fill();
      const ig=ctx.createRadialGradient(x,y-l.r*.2,0,x,y,l.r*.52);
      ig.addColorStop(0,'rgba(255,255,200,.45)');ig.addColorStop(1,'transparent');
      ctx.beginPath();ctx.ellipse(x,y,l.r*.64,l.r,0,0,Math.PI*2);ctx.fillStyle=ig;ctx.fill();
      ctx.beginPath();ctx.ellipse(x-l.r*.17,y-l.r*.27,l.r*.16,l.r*.3,-.35,0,Math.PI*2);
      ctx.fillStyle='rgba(255,255,255,.24)';ctx.fill();
      for(let i=0;i<6;i++){
        const tx=x-l.r*.38+i*(l.r*.155),wb=Math.sin(l.sway*1.4+i)*.5;
        ctx.beginPath();ctx.moveTo(tx,y+l.r);
        ctx.quadraticCurveTo(tx+wb*3,y+l.r+6,tx+wb*5,y+l.r+11+i*1.7);
        ctx.strokeStyle=l.color+'85';ctx.lineWidth=1.3;ctx.stroke();
      }
    });
    const mx=W*.84,my=H*.12;
    ctx.beginPath();ctx.arc(mx,my,44,0,Math.PI*2);ctx.fillStyle=t.c1+'12';ctx.fill();
    ctx.beginPath();ctx.arc(mx+17,my-9,37,0,Math.PI*2);ctx.fillStyle='rgba(18,7,0,.97)';ctx.fill();
  };
}

function paintNewYear(canvas,t){
  const ctx=canvas.getContext('2d');
  const bursts=[];
  let started=false;
  setTimeout(()=>{started=true;},500);
  const rockets=Array.from({length:9},()=>({
    x:0,y:0,vy:0,ty:0,trail:[],active:false,
    nextLaunch:Date.now()+Math.random()*2200,
  }));
  function launch(r){
    const W=canvas.width,H=canvas.height;
    r.x=W*.08+Math.random()*W*.84;r.y=H;
    r.vy=-(9+Math.random()*8);r.ty=H*.06+Math.random()*H*.44;
    r.trail=[];r.active=true;
  }
  function explode(x,y){
    const cols=[t.c1,t.c2,'#FFF','#FFD','#AFF','#FAF','#FFA'];
    const n=36+Math.floor(Math.random()*18);
    for(let i=0;i<n;i++){
      const a=(i/n)*Math.PI*2+Math.random()*.4,sp=1.5+Math.random()*5;
      bursts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,
        alpha:1,r:1.5+Math.random()*4,
        color:cols[Math.floor(Math.random()*cols.length)],gravity:.038+Math.random()*.04});
    }
    for(let i=0;i<22;i++){
      const a=(i/22)*Math.PI*2,sp=3.5+Math.random()*2.5;
      bursts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,alpha:.9,r:.7,color:'#FFF',gravity:.028});
    }
  }
  return function(){
    if(!started)return;
    const W=canvas.width,H=canvas.height;
    ctx.fillStyle='rgba(0,0,26,.11)';ctx.fillRect(0,0,W,H);
    rockets.forEach(r=>{
      if(!r.active&&Date.now()>r.nextLaunch)launch(r);
      if(!r.active)return;
      r.trail.push({x:r.x,y:r.y});
      if(r.trail.length>30)r.trail.shift();
      r.y+=r.vy;r.vy*=.985;
      r.trail.forEach((pt,i)=>{
        const a=i/r.trail.length;
        ctx.beginPath();ctx.arc(pt.x,pt.y,1.8*a,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,235,80,${a*.9})`;ctx.fill();
      });
      if(r.y<=r.ty||r.vy>-1){
        explode(r.x,r.y);r.active=false;
        r.nextLaunch=Date.now()+1000+Math.random()*2800;
      }
    });
    for(let i=bursts.length-1;i>=0;i--){
      const b=bursts[i];
      b.x+=b.vx;b.y+=b.vy;b.vy+=b.gravity;b.alpha-=.014;b.vx*=.972;b.vy*=.972;
      if(b.alpha<=0){bursts.splice(i,1);continue;}
      ctx.beginPath();ctx.arc(b.x,b.y,b.r*Math.max(.12,b.alpha),0,Math.PI*2);
      ctx.fillStyle=b.color+Math.floor(b.alpha*255).toString(16).padStart(2,'0');ctx.fill();
    }
  };
}

function paintChristmas(canvas,t){
  const ctx=canvas.getContext('2d');
  let frame=0;
  const snow=Array.from({length:160},()=>({
    x:Math.random()*canvas.width,y:Math.random()*canvas.height,
    r:.35+Math.random()*3.8,vy:.15+Math.random()*1.4,vx:(Math.random()-.5)*.4,
    wobble:Math.random()*Math.PI*2,alpha:.2+Math.random()*.78,
    spin:0,spinSpeed:(Math.random()-.5)*.024,
  }));
  const stars=Array.from({length:60},()=>({
    x:Math.random()*canvas.width,y:Math.random()*canvas.height*.56,
    r:.35+Math.random()*2.2,twinkle:Math.random()*Math.PI*2,speed:.022+Math.random()*.042,
  }));
  return function(){
    frame++;
    const W=canvas.width,H=canvas.height;
    ctx.clearRect(0,0,W,H);
    stars.forEach(s=>{
      s.twinkle+=s.speed;
      ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);
      ctx.fillStyle=`rgba(255,255,205,${.18+.56*Math.abs(Math.sin(s.twinkle))})`;ctx.fill();
    });
    const tx=W*.1,ty=H*.55;
    [[tx,ty-118,60],[tx,ty-160,42],[tx,ty-198,26]].forEach(([x,y,w])=>{
      ctx.beginPath();ctx.moveTo(x,y-52);ctx.lineTo(x-w,y);ctx.lineTo(x+w,y);
      ctx.closePath();ctx.fillStyle=t.c3+'1E';ctx.fill();
      ctx.beginPath();ctx.moveTo(x-w+4,y);ctx.lineTo(x,y-7);ctx.lineTo(x+w-4,y);
      ctx.strokeStyle='rgba(255,255,255,.11)';ctx.lineWidth=5;ctx.stroke();
    });
    ctx.save();ctx.translate(tx,ty-211);
    for(let i=0;i<5;i++){
      ctx.rotate((Math.PI*2)/5);ctx.beginPath();
      ctx.moveTo(0,-9);ctx.lineTo(2.2,0);ctx.lineTo(0,5);ctx.lineTo(-2.2,0);
      ctx.closePath();
      ctx.fillStyle=t.c2+Math.floor(100+120*Math.sin(frame*.1+i)).toString(16).padStart(2,'0');ctx.fill();
    }
    ctx.restore();
    [[tx-22,ty-86,5.5,t.c1],[tx+21,ty-77,5.5,t.c2],[tx-11,ty-130,4.5,'#88FFAA'],[tx+10,ty-151,3.5,t.c1]].forEach(([x,y,r,c])=>{
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=c+'CC';ctx.fill();
      ctx.beginPath();ctx.arc(x-r*.3,y-r*.3,r*.28,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.5)';ctx.fill();
    });
    const wind=Math.sin(frame*.006)*.26;
    snow.forEach(s=>{
      s.wobble+=.018;s.spin+=s.spinSpeed;
      s.x+=s.vx+wind+Math.sin(s.wobble)*.3;s.y+=s.vy;
      if(s.y>H+12){s.y=-12;s.x=Math.random()*W;}
      if(s.x<-12)s.x=W+12;if(s.x>W+12)s.x=-12;
      ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.spin);
      if(s.r>1.8){
        ctx.strokeStyle=`rgba(255,255,255,${s.alpha*.72})`;ctx.lineWidth=.6;
        for(let i=0;i<6;i++){
          ctx.rotate(Math.PI/3);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-s.r*2.4);ctx.stroke();
          ctx.beginPath();ctx.moveTo(0,-s.r*.88);ctx.lineTo(s.r*.44,-s.r*.44);ctx.stroke();
          ctx.beginPath();ctx.moveTo(0,-s.r*.88);ctx.lineTo(-s.r*.44,-s.r*.44);ctx.stroke();
        }
      } else {
        ctx.beginPath();ctx.arc(0,0,s.r,0,Math.PI*2);
        ctx.fillStyle=`rgba(255,255,255,${s.alpha})`;ctx.fill();
      }
      ctx.restore();
    });
  };
}

// ─── CSS ─────────────────────────────────────────────────
function buildCSS(t){return`
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@300;400;600&display=swap');
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
#mm6{position:fixed;inset:0;z-index:999999;overflow:hidden;opacity:0;animation:mm6In 1.8s cubic-bezier(.22,1,.36,1) forwards}
@keyframes mm6In{0%{opacity:0}100%{opacity:1}}
#mm6-flash{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%,rgba(255,255,255,.85),rgba(255,255,255,.2));z-index:30;animation:mm6Flash .8s ease forwards;pointer-events:none}
@keyframes mm6Flash{0%{opacity:1}100%{opacity:0}}
#mm6-vid-wrap{position:absolute;inset:0;overflow:hidden}
#mm6-vid{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:100%;min-height:100%;width:auto;height:auto;object-fit:cover;opacity:.55;filter:${t.vidFilter}}
#mm6-tint{position:absolute;inset:0;background:${t.tint}}
#mm6-cv{position:absolute;inset:0;width:100%;height:100%}
#mm6-vg{position:absolute;inset:0;background:radial-gradient(ellipse 75% 75% at 50% 50%,transparent 15%,rgba(0,0,0,.75) 70%,rgba(0,0,0,.92) 100%);pointer-events:none}
#mm6-scan{position:absolute;left:0;right:0;height:120px;pointer-events:none;z-index:3;background:linear-gradient(180deg,transparent,rgba(${t.glow},.06),transparent);animation:mm6Scan 10s ease-in-out infinite}
@keyframes mm6Scan{0%{top:-120px;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}
#mm6-center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;perspective:1400px}
#mm6-card{position:relative;text-align:center;padding:clamp(2rem,4.5vw,4rem) clamp(2rem,7vw,6rem) clamp(2.5rem,5vw,4.5rem);max-width:640px;width:88vw;background:rgba(0,0,0,.56);backdrop-filter:blur(40px) saturate(160%);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(${t.glow},.14);box-shadow:0 0 0 1px rgba(${t.glow},.04),0 80px 160px rgba(0,0,0,.95),inset 0 1px 0 rgba(${t.glow},.1),inset 0 0 140px rgba(${t.glow},.03);animation:mm6Card 1.5s cubic-bezier(.16,1,.3,1) .3s both;transform-style:preserve-3d;will-change:transform;transition:transform .1s ease,box-shadow .12s ease}
@keyframes mm6Card{from{transform:translateY(55px) rotateX(10deg) scale(.93);opacity:0}to{transform:none;opacity:1}}
#mm6-card::before{content:'';position:absolute;top:0;left:15%;right:15%;height:1px;background:linear-gradient(90deg,transparent,rgba(${t.glow},.7),rgba(${t.glow},.4),transparent)}
#mm6-card::after{content:'';position:absolute;bottom:0;left:25%;right:25%;height:1px;background:linear-gradient(90deg,transparent,rgba(${t.glow},.3),transparent)}
.mm6-c{position:absolute;width:14px;height:14px;border-color:${t.c1};border-style:solid;transition:all .4s cubic-bezier(.16,1,.3,1)}
.mm6-c.a{top:-1px;left:-1px;border-width:2px 0 0 2px}
.mm6-c.b{top:-1px;right:-1px;border-width:2px 2px 0 0}
.mm6-c.c{bottom:-1px;left:-1px;border-width:0 0 2px 2px}
.mm6-c.d{bottom:-1px;right:-1px;border-width:0 2px 2px 0}
#mm6-card:hover .mm6-c{width:22px;height:22px}

#mm6-logo-wrap{position:relative;display:flex;align-items:center;justify-content:center;margin-bottom:1.4rem;animation:mm6LogoIn 1.2s cubic-bezier(.16,1,.3,1) 1s both}
@keyframes mm6LogoIn{0%{opacity:0;transform:scale(.3) rotate(-20deg);filter:blur(12px)}55%{opacity:1;transform:scale(1.1) rotate(3deg);filter:blur(0)}75%{transform:scale(.96) rotate(-1deg)}100%{opacity:1;transform:scale(1) rotate(0);filter:blur(0)}}
#mm6-logo-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:160%;height:160%;border-radius:50%;background:radial-gradient(ellipse at center,rgba(${t.glow},.35) 0%,transparent 70%);animation:mm6GlowPulse 3s ease-in-out 2.5s infinite;pointer-events:none}
@keyframes mm6GlowPulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.6}50%{transform:translate(-50%,-50%) scale(1.3);opacity:1}}
#mm6-logo-img{width:clamp(100px,20vw,170px);height:clamp(100px,20vw,170px);object-fit:contain;position:relative;z-index:1;border-radius:50%;mix-blend-mode:screen;filter:drop-shadow(0 0 20px rgba(${t.glow},.5)) drop-shadow(0 0 50px rgba(${t.glow},.25)) brightness(1.4) contrast(1.1);animation:mm6LogoFloat 4s ease-in-out 2.5s infinite,mm6Glitch .08s steps(2) 2.4s 3}
@keyframes mm6LogoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes mm6Glitch{
  0%{filter:drop-shadow(0 0 20px rgba(${t.glow},.5)) drop-shadow(-3px 0 0 #FF0080) drop-shadow(3px 0 0 #00FFFF)}
  50%{filter:drop-shadow(0 0 20px rgba(${t.glow},.5)) drop-shadow(3px 0 0 #FF0080) drop-shadow(-3px 0 0 #00FFFF);transform:translateX(2px)}
  100%{filter:drop-shadow(0 0 20px rgba(${t.glow},.5)) drop-shadow(0 0 20px rgba(${t.glow},.5));transform:none}
}
#mm6-tag{display:inline-flex;align-items:center;gap:.55rem;font-family:'DM Sans',sans-serif;font-size:.58rem;font-weight:600;letter-spacing:.28em;color:${t.c1};border:1px solid rgba(${t.glow},.22);padding:.28rem .9rem;border-radius:2px;margin-bottom:1rem;background:rgba(${t.glow},.07);animation:mm6Up .7s ease 1.8s both}
#mm6-tag::before,#mm6-tag::after{content:'';flex:none;width:10px;height:1px;background:rgba(${t.glow},.5)}
@keyframes mm6Up{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
#mm6-rule{display:flex;align-items:center;justify-content:center;gap:.8rem;margin:.9rem 0;animation:mm6Up .6s ease 2s both}
#mm6-rule::before,#mm6-rule::after{content:'';display:block;width:clamp(20px,3.5vw,44px);height:1px;background:linear-gradient(90deg,transparent,rgba(${t.glow},.65))}
.mm6-diamond{width:5px;height:5px;background:${t.c1};transform:rotate(45deg);box-shadow:0 0 8px ${t.c1},0 0 16px rgba(${t.glow},.4)}
#mm6-hl{font-family:'Bebas Neue',sans-serif;font-size:clamp(1.4rem,4vw,2.4rem);letter-spacing:.14em;color:#fff;line-height:1.05;text-shadow:0 2px 20px rgba(0,0,0,.5);animation:mm6Up .7s ease 2.1s both}
#mm6-sub{font-family:'DM Sans',sans-serif;font-size:clamp(.74rem,1.7vw,.85rem);font-weight:300;color:rgba(255,255,255,.35);letter-spacing:.06em;line-height:1.9;margin-top:.5rem;animation:mm6Up .7s ease 2.3s both}
#mm6-badge{display:none}
#mm6-btn{display:inline-flex;align-items:center;gap:.55rem;margin-top:2rem;padding:.88rem 2.8rem;font-family:'Bebas Neue',sans-serif;font-size:.95rem;letter-spacing:.35em;cursor:pointer;border:none;position:relative;overflow:hidden;transition:transform .22s cubic-bezier(.16,1,.3,1),box-shadow .22s ease;animation:mm6Up .7s ease 2.5s both;background:${t.c1};color:#000;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px)}
#mm6-btn::before{content:'';position:absolute;top:0;left:-120%;width:55%;height:100%;background:linear-gradient(105deg,transparent,rgba(255,255,255,.55),transparent);transition:left .6s ease}
#mm6-btn::after{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(255,255,255,.18) 0%,transparent 55%);opacity:0;transition:opacity .2s}
#mm6-btn:hover{transform:translateY(-4px) scale(1.04);box-shadow:0 0 50px rgba(${t.glow},.55),0 20px 60px rgba(0,0,0,.6)}
#mm6-btn:hover::before{left:150%}
#mm6-btn:hover::after{opacity:1}
#mm6-btn:active{transform:scale(.96)}
#mm6-prog{position:absolute;bottom:0;left:0;right:0;height:2px;background:rgba(${t.glow},.1);overflow:hidden}
#mm6-bar{height:100%;background:linear-gradient(90deg,${t.c2},${t.c1});transform-origin:left;animation:mm6Prog 12s linear 2.5s both}
@keyframes mm6Prog{from{transform:scaleX(1)}to{transform:scaleX(0)}}
.mm6-pt{position:absolute;pointer-events:none;z-index:5;animation:mm6Float linear forwards;will-change:transform;user-select:none}
@keyframes mm6Float{0%{transform:translateY(108vh) rotate(0deg) scale(0);opacity:0}5%{opacity:1;transform:translateY(96vh) rotate(10deg) scale(1)}94%{opacity:.6}100%{transform:translateY(-12vh) rotate(600deg) scale(.2);opacity:0}}
.mm6-sp{position:absolute;border-radius:50%;animation:mm6Spark ease-out both;pointer-events:none}
@keyframes mm6Spark{0%{transform:translate(0,0) scale(1.8);opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0}}
@media(max-width:500px){#mm6-card{padding:1.8rem 1.2rem 2rem}#mm6-btn{padding:.75rem 1.8rem;font-size:.85rem}#mm6-logo-img{width:90px;height:90px}}
`;}

// ─── PARTICLES & SPARKS ───────────────────────────────────
function spawnPt(wrap,emojis){
  let n=0;
  function go(){
    if(n>=32||!document.getElementById('mm6'))return;
    n++;
    const el=document.createElement('div');el.className='mm6-pt';
    el.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    const d=5+Math.random()*7;
    el.style.cssText=`left:${Math.random()*100}%;font-size:${.8+Math.random()*1.6}rem;animation-duration:${d}s;animation-delay:${Math.random()*3.5}s`;
    wrap.appendChild(el);
    el.addEventListener('animationend',()=>{el.remove();n--;setTimeout(go,Math.random()*900);});
  }
  for(let i=0;i<18;i++)setTimeout(go,i*200+3000);
  setInterval(()=>{if(n<32&&document.getElementById('mm6'))go();},750);
}

function spawnSp(wrap,c1,c2,glow){
  const cols=[c1,c2,'#fff','#ffe','#cff','#fcf'];
  function burst(){
    if(!document.getElementById('mm6'))return;
    const cx=12+Math.random()*76,cy=5+Math.random()*68;
    const count=20+Math.floor(Math.random()*14);
    for(let i=0;i<count;i++){
      const a=(i/count)*Math.PI*2+Math.random()*.5,d=60+Math.random()*120;
      const el=document.createElement('div');el.className='mm6-sp';
      const c=cols[Math.floor(Math.random()*cols.length)],sz=2+Math.random()*5;
      el.style.cssText=`left:${cx}%;top:${cy}%;width:${sz}px;height:${sz}px;background:${c};box-shadow:0 0 ${sz*2.5}px ${c};--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px;animation-duration:${.5+Math.random()*.85}s;animation-delay:${Math.random()*.3}s`;
      wrap.appendChild(el);
      el.addEventListener('animationend',()=>el.remove());
    }
  }
  burst();setInterval(burst,1300);
}

// ─── 3D TILT ──────────────────────────────────────────────
function initTilt(card,t){
  let active=true;
  const center=document.getElementById('mm6-center');
  function move(e){
    if(!active)return;
    const r=card.getBoundingClientRect();
    const cx=r.left+r.width/2,cy=r.top+r.height/2;
    const mx=e.touches?e.touches[0].clientX:e.clientX;
    const my2=e.touches?e.touches[0].clientY:e.clientY;
    const dx=(mx-cx)/(r.width/2),dy=(my2-cy)/(r.height/2);
    card.style.transform=`perspective(1400px) rotateY(${dx*7}deg) rotateX(${-dy*7}deg) scale(1.02)`;
    card.style.boxShadow=`${-dx*20}px ${dy*20}px 120px rgba(0,0,0,.95),0 0 0 1px rgba(${t.glow},.04),inset 0 1px 0 rgba(${t.glow},.08)`;
  }
  function leave(){card.style.transform='';card.style.boxShadow='';}
  center.addEventListener('mousemove',move);
  center.addEventListener('mouseleave',leave);
  center.addEventListener('touchmove',move,{passive:true});
  return ()=>{active=false;center.removeEventListener('mousemove',move);center.removeEventListener('mouseleave',leave);};
}

// ─── RENDER ───────────────────────────────────────────────
function render(t){
  const style=document.createElement('style');
  style.id='mm6-css';style.textContent=buildCSS(t);
  document.head.appendChild(style);

  const wrap=document.createElement('div');wrap.id='mm6';
  wrap.innerHTML=`
    <div id="mm6-flash"></div>
    <div id="mm6-vid-wrap">
      <video id="mm6-vid" autoplay muted loop playsinline>
        <source src="vx.mp4" type="video/mp4">
      </video>
    </div>
    <div id="mm6-tint"></div>
    <canvas id="mm6-cv"></canvas>
    <div id="mm6-vg"></div>
    <div id="mm6-scan"></div>
    <div id="mm6-center">
      <div id="mm6-card">
        <div class="mm6-c a"></div><div class="mm6-c b"></div>
        <div class="mm6-c c"></div><div class="mm6-c d"></div>
        <div id="mm6-logo-wrap">
          <div id="mm6-logo-glow"></div>
          <img id="mm6-logo-img" src="mx-x.png" alt="MaxMin Logo">
        </div>
        <div id="mm6-tag">${t.tag}</div>
        <div id="mm6-rule"><div class="mm6-diamond"></div></div>
        <div id="mm6-hl">${t.headline}</div>
        <div id="mm6-sub">${t.sub}</div>

        <button id="mm6-btn">${t.cta} &rarr;</button>
        <div id="mm6-prog"><div id="mm6-bar"></div></div>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  // Canvas
  const cv=document.getElementById('mm6-cv');
  function size(){cv.width=window.innerWidth;cv.height=window.innerHeight;}
  size();window.addEventListener('resize',size);
  const drawFrame=t.canvas(cv,t);
  let raf;(function loop(){drawFrame();raf=requestAnimationFrame(loop);})();

  // 3D tilt
  const removeTilt=initTilt(document.getElementById('mm6-card'),t);

  // Particles & sparks (start after card is revealed)
  spawnPt(wrap,t.emojis);
  spawnSp(wrap,t.c1,t.c2,t.glow);

  // Dismiss
  function dismiss(){
    cancelAnimationFrame(raf);removeTilt();
    wrap.style.transition='opacity 1s ease,transform 1s ease';
    wrap.style.opacity='0';wrap.style.transform='scale(1.04)';
    setTimeout(()=>{wrap.remove();document.getElementById('mm6-css')?.remove();window.removeEventListener('resize',size);},1000);
  }
  document.getElementById('mm6-btn').addEventListener('click',dismiss);
  setTimeout(dismiss,14000);
}

// ─── INIT ─────────────────────────────────────────────────
function init(){
  // Only show once per day (Malaysia timezone)
  const _n=new Date(),_o=8*60,_l=new Date(_n.getTime()+(_o-_n.getTimezoneOffset())*60000);
  const key='mm6_shown_'+_l.toISOString().split('T')[0];
  if(sessionStorage.getItem(key)) return;
  sessionStorage.setItem(key,'1');

  const t=THEMES[TODAY_THEME]||THEMES.birthday;
  render(t);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else setTimeout(init,100);

})();