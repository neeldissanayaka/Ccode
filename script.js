document.addEventListener("DOMContentLoaded",()=>{
 const menu=document.getElementById("menu"),nav=document.getElementById("nav");
 menu.addEventListener("click",()=>nav.classList.toggle("open"));
 nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

 const reveal=new IntersectionObserver(entries=>{
   entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");reveal.unobserve(e.target)}})
 },{threshold:.12});
 document.querySelectorAll(".reveal").forEach(x=>reveal.observe(x));

 const sections=[...document.querySelectorAll("section[id]")];
 const links=[...document.querySelectorAll("nav a")];
 const active=new IntersectionObserver(entries=>{
   entries.forEach(e=>{if(e.isIntersecting){
     links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+e.target.id));
   }})
 },{rootMargin:"-35% 0px -55% 0px"});
 sections.forEach(s=>active.observe(s));

 const glow=document.querySelector(".cursor-glow");
 window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});
 document.querySelectorAll(".tilt").forEach(card=>{
   card.addEventListener("pointermove",e=>{
     if(innerWidth<800)return;
     const r=card.getBoundingClientRect(),x=(e.clientX-r.left)/r.width-.5,y=(e.clientY-r.top)/r.height-.5;
     card.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*3}deg) translateY(-5px)`;
     card.style.setProperty("--mx",(x+.5)*100+"%");card.style.setProperty("--my",(y+.5)*100+"%");
   });
   card.addEventListener("pointerleave",()=>card.style.transform="");
 });

 const form = document.getElementById('contact-form');
const result = document.getElementById('form-status');

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);
  
  result.textContent = "Please wait...";

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    let json = await response.json();
    if (response.status == 200) {
      result.textContent = "Message sent successfully!";
      result.style.color = "#ff922e"; // ඔබේ තේමාවේ වර්ණය
      form.reset(); // මෙතනින් පෝරමය Clear වෙනවා
    } else {
      result.textContent = json.message;
      result.style.color = "#ff5f5f";
    }
  })
  .catch(error => {
    result.textContent = "Something went wrong!";
  });
});
 document.getElementById("year").textContent=new Date().getFullYear();

 /* looping typewriter for hero accent word */
 const heroWordEl=document.getElementById("heroWord");
 if(heroWordEl){
   if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){
     heroWordEl.textContent="built";
   }else{
     const words=["built","designed","shipped","launched","engineered"];
     let wi=0,ci=0,deleting=false;
     function typeLoop(){
       const word=words[wi];
       if(!deleting){
         ci++; heroWordEl.textContent=word.slice(0,ci);
         if(ci===word.length){ deleting=true; setTimeout(typeLoop,1500); return; }
         setTimeout(typeLoop,80);
       }else{
         ci--; heroWordEl.textContent=word.slice(0,ci);
         if(ci===0){ deleting=false; wi=(wi+1)%words.length; setTimeout(typeLoop,300); return; }
         setTimeout(typeLoop,40);
       }
     }
     typeLoop();
   }
 }

 /* type-on-reveal for section eyebrow comments */
 const typeEls=document.querySelectorAll(".type-on-reveal");
 typeEls.forEach(el=>{
   const full=el.textContent;
   el.textContent="";
   const content=document.createElement("span");
   content.className="type-content";
   const cursor=document.createElement("span");
   cursor.className="type-cursor";
   el.appendChild(content);
   el.appendChild(cursor);
   el.dataset.full=full;
 });
 const typeObserver=new IntersectionObserver(entries=>{
   entries.forEach(e=>{
     if(!e.isIntersecting)return;
     const el=e.target,content=el.querySelector(".type-content"),cursor=el.querySelector(".type-cursor"),full=el.dataset.full;
     const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
     if(reduce){ content.textContent=full; typeObserver.unobserve(el); return; }
     let i=0,deleting=false;
     (function step(){
       if(!deleting){
         i++; content.textContent=full.slice(0,i);
         if(i>=full.length){ deleting=true; setTimeout(step,1800); return; }
         setTimeout(step,26);
       }else{
         i--; content.textContent=full.slice(0,i);
         if(i<=0){ deleting=false; setTimeout(step,500); return; }
         setTimeout(step,14);
       }
     })();
     typeObserver.unobserve(el);
   });
 },{threshold:.4});
 typeEls.forEach(el=>typeObserver.observe(el));

 /* hide floating social buttons while footer is on screen so they don't cover its links */
 const siteFooter=document.getElementById("site-footer");
 const floatBtnEls=document.querySelectorAll(".float-btn");
 if(siteFooter&&floatBtnEls.length){
   const footerObserver=new IntersectionObserver(entries=>{
     entries.forEach(e=>{
       floatBtnEls.forEach(b=>b.classList.toggle("float-hidden",e.isIntersecting));
     });
   },{threshold:0.05});
   footerObserver.observe(siteFooter);
 }

 /* looping typewriter for service + pricing cards — loops continuously, pauses on hover to show full text */
 function setupLoopingTyping(cardSelector,textSelector){
   document.querySelectorAll(cardSelector).forEach(card=>{
     const el=card.querySelector(textSelector);
     if(!el)return;
     const full=el.textContent;
     el.textContent="";
     const content=document.createElement("span");content.className="type-content";content.textContent=full;
     const cursor=document.createElement("span");cursor.className="type-cursor";cursor.style.display="none";
     el.appendChild(content);el.appendChild(cursor);
     const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
     if(reduce)return;
     let i=full.length,deleting=true,paused=false,timer=null;
     function tick(){
       if(paused)return;
       if(deleting){
         i--; content.textContent=full.slice(0,i);
         if(i<=0){ deleting=false; timer=setTimeout(tick,500); return; }
         timer=setTimeout(tick,14);
       }else{
         i++; content.textContent=full.slice(0,i);
         if(i>=full.length){ deleting=true; timer=setTimeout(tick,1600); return; }
         timer=setTimeout(tick,26);
       }
     }
     function start(){ cursor.style.display="inline-block"; tick(); }
     const cardObserver=new IntersectionObserver(entries=>{
       entries.forEach(e=>{ if(e.isIntersecting){ start(); cardObserver.disconnect(); } });
     },{threshold:.2});
     cardObserver.observe(card);
     card.addEventListener("mouseenter",()=>{
       paused=true; clearTimeout(timer);
       content.textContent=full; cursor.style.display="none";
     });
     card.addEventListener("mouseleave",()=>{
       paused=false; i=full.length; deleting=true;
       cursor.style.display="inline-block";
       timer=setTimeout(tick,700);
     });
   });
 }
 setupLoopingTyping(".service","p");
 setupLoopingTyping(".plan",".plan-sub");

 /* animated count-up metrics */
 const metricEls=document.querySelectorAll(".metrics strong[data-count]");
 const metricsObserver=new IntersectionObserver(entries=>{
   entries.forEach(e=>{
     if(!e.isIntersecting)return;
     metricEls.forEach(el=>{
       const target=parseInt(el.dataset.count,10),suffix=el.dataset.suffix||"";
       if(reduceMotion){el.textContent=target+suffix;return}
       let cur=0;const dur=1100,start=performance.now();
       function tick(now){
         const p=Math.min((now-start)/dur,1);
         cur=Math.round(target*(1-Math.pow(1-p,3)));
         el.textContent=cur+suffix;
         if(p<1)requestAnimationFrame(tick);
       }
       requestAnimationFrame(tick);
     });
     metricsObserver.disconnect();
   });
 },{threshold:.4});
 const metricsWrap=document.querySelector(".metrics");
 if(metricsWrap)metricsObserver.observe(metricsWrap);

 /* terminal typing animation */
 const termBody=document.getElementById("termBody");
 const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 const lines=[
   {cls:"p",text:"$ ccode create your-business"},
   {cls:"out",text:"→ analyzing brand & content..."},
   {cls:"out",text:"→ designing UI system..."},
   {cls:"out",text:"→ writing responsive code..."},
   {cls:"out",text:"→ optimizing for speed..."},
   {cls:"ok",text:"✓ site deployed → yourbusiness.com"}
 ];
 function typeTerminal(){
   termBody.innerHTML="";
   const mini=()=>{ const m=document.createElement("div"); m.className="mini-site";
     m.innerHTML='<div class="msnav"><i></i><i></i><i></i></div><div class="mshero"><small>yourbusiness.com</small><b>Your business, live.</b></div>';
     termBody.appendChild(m); requestAnimationFrame(()=>m.classList.add("show"));
   };
   if(reduceMotion){
     lines.forEach(l=>{const d=document.createElement("div");d.className=l.cls;d.textContent=l.text;termBody.appendChild(d)});
     mini(); return;
   }
   let li=0;
   function nextLine(){
     if(li>=lines.length){ mini(); return; }
     const l=lines[li]; const row=document.createElement("div"); row.className=l.cls; termBody.appendChild(row);
     let ci=0;
     const iv=setInterval(()=>{
       row.textContent=l.text.slice(0,ci+1);
       ci++;
       if(ci>=l.text.length){ clearInterval(iv); li++; setTimeout(nextLine,220); }
     },22);
   }
   nextLine();
 }
 const termObserver=new IntersectionObserver(entries=>{
   entries.forEach(e=>{ if(e.isIntersecting){ typeTerminal(); termObserver.disconnect(); } });
 },{threshold:.3});
 termObserver.observe(termBody);
});
