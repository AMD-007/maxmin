// ============================================================
// MAXMIN CELEBRATIONS ENGINE v8.0 — PRODUCTION
// Auto date detection · vx.mp4 · mx-x.png
// Universal Promo System · All Events · Countdown · WhatsApp
// ============================================================
// ⚙️  EASY CONFIG — edit DATES and PROMOS below every year
// ============================================================
(function(){
'use strict';

// ─── 1. DATES — UPDATE EVERY YEAR ────────────────────────
const RAYA_DATES      = ['2026-03-23','2026-03-24','2026-03-25','2026-03-26'];
const RAYA_HAJI_DATES = ['2026-05-27','2026-05-28'];

const FIXED_DAYS = {
  '01-01':'newyear',
  '03-19':'birthday',
  '08-31':'merdeka',
  '09-16':'malaysia',
  '12-25':'christmas',
  '12-31':'newyear',
};

// ─── 2. WHATSAPP NUMBER ───────────────────────────────────
const WA = '60109464866';

// ─── 3. PROMO CONFIG — edit per event ────────────────────
// Set active:false to disable promo for that event
const PROMOS = {

  raya: {
    active: true,
    deadline: '2026-04-20T23:59:59',
    slots: 5,
    label: 'PROMOSI RAYA EKSKLUSIF',
    packages: [
      { name:'Pakej Basic',    normal:'RM799',   promo:'RM649',   savings:'Jimat RM150',             wa:'Pakej+Basic+Raya+(RM649)' },
      { name:'Pakej Standard', normal:'RM1,299', promo:'RM1,049', savings:'Jimat RM250',              wa:'Pakej+Standard+Raya+(RM1%2C049)' },
      { name:'Pakej Premium',  normal:'RM1,999', promo:'RM1,649', savings:'Jimat RM350 + FREE Logo',  wa:'Pakej+Premium+Raya+(RM1%2C649)' },
    ],
  },

  raya_haji: {
    active: true,
    deadline: '2026-06-15T23:59:59',
    slots: 4,
    label: 'PROMOSI RAYA HAJI',
    packages: [
      { name:'Pakej Basic',    normal:'RM799',   promo:'RM679',   savings:'Jimat RM120',             wa:'Pakej+Basic+Raya+Haji+(RM679)' },
      { name:'Pakej Standard', normal:'RM1,299', promo:'RM1,099', savings:'Jimat RM200',              wa:'Pakej+Standard+Raya+Haji+(RM1%2C099)' },
      { name:'Pakej Premium',  normal:'RM1,999', promo:'RM1,699', savings:'Jimat RM300 + FREE Logo',  wa:'Pakej+Premium+Raya+Haji+(RM1%2C699)' },
    ],
  },

  merdeka: {
    active: true,
    deadline: '2026-09-07T23:59:59',
    slots: 3,
    label: 'PROMOSI MERDEKA',
    packages: [
      { name:'Pakej Basic',    normal:'RM799',   promo:'RM699',   savings:'Jimat RM100',             wa:'Pakej+Basic+Merdeka+(RM699)' },
      { name:'Pakej Standard', normal:'RM1,299', promo:'RM1,149', savings:'Jimat RM150',              wa:'Pakej+Standard+Merdeka+(RM1%2C149)' },
      { name:'Pakej Premium',  normal:'RM1,999', promo:'RM1,749', savings:'Jimat RM250 + FREE Logo',  wa:'Pakej+Premium+Merdeka+(RM1%2C749)' },
    ],
  },

  malaysia: {
    active: true,
    deadline: '2026-09-23T23:59:59',
    slots: 3,
    label: 'PROMOSI HARI MALAYSIA',
    packages: [
      { name:'Pakej Basic',    normal:'RM799',   promo:'RM699',   savings:'Jimat RM100',             wa:'Pakej+Basic+Malaysia+Day+(RM699)' },
      { name:'Pakej Standard', normal:'RM1,299', promo:'RM1,149', savings:'Jimat RM150',              wa:'Pakej+Standard+Malaysia+Day+(RM1%2C149)' },
      { name:'Pakej Premium',  normal:'RM1,999', promo:'RM1,749', savings:'Jimat RM250 + FREE Logo',  wa:'Pakej+Premium+Malaysia+Day+(RM1%2C749)' },
    ],
  },

  newyear: {
    active: true,
    deadline: '2027-01-07T23:59:59',
    slots: 5,
    label: 'PROMOSI TAHUN BARU',
    packages: [
      { name:'Pakej Basic',    normal:'RM799',   promo:'RM649',   savings:'Jimat RM150',             wa:'Pakej+Basic+New+Year+(RM649)' },
      { name:'Pakej Standard', normal:'RM1,299', promo:'RM1,049', savings:'Jimat RM250',              wa:'Pakej+Standard+New+Year+(RM1%2C049)' },
      { name:'Pakej Premium',  normal:'RM1,999', promo:'RM1,649', savings:'Jimat RM350 + FREE Logo',  wa:'Pakej+Premium+New+Year+(RM1%2C649)' },
    ],
  },

  christmas: {
    active: true,
    deadline: '2026-12-31T23:59:59',
    slots: 3,
    label: 'PROMOSI KRISMAS',
    packages: [
      { name:'Pakej Basic',    normal:'RM799',   promo:'RM699',   savings:'Jimat RM100',             wa:'Pakej+Basic+Christmas+(RM699)' },
      { name:'Pakej Standard', normal:'RM1,299', promo:'RM1,149', savings:'Jimat RM150',              wa:'Pakej+Standard+Christmas+(RM1%2C149)' },
      { name:'Pakej Premium',  normal:'RM1,999', promo:'RM1,749', savings:'Jimat RM250 + FREE Logo',  wa:'Pakej+Premium+Christmas+(RM1%2C749)' },
    ],
  },

  birthday: {
    active: false, // No promo — just celebration
  },

};

// ─── 4. THEME DETECTION ──────────────────────────────────
function getTodayTheme(){
  const now  = new Date();
  const mmdd = String(now.getMonth()+1).padStart(2,'0')+'-'+String(now.getDate()).padStart(2,'0');
  const full = now.toISOString().split('T')[0];
  if(RAYA_DATES.includes(full))      return 'raya';
  if(RAYA_HAJI_DATES.includes(full)) return 'raya_haji';
  return FIXED_DAYS[mmdd] || null;
}

const TODAY_THEME   = getTodayTheme();
if(!TODAY_THEME) return;

const CURRENT_PROMO = PROMOS[TODAY_THEME] || { active:false };
const IS_PROMO      = CURRENT_PROMO.active === true;

// ─── 5. VISUAL THEMES ────────────────────────────────────
const THEMES = {
  birthday:{
    tag:'ULANG TAHUN MAXMIN',
    headline:'HAPPY BIRTHDAY',
    sub:'Ulang Tahun Berkhidmat untuk Perniagaan Terengganu, Malaysia',
    cta:'JEMPUT MASUK \u2192',
    tint:'rgba(60,0,30,.60)',
    vidFilter:'hue-rotate(280deg) saturate(1.8) brightness(.55)',
    c1:'#FF3CAC',c2:'#FFD700',c3:'#9B59B6',glow:'255,60,172',
    emojis:['🎂','🎉','🎊','🎈','🎁','✨','🌟','💫','🥳','🎀','🎶','💝'],
    canvas:paintBirthday,
  },
  merdeka:{
    tag:'HARI KEBANGSAAN \u00b7 31 OGOS',
    headline:'SELAMAT HARI MERDEKA',
    sub:'Tanah Tumpah Darahku \u00b7 Malaysia',
    cta:'TUNTUT TAWARAN MERDEKA \u2192',
    tint:'rgba(0,25,0,.65)',
    vidFilter:'hue-rotate(100deg) saturate(2) brightness(.45)',
    c1:'#FFD700',c2:'#CC0001',c3:'#004400',glow:'255,215,0',
    emojis:['\uD83C\uDDF2\uD83C\uDDFE','⭐','🌙','❤️','💛','🌿','🟡','⚪','🎆','🎇'],
    canvas:paintMerdeka,
  },
  raya:{
    tag:'🌙 PROMOSI RAYA EKSKLUSIF \u00b7 TERHAD',
    headline:'SELAMAT HARI RAYA',
    sub:'Maaf Zahir & Batin \u00b7 Daripada Keluarga MaxMin',
    cta:'TUNTUT TAWARAN RAYA \u2192',
    tint:'rgba(35,18,0,.66)',
    vidFilter:'hue-rotate(35deg) saturate(1.6) brightness(.45)',
    c1:'#FFD700',c2:'#2ECC71',c3:'#C8860A',glow:'255,215,0',
    emojis:['🌙','⭐','🕌','✨','💚','💛','🌟','🎆','🌺','💫'],
    canvas:paintRaya,
  },
  raya_haji:{
    tag:'🌙 PROMOSI RAYA HAJI \u00b7 TERHAD',
    headline:'SELAMAT HARI RAYA HAJI',
    sub:'Maaf Zahir & Batin \u00b7 Daripada Keluarga MaxMin',
    cta:'TUNTUT TAWARAN RAYA HAJI \u2192',
    tint:'rgba(35,18,0,.66)',
    vidFilter:'hue-rotate(35deg) saturate(1.6) brightness(.45)',
    c1:'#FFD700',c2:'#2ECC71',c3:'#C8860A',glow:'255,215,0',
    emojis:['🌙','⭐','🕌','✨','💚','💛','🌟','🎆','🌺','💫'],
    canvas:paintRaya,
  },
  newyear:{
    tag:'🎆 PROMOSI TAHUN BARU \u00b7 TERHAD',
    headline:'SELAMAT TAHUN BARU',
    sub:'Semoga Tahun Baru Membawa Lebih Banyak Kejayaan',
    cta:'TUNTUT TAWARAN TAHUN BARU \u2192',
    tint:'rgba(0,0,35,.68)',
    vidFilter:'hue-rotate(200deg) saturate(1.5) brightness(.4)',
    c1:'#00F5FF',c2:'#FFD700',c3:'#0044FF',glow:'0,245,255',
    emojis:['🎆','🎇','✨','⭐','💫','🌟','🎉','🥂','🍾','🎊'],
    canvas:paintNewYear,
  },
  christmas:{
    tag:'🎄 PROMOSI KRISMAS \u00b7 TERHAD',
    headline:'CHRISTMAS DAY',
    sub:'Selamat Bercuti \u00b7 Dari Seluruh Team MaxMin',
    cta:'TUNTUT TAWARAN KRISMAS \u2192',
    tint:'rgba(0,18,5,.67)',
    vidFilter:'hue-rotate(120deg) saturate(1.4) brightness(.42)',
    c1:'#FF4444',c2:'#FFD700',c3:'#00CC55',glow:'255,68,68',
    emojis:['🎄','⭐','❄️','🎅','🎁','🦌','🔔','✨','🕯️','⛄'],
    canvas:paintChristmas,
  },
  malaysia:{
    tag:'\uD83C\uDDF2\uD83C\uDDFE PROMOSI HARI MALAYSIA \u00b7 TERHAD',
    headline:'SELAMAT HARI MALAYSIA',
    sub:'Bersatu Teguh, Bercerai Roboh \u00b7 Malaysia',
    cta:'TUNTUT TAWARAN HARI MALAYSIA \u2192',
    tint:'rgba(0,18,0,.66)',
    vidFilter:'hue-rotate(100deg) saturate(2) brightness(.45)',
    c1:'#FFD700',c2:'#CC0001',c3:'#005CB8',glow:'255,215,0',
    emojis:['\uD83C\uDDF2\uD83C\uDDFE','⭐','🌙','❤️','💛','💙','🌿','⚪','🎆'],
    canvas:paintMerdeka,
  },
};

// ─── CANVAS PAINTERS ─────────────────────────────────────

function paintBirthday(canvas,t){
  const ctx=canvas.getContext('2d');let frame=0;
  const streamers=Array.from({length:80},()=>({x:Math.random()*canvas.width,y:(Math.random()-1.3)*canvas.height,vx:(Math.random()-.5)*1.8,vy:.5+Math.random()*2.2,len:10+Math.random()*55,angle:Math.random()*Math.PI*2,spin:(Math.random()-.5)*.13,color:[t.c1,t.c2,t.c3,'#FF8FD8','#FFFFFF','#FFB3E6'][Math.floor(Math.random()*6)],w:2+Math.random()*5,wind:0,windT:(Math.random()-.5)*.4}));
  const rings=Array.from({length:12},(_,i)=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:0,maxR:80+Math.random()*150,speed:.3+Math.random()*.8,color:[t.c1,t.c2,t.c3][i%3],born:Math.random()*200}));
  return function(){
    frame++;const W=canvas.width,H=canvas.height;ctx.clearRect(0,0,W,H);
    const gWind=Math.sin(frame*.007)*.22;
    rings.forEach(r=>{if(frame<r.born)return;r.r+=r.speed;const a=Math.max(0,1-r.r/r.maxR);if(r.r>r.maxR){r.r=0;r.x=Math.random()*W;r.y=Math.random()*H;r.born=frame+Math.random()*280;}ctx.beginPath();ctx.arc(r.x,r.y,r.r,0,Math.PI*2);ctx.strokeStyle=r.color+Math.floor(a*55).toString(16).padStart(2,'0');ctx.lineWidth=1;ctx.stroke();});
    streamers.forEach(s=>{s.windT+=(Math.random()-.5)*.04;s.windT=Math.max(-.7,Math.min(.7,s.windT));s.wind+=(s.windT-s.wind)*.025;s.x+=s.vx+gWind+s.wind;s.y+=s.vy;s.angle+=s.spin;s.vy=Math.min(s.vy+.008,3.5);if(s.y>H+80){s.y=-80;s.x=Math.random()*W;s.vy=.5+Math.random()*2;}ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.angle);const g=ctx.createLinearGradient(0,-s.len/2,0,s.len/2);g.addColorStop(0,s.color+'00');g.addColorStop(.45,s.color+'EE');g.addColorStop(.55,s.color+'FF');g.addColorStop(1,s.color+'00');ctx.fillStyle=g;ctx.fillRect(-s.w/2,-s.len/2,s.w,s.len);ctx.restore();});
    if(frame%6===0){const x=Math.random()*W,y=Math.random()*H;for(let i=0;i<4;i++){const a=Math.random()*Math.PI*2,d=2+Math.random()*9;ctx.beginPath();ctx.arc(x+Math.cos(a)*d,y+Math.sin(a)*d,Math.random()*1.8,0,Math.PI*2);ctx.fillStyle=(Math.random()>.5?t.c1:t.c2)+'BB';ctx.fill();}}
  };
}

function paintMerdeka(canvas,t){
  const ctx=canvas.getContext('2d');let frame=0;
  const stars=Array.from({length:180},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:.15+Math.random()*1.8,pulse:Math.random()*Math.PI*2,speed:.012+Math.random()*.038,drift:Math.random()*Math.PI*2}));
  const beams=Array.from({length:18},(_,i)=>({angle:(i/18)*Math.PI*2,speed:.0016+Math.random()*.0025,color:i%2===0?t.c1:t.c2,w:20+Math.random()*20}));
  return function(){
    frame++;const W=canvas.width,H=canvas.height;ctx.clearRect(0,0,W,H);
    const cx=W*.5,cy=H*.36;
    beams.forEach(b=>{b.angle+=b.speed;ctx.beginPath();ctx.moveTo(cx,cy);ctx.lineTo(cx+Math.cos(b.angle)*W*1.9,cy+Math.sin(b.angle)*H*1.9);ctx.strokeStyle=b.color+'0B';ctx.lineWidth=b.w;ctx.stroke();});
    stars.forEach(s=>{s.pulse+=s.speed;s.drift+=.004;s.x+=Math.sin(s.drift)*.06;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,215,0,${.1+.48*Math.sin(s.pulse)})`;ctx.fill();});
    const mx=W*.8,my=H*.16,mr=58;
    ctx.beginPath();ctx.arc(mx,my,mr,0,Math.PI*2);ctx.fillStyle=t.c1+'18';ctx.fill();
    ctx.beginPath();ctx.arc(mx+22,my-11,mr*.81,0,Math.PI*2);ctx.fillStyle='rgba(0,8,0,.96)';ctx.fill();
    ctx.save();ctx.translate(mx-38,my+54);for(let i=0;i<14;i++){ctx.rotate(Math.PI/7);ctx.beginPath();ctx.moveTo(0,-7);ctx.lineTo(1.2,0);ctx.lineTo(0,7);ctx.lineTo(-1.2,0);ctx.closePath();ctx.fillStyle=t.c1+'50';ctx.fill();}ctx.restore();
  };
}

function paintRaya(canvas,t){
  const ctx=canvas.getContext('2d');let frame=0;
  const lanterns=Array.from({length:16},(_,i)=>({x:(i/16)*canvas.width+Math.random()*55-27,y:canvas.height*.02+Math.random()*canvas.height*.28,r:12+Math.random()*22,sway:Math.random()*Math.PI*2,swaySpeed:.007+Math.random()*.011,color:[t.c1,t.c2,'#FF9900'][i%3],glow:Math.random()*Math.PI*2}));
  const stars=Array.from({length:130},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height*.65,r:.15+Math.random()*2,twinkle:Math.random()*Math.PI*2,speed:.018+Math.random()*.055}));
  const tiles=Array.from({length:22},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,size:16+Math.random()*40,alpha:.03+Math.random()*.055,rot:Math.random()*Math.PI*.25}));
  return function(){
    frame++;const W=canvas.width,H=canvas.height;ctx.clearRect(0,0,W,H);
    tiles.forEach(tile=>{ctx.save();ctx.translate(tile.x,tile.y);ctx.rotate(tile.rot);ctx.strokeStyle=t.c1+Math.floor(tile.alpha*255).toString(16).padStart(2,'0');ctx.lineWidth=.45;const s=tile.size;ctx.beginPath();for(let i=0;i<8;i++){const a=(i/8)*Math.PI*2-Math.PI/8,r2=i%2===0?s:s*.42;i===0?ctx.moveTo(Math.cos(a)*r2,Math.sin(a)*r2):ctx.lineTo(Math.cos(a)*r2,Math.sin(a)*r2);}ctx.closePath();ctx.stroke();ctx.restore();});
    stars.forEach(s=>{s.twinkle+=s.speed;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,215,0,${.1+.6*Math.abs(Math.sin(s.twinkle))})`;ctx.fill();});
    lanterns.forEach(l=>{l.sway+=l.swaySpeed;l.glow+=.04;const x=l.x+Math.sin(l.sway)*14,y=l.y;const gp=.7+.3*Math.sin(l.glow);ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,y-l.r-2);ctx.strokeStyle=l.color+'30';ctx.lineWidth=.8;ctx.stroke();const grd=ctx.createRadialGradient(x,y,0,x,y,l.r*3.5);grd.addColorStop(0,l.color+Math.floor(gp*42).toString(16).padStart(2,'0'));grd.addColorStop(1,'transparent');ctx.beginPath();ctx.arc(x,y,l.r*3.5,0,Math.PI*2);ctx.fillStyle=grd;ctx.fill();ctx.beginPath();ctx.ellipse(x,y,l.r*.64,l.r,0,0,Math.PI*2);ctx.fillStyle=l.color+Math.floor(gp*175).toString(16).padStart(2,'0');ctx.fill();ctx.beginPath();ctx.ellipse(x-l.r*.17,y-l.r*.27,l.r*.16,l.r*.3,-.35,0,Math.PI*2);ctx.fillStyle='rgba(255,255,255,.24)';ctx.fill();});
    const mx=W*.84,my=H*.12;ctx.beginPath();ctx.arc(mx,my,44,0,Math.PI*2);ctx.fillStyle=t.c1+'12';ctx.fill();ctx.beginPath();ctx.arc(mx+17,my-9,37,0,Math.PI*2);ctx.fillStyle='rgba(18,7,0,.97)';ctx.fill();
  };
}

function paintNewYear(canvas,t){
  const ctx=canvas.getContext('2d');const bursts=[];let started=false;
  setTimeout(()=>{started=true;},500);
  const rockets=Array.from({length:9},()=>({x:0,y:0,vy:0,ty:0,trail:[],active:false,nextLaunch:Date.now()+Math.random()*2200}));
  function launch(r){const W=canvas.width,H=canvas.height;r.x=W*.08+Math.random()*W*.84;r.y=H;r.vy=-(9+Math.random()*8);r.ty=H*.06+Math.random()*H*.44;r.trail=[];r.active=true;}
  function explode(x,y){const cols=[t.c1,t.c2,'#FFF','#FFD','#AFF','#FAF','#FFA'];const n=36+Math.floor(Math.random()*18);for(let i=0;i<n;i++){const a=(i/n)*Math.PI*2+Math.random()*.4,sp=1.5+Math.random()*5;bursts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,alpha:1,r:1.5+Math.random()*4,color:cols[Math.floor(Math.random()*cols.length)],gravity:.038+Math.random()*.04});}for(let i=0;i<22;i++){const a=(i/22)*Math.PI*2,sp=3.5+Math.random()*2.5;bursts.push({x,y,vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,alpha:.9,r:.7,color:'#FFF',gravity:.028});}}
  return function(){
    if(!started)return;const W=canvas.width,H=canvas.height;
    ctx.fillStyle='rgba(0,0,26,.11)';ctx.fillRect(0,0,W,H);
    rockets.forEach(r=>{if(!r.active&&Date.now()>r.nextLaunch)launch(r);if(!r.active)return;r.trail.push({x:r.x,y:r.y});if(r.trail.length>30)r.trail.shift();r.y+=r.vy;r.vy*=.985;r.trail.forEach((pt,i)=>{const a=i/r.trail.length;ctx.beginPath();ctx.arc(pt.x,pt.y,1.8*a,0,Math.PI*2);ctx.fillStyle=`rgba(255,235,80,${a*.9})`;ctx.fill();});if(r.y<=r.ty||r.vy>-1){explode(r.x,r.y);r.active=false;r.nextLaunch=Date.now()+1000+Math.random()*2800;}});
    for(let i=bursts.length-1;i>=0;i--){const b=bursts[i];b.x+=b.vx;b.y+=b.vy;b.vy+=b.gravity;b.alpha-=.014;b.vx*=.972;b.vy*=.972;if(b.alpha<=0){bursts.splice(i,1);continue;}ctx.beginPath();ctx.arc(b.x,b.y,b.r*Math.max(.12,b.alpha),0,Math.PI*2);ctx.fillStyle=b.color+Math.floor(b.alpha*255).toString(16).padStart(2,'0');ctx.fill();}
  };
}

function paintChristmas(canvas,t){
  const ctx=canvas.getContext('2d');let frame=0;
  const snow=Array.from({length:160},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,r:.35+Math.random()*3.8,vy:.15+Math.random()*1.4,vx:(Math.random()-.5)*.4,wobble:Math.random()*Math.PI*2,alpha:.2+Math.random()*.78,spin:0,spinSpeed:(Math.random()-.5)*.024}));
  const stars=Array.from({length:60},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height*.56,r:.35+Math.random()*2.2,twinkle:Math.random()*Math.PI*2,speed:.022+Math.random()*.042}));
  return function(){
    frame++;const W=canvas.width,H=canvas.height;ctx.clearRect(0,0,W,H);
    stars.forEach(s=>{s.twinkle+=s.speed;ctx.beginPath();ctx.arc(s.x,s.y,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,205,${.18+.56*Math.abs(Math.sin(s.twinkle))})`;ctx.fill();});
    const tx=W*.1,ty=H*.55;[[tx,ty-118,60],[tx,ty-160,42],[tx,ty-198,26]].forEach(([x,y,w])=>{ctx.beginPath();ctx.moveTo(x,y-52);ctx.lineTo(x-w,y);ctx.lineTo(x+w,y);ctx.closePath();ctx.fillStyle=t.c3+'1E';ctx.fill();});
    ctx.save();ctx.translate(tx,ty-211);for(let i=0;i<5;i++){ctx.rotate((Math.PI*2)/5);ctx.beginPath();ctx.moveTo(0,-9);ctx.lineTo(2.2,0);ctx.lineTo(0,5);ctx.lineTo(-2.2,0);ctx.closePath();ctx.fillStyle=t.c2+Math.floor(100+120*Math.sin(frame*.1+i)).toString(16).padStart(2,'0');ctx.fill();}ctx.restore();
    const wind=Math.sin(frame*.006)*.26;
    snow.forEach(s=>{s.wobble+=.018;s.spin+=s.spinSpeed;s.x+=s.vx+wind+Math.sin(s.wobble)*.3;s.y+=s.vy;if(s.y>H+12){s.y=-12;s.x=Math.random()*W;}if(s.x<-12)s.x=W+12;if(s.x>W+12)s.x=-12;ctx.save();ctx.translate(s.x,s.y);ctx.rotate(s.spin);if(s.r>1.8){ctx.strokeStyle=`rgba(255,255,255,${s.alpha*.72})`;ctx.lineWidth=.6;for(let i=0;i<6;i++){ctx.rotate(Math.PI/3);ctx.beginPath();ctx.moveTo(0,0);ctx.lineTo(0,-s.r*2.4);ctx.stroke();ctx.beginPath();ctx.moveTo(0,-s.r*.88);ctx.lineTo(s.r*.44,-s.r*.44);ctx.stroke();ctx.beginPath();ctx.moveTo(0,-s.r*.88);ctx.lineTo(-s.r*.44,-s.r*.44);ctx.stroke();}}else{ctx.beginPath();ctx.arc(0,0,s.r,0,Math.PI*2);ctx.fillStyle=`rgba(255,255,255,${s.alpha})`;ctx.fill();}ctx.restore();});
  };
}

// ─── PROMO HTML ───────────────────────────────────────────
function buildPromoHTML(t){
  if(!IS_PROMO) return '';
  const p=CURRENT_PROMO;
  return `
  <div id="mm6-promo">
    <div id="mm6-promo-divider">
      <span style="color:rgba(255,215,0,.3)">✦</span>
      <span style="font-family:'DM Sans',sans-serif;font-size:.58rem;letter-spacing:.18em;color:rgba(255,215,0,.5)">${p.label||'TAWARAN EKSKLUSIF'}</span>
      <span style="color:rgba(255,215,0,.3)">✦</span>
    </div>
    <div id="mm6-countdown-wrap">
      <div class="mm6-cd-label">Tawaran tamat dalam:</div>
      <div id="mm6-countdown">
        <div class="mm6-cd-unit"><span id="mm6-cd-d">--</span><small>Hari</small></div>
        <div class="mm6-cd-sep">:</div>
        <div class="mm6-cd-unit"><span id="mm6-cd-h">--</span><small>Jam</small></div>
        <div class="mm6-cd-sep">:</div>
        <div class="mm6-cd-unit"><span id="mm6-cd-m">--</span><small>Minit</small></div>
        <div class="mm6-cd-sep">:</div>
        <div class="mm6-cd-unit"><span id="mm6-cd-s">--</span><small>Saat</small></div>
      </div>
      <div class="mm6-slots">🔥 Hanya <strong>${p.slots} slot</strong> tersisa!</div>
    </div>
    <div id="mm6-pkg-grid">
      ${p.packages.map((pkg,i)=>`
      <label class="mm6-pkg${i===1?' mm6-pkg-featured':''}" for="mm6-pkg-${i}">
        <input type="radio" name="mm6-pkg" id="mm6-pkg-${i}" value="${pkg.wa}"${i===1?' checked':''}>
        ${i===1?'<div class="mm6-pkg-badge">⭐ Popular</div>':''}
        <div class="mm6-pkg-name">${pkg.name}</div>
        <div class="mm6-pkg-prices">
          <span class="mm6-pkg-normal">${pkg.normal}</span>
          <span class="mm6-pkg-promo">${pkg.promo}</span>
        </div>
        <div class="mm6-pkg-save">${pkg.savings}</div>
      </label>`).join('')}
    </div>
  </div>`;
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
#mm6-vid{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);min-width:100%;min-height:100%;object-fit:cover;opacity:.55;filter:${t.vidFilter}}
#mm6-tint{position:absolute;inset:0;background:${t.tint}}
#mm6-cv{position:absolute;inset:0;width:100%;height:100%}
#mm6-vg{position:absolute;inset:0;background:radial-gradient(ellipse 75% 75% at 50% 50%,transparent 15%,rgba(0,0,0,.75) 70%,rgba(0,0,0,.92) 100%);pointer-events:none}
#mm6-scan{position:absolute;left:0;right:0;height:120px;pointer-events:none;z-index:3;background:linear-gradient(180deg,transparent,rgba(${t.glow},.06),transparent);animation:mm6Scan 10s ease-in-out infinite}
@keyframes mm6Scan{0%{top:-120px;opacity:0}5%{opacity:1}95%{opacity:1}100%{top:100%;opacity:0}}
#mm6-center{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;overflow-y:auto;padding:1rem 0}
#mm6-card{position:relative;text-align:center;padding:clamp(1.4rem,3vw,2.8rem) clamp(1.4rem,5vw,4rem) clamp(1.4rem,3vw,2.8rem);max-width:620px;width:88vw;background:rgba(0,0,0,.56);backdrop-filter:blur(40px) saturate(160%);-webkit-backdrop-filter:blur(40px);border:1px solid rgba(${t.glow},.14);box-shadow:0 0 0 1px rgba(${t.glow},.04),0 60px 140px rgba(0,0,0,.95),inset 0 1px 0 rgba(${t.glow},.1);animation:mm6Card 1.5s cubic-bezier(.16,1,.3,1) .3s both;will-change:transform;transition:transform .1s ease,box-shadow .12s ease;margin:auto}
@keyframes mm6Card{from{transform:translateY(55px) scale(.93);opacity:0}to{opacity:1}}
#mm6-card::before{content:'';position:absolute;top:0;left:15%;right:15%;height:1px;background:linear-gradient(90deg,transparent,rgba(${t.glow},.7),rgba(${t.glow},.4),transparent)}
.mm6-c{position:absolute;width:14px;height:14px;border-color:${t.c1};border-style:solid;transition:all .4s ease}
.mm6-c.a{top:-1px;left:-1px;border-width:2px 0 0 2px}.mm6-c.b{top:-1px;right:-1px;border-width:2px 2px 0 0}
.mm6-c.c{bottom:-1px;left:-1px;border-width:0 0 2px 2px}.mm6-c.d{bottom:-1px;right:-1px;border-width:0 2px 2px 0}
#mm6-card:hover .mm6-c{width:22px;height:22px}
#mm6-logo-wrap{position:relative;display:flex;align-items:center;justify-content:center;margin-bottom:.9rem;animation:mm6LogoIn 1.2s cubic-bezier(.16,1,.3,1) 1s both}
@keyframes mm6LogoIn{0%{opacity:0;transform:scale(.3) rotate(-20deg);filter:blur(12px)}55%{opacity:1;transform:scale(1.1) rotate(3deg)}75%{transform:scale(.96) rotate(-1deg)}100%{opacity:1;transform:none;filter:blur(0)}}
#mm6-logo-glow{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:160%;height:160%;border-radius:50%;background:radial-gradient(ellipse at center,rgba(${t.glow},.35) 0%,transparent 70%);animation:mm6GlowPulse 3s ease-in-out 2.5s infinite;pointer-events:none}
@keyframes mm6GlowPulse{0%,100%{transform:translate(-50%,-50%) scale(1);opacity:.6}50%{transform:translate(-50%,-50%) scale(1.3);opacity:1}}
#mm6-logo-img{width:clamp(65px,12vw,100px);height:clamp(65px,12vw,100px);object-fit:contain;position:relative;z-index:1;border-radius:50%;mix-blend-mode:screen;filter:drop-shadow(0 0 20px rgba(${t.glow},.5)) brightness(1.4) contrast(1.1);animation:mm6LogoFloat 4s ease-in-out 2.5s infinite}
@keyframes mm6LogoFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-7px)}}
#mm6-tag{display:inline-flex;align-items:center;gap:.5rem;font-family:'DM Sans',sans-serif;font-size:.54rem;font-weight:600;letter-spacing:.16em;color:${t.c1};border:1px solid rgba(${t.glow},.22);padding:.26rem .85rem;border-radius:2px;margin-bottom:.65rem;background:rgba(${t.glow},.07);animation:mm6Up .7s ease 1.8s both}
#mm6-tag::before,#mm6-tag::after{content:'';flex:none;width:8px;height:1px;background:rgba(${t.glow},.5)}
@keyframes mm6Up{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
#mm6-rule{display:flex;align-items:center;justify-content:center;gap:.7rem;margin:.5rem 0;animation:mm6Up .6s ease 2s both}
#mm6-rule::before,#mm6-rule::after{content:'';display:block;width:36px;height:1px;background:linear-gradient(90deg,transparent,rgba(${t.glow},.65))}
.mm6-diamond{width:5px;height:5px;background:${t.c1};transform:rotate(45deg);box-shadow:0 0 8px ${t.c1}}
#mm6-hl{font-family:'Bebas Neue',sans-serif;font-size:clamp(1.2rem,3.2vw,2rem);letter-spacing:.14em;color:#fff;line-height:1.05;animation:mm6Up .7s ease 2.1s both}
#mm6-sub{font-family:'DM Sans',sans-serif;font-size:clamp(.65rem,1.4vw,.76rem);font-weight:300;color:rgba(255,255,255,.33);letter-spacing:.05em;line-height:1.85;margin-top:.3rem;animation:mm6Up .7s ease 2.3s both}
/* ── PROMO ── */
#mm6-promo{animation:mm6Up .7s ease 2.4s both;margin-top:.65rem}
#mm6-promo-divider{display:flex;align-items:center;justify-content:center;gap:.5rem;margin:.55rem 0}
#mm6-countdown-wrap{margin-bottom:.65rem}
.mm6-cd-label{font-family:'DM Sans',sans-serif;font-size:.56rem;letter-spacing:.14em;color:rgba(255,255,255,.28);margin-bottom:.3rem}
#mm6-countdown{display:flex;align-items:center;justify-content:center;gap:.28rem}
.mm6-cd-unit{display:flex;flex-direction:column;align-items:center;min-width:40px;background:rgba(255,215,0,.07);border:1px solid rgba(255,215,0,.14);border-radius:4px;padding:.26rem .38rem}
.mm6-cd-unit span{font-family:'Bebas Neue',sans-serif;font-size:1.3rem;line-height:1;color:${t.c1}}
.mm6-cd-unit small{font-family:'DM Sans',sans-serif;font-size:.46rem;color:rgba(255,255,255,.26);letter-spacing:.08em;margin-top:.08rem}
.mm6-cd-sep{font-family:'Bebas Neue',sans-serif;font-size:1.1rem;color:rgba(255,215,0,.32);margin-bottom:.65rem}
.mm6-slots{font-family:'DM Sans',sans-serif;font-size:.6rem;color:rgba(255,255,255,.32);margin-top:.3rem}
.mm6-slots strong{color:#FF6B6B}
#mm6-pkg-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:.35rem;margin:.5rem 0 .65rem}
.mm6-pkg{position:relative;cursor:pointer;border:1px solid rgba(255,255,255,.07);border-radius:6px;padding:.45rem .28rem;background:rgba(255,255,255,.025);transition:all .2s ease;text-align:center}
.mm6-pkg input{position:absolute;opacity:0;width:0;height:0}
.mm6-pkg:hover,.mm6-pkg:has(input:checked){border-color:${t.c1};background:rgba(255,215,0,.07);box-shadow:0 0 10px rgba(${t.glow},.12)}
.mm6-pkg-featured{border-color:rgba(255,215,0,.18)!important}
.mm6-pkg-badge{position:absolute;top:-7px;left:50%;transform:translateX(-50%);background:${t.c1};color:#000;font-family:'DM Sans',sans-serif;font-size:.42rem;font-weight:700;padding:.12rem .35rem;border-radius:2px;white-space:nowrap}
.mm6-pkg-name{font-family:'DM Sans',sans-serif;font-size:.5rem;font-weight:600;color:rgba(255,255,255,.5);margin-bottom:.15rem}
.mm6-pkg-prices{display:flex;flex-direction:column;align-items:center;gap:.06rem}
.mm6-pkg-normal{font-family:'DM Sans',sans-serif;font-size:.5rem;color:rgba(255,255,255,.2);text-decoration:line-through}
.mm6-pkg-promo{font-family:'Bebas Neue',sans-serif;font-size:.9rem;color:${t.c1};line-height:1}
.mm6-pkg-save{font-family:'DM Sans',sans-serif;font-size:.44rem;color:${t.c2};margin-top:.1rem}
#mm6-btn{display:inline-flex;align-items:center;justify-content:center;gap:.5rem;margin-top:.45rem;padding:.82rem 2rem;font-family:'Bebas Neue',sans-serif;font-size:.88rem;letter-spacing:.28em;cursor:pointer;border:none;position:relative;overflow:hidden;transition:transform .2s ease,box-shadow .2s ease;animation:mm6Up .7s ease 2.5s both;background:${t.c1};color:#000;clip-path:polygon(10px 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%,0 10px);width:100%}
#mm6-btn::before{content:'';position:absolute;top:0;left:-120%;width:55%;height:100%;background:linear-gradient(105deg,transparent,rgba(255,255,255,.5),transparent);transition:left .5s ease}
#mm6-btn:hover{transform:translateY(-3px);box-shadow:0 0 40px rgba(${t.glow},.5)}
#mm6-btn:hover::before{left:150%}
#mm6-btn:active{transform:scale(.97)}
#mm6-skip{display:block;margin-top:.4rem;font-family:'DM Sans',sans-serif;font-size:.56rem;color:rgba(255,255,255,.16);cursor:pointer;border:none;background:none;width:100%;padding:.26rem;transition:color .2s;letter-spacing:.08em}
#mm6-skip:hover{color:rgba(255,255,255,.35)}
#mm6-prog{position:absolute;bottom:0;left:0;right:0;height:2px;background:rgba(${t.glow},.08);overflow:hidden}
#mm6-bar{height:100%;background:linear-gradient(90deg,${t.c2},${t.c1});transform-origin:left;animation:mm6Prog ${IS_PROMO?'25':'14'}s linear 2.5s both}
@keyframes mm6Prog{from{transform:scaleX(1)}to{transform:scaleX(0)}}
.mm6-pt{position:absolute;pointer-events:none;z-index:5;animation:mm6Float linear forwards;will-change:transform;user-select:none}
@keyframes mm6Float{0%{transform:translateY(108vh) rotate(0deg) scale(0);opacity:0}5%{opacity:1;transform:translateY(96vh) rotate(10deg) scale(1)}94%{opacity:.6}100%{transform:translateY(-12vh) rotate(600deg) scale(.2);opacity:0}}
.mm6-sp{position:absolute;border-radius:50%;animation:mm6Spark ease-out both;pointer-events:none}
@keyframes mm6Spark{0%{transform:translate(0,0) scale(1.8);opacity:1}100%{transform:translate(var(--dx),var(--dy)) scale(0);opacity:0}}
@media(max-width:480px){#mm6-card{padding:1.2rem .85rem 1.3rem;width:96vw}#mm6-btn{padding:.7rem .8rem;font-size:.8rem;letter-spacing:.18em}#mm6-logo-img{width:60px;height:60px}#mm6-pkg-grid{gap:.22rem}.mm6-pkg{padding:.35rem .16rem}.mm6-pkg-promo{font-size:.8rem}.mm6-cd-unit{min-width:32px}.mm6-cd-unit span{font-size:.95rem}}
`;}

// ─── COUNTDOWN ───────────────────────────────────────────
function startCountdown(){
  const deadline=new Date(CURRENT_PROMO.deadline);
  function tick(){
    if(!document.getElementById('mm6'))return;
    const diff=deadline-new Date();
    const set=(u,v)=>{const el=document.getElementById('mm6-cd-'+u);if(el)el.textContent=String(v).padStart(2,'0');};
    if(diff<=0){['d','h','m','s'].forEach(u=>set(u,0));return;}
    set('d',Math.floor(diff/86400000));
    set('h',Math.floor((diff%86400000)/3600000));
    set('m',Math.floor((diff%3600000)/60000));
    set('s',Math.floor((diff%60000)/1000));
    setTimeout(tick,1000);
  }
  setTimeout(tick,2600);
}

// ─── PARTICLES ───────────────────────────────────────────
function spawnPt(wrap,emojis){
  let n=0;
  function go(){
    if(n>=32||!document.getElementById('mm6'))return;n++;
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

function spawnSp(wrap,c1,c2){
  const cols=[c1,c2,'#fff','#ffe','#cff','#fcf'];
  function burst(){
    if(!document.getElementById('mm6'))return;
    const cx=12+Math.random()*76,cy=5+Math.random()*68;
    for(let i=0;i<22;i++){
      const a=(i/22)*Math.PI*2+Math.random()*.5,d=55+Math.random()*110;
      const el=document.createElement('div');el.className='mm6-sp';
      const c=cols[Math.floor(Math.random()*cols.length)],sz=2+Math.random()*5;
      el.style.cssText=`left:${cx}%;top:${cy}%;width:${sz}px;height:${sz}px;background:${c};box-shadow:0 0 ${sz*2.5}px ${c};--dx:${Math.cos(a)*d}px;--dy:${Math.sin(a)*d}px;animation-duration:${.5+Math.random()*.85}s;animation-delay:${Math.random()*.3}s`;
      wrap.appendChild(el);
      el.addEventListener('animationend',()=>el.remove());
    }
  }
  burst();setInterval(burst,1300);
}

// ─── TILT ────────────────────────────────────────────────
function initTilt(card,t){
  let active=true;
  const center=document.getElementById('mm6-center');
  function move(e){
    if(!active)return;
    const r=card.getBoundingClientRect(),cx=r.left+r.width/2,cy=r.top+r.height/2;
    const mx=e.touches?e.touches[0].clientX:e.clientX,my=e.touches?e.touches[0].clientY:e.clientY;
    const dx=(mx-cx)/(r.width/2),dy=(my-cy)/(r.height/2);
    card.style.transform=`perspective(1400px) rotateY(${dx*6}deg) rotateX(${-dy*6}deg) scale(1.02)`;
  }
  function leave(){card.style.transform='';}
  center.addEventListener('mousemove',move);center.addEventListener('mouseleave',leave);
  center.addEventListener('touchmove',move,{passive:true});
  return ()=>{active=false;center.removeEventListener('mousemove',move);center.removeEventListener('mouseleave',leave);};
}

// ─── RENDER ──────────────────────────────────────────────
function render(t){
  const style=document.createElement('style');style.id='mm6-css';style.textContent=buildCSS(t);
  document.head.appendChild(style);
  const wrap=document.createElement('div');wrap.id='mm6';
  wrap.innerHTML=`
    <div id="mm6-flash"></div>
    <div id="mm6-vid-wrap"><video id="mm6-vid" autoplay muted loop playsinline><source src="vx.mp4" type="video/mp4"></video></div>
    <div id="mm6-tint"></div><canvas id="mm6-cv"></canvas><div id="mm6-vg"></div><div id="mm6-scan"></div>
    <div id="mm6-center">
      <div id="mm6-card">
        <div class="mm6-c a"></div><div class="mm6-c b"></div><div class="mm6-c c"></div><div class="mm6-c d"></div>
        <div id="mm6-logo-wrap"><div id="mm6-logo-glow"></div><img id="mm6-logo-img" src="mx-x.png" alt="MaxMin"></div>
        <div id="mm6-tag">${t.tag}</div>
        <div id="mm6-rule"><div class="mm6-diamond"></div></div>
        <div id="mm6-hl">${t.headline}</div>
        <div id="mm6-sub">${t.sub}</div>
        ${buildPromoHTML(t)}
        <button id="mm6-btn">${t.cta}</button>
        ${IS_PROMO?'<button id="mm6-skip">Langkau \u2014 terus ke website</button>':''}
        <div id="mm6-prog"><div id="mm6-bar"></div></div>
      </div>
    </div>`;
  document.body.appendChild(wrap);

  const cv=document.getElementById('mm6-cv');
  const size=()=>{cv.width=window.innerWidth;cv.height=window.innerHeight;};
  size();window.addEventListener('resize',size);
  const drawFrame=t.canvas(cv,t);
  let raf;(function loop(){drawFrame();raf=requestAnimationFrame(loop);})();

  const removeTilt=initTilt(document.getElementById('mm6-card'),t);
  spawnPt(wrap,t.emojis);
  spawnSp(wrap,t.c1,t.c2);
  if(IS_PROMO) startCountdown();

  function dismiss(){
    cancelAnimationFrame(raf);removeTilt();
    wrap.style.transition='opacity 1s ease,transform 1s ease';
    wrap.style.opacity='0';wrap.style.transform='scale(1.04)';
    setTimeout(()=>{wrap.remove();document.getElementById('mm6-css')?.remove();window.removeEventListener('resize',size);},1000);
  }

  document.getElementById('mm6-btn').addEventListener('click',()=>{
    if(IS_PROMO){
      const sel=wrap.querySelector('input[name="mm6-pkg"]:checked');
      const pkg=sel?sel.value:(CURRENT_PROMO.packages[1]||CURRENT_PROMO.packages[0]).wa;
      const label=encodeURIComponent(CURRENT_PROMO.label||'Promosi');
      const msg=`Salam+MaxMin!+%F0%9F%91%8B%0A%0ASaya+berminat+dengan+*${label}*%0A%0APakej%3A+*${pkg}*%0A%0ASaya+scan+QR+dari+poster+anda.+Boleh+tahu+lebih+lanjut%3F`;
      window.open(`https://wa.me/${WA}?text=${msg}`,'_blank');
      setTimeout(dismiss,400);
    } else { dismiss(); }
  });

  const skip=document.getElementById('mm6-skip');
  if(skip) skip.addEventListener('click',dismiss);
  setTimeout(dismiss, IS_PROMO?25000:14000);
}

// ─── INIT ────────────────────────────────────────────────
function init(){
  const key='mm6_shown_'+new Date().toISOString().split('T')[0];
  if(sessionStorage.getItem(key))return;
  sessionStorage.setItem(key,'1');
  const t=THEMES[TODAY_THEME];
  if(!t)return;
  render(t);
}

if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
else setTimeout(init,100);

})();