/* ============================================================
   PORTFOLIO - MAIN JAVASCRIPT  (updated)
   ============================================================ */
'use strict';

// ── Admin Mode ────────────────────────────────────────────────
const ADMIN_PASSWORD = 'suraj@pillai18052005';
let isAdmin = false;

function setAdminMode(enabled) {
  isAdmin = enabled;
  document.querySelectorAll('.admin-only').forEach(el => { el.style.display = enabled ? '' : 'none'; });
  document.getElementById('btn-admin-login').style.display = enabled ? 'none' : '';
  document.getElementById('btn-admin-logout').style.display = enabled ? '' : 'none';
  renderAbout(); renderSkills(); renderExperience(); renderProjects(); renderCertificates();
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('btn-admin-login').addEventListener('click', () => {
    document.getElementById('admin-password-input').value = '';
    document.getElementById('admin-login-error').style.display = 'none';
    openModal('modal-admin-login');
    setTimeout(() => document.getElementById('admin-password-input').focus(), 100);
  });
  document.getElementById('btn-admin-confirm').addEventListener('click', () => {
    const pw = document.getElementById('admin-password-input').value;
    if (pw === ADMIN_PASSWORD) { closeModal('modal-admin-login'); setAdminMode(true); toast('Admin mode enabled!'); }
    else {
      document.getElementById('admin-login-error').style.display = 'block';
      document.getElementById('admin-password-input').value = '';
      document.getElementById('admin-password-input').focus();
    }
  });
  document.getElementById('admin-password-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-admin-confirm').click();
  });
  document.getElementById('btn-admin-logout').addEventListener('click', () => { setAdminMode(false); toast('Exited admin mode.'); });
});

// ── State ──────────────────────────────────────────────────────
const STATE = {
  profile: { name:'Suraj Pillai', title:'Software Engineer & Creative Developer', email:'you@example.com', phone:'+91 9876543210', location:'Pune, Maharashtra, India', linkedin:'linkedin.com/in/yourprofile', github:'github.com/yourusername', bio:'A passionate developer with a love for crafting elegant digital experiences. I specialize in building scalable, user-centric applications that make a real difference.', bio2:"When I'm not coding, you'll find me exploring new technologies, contributing to open-source, or mentoring aspiring developers.", status:'Open to Opportunities', photo:null },
  qualifications: [ { id:1, year:'2024', degree:'B.Tech Computer Science', institution:'XYZ University' }, { id:2, year:'2020', degree:'HSC — Science', institution:'ABC Junior College' } ],
  skills: [ { id:1, name:'JavaScript', icon:'⚡', level:90, category:'Frontend' }, { id:2, name:'React.js', icon:'⚛️', level:85, category:'Frontend' }, { id:3, name:'Node.js', icon:'🟢', level:80, category:'Backend' }, { id:4, name:'Python', icon:'🐍', level:75, category:'Backend' }, { id:5, name:'HTML & CSS', icon:'🎨', level:95, category:'Frontend' }, { id:6, name:'MongoDB', icon:'🍃', level:70, category:'Database' }, { id:7, name:'Git & GitHub', icon:'🔀', level:88, category:'Tools' }, { id:8, name:'Docker', icon:'🐋', level:60, category:'DevOps' } ],
  experience: [ { id:1, role:'Software Developer', company:'Tech Solutions Pvt. Ltd.', location:'Pune, India', period:'Jan 2024 – Present', type:'Full-time', description:'Developed and maintained full-stack web applications using React and Node.js. Led a team of 3 developers, improved API response time by 40%, and implemented CI/CD pipelines that reduced deployment time significantly.', tags:['React','Node.js','MongoDB','Docker','AWS'] }, { id:2, role:'Frontend Intern', company:'Digital Minds Agency', location:'Mumbai, India', period:'Jun 2023 – Dec 2023', type:'Internship', description:'Collaborated with the design team to build responsive UI components. Converted Figma mockups to pixel-perfect HTML/CSS, and contributed to a redesign that boosted user engagement by 25%.', tags:['HTML','CSS','JavaScript','Figma','Vue.js'] } ],
  projects: [ { id:1, name:'E-Commerce Platform', description:'A full-stack marketplace with payment integration, real-time inventory, and admin dashboard built with MERN stack.', tags:['React','Node.js','MongoDB','Stripe'], icon:'🛒', github:'', live:'', image:null }, { id:2, name:'Task Management App', description:'A Kanban-style productivity app with drag-and-drop, team collaboration, and real-time updates using WebSockets.', tags:['Vue.js','Socket.io','PostgreSQL'], icon:'✅', github:'', live:'', image:null } ],
  certificates: [ { id:1, name:'AWS Certified Developer – Associate', issuer:'Amazon Web Services', date:'March 2024', icon:'☁️', link:'' }, { id:2, name:'Meta Frontend Developer Certificate', issuer:'Meta / Coursera', date:'November 2023', icon:'📘', link:'' }, { id:3, name:'Google Data Analytics', issuer:'Google / Coursera', date:'June 2023', icon:'📊', link:'' } ],
  activeSkillCat: 'All'
};

// ── Persistent Storage ─────────────────────────────────────────
const STORAGE_KEY = 'portfolio_state_v4';
const PHOTO_KEY   = 'portfolio_photo_v4';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const p = JSON.parse(saved);
      if (p.profile)        Object.assign(STATE.profile, p.profile);
      if (p.qualifications) STATE.qualifications = p.qualifications;
      if (p.skills)         STATE.skills         = p.skills;
      if (p.experience)     STATE.experience     = p.experience;
      if (p.projects)       STATE.projects       = p.projects;
      if (p.certificates)   STATE.certificates   = p.certificates;
      if (p.activeSkillCat) STATE.activeSkillCat = p.activeSkillCat;
    }
    const photo = localStorage.getItem(PHOTO_KEY);
    if (photo) STATE.profile.photo = photo;
  } catch(e) { console.warn('loadState error', e); }
}

function saveState() {
  try {
    const s = JSON.parse(JSON.stringify(STATE));
    s.profile.photo = null;  // photo stored separately
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch(e) { console.warn('saveState error', e); }
}

function savePhoto(dataUrl) {
  try {
    if (dataUrl) localStorage.setItem(PHOTO_KEY, dataUrl);
    else         localStorage.removeItem(PHOTO_KEY);
  } catch(e) {
    toast('Photo too large for persistent storage — try a smaller image.', 'error');
  }
}

// ── Utils ──────────────────────────────────────────────────────
function genId() { return Date.now() + Math.floor(Math.random() * 1000); }

function toast(msg, type='success') {
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.textContent = msg;
  document.getElementById('toast-container').appendChild(el);
  setTimeout(() => el.remove(), 3200);
}
function openModal(id)  { document.getElementById(id).classList.add('open');    document.body.style.overflow = 'hidden'; }
function closeModal(id) { document.getElementById(id).classList.remove('open'); document.body.style.overflow = ''; }

// Build safe external href
function safeHref(url) {
  if (!url || url.trim() === '' || url.trim() === '#') return null;
  return /^https?:\/\//i.test(url) ? url : 'https://' + url;
}

document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', e => { if (e.target === backdrop) closeModal(backdrop.id); });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
});

// ── Custom Cursor ──────────────────────────────────────────────
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX=0, mouseY=0, ringX=0, ringY=0;
document.addEventListener('mousemove', e => { mouseX=e.clientX; mouseY=e.clientY; cursor.style.left=mouseX+'px'; cursor.style.top=mouseY+'px'; });
(function animateRing() { ringX+=(mouseX-ringX)*0.12; ringY+=(mouseY-ringY)*0.12; cursorRing.style.left=ringX+'px'; cursorRing.style.top=ringY+'px'; requestAnimationFrame(animateRing); })();
document.querySelectorAll('a, button, .skill-card, .exp-card, .proj-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.style.width='16px'; cursor.style.height='16px'; cursorRing.style.width='52px'; cursorRing.style.height='52px'; });
  el.addEventListener('mouseleave', () => { cursor.style.width='10px'; cursor.style.height='10px'; cursorRing.style.width='36px'; cursorRing.style.height='36px'; });
});

// ── Navigation ─────────────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 40));
document.querySelector('.nav-toggle').addEventListener('click', () => document.querySelector('.nav-links').classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(link => link.addEventListener('click', () => document.querySelector('.nav-links').classList.remove('open')));
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let cur=''; sections.forEach(s => { if(window.scrollY >= s.offsetTop-120) cur=s.id; });
  document.querySelectorAll('.nav-links a').forEach(a => a.classList.toggle('active', a.getAttribute('href')==='#'+cur));
}, { passive:true });

// ── Scroll Reveal ──────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) { e.target.classList.add('visible'); if(e.target.closest('#skills')) animateSkillBars(); } });
}, { threshold:0.12 });
function initReveal() { document.querySelectorAll('.reveal, .exp-item').forEach(el => observer.observe(el)); }

// ── Hero ───────────────────────────────────────────────────────
function renderHero() {
  document.getElementById('hero-name').textContent  = STATE.profile.name;
  document.getElementById('hero-title').textContent = STATE.profile.title;
  document.getElementById('hero-bio').textContent   = STATE.profile.bio;
  document.getElementById('hero-status').textContent= STATE.profile.status;
  renderHeroPhoto();
}
function renderHeroPhoto() {
  const img = document.getElementById('hero-photo-img');
  const ph  = document.getElementById('hero-photo-placeholder');
  if (STATE.profile.photo) {
    // photo saved in localStorage — use it
    img.src = STATE.profile.photo;
    img.style.display = 'block';
    ph.style.display = 'none';
  } else if (img.getAttribute('src') && img.getAttribute('src') !== '') {
    // photo hardcoded in HTML src — keep it visible, do not override
    img.style.display = 'block';
    ph.style.display = 'none';
  } else {
    // no photo anywhere — show placeholder
    img.style.display = 'none';
    ph.style.display = 'flex';
  }
}

// Photo upload — always visible, no admin required
document.getElementById('photo-upload-btn').addEventListener('click', () => document.getElementById('photo-file-input').click());
document.getElementById('photo-file-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  if (!file.type.startsWith('image/')) { toast('Please choose a valid image file.', 'error'); return; }
  const reader = new FileReader();
  reader.onload = ev => {
    STATE.profile.photo = ev.target.result;
    renderHeroPhoto();
    savePhoto(ev.target.result);
    saveState();
    toast('✓ Profile photo saved! It will appear after every refresh.');
  };
  reader.readAsDataURL(file);
  e.target.value = '';
});

// Edit Profile
document.getElementById('btn-edit-profile').addEventListener('click', () => {
  const p = STATE.profile;
  ['name','title','bio','bio2','email','phone','location','linkedin','github','status'].forEach(k => {
    const el = document.getElementById('edit-'+k); if(el) el.value = p[k] || '';
  });
  openModal('modal-profile');
});
document.getElementById('save-profile').addEventListener('click', () => {
  ['name','title','bio','bio2','email','phone','location','linkedin','github','status'].forEach(k => {
    const el = document.getElementById('edit-'+k); if(el) STATE.profile[k] = el.value.trim();
  });
  saveState(); renderHero(); renderAbout(); renderContact(); closeModal('modal-profile');
  toast('Profile updated!');
});

// ── Stats ──────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('stat-exp').textContent      = STATE.experience.length+'+';
  document.getElementById('stat-projects').textContent = STATE.projects.length+'+';
  document.getElementById('stat-skills').textContent   = STATE.skills.length+'+';
  document.getElementById('stat-certs').textContent    = STATE.certificates.length;
}

// ── About ──────────────────────────────────────────────────────
function renderAbout() {
  const p = STATE.profile;
  document.getElementById('about-bio').textContent = p.bio;
  document.getElementById('about-bio2').textContent = p.bio2;
  document.getElementById('about-email-val').textContent = p.email;
  document.getElementById('about-location-val').textContent = p.location;
  document.getElementById('about-status-val').textContent = p.status;

  const linkedinEl = document.getElementById('about-linkedin-val');
  const lhref = safeHref(p.linkedin);
  linkedinEl.innerHTML = lhref
    ? `<a href="${lhref}" target="_blank" rel="noopener" class="info-link">${p.linkedin} ↗</a>`
    : p.linkedin;

  document.getElementById('qualifications-list').innerHTML = STATE.qualifications.map(q => `
    <div class="qual-item" data-id="${q.id}">
      <span class="qual-year">${q.year}</span>
      <div class="qual-info"><h4>${q.degree}</h4><p>${q.institution}</p></div>
      <div style="display:flex;gap:6px;margin-left:auto;align-items:center;">
        ${isAdmin ? `<button class="btn btn-ghost btn-sm" onclick="editQual(${q.id})">✏️</button><button class="btn btn-danger btn-sm" onclick="deleteQual(${q.id})">✕</button>` : ''}
      </div>
    </div>`).join('');
}

document.getElementById('btn-add-qual').addEventListener('click', () => {
  currentEditId=null;
  document.getElementById('modal-qual-title').textContent='Add Qualification';
  ['qual-year','qual-degree','qual-institution'].forEach(id => document.getElementById(id).value='');
  openModal('modal-qual');
});
let currentEditId=null;
window.editQual=function(id){ currentEditId=id; const q=STATE.qualifications.find(q=>q.id===id); document.getElementById('modal-qual-title').textContent='Edit Qualification'; document.getElementById('qual-year').value=q.year; document.getElementById('qual-degree').value=q.degree; document.getElementById('qual-institution').value=q.institution; openModal('modal-qual'); };
window.deleteQual=function(id){ STATE.qualifications=STATE.qualifications.filter(q=>q.id!==id); saveState(); renderAbout(); toast('Qualification removed!'); };
document.getElementById('save-qual').addEventListener('click', () => {
  const year=document.getElementById('qual-year').value.trim(), degree=document.getElementById('qual-degree').value.trim(), institution=document.getElementById('qual-institution').value.trim();
  if(!degree||!year) return;
  if(currentEditId) Object.assign(STATE.qualifications.find(q=>q.id===currentEditId),{year,degree,institution});
  else STATE.qualifications.unshift({id:genId(),year,degree,institution});
  saveState(); renderAbout(); closeModal('modal-qual'); toast(currentEditId?'Qualification updated!':'Qualification added!'); currentEditId=null;
});

// ── Skills ─────────────────────────────────────────────────────
function renderSkills() {
  document.getElementById('skill-categories').innerHTML = ['All',...new Set(STATE.skills.map(s=>s.category))].map(cat => `<button class="cat-btn ${cat===STATE.activeSkillCat?'active':''}" onclick="filterSkills('${cat}')">${cat}</button>`).join('');
  const filtered = STATE.activeSkillCat==='All' ? STATE.skills : STATE.skills.filter(s=>s.category===STATE.activeSkillCat);
  document.getElementById('skills-grid').innerHTML = filtered.map(s => `
    <div class="skill-card">
      <div class="skill-card-actions">${isAdmin?`<button class="btn-edit-card" onclick="editSkill(${s.id})" title="Edit">✏️</button><button class="btn-del-card" onclick="deleteSkill(${s.id})" title="Delete">✕</button>`:''}</div>
      <div class="skill-icon">${s.icon}</div><div class="skill-name">${s.name}</div>
      <div class="skill-category-tag">${s.category.toUpperCase()}</div>
      <div class="skill-bar"><div class="skill-bar-fill" data-level="${s.level}" style="width:0%"></div></div>
      <div class="skill-level">${s.level}%</div>
    </div>`).join('');
  setTimeout(animateSkillBars, 100);
}
function animateSkillBars() { document.querySelectorAll('.skill-bar-fill').forEach(b => b.style.width=b.dataset.level+'%'); }
window.filterSkills=function(cat){ STATE.activeSkillCat=cat; renderSkills(); };
document.getElementById('btn-add-skill').addEventListener('click', ()=>{ currentEditId=null; document.getElementById('modal-skill-title').textContent='Add Skill'; document.getElementById('skill-icon').value='🔧'; document.getElementById('skill-name-input').value=''; document.getElementById('skill-category-input').value=''; document.getElementById('skill-level-input').value=75; document.getElementById('skill-level-display').textContent='75%'; openModal('modal-skill'); });
window.editSkill=function(id){ currentEditId=id; const s=STATE.skills.find(s=>s.id===id); document.getElementById('modal-skill-title').textContent='Edit Skill'; document.getElementById('skill-icon').value=s.icon; document.getElementById('skill-name-input').value=s.name; document.getElementById('skill-category-input').value=s.category; document.getElementById('skill-level-input').value=s.level; document.getElementById('skill-level-display').textContent=s.level+'%'; openModal('modal-skill'); };
window.deleteSkill=function(id){ STATE.skills=STATE.skills.filter(s=>s.id!==id); saveState(); renderSkills(); updateStats(); toast('Skill removed!'); };
document.getElementById('skill-level-input').addEventListener('input',function(){ document.getElementById('skill-level-display').textContent=this.value+'%'; });
document.getElementById('save-skill').addEventListener('click', ()=>{
  const icon=document.getElementById('skill-icon').value.trim()||'🔧', name=document.getElementById('skill-name-input').value.trim(), category=document.getElementById('skill-category-input').value.trim()||'General', level=parseInt(document.getElementById('skill-level-input').value);
  if(!name) return;
  if(currentEditId) Object.assign(STATE.skills.find(s=>s.id===currentEditId),{icon,name,category,level});
  else STATE.skills.push({id:genId(),icon,name,category,level});
  saveState(); renderSkills(); updateStats(); closeModal('modal-skill'); toast(currentEditId?'Skill updated!':'Skill added!'); currentEditId=null;
});

// ── Experience ─────────────────────────────────────────────────
function renderExperience() {
  document.getElementById('exp-timeline').innerHTML = STATE.experience.map(e => `
    <div class="exp-item reveal">
      <div class="exp-card">
        <div class="exp-card-header"><div class="exp-role">${e.role}</div><div class="exp-period">${e.period}</div></div>
        <div class="exp-company">🏢 ${e.company}</div>
        <div class="exp-location">📍 ${e.location} · <span style="color:var(--gold)">${e.type}</span></div>
        <div class="exp-desc">${e.description}</div>
        <div class="exp-tags">${e.tags.map(t=>`<span class="exp-tag">${t}</span>`).join('')}</div>
        <div class="exp-card-actions">${isAdmin?`<button class="btn btn-ghost btn-sm" onclick="editExp(${e.id})">✏️ Edit</button><button class="btn btn-danger btn-sm" onclick="deleteExp(${e.id})">✕ Remove</button>`:''}</div>
      </div>
    </div>`).join('');
  initReveal(); updateStats();
}
document.getElementById('btn-add-exp').addEventListener('click',()=>{ currentEditId=null; ['exp-role','exp-company','exp-location','exp-period','exp-type','exp-desc','exp-tags'].forEach(id=>document.getElementById(id).value=''); document.getElementById('modal-exp-title').textContent='Add Experience'; openModal('modal-exp'); });
window.editExp=function(id){ currentEditId=id; const e=STATE.experience.find(e=>e.id===id); document.getElementById('modal-exp-title').textContent='Edit Experience'; document.getElementById('exp-role').value=e.role; document.getElementById('exp-company').value=e.company; document.getElementById('exp-location').value=e.location; document.getElementById('exp-period').value=e.period; document.getElementById('exp-type').value=e.type; document.getElementById('exp-desc').value=e.description; document.getElementById('exp-tags').value=e.tags.join(', '); openModal('modal-exp'); };
window.deleteExp=function(id){ STATE.experience=STATE.experience.filter(e=>e.id!==id); saveState(); renderExperience(); toast('Experience removed!'); };
document.getElementById('save-exp').addEventListener('click',()=>{
  const role=document.getElementById('exp-role').value.trim(), company=document.getElementById('exp-company').value.trim();
  if(!role||!company) return;
  const data={role,company,location:document.getElementById('exp-location').value.trim(),period:document.getElementById('exp-period').value.trim(),type:document.getElementById('exp-type').value,description:document.getElementById('exp-desc').value.trim(),tags:document.getElementById('exp-tags').value.split(',').map(t=>t.trim()).filter(Boolean)};
  if(currentEditId) Object.assign(STATE.experience.find(e=>e.id===currentEditId),data);
  else STATE.experience.unshift({id:genId(),...data});
  saveState(); renderExperience(); closeModal('modal-exp'); toast(currentEditId?'Experience updated!':'Experience added!'); currentEditId=null;
});

// ── Projects ───────────────────────────────────────────────────
function renderProjects() {
  document.getElementById('projects-grid').innerHTML = STATE.projects.map(p => {
    const gh=safeHref(p.github), lv=safeHref(p.live);
    return `
    <div class="proj-card">
      <div class="proj-thumb">${p.image?`<img src="${p.image}" alt="${p.name}">`:`<span style="font-size:3.5rem">${p.icon}</span>`}</div>
      <div class="proj-body">
        <div class="proj-name">${p.name}</div>
        <div class="proj-desc">${p.description}</div>
        <div class="proj-tags">${p.tags.map(t=>`<span class="proj-tag">${t}</span>`).join('')}</div>
        <div class="proj-links">
          ${gh ? `<a href="${gh}" class="btn btn-ghost btn-sm proj-link-btn" target="_blank" rel="noopener">🔀 GitHub ↗</a>`
               : `<span class="btn btn-ghost btn-sm proj-link-disabled" title="No GitHub URL — click Edit to add">🔀 GitHub</span>`}
          ${lv ? `<a href="${lv}" class="btn btn-outline btn-sm proj-link-btn" target="_blank" rel="noopener">🚀 Live Demo ↗</a>`
               : `<span class="btn btn-outline btn-sm proj-link-disabled" title="No live URL — click Edit to add">🚀 Live Demo</span>`}
        </div>
      </div>
      <div class="proj-card-actions">${isAdmin?`<button class="btn btn-ghost btn-sm" onclick="editProject(${p.id})">✏️ Edit</button><button class="btn btn-danger btn-sm" onclick="deleteProject(${p.id})">✕ Remove</button>`:''}</div>
    </div>`;
  }).join('');
  updateStats();
}
document.getElementById('btn-add-project').addEventListener('click',()=>{ currentEditId=null; ['proj-name','proj-desc','proj-tags','proj-github','proj-live'].forEach(id=>document.getElementById(id).value=''); document.getElementById('proj-icon').value='🚀'; document.getElementById('modal-proj-title').textContent='Add Project'; openModal('modal-proj'); });
window.editProject=function(id){ currentEditId=id; const p=STATE.projects.find(p=>p.id===id); document.getElementById('modal-proj-title').textContent='Edit Project'; document.getElementById('proj-icon').value=p.icon; document.getElementById('proj-name').value=p.name; document.getElementById('proj-desc').value=p.description; document.getElementById('proj-tags').value=p.tags.join(', '); document.getElementById('proj-github').value=p.github||''; document.getElementById('proj-live').value=p.live||''; openModal('modal-proj'); };
window.deleteProject=function(id){ STATE.projects=STATE.projects.filter(p=>p.id!==id); saveState(); renderProjects(); toast('Project removed!'); };
document.getElementById('save-proj').addEventListener('click',()=>{
  const name=document.getElementById('proj-name').value.trim(); if(!name) return;
  const data={name,icon:document.getElementById('proj-icon').value.trim()||'🚀',description:document.getElementById('proj-desc').value.trim(),tags:document.getElementById('proj-tags').value.split(',').map(t=>t.trim()).filter(Boolean),github:document.getElementById('proj-github').value.trim(),live:document.getElementById('proj-live').value.trim(),image:null};
  if(currentEditId) Object.assign(STATE.projects.find(p=>p.id===currentEditId),data);
  else STATE.projects.push({id:genId(),...data});
  saveState(); renderProjects(); closeModal('modal-proj'); toast(currentEditId?'Project updated!':'Project added!'); currentEditId=null;
});

// ── Certificates ───────────────────────────────────────────────
function renderCertificates() {
  document.getElementById('certs-grid').innerHTML = STATE.certificates.map(c => {
    const href = safeHref(c.link);
    return `
    <div class="cert-card">
      <div class="cert-icon">${c.icon}</div>
      <div class="cert-info">
        <div class="cert-name">${c.name}</div>
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-date">📅 ${c.date}</div>
        <div class="cert-link-wrap">
          ${href
            ? `<a href="${href}" target="_blank" rel="noopener" class="cert-view-btn">🔗 View Certificate <span class="cert-arrow">↗</span></a>`
            : `<span class="cert-no-link" title="No URL set — login as admin and click Edit to add a link">No link added yet</span>`}
        </div>
      </div>
      <div class="cert-card-actions">${isAdmin?`<button class="btn-edit-card" onclick="editCert(${c.id})" title="Edit">✏️</button><button class="btn-del-card" onclick="deleteCert(${c.id})" title="Delete">✕</button>`:''}</div>
    </div>`;
  }).join('');
  updateStats();
}
document.getElementById('btn-add-cert').addEventListener('click',()=>{ currentEditId=null; document.getElementById('modal-cert-title').textContent='Add Certificate'; ['cert-name','cert-issuer','cert-date','cert-link'].forEach(id=>document.getElementById(id).value=''); document.getElementById('cert-icon').value='🏅'; openModal('modal-cert'); });
window.editCert=function(id){ currentEditId=id; const c=STATE.certificates.find(c=>c.id===id); document.getElementById('modal-cert-title').textContent='Edit Certificate'; document.getElementById('cert-icon').value=c.icon; document.getElementById('cert-name').value=c.name; document.getElementById('cert-issuer').value=c.issuer; document.getElementById('cert-date').value=c.date; document.getElementById('cert-link').value=c.link||''; openModal('modal-cert'); };
window.deleteCert=function(id){ STATE.certificates=STATE.certificates.filter(c=>c.id!==id); saveState(); renderCertificates(); toast('Certificate removed!'); };
document.getElementById('save-cert').addEventListener('click',()=>{
  const name=document.getElementById('cert-name').value.trim(), issuer=document.getElementById('cert-issuer').value.trim(); if(!name||!issuer) return;
  const data={name,issuer,icon:document.getElementById('cert-icon').value.trim()||'🏅',date:document.getElementById('cert-date').value.trim(),link:document.getElementById('cert-link').value.trim()};
  if(currentEditId) Object.assign(STATE.certificates.find(c=>c.id===currentEditId),data);
  else STATE.certificates.push({id:genId(),...data});
  saveState(); renderCertificates(); closeModal('modal-cert'); toast(currentEditId?'Certificate updated!':'Certificate added!'); currentEditId=null;
});

// ── Contact ────────────────────────────────────────────────────
function renderContact() {
  const p = STATE.profile;
  document.getElementById('contact-email').textContent = p.email;
  document.getElementById('contact-phone').textContent = p.phone;
  document.getElementById('contact-location').textContent = p.location;

  const liEl=document.getElementById('contact-linkedin-link'), lhref=safeHref(p.linkedin);
  liEl.querySelector('span').textContent = p.linkedin||'LinkedIn';
  liEl.href = lhref||'#'; liEl.style.opacity=lhref?'1':'0.5'; liEl.style.pointerEvents=lhref?'auto':'none';

  const ghEl=document.getElementById('contact-github-link'), ghref=safeHref(p.github);
  ghEl.querySelector('span').textContent = p.github||'GitHub';
  ghEl.href = ghref||'#'; ghEl.style.opacity=ghref?'1':'0.5'; ghEl.style.pointerEvents=ghref?'auto':'none';
}
document.getElementById('contact-form').addEventListener('submit',function(e){ e.preventDefault(); toast('Message sent! (Connect to a backend to enable real sending)'); this.reset(); });

function renderFooter() { document.getElementById('footer-name').textContent = STATE.profile.name; }

// ── Init ───────────────────────────────────────────────────────
function init() {
  loadState();
  renderHero(); renderAbout(); renderSkills(); renderExperience();
  renderProjects(); renderCertificates(); renderContact(); renderFooter();
  updateStats(); initReveal();
  // Photo upload button is always visible
}
document.addEventListener('DOMContentLoaded', init);
