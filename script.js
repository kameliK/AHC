
(function(){
'use strict';

emailjs.init('3_O3uCJSp3VNPv1nj');

const AHC_MAIL  = 'info@ammanhousecommunity.com';
const SITE_URL  = 'https://www.ammanhousecommunity.com';
const SVC       = 'service_1hj5q4n';
const T_ADMIN   = 'template_application';
const T_OK      = 'template_approved';
const T_NO      = 'template_declined';

/* ── Nav ── */
const NAV=document.getElementById('NAV');
window.addEventListener('scroll',()=>NAV.classList.toggle('scrolled',scrollY>60),{passive:true});

/* ── Sticky bar ── */
const hero=document.querySelector('.hero');
const sBar=document.getElementById('sBar');
new IntersectionObserver(([e])=>sBar.classList.toggle('up',!e.isIntersecting),{threshold:.1}).observe(hero);

/* ── Toast ── */
function toast(m){const t=document.getElementById('TOAST');t.textContent=m;t.style.display='block';clearTimeout(t._t);t._t=setTimeout(()=>t.style.display='none',2800)}

/* ── Nav switching ── */
window.go=function(p,el){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.getElementById(p).classList.add('active');
  document.querySelectorAll('.nav-mid a').forEach(x=>x.classList.remove('active'));
  if(el)el.classList.add('active');
  scrollTo(0,0);
};
window.toggleMenu=function(){document.getElementById('BRG').classList.toggle('open');document.getElementById('MOB').classList.toggle('open')};
window.goMobile=function(p,el){go(p,null);document.querySelectorAll('.mob-menu a').forEach(x=>x.classList.remove('active'));el.classList.add('active');closeMenu()};
window.closeMenu=function(){document.getElementById('BRG').classList.remove('open');document.getElementById('MOB').classList.remove('open')};

/* ── Photo slider ── */
const photos=['https://i.imgur.com/6VXk57c.jpg','https://i.imgur.com/cwTVmwC.jpg','https://i.imgur.com/clMUoQb.jpg','https://i.imgur.com/KkkA2uh.jpg','https://i.imgur.com/8cIGjW9.jpg','https://i.imgur.com/Sej8wb1.jpg'];
const cols=[document.getElementById('C0'),document.getElementById('C1'),document.getElementById('C2')];
let cur2=['','',''];
function pick(ex){const p=photos.filter(x=>!ex.includes(x));return p[Math.floor(Math.random()*p.length)]}
function setSlide(i,url){
  const ss=cols[i].querySelectorAll('.slide');
  const a=cols[i].querySelector('.slide.on');
  const n=[...ss].find(s=>s!==a);
  n.style.backgroundImage=`url('${url}')`;
  a&&a.classList.remove('on');n.classList.add('on');cur2[i]=url;
}
cur2[0]=pick([]);cur2[1]=pick([cur2[0]]);cur2[2]=pick([cur2[0],cur2[1]]);
cols.forEach((c,i)=>{const s=c.querySelectorAll('.slide')[0];s.style.backgroundImage=`url('${cur2[i]}')`;s.classList.add('on')});
let ac=0,lt=0;
(function sl(ts){if(!lt)lt=ts;if(ts-lt>2200){setSlide(ac,pick(cur2));ac=(ac+1)%3;lt=ts}requestAnimationFrame(sl)})(0);

/* ── Countdown ── */
const EVT=new Date('2026-05-16T15:00:00').getTime();
function tick(){
  const d=EVT-Date.now();
  if(d<=0){document.getElementById('CDG').innerHTML='<div style="grid-column:1/-1;padding:32px;text-align:center;font-family:var(--display);font-size:2rem;letter-spacing:4px;color:var(--gold)">LIVE NOW</div>';return}
  const dd=Math.floor(d/86400000),hh=Math.floor((d%86400000)/3600000),mm=Math.floor((d%3600000)/60000),ss=Math.floor((d%60000)/1000);
  function set(id,v){const el=document.getElementById(id);if(!el)return;const s=String(v).padStart(2,'0');if(el.textContent!==s){el.textContent=s;el.classList.add('flash');setTimeout(()=>el.classList.remove('flash'),300)}}
  set('cd-d',dd);set('cd-h',hh);set('cd-m',mm);set('cd-s',ss);
}
tick();setInterval(tick,1000);

/* ── Scroll reveal ── */
const revObs=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');revObs.unobserve(e.target)}});
},{threshold:.1,rootMargin:'0px 0px -40px 0px'});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ── Subscribe ── */
window.footerSub=function(){
  const inp=document.getElementById('FE');
  const email=inp.value.trim();
  if(!email||!email.includes('@')){toast('Please enter a valid email');return}
  let s=[];try{s=JSON.parse(localStorage.getItem('ahc_s')||'[]')}catch(e){}
  if(s.includes(email)){toast('Already subscribed!');return}
  const fd=new FormData();fd.append('EMAIL',email);fd.append('b_d1aa58338fea67f63b071bded_39a0cc6c8f','');
  fetch('https://ammanhousecommunity.us12.list-manage.com/subscribe/post?u=d1aa58338fea67f63b071bded&id=39a0cc6c8f&f_id=0020f3e0f0',{method:'POST',mode:'no-cors',body:fd});
  Promise.all([emailjs.send(SVC,'template_7lt7xil',{subscriber_email:email,reply_to:email,to_email:email}),emailjs.send(SVC,'template_ulg12qa',{subscriber_email:email,reply_to:email,to_email:email})]).then(()=>{s.push(email);try{localStorage.setItem('ahc_s',JSON.stringify(s))}catch(e){}inp.value='';toast("Subscribed!")}).catch(()=>toast('Something went wrong.'));
};

/* ── Form submit ── */
window.submitForm=function(){
  const name=document.getElementById('f-name').value.trim();
  const age=document.getElementById('f-age').value.trim();
  const phone=document.getElementById('f-phone').value.trim();
  const ig=document.getElementById('f-ig').value.trim();
  const email=document.getElementById('f-email').value.trim();
  if(!name||!age||!phone||!ig||!email){toast('Please fill in all fields.');return}
  if(!email.includes('@')){toast('Invalid email address.');return}
  if(parseInt(age)<18){toast('Must be 18+ to apply.');return}
  const id='AHC-'+Date.now().toString(36).toUpperCase();
  const al=SITE_URL+'/?action=approve&email='+encodeURIComponent(email)+'&name='+encodeURIComponent(name)+'&id='+id;
  const dl=SITE_URL+'/?action=decline&email='+encodeURIComponent(email)+'&name='+encodeURIComponent(name)+'&id='+id;
  const btn=document.getElementById('FSUB');
  if(btn){btn.disabled=true;btn.textContent='Sending…'}
  emailjs.send(SVC,T_ADMIN,{to_email:AHC_MAIL,app_id:id,applicant_name:name,applicant_age:age,applicant_phone:phone,applicant_instagram:ig,applicant_email:email,ticket_interest:'General Admission - 35 JOD',event_name:'Summer Sessions',event_date:'16 May 2026',approve_link:al,decline_link:dl,reply_to:email})
  .then(()=>{document.getElementById('FCARD').style.display='none';document.getElementById('FSUC').classList.add('show')})
  .catch(e=>{console.error(e);toast('Something went wrong. Try again or WhatsApp us.');if(btn){btn.disabled=false;btn.textContent='Submit Request'}});
};

/* ── Approve/Decline ── */
const p=new URLSearchParams(location.search);
const act=p.get('action');
if((act==='approve'||act==='decline')&&p.get('email')&&p.get('name')){
  const ce=p.get('email'),cn=p.get('name'),ci=p.get('id');
  document.body.innerHTML='<div style="min-height:100vh;display:flex;align-items:center;justify-content:center;background:#080808;color:#FAF0DC;font-family:\'Syne\',sans-serif;text-align:center;padding:40px"><div style="max-width:480px"><div id="AS" style="font-size:18px;line-height:1.7">Processing '+act+' for '+cn+'…</div><div style="margin-top:36px"><a href="/" style="color:#F5A623;text-decoration:none;border:1px solid rgba(245,166,35,.3);padding:12px 36px;border-radius:3px;font-size:11px;letter-spacing:3px;font-weight:700;text-transform:uppercase">← Back to AHC</a></div></div></div>';
  emailjs.send(SVC,act==='approve'?T_OK:T_NO,{to_email:ce,customer_name:cn,application_id:ci,event_name:'Summer Sessions',event_date:'16 May 2026',reply_to:AHC_MAIL})
  .then(()=>{document.getElementById('AS').innerHTML='<div style="font-size:3rem;margin-bottom:16px;color:#F5A623">✓</div><div style="font-size:22px;margin-bottom:10px;font-weight:700">'+(act==='approve'?'Approval':'Decline')+' sent!</div><div style="color:rgba(250,240,220,.5);font-size:13px">'+cn+' notified at '+ce+'</div>'})
  .catch(()=>{document.getElementById('AS').innerHTML='<div style="font-size:2.5rem;margin-bottom:14px">⚠</div><div style="font-size:18px;margin-bottom:10px">Could not send</div><div style="color:rgba(250,240,220,.5);font-size:13px">Email '+cn+' at <strong style="color:#FAF0DC">'+ce+'</strong></div>'});
}

})();
