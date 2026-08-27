const header=document.querySelector('.site-header');
const progress=document.querySelector('#progress');
const toggle=document.querySelector('#menuToggle');
const menu=document.querySelector('#siteMenu');
const links=[...document.querySelectorAll('.nav-links a')];
const sections=links.map(a=>document.querySelector(a.getAttribute('href'))).filter(Boolean);
const reveals=()=>document.querySelectorAll('.reveal');

/* AI portfolio layer: project concepts are clearly labelled as engineering builds. */
const aiProjects=[
 {num:'AI-01',label:'AGENTIC AI / ENGINEERING BUILD',title:'Multi-Agent Research Copilot',desc:'A coordinated agent workflow that breaks research into planning, retrieval, source analysis and synthesis, with explicit tool boundaries and human review before final output.',tags:['Agentic AI','Multi-Agent','Tool Calling','RAG','Human-in-the-loop']},
 {num:'AI-02',label:'GENERATIVE AI / ENGINEERING BUILD',title:'Enterprise AI Knowledge Copilot',desc:'A grounded assistant architecture for internal knowledge: ingestion, chunking, embeddings, vector retrieval, reranking, citations and controlled LLM responses.',tags:['LLM','RAG','Embeddings','Vector Search','Guardrails']},
 {num:'AI-03',label:'AI AUTOMATION / ENGINEERING BUILD',title:'Autonomous Workflow Orchestrator',desc:'An event-driven AI workflow system that interprets requests, selects APIs and tools, executes multi-step actions and pauses for approval when risk or ambiguity requires it.',tags:['AI Agents','n8n','APIs','Workflow Engine','HITL']},
 {num:'AI-04',label:'LLM ENGINEERING / ENGINEERING BUILD',title:'LLM Evaluation & Guardrail Layer',desc:'A practical evaluation layer for testing prompts and model responses across correctness, groundedness, safety, latency and cost before production release.',tags:['LLM Evaluation','Prompt Testing','Guardrails','Observability','Cost']}
];

function injectAiProjects(){
 const list=document.querySelector('.project-list');
 if(!list||list.dataset.aiInjected)return;
 const fragment=document.createDocumentFragment();
 aiProjects.forEach((p,i)=>{
   const card=document.createElement('article'); card.className='project ai-project reveal';
   card.innerHTML=`<div class="project-art ai-project-art"><div class="art-top">${p.label}<span>${String(i+7).padStart(2,'0')}</span></div><div class="ai-architecture"><b>INPUT</b><span>→</span><b>AGENT</b><span>→</span><b>TOOLS</b><span>→</span><b>OUTPUT</b></div><div class="ai-project-index">${p.num}</div></div><div class="project-info"><div class="project-number">${p.num} — AI ENGINEERING</div><h3>${p.title}</h3><p>${p.desc}</p><div class="tags">${p.tags.map(t=>`<i>${t}</i>`).join('')}</div></div>`;
   fragment.appendChild(card);
 });
 list.appendChild(fragment); list.dataset.aiInjected='true';
}

function upgradeContact(){
 const contact=document.querySelector('#contact');
 if(!contact||contact.dataset.upgraded)return;
 const heading=contact.querySelector('h2');
 if(heading)heading.innerHTML='Let’s build something <em>useful.</em>';
 const intro=contact.querySelector('.contact-intro p');
 if(intro)intro.textContent='Have an AI product, automation problem or complex software system in mind? Let’s turn the idea into a practical architecture and a buildable plan.';
 const form=contact.querySelector('form');
 if(form){
   form.setAttribute('aria-label','Contact Umar Farooque Khan');
   const button=form.querySelector('button[type="submit"],button');
   if(button)button.textContent='Send message →';
 }
 contact.dataset.upgraded='true';
}

function injectEnhancementStyles(){
 if(document.querySelector('#portfolio-enhancements'))return;
 const style=document.createElement('style'); style.id='portfolio-enhancements';
 style.textContent=`
 .ai-project{background:#fff;border-color:#c9c9c3;transition:transform .3s,box-shadow .3s}.ai-project:hover{transform:translateY(-7px);box-shadow:0 20px 45px rgba(17,19,24,.12)}
 .ai-project-art{background:#0e1117!important;min-height:300px!important;position:relative}.ai-project-art:after{content:'';position:absolute;inset:18%;border:1px solid rgba(159,177,255,.22);transform:rotate(12deg);pointer-events:none}.ai-architecture{position:absolute;left:7%;right:7%;top:43%;display:flex;align-items:center;justify-content:space-between;gap:5px;z-index:2}.ai-architecture b{font:700 9px Manrope;color:#fff;border:1px solid #4a5260;background:#1a1e27;padding:9px 8px}.ai-architecture span{color:#9fb1ff}.ai-project-index{position:absolute;left:7%;bottom:9%;font:500 10px 'DM Mono';letter-spacing:.12em;color:#818998;z-index:2}
 #contact{position:relative;overflow:hidden}.contact-availability{display:inline-flex;align-items:center;gap:9px;margin-bottom:20px;font:500 10px 'DM Mono';text-transform:uppercase;letter-spacing:.1em;color:#aeb7c7}.contact-availability:before{content:'';width:7px;height:7px;border-radius:50%;background:#73d58c;box-shadow:0 0 0 5px rgba(115,213,140,.08)}
 @media(max-width:800px){.ai-architecture{gap:3px}.ai-architecture b{padding:7px 5px;font-size:8px}.ai-architecture span{font-size:10px}}
 `; document.head.appendChild(style);
}

injectAiProjects(); upgradeContact(); injectEnhancementStyles();

window.addEventListener('scroll',()=>{
 const y=window.scrollY;
 header?.classList.toggle('scrolled',y>20);
 if(progress){const h=document.documentElement.scrollHeight-window.innerHeight;progress.style.width=h?`${Math.min(100,(y/h)*100)}%`:'0%';}
 let current=sections[0]?.id;
 sections.forEach(s=>{if(y+160>=s.offsetTop)current=s.id});
 links.forEach(a=>a.classList.toggle('active',a.getAttribute('href')===`#${current}`));
},{passive:true});

toggle?.addEventListener('click',()=>{const open=menu.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation')});
links.forEach(a=>a.addEventListener('click',()=>{menu.classList.remove('open');toggle.setAttribute('aria-expanded','false')}));

const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.08});
reveals().forEach(el=>observer.observe(el));

const countObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(!entry.isIntersecting)return;entry.target.querySelectorAll('[data-count]').forEach(node=>{const target=Number(node.dataset.count);let start=0;const step=Math.max(1,Math.ceil(target/40));const tick=()=>{start=Math.min(target,start+step);node.textContent=start;start<target?requestAnimationFrame(tick):null};tick()});countObserver.unobserve(entry.target)}),{threshold:.3});
const about=document.querySelector('#about');if(about)countObserver.observe(about);
const year=document.querySelector('#year');if(year)year.textContent=new Date().getFullYear();
