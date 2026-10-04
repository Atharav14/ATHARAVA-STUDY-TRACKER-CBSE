const $=s=>document.querySelector(s),K="atharava_cbse_v2";
const ld=d=>new Date(d.getTime()-d.getTimezoneOffset()*6e4).toISOString().slice(0,10),td=()=>ld(new Date());
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const SUBS=["Science","Mathematics","Social Science"];
const mk=o=>{const r={};for(const k in o)r[k]=o[k].split("|");return r};
const DATA={10:mk({"Science":"Chemical Reactions and Equations|Acids, Bases and Salts|Metals and Non-metals|Carbon and its Compounds|Life Processes|Control and Coordination|How do Organisms Reproduce?|Heredity|Light – Reflection and Refraction|Human Eye and Colourful World|Electricity|Magnetic Effects of Electric Current|Our Environment",
"Mathematics":"Real Numbers|Polynomials|Pair of Linear Equations in Two Variables|Quadratic Equations|Arithmetic Progressions|Triangles|Coordinate Geometry|Introduction to Trigonometry|Applications of Trigonometry|Circles|Areas Related to Circles|Surface Areas and Volumes|Statistics|Probability",
"Social Science":"Rise of Nationalism in Europe|Nationalism in India|The Making of a Global World|The Age of Industrialisation|Print Culture and the Modern World|Resources and Development|Forest and Wildlife Resources|Water Resources|Agriculture|Minerals and Energy Resources|Manufacturing Industries|Lifelines of National Economy|Power Sharing|Federalism|Gender, Religion and Caste|Political Parties|Outcomes of Democracy|Development|Sectors of the Indian Economy|Money and Credit|Globalisation and the Indian Economy|Consumer Rights"}),
9:mk({"Science":"Matter in Our Surroundings|Is Matter Around Us Pure?|Atoms and Molecules|Structure of the Atom|The Fundamental Unit of Life|Tissues|Motion|Force and Laws of Motion|Gravitation|Work and Energy|Sound|Improvement in Food Resources",
"Mathematics":"Number Systems|Polynomials|Coordinate Geometry|Linear Equations in Two Variables|Introduction to Euclid's Geometry|Lines and Angles|Triangles|Quadrilaterals|Circles|Heron's Formula|Surface Areas and Volumes|Statistics",
"Social Science":"The French Revolution|Socialism in Europe|Nazism and the Rise of Hitler|Forest Society and Colonialism|Pastoralists in the Modern World|India – Size and Location|Physical Features of India|Drainage|Climate|Natural Vegetation and Wildlife|Population|What is Democracy?|Constitutional Design|Electoral Politics|Working of Institutions|Democratic Rights|The Story of Village Palampur|People as Resource|Poverty as a Challenge|Food Security in India"})};
const SG=["NCERT Questions","NCERT Exemplar Questions","Previous Year Questions","Competency Focused Questions"];
const stages=s=>[s=="Mathematics"?"Concepts and Formulae":"Theory Read",...SG];
const mkProf=(name,cls)=>({id:Date.now().toString(36)+Math.random().toString(36).slice(2,5),name,cls,ch:{},ex:{},log:{},exam:{"Science":"2026-12-11","Mathematics":"2026-12-15","Social Science":"2026-12-19"}});
const fresh=()=>{const p=mkProf("Atharava Mishra",10);return{theme:"dark",active:p.id,profiles:[p]}};
let S;try{S=JSON.parse(localStorage.getItem(K))}catch(e){}
if(!S||!S.profiles||!S.profiles.length)S=fresh();
const save=()=>{try{localStorage.setItem(K,JSON.stringify(S))}catch(e){}};
const P=()=>S.profiles.find(p=>p.id==S.active)||S.profiles[0];
let FEDIT=false,FSUB="Science",TAB="home",SUBV="Science",FL="all",OPEN=new Set(),SYL=false,DELC=null,RST=false;
const gs=(s,i)=>P().ch[s+"|"+i]||[0,0,0,0,0],inc=(s,i)=>!P().ex[s+"|"+i];
const COL={"Science":"#22c55e","Mathematics":"#3b82f6","Social Science":"#f97316"};
const GR={10:[[0,"History"],[5,"Geography"],[12,"Civics"],[17,"Economics"]],9:[[0,"History"],[5,"Geography"],[11,"Civics"],[16,"Economics"]]};
let UNDO=null,TT,Q="",TM={left:1500,run:false,iv:null,mode:"Focus"};
function toast(t,u){const e=$("#toast");e.firstChild.textContent=t;e.lastChild.style.display=u?"":"none";e.style.display="flex";clearTimeout(TT);TT=setTimeout(()=>e.style.display="none",5000)}
function setS(s,i,j,val,quiet){const p=P(),k=s+"|"+i,a=gs(s,i).slice(),o=a[j];if(o==val)return;a[j]=val;p.ch[k]=a;
 const L=p.log[td()]=p.log[td()]||{};
 if(val==2)L[s]=(L[s]||0)+1;else if(o==2)L[s]=Math.max(0,(L[s]||0)-1);
 if(quiet)return;save();render();UNDO=[s,i,j,o];toast(a.every(v=>v==2)?"Chapter complete! 🎉":"Stage updated",1)}
const cycle=(s,i,j)=>setS(s,i,j,(gs(s,i)[j]+1)%3);
const applyQ=()=>document.querySelectorAll(".ch").forEach(el=>el.style.display=el.querySelector("summary").textContent.toLowerCase().includes(Q.toLowerCase())?"":"none");
document.addEventListener("input",e=>{if(e.target.id=="q"){Q=e.target.value;applyQ()}});
const fmt=n=>String(Math.floor(n/60)).padStart(2,"0")+":"+String(n%60).padStart(2,"0");
const mins=()=>(P().mins||{})[td()]||0;
function timerCard(){return `<div class="card"><h3>⏱ Study Timer</h3><div class="tm" id="tmd">${fmt(TM.left)}</div><div class="sm" style="text-align:center">${TM.mode} session · ${mins()} min studied today</div><div class="row3" style="justify-content:center"><button class="bt p" data-act="tgo">${TM.run?"Pause":"Start"}</button><button class="bt" data-act="trs">Reset</button></div></div>`}
function tick(){TM.left--;if(TM.left<=0){if(TM.mode=="Focus"){const p=P();p.mins=p.mins||{};p.mins[td()]=(p.mins[td()]||0)+25;save();TM.mode="Break";TM.left=300;toast("Focus session done! Take a 5 min break ☕")}else{TM.mode="Focus";TM.left=1500;toast("Break over. Ready for the next one?")}if(TAB=="home")render()}
 const e=$("#tmd");if(e)e.textContent=fmt(TM.left)}
function pred(a){const n=a.length;if(n<2)return null;const mx=(n-1)/2,my=a.reduce((x,y)=>x+y,0)/n;let sx=0,sy=0;a.forEach((y,i)=>{sx+=(i-mx)*(y-my);sy+=(i-mx)**2});return Math.max(0,Math.min(100,Math.round(my+sx/sy*(n-mx))))}
function extra(){const p=P(),now=new Date(),y=now.getFullYear(),m=now.getMonth(),nd=new Date(y,m+1,0).getDate(),off=(new Date(y,m,1).getDay()+6)%7;
 const tot=d=>Object.values(p.log[d]||{}).reduce((a,b)=>a+b,0);let cal="",wk=0,wm=0,best=["-",0],ws=null;
 for(let i=0;i<off;i++)cal+="<i></i>";for(let d=1;d<=nd;d++)cal+=`<i class="${tot(ld(new Date(y,m,d)))>0?"on":""}">${d}</i>`;
 for(let i=0;i<7;i++){const d=new Date();d.setDate(d.getDate()-i);const n=tot(ld(d));wk+=n;wm+=(p.mins||{})[ld(d)]||0;if(n>best[1])best=[d.toLocaleDateString("en",{weekday:"long"}),n]}
 SUBS.forEach(s=>{const x=stats(s);if(x.chn)x.per.forEach((n,j)=>{const c=n/x.chn;if(!ws||c<ws[0])ws=[c,s,stages(s)[j]]})});
 const D=SUBS.reduce((a,s)=>a+stats(s).done,0),tm=Object.values(p.mins||{}).reduce((a,b)=>a+b,0),ml=p.mocks||[];
 const B=[["🌱 First stage",D>=1],["📖 Chapter done",SUBS.some(s=>DATA[p.cls][s].some((_,i)=>gs(s,i).every(v=>v==2)))],["🔥 7-day streak",streak()>=7],["🎯 50% of a subject",SUBS.some(s=>stats(s).pct>=50)],["💯 100 stages",D>=100],["⏱ 10 hours",tm>=600]];
 const rows=SUBS.map(s=>{const a=ml.filter(t=>t.s==s).map(t=>Math.round(t.sc/t.mx*100)),pr=pred(a);return a.length?`<div class="sb"><b style="color:${COL[s]}">${s}</b> <span class="sm">${a.slice(-5).join("%, ")}%${pr!=null?` · Predicted next: <b>${pr}%</b>`:" · add one more test to get a prediction"}</span></div>`:""}).join("");
 return `<div class="card"><h3>📅 This Week</h3><div class="sm">Stages done: <b>${wk}</b> · Best day: <b>${best[0]}</b> · Study time: <b>${wm} min</b></div>${ws?`<div class="sm" style="margin-top:6px">💡 Work next on <b>${ws[2]}</b> in ${ws[1]} (${Math.round(ws[0]*100)}% done).</div>`:""}<button class="bt" data-act="print">🖨 Print report</button></div>
 <div class="card"><h3>🗓 ${now.toLocaleDateString("en",{month:"long",year:"numeric"})} Streak Calendar</h3><div class="cal">${cal}</div></div>
 <div class="card"><h3>🏅 Badges</h3>${B.map(([l,o])=>`<span class="bd ${o?"on":""}">${l}</span>`).join("")}</div>
 <div class="card"><h3>📝 Mock Tests &amp; Marks Prediction</h3><div class="sm">Add each test score. With 2+ tests per subject, a linear trend predicts your next score.</div>${rows}<div class="row3"><select id="ms" aria-label="Subject">${SUBS.map(s=>`<option>${s}</option>`).join("")}</select><input id="msc" type="number" min="0" placeholder="Score" aria-label="Score" style="width:80px"><input id="mmx" type="number" min="1" value="80" aria-label="Out of" style="width:80px"><button class="bt p" style="margin:0" data-act="madd">+ Add Test</button></div></div>`}
function stats(s){const cs=DATA[P().cls][s],per=[0,0,0,0,0],pg=[0,0,0,0,0];let tot=0,done=0,chp=0,chn=0;
 cs.forEach((_,i)=>{if(!inc(s,i))return;chn++;let all=1;tot+=5;gs(s,i).forEach((v,j)=>{if(v==2){done++;per[j]++}else{all=0;if(v==1)pg[j]++}});if(!all)chp++});
 const raw=Math.ceil((new Date(P().exam[s])-new Date(td()))/864e5),dl=Math.max(0,raw||0),pend=tot-done;
 return{tot,done,chp,chn,per,pg,pend,dl,pct:tot?Math.round(done/tot*100):0,need:+(pend/Math.max(1,dl)).toFixed(1)}}
const last7=s=>{let n=0;for(let i=0;i<7;i++){const d=new Date();d.setDate(d.getDate()-i);n+=((P().log[ld(d)]||{})[s]||0)}return n/7};
const ontrack=(x,s)=>x.pend==0||last7(s)>=x.need||x.need<=2;
function streak(){let n=0,d=new Date();const t=l=>Object.values(P().log[ld(l)]||{}).reduce((a,b)=>a+b,0)>0;if(!t(d))d.setDate(d.getDate()-1);while(t(d)){n++;d.setDate(d.getDate()-1)}return n}
const ring=(p,c="var(--ac)")=>`<svg class="rg" viewBox="0 0 36 36" role="img" aria-label="${p}% complete"><circle cx="18" cy="18" r="15.9" fill="none" stroke="var(--cd2)" stroke-width="3.5"/><circle cx="18" cy="18" r="15.9" fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round" pathLength="100" stroke-dasharray="${p} 100" transform="rotate(-90 18 18)"/><text x="18" y="21.5" text-anchor="middle" font-size="9" font-weight="700" fill="var(--tx)">${p}%</text></svg>`;
const dots=a=>`<span class="dots">${a.map(v=>`<i class="dt d${v}"></i>`).join("")}</span>`;

function home(){const p=P(),X={};
 const nx=SUBS.map(s=>[s,stats(s).dl]).filter(a=>a[1]>0).sort((a,b)=>a[1]-b[1])[0],QT=["Small steps every day beat a last-minute rush.","One chapter today is one worry less tomorrow.","Revise the weak topics first.","Consistency beats intensity."],
 ban=`<div class="ban">${nx?`⏳ <b>${nx[0]}</b> exam in <b>${nx[1]}</b> days. `:""}${QT[new Date().getDate()%QT.length]}</div>`;
 let h=`<div class="row"><div><h2>Hi, ${esc(p.name)}!</h2><div class="mu">Class ${p.cls} Exam Preparation (5 Preparation Stages)</div></div><span class="pill hot">🔥 ${streak()} Day Streak</span></div>${ban}<h3>Subject Preparation Status</h3><div class="grid">`;
 SUBS.forEach(s=>{const x=X[s]=stats(s),ok=ontrack(x,s);h+=`<div class="card sc" style="border-left-color:${COL[s]}"><div class="row"><b>${s}</b><span class="pill ${ok?"ok":"bad"}">${ok?"On Track":"Behind"}</span></div><div class="row2">${ring(x.pct,COL[s])}<div class="sm"><b>${x.dl} days left</b><br>${x.pend} stages pending (${x.chp}/${x.chn} ch).<br>Pace: <b>${x.need} stages/day</b></div></div></div>`});
 p.pins=p.pins||[];p.skip=p.skip||[];
 h+=`</div><div class="card"><div class="row"><h3 style="margin:0">🎯 Today's Focus (Next 3 Pending Stages)</h3><button class="tb" data-act="fedit">${FEDIT?"Done":"✏️ Edit"}</button></div>`;
 const pinned=[],auto=[];
 p.pins.forEach(k=>{const[s,i,j]=k.split("|"),n=(DATA[p.cls][s]||[])[+i];if(n!==undefined&&inc(s,+i)&&gs(s,+i)[+j]!=2)pinned.push([s,+i,+j,n,gs(s,+i)[+j]])});
 [...SUBS].sort((a,b)=>X[a].dl-X[b].dl).forEach(s=>DATA[p.cls][s].forEach((n,i)=>{if(!inc(s,i))return;gs(s,i).forEach((v,j)=>{const k=`${s}|${i}|${j}`;if(v!=2&&!p.skip.includes(k)&&!p.pins.includes(k))auto.push([s,i,j,n,v])})}));
 const f=[...pinned,...auto].slice(0,Math.max(3,pinned.length));
 h+=f.map(([s,i,j,n,v])=>{const k=`${s}|${i}|${j}`;return `<div class="fc"><div><div class="sj" style="color:${COL[s]}">${p.pins.includes(k)?"📌 ":""}${s}</div><b>Ch ${i+1}: ${esc(n)}</b><div class="sm">${stages(s)[j]}</div></div>${FEDIT?`<button class="bt bad" style="margin:0" data-fx="${k}" aria-label="Remove from focus">✕</button>`:`<button class="dt big d${v}" data-a="${k}" aria-label="Change status"></button>`}</div>`}).join("")||`<div class="mu">Nothing pending. 🎉</div>`;
 if(!FEDIT&&f.length)h+=`<button class="bt p" data-d1="${f[0][0]}|${f[0][1]}|${f[0][2]}">✔ Mark first focus done</button>`;
 if(FEDIT)h+=`<div class="pc"><div class="sm"><b>Add your own focus</b> (pinned to the top)</div><div class="row3"><select id="fs" aria-label="Subject">${SUBS.map(s=>`<option ${s==FSUB?"selected":""}>${s}</option>`).join("")}</select><select id="fc" aria-label="Chapter" style="flex:1;min-width:140px">${DATA[p.cls][FSUB].map((n,i)=>`<option value="${i}">Ch ${i+1}: ${esc(n)}</option>`).join("")}</select><select id="fg" aria-label="Stage">${stages(FSUB).map((l,j)=>`<option value="${j}">${l}</option>`).join("")}</select></div><div class="row3"><button class="bt p" style="margin:0" data-act="fadd">+ Add to Focus</button><button class="bt" style="margin:0" data-act="freset">Reset to automatic</button></div></div>`;
 return h+`</div>${timerCard()}<div class="sm" style="margin-top:8px">${FEDIT?"Tap ✕ to remove a stage from today's focus; the next pending one takes its place.":"Tap the dot to move a stage: pending → in progress → done."}</div>`}

function chapters(){const p=P(),s=SUBV,x=stats(s);
 let h=`<div class="card"><h2>${s} Chapters</h2><div class="sm">📅 <b>${x.dl} days left.</b> ${x.pend} stages pending across ${x.chn} chapters. Pace: <b>${x.need} stages/day</b>.</div><div class="tabs">${SUBS.map(t=>`<button class="tb ${t==s?"on":""}" data-sub="${t}">${t}</button>`).join("")}</div></div>
 <div class="tabs">${[["all","All Chapters"],["inc","Incomplete"],["done","Completed"]].map(([k,l])=>`<button class="tb ${FL==k?"on":""}" data-f="${k}">${l}</button>`).join("")}</div><input id="q" type="search" placeholder="🔍 Search chapters" aria-label="Search chapters" value="${esc(Q)}" style="width:100%;margin:4px 0">`;
 DATA[p.cls][s].forEach((n,i)=>{if(!inc(s,i))return;const a=gs(s,i),dn=a.every(v=>v==2);if((FL=="inc"&&dn)||(FL=="done"&&!dn))return;const k=s+"|"+i;
  const gh=s=="Social Science"?GR[p.cls].find(g=>g[0]==i):0;if(gh)h+=`<h3 style="color:${COL[s]}">${gh[1]}</h3>`;
  h+=`<details class="card ch" data-k="${k}" ${OPEN.has(k)?"open":""}><summary><span>Ch ${i+1}: ${esc(n)}</span><span class="sm2 mu">${a.filter(v=>v==2).length}/5</span>${dots(a)}</summary>${stages(s).map((l,j)=>`<button class="st" data-a="${s}|${i}|${j}"><span>${l}</span><i class="dt d${a[j]}"></i><em>${["Pending","In progress","Done"][a[j]]}</em></button>`).join("")}<div class="row3" style="padding:0 12px 10px"><button class="bt mini" data-all="${s}|${i}|2">✔ Mark all done</button><button class="bt mini" data-all="${s}|${i}|0">↺ Reset chapter</button></div></details>`});
 return h}

function insights(){const p=P(),ds=[];for(let i=6;i>=0;i--){const d=new Date();d.setDate(d.getDate()-i);ds.push(d)}
 const v=ds.map(d=>Object.values(p.log[ld(d)]||{}).reduce((a,b)=>a+b,0)),m=Math.max(1,...v);
 let h=`<h2>Study Insights &amp; Analytics</h2><div class="sm">Preparation progress for Class ${p.cls}.</div><div class="card"><div class="row"><h3>📊 7-Day Activity Trend</h3><span class="pill hot">🔥 ${streak()} Day Streak</span></div><div class="sm">Stages marked done per day across all subjects.</div><div class="chart">${ds.map((d,i)=>`<div>${v[i]}<b style="height:${v[i]/m*70}px"></b>${d.toLocaleDateString("en",{weekday:"short"})}</div>`).join("")}</div></div>${extra()}<h3>Subject Analytics</h3>`;
 SUBS.forEach(s=>{const x=stats(s),ok=ontrack(x,s),yp=last7(s),mx=Math.max(yp,x.need,.1),pc=x.per.map(n=>x.chn?Math.round(n/x.chn*100):0),lo=Math.min(...pc),hi=Math.max(...pc),st=stages(s),yv=+yp.toFixed(1);
  h+=`<div class="card"><div class="row"><b>${s}</b><span class="pill ${ok?"ok":"bad"}">${ok?"On Track":"Behind"}</span></div><div class="row2">${ring(x.pct,COL[s])}<div class="sm"><b>${x.pct}% Overall Complete</b><br>${x.done} / ${x.tot} stages done across ${x.chn} chapters in exam.</div></div>`;
  if(x.tot&&hi>lo)h+=`<div class="warn">Weakest spot: <b>${st[pc.indexOf(lo)]}</b> — only ${lo}% done vs ${hi}% for ${st[pc.indexOf(hi)]}.</div>`;
  h+=`<div class="pc"><div class="pr"><span>Your Pace (${yv}/day)</span><div class="bar"><i style="width:${yp/mx*100}%;background:var(--ok)"></i></div></div><div class="pr"><span>Target Pace (${x.need}/day)</span><div class="bar"><i style="width:${x.need/mx*100}%"></i></div></div><div class="sm">${yp>=x.need?`You're pacing at ${yv} stages/day, meeting your target of ${x.need}/day.`:`You need ${x.need} stages/day to finish on time.`}</div></div><div class="sm" style="margin-top:10px"><b>Stage Breakdown</b></div>`;
  st.forEach((l,j)=>{const n=x.chn||1;h+=`<div class="sb"><div class="row"><span>${l}</span><span class="sm">${x.per[j]} done, ${x.pg[j]} in progress, ${x.chn-x.per[j]-x.pg[j]} pending</span></div><div class="bar"><i style="width:${x.per[j]/n*100}%;background:var(--ok)"></i><i style="width:${x.pg[j]/n*100}%;background:var(--wp)"></i></div></div>`});
  h+="</div>"});return h}

function resources(){let h=`<h2>Class ${P().cls} Question Papers &amp; Resources</h2><div class="sm">Official sites open in a new tab and need an internet connection.</div>`;
 SUBS.forEach(s=>h+=`<h3 class="sh">${s.toUpperCase()}</h3><div class="card"><div class="lk"><a href="https://cbseacademic.nic.in/" target="_blank" rel="noopener">📄 CBSE sample papers &amp; previous year questions ↗</a><a href="https://ncert.nic.in/textbook.php" target="_blank" rel="noopener">📘 NCERT textbooks ↗</a><a href="https://ncert.nic.in/exemplar-problems.php" target="_blank" rel="noopener">📝 NCERT Exemplar problems ↗</a></div></div>`);return h}

function settings(){const p=P();
 let h=`<h2>Settings &amp; Profile Management</h2><div class="card"><h3>📚 Exam Syllabus Selection</h3><div class="sm">Choose which chapters count for your current exam so the daily pace is accurate.</div><button class="bt p" data-act="syl">${SYL?"Hide":"Edit"} Exam Syllabus Checklist</button>`;
 if(SYL)SUBS.forEach(s=>{h+=`<div class="sh2">${s}</div>`+DATA[p.cls][s].map((n,i)=>`<label class="ck"><input type="checkbox" data-sx="${s}|${i}" ${inc(s,i)?"checked":""}> Ch ${i+1}: ${esc(n)}</label>`).join("")});
 h+=`</div><div class="card"><h3>🗓 Exam Datesheet (Class ${p.cls})</h3>${SUBS.map((s,i)=>`<label class="sm" for="d${i}">${s} Exam Date</label><input type="date" id="d${i}" value="${p.exam[s]||""}">`).join("")}<button class="bt p" data-act="dates">Save Datesheet</button></div>
 <div class="card"><h3>💾 Device Transfer</h3><div class="sm">Copy this backup code to move progress to another device, or paste a saved code and load it.</div><textarea id="bk" rows="4" aria-label="Backup code"></textarea><div class="row3"><button class="bt p" data-act="bk">Show My Backup Code</button><button class="bt" data-act="ld">Load Backup Code</button></div><div class="sm" id="msg" role="status"></div></div>
 <div class="card"><h3>🎨 Appearance</h3><button class="bt" data-act="theme">Switch to ${S.theme=="dark"?"Light":"Dark"} Mode</button></div>
 <div class="card"><h3>👤 Profiles</h3>${S.profiles.map(q=>`<div class="row" style="margin-bottom:6px"><span><b>${esc(q.name)}</b> (Class ${q.cls}) ${q.id==S.active?"<em>[Active]</em>":""}</span>${S.profiles.length>1?`<button class="bt bad" style="margin:0" data-del="${q.id}">${DELC==q.id?"Tap to confirm":"Delete"}</button>`:""}</div>`).join("")}<div class="row3"><input id="pn" placeholder="Name" maxlength="30" aria-label="Profile name" style="flex:1"><select id="pc" aria-label="Class"><option>10</option><option>9</option></select><button class="bt" style="margin:0" data-act="add">+ Add Profile</button></div></div>
 <div class="card danger"><h3>⚠️ Danger Zone</h3><div class="sm">Clear all local data and reset the app.</div><button class="bt bad" data-act="reset">${RST?"Tap again to confirm":"Reset All App Data"}</button></div>`;return h}

function render(){document.documentElement.dataset.theme=S.theme;$("#thb").textContent=S.theme=="dark"?"☀ Light":"🌙 Dark";
 $("#prof").innerHTML=S.profiles.map(q=>`<option value="${q.id}" ${q.id==S.active?"selected":""}>${esc(q.name)} (Class ${q.cls})</option>`).join("");
 $("#app").innerHTML=({home,chapters,insights,resources,settings})[TAB]();applyQ();
 document.querySelectorAll("nav button").forEach(b=>b.classList.toggle("on",b.dataset.tab==TAB))}
const msg=t=>{render();const m=$("#msg");if(m)m.textContent=t};
$("#prof").onchange=e=>{S.active=e.target.value;save();render()};
document.addEventListener("change",e=>{if(e.target.id=="fs"){FSUB=e.target.value;render();return}const x=e.target.dataset.sx;if(x){const p=P();e.target.checked?delete p.ex[x]:p.ex[x]=1;save()}});
document.addEventListener("click",e=>{const t=e.target.closest("[data-tab],[data-sub],[data-f],[data-a],[data-act],[data-del],[data-fx],[data-all],[data-d1],summary");if(!t)return;const d=t.dataset;
 if(t.tagName=="SUMMARY"){const k=t.parentNode.dataset.k;OPEN.has(k)?OPEN.delete(k):OPEN.add(k);return}
 if(d.tab){TAB=d.tab;DELC=null;RST=false;render();scrollTo(0,0);return}
 if(d.sub){SUBV=d.sub;render();return}
 if(d.f){FL=d.f;render();return}
 if(d.a){const[s,i,j]=d.a.split("|");cycle(s,+i,+j);return}
 if(d.del){if(DELC==d.del){S.profiles=S.profiles.filter(q=>q.id!=d.del);if(S.active==d.del)S.active=S.profiles[0].id;DELC=null;save()}else DELC=d.del;render();return}
 if(d.fx){const p=P();p.pins=p.pins||[];p.skip=p.skip||[];const x=p.pins.indexOf(d.fx);if(x>=0)p.pins.splice(x,1);else p.skip.push(d.fx);save();render();return}
 if(d.all){const[s,i,v]=d.all.split("|");for(let j=0;j<5;j++)setS(s,+i,j,+v,true);UNDO=null;save();render();if(+v==2)toast("Chapter complete! 🎉");return}
 if(d.d1){const[s,i,j]=d.d1.split("|");setS(s,+i,+j,2);return}
 switch(d.act){
  case"undo":if(UNDO){setS(UNDO[0],UNDO[1],UNDO[2],UNDO[3],true);UNDO=null;save();render();$("#toast").style.display="none"}break;
  case"tgo":if(TM.run){clearInterval(TM.iv);TM.run=false}else{TM.run=true;TM.iv=setInterval(tick,1000)}render();break;
  case"trs":clearInterval(TM.iv);TM={left:1500,run:false,iv:null,mode:"Focus"};render();break;
  case"print":window.print();break;
  case"madd":{const p=P(),sc=$("#msc").value,mx=+$("#mmx").value;if(sc===""||!(mx>0)||+sc<0||+sc>mx){toast("Enter a valid score");break}p.mocks=p.mocks||[];p.mocks.push({d:td(),s:$("#ms").value,sc:+sc,mx});save();render();break}
  case"fedit":FEDIT=!FEDIT;render();break;
  case"fadd":{const p=P(),k=`${FSUB}|${$("#fc").value}|${$("#fg").value}`;p.pins=p.pins||[];p.skip=(p.skip||[]).filter(x=>x!=k);if(!p.pins.includes(k))p.pins.push(k);save();render();break}
  case"freset":{const p=P();p.pins=[];p.skip=[];save();render();break}
  case"theme":S.theme=S.theme=="dark"?"light":"dark";save();render();break;
  case"syl":SYL=!SYL;render();break;
  case"dates":{const p=P();SUBS.forEach((s,i)=>{const v=$("#d"+i).value;if(v)p.exam[s]=v});save();msg("Datesheet saved.");break}
  case"bk":$("#bk").value=JSON.stringify(S);$("#bk").select();break;
  case"ld":try{const o=JSON.parse($("#bk").value);if(!o.profiles||!o.profiles.length||!o.active)throw 0;S=o;if(S.theme!="light")S.theme="dark";save();msg("Backup loaded.")}catch(x){msg("That backup code isn't valid.")}break;
  case"add":{const n=$("#pn").value.trim();if(!n)break;const q=mkProf(n,+$("#pc").value);S.profiles.push(q);S.active=q.id;save();render();break}
  case"reset":if(RST){S=fresh();RST=false;save();render()}else{RST=true;render()}break}});
render();
