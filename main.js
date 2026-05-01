/* ============================================================
   PORTFOLIO - MAIN JAVASCRIPT
   ============================================================ */

'use strict';

// ── Admin Mode ────────────────────────────────────────────────
// Change this password to whatever you like
const ADMIN_PASSWORD = 'admin123';

let isAdmin = false;

function setAdminMode(enabled) {
  isAdmin = enabled;
  document.querySelectorAll('.admin-only').forEach(el => {
    el.style.display = enabled ? '' : 'none';
  });
  document.getElementById('btn-admin-login').style.display = enabled ? 'none' : '';
  document.getElementById('btn-admin-logout').style.display = enabled ? '' : 'none';
  // Re-render all sections so inline edit/delete buttons update
  renderAbout();
  renderSkills();
  renderExperience();
  renderProjects();
  renderCertificates();
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
    if (pw === ADMIN_PASSWORD) {
      closeModal('modal-admin-login');
      setAdminMode(true);
      toast('Admin mode enabled!');
    } else {
      document.getElementById('admin-login-error').style.display = 'block';
      document.getElementById('admin-password-input').value = '';
      document.getElementById('admin-password-input').focus();
    }
  });

  document.getElementById('admin-password-input').addEventListener('keydown', e => {
    if (e.key === 'Enter') document.getElementById('btn-admin-confirm').click();
  });

  document.getElementById('btn-admin-logout').addEventListener('click', () => {
    setAdminMode(false);
    toast('Exited admin mode.');
  });
});

// ── State Management ──────────────────────────────────────────
const STATE = {
  profile: {
    name: 'Your Name',
    title: 'Software Engineer & Creative Developer',
    email: 'you@example.com',
    phone: '+91 9876543210',
    location: 'Pune, Maharashtra, India',
    linkedin: 'linkedin.com/in/yourprofile',
    github: 'github.com/yourusername',
    bio: 'A passionate developer with a love for crafting elegant digital experiences. I specialize in building scalable, user-centric applications that make a real difference.',
    bio2: 'When I\'m not coding, you\'ll find me exploring new technologies, contributing to open-source, or mentoring aspiring developers.',
    status: 'Open to Opportunities',
    photo: null
  },
  qualifications: [
    { id: 1, year: '2024', degree: 'B.Tech Computer Science', institution: 'XYZ University' },
    { id: 2, year: '2020', degree: 'HSC — Science', institution: 'ABC Junior College' }
  ],
  skills: [
    { id: 1, name: 'JavaScript', icon: '⚡', level: 90, category: 'Frontend' },
    { id: 2, name: 'React.js', icon: '⚛️', level: 85, category: 'Frontend' },
    { id: 3, name: 'Node.js', icon: '🟢', level: 80, category: 'Backend' },
    { id: 4, name: 'Python', icon: '🐍', level: 75, category: 'Backend' },
    { id: 5, name: 'HTML & CSS', icon: '🎨', level: 95, category: 'Frontend' },
    { id: 6, name: 'MongoDB', icon: '🍃', level: 70, category: 'Database' },
    { id: 7, name: 'Git & GitHub', icon: '🔀', level: 88, category: 'Tools' },
    { id: 8, name: 'Docker', icon: '🐋', level: 60, category: 'DevOps' },
  ],
  experience: [
    {
      id: 1,
      role: 'Software Developer',
      company: 'Tech Solutions Pvt. Ltd.',
      location: 'Pune, India',
      period: 'Jan 2024 – Present',
      type: 'Full-time',
      description: 'Developed and maintained full-stack web applications using React and Node.js. Led a team of 3 developers, improved API response time by 40%, and implemented CI/CD pipelines that reduced deployment time significantly.',
      tags: ['React', 'Node.js', 'MongoDB', 'Docker', 'AWS']
    },
    {
      id: 2,
      role: 'Frontend Intern',
      company: 'Digital Minds Agency',
      location: 'Mumbai, India',
      period: 'Jun 2023 – Dec 2023',
      type: 'Internship',
      description: 'Collaborated with the design team to build responsive UI components. Converted Figma mockups to pixel-perfect HTML/CSS, and contributed to a redesign that boosted user engagement by 25%.',
      tags: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Vue.js']
    }
  ],
  projects: [
    {
      id: 1,
      name: 'E-Commerce Platform',
      description: 'A full-stack marketplace with payment integration, real-time inventory, and admin dashboard built with MERN stack.',
      tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      icon: '🛒',
      github: '#',
      live: '#',
      image: null
    },
    {
      id: 2,
      name: 'Task Management App',
      description: 'A Kanban-style productivity app with drag-and-drop, team collaboration, and real-time updates using WebSockets.',
      tags: ['Vue.js', 'Socket.io', 'PostgreSQL'],
      icon: '✅',
      github: '#',
      live: '#',
      image: null
    }
  ],
  certificates: [
    { id: 1, name: 'AWS Certified Developer – Associate', issuer: 'Amazon Web Services', date: 'March 2024', icon: '☁️', link: '#' },
    { id: 2, name: 'Meta Frontend Developer Certificate', issuer: 'Meta / Coursera', date: 'November 2023', icon: '📘', link: '#' },
    { id: 3, name: 'Google Data Analytics', issuer: 'Google / Coursera', date: 'June 2023', icon: '📊', link: '#' }
  ],
  activeSkillCat: 'All'
};

// Load from localStorage
function loadState() {
  try {
    const saved = localStorage.getItem('portfolio_state');
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(STATE, parsed);
    }
  } catch (e) { console.warn('Could not load saved state.'); }
}

function saveState() {
  try { localStorage.setItem('portfolio_state', JSON.stringify(STATE)); }
  catch (e) { console.warn('Could not save state.'); }
}

// ── Utils ──────────────────────────────────────────────────────
function genId() { return Date.now() + Math.floor(Math.random() * 1000); }

function toast(msg) {
  const container = document.getElementById('toast-container');
  const el = document.createElement('div');
  el.className = 'toast success';
  el.textContent = msg;
  container.appendChild(el);
  setTimeout(() => el.remove(), 3200);
}

function openModal(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(id) {
  document.getElementById(id).classList.remove('open');
  document.body.style.overflow = '';
}

// Close modal on backdrop click
document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
  backdrop.addEventListener('click', e => {
    if (e.target === backdrop) closeModal(backdrop.id);
  });
});

// Escape key closes modals
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.modal-backdrop.open').forEach(m => closeModal(m.id));
  }
});

// ── Custom Cursor ──────────────────────────────────────────────
const cursor = document.querySelector('.cursor');
const cursorRing = document.querySelector('.cursor-ring');
let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX; mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  cursorRing.style.left = ringX + 'px';
  cursorRing.style.top = ringY + 'px';
  requestAnimationFrame(animateRing);
}
animateRing();

document.querySelectorAll('a, button, .skill-card, .exp-card, .proj-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '16px'; cursor.style.height = '16px';
    cursorRing.style.width = '52px'; cursorRing.style.height = '52px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px'; cursor.style.height = '10px';
    cursorRing.style.width = '36px'; cursorRing.style.height = '36px';
  });
});

// ── Navigation ─────────────────────────────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    document.querySelector('.nav-links').classList.remove('open');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('href') === '#' + current);
  });
}, { passive: true });

// ── Scroll Reveal ──────────────────────────────────────────────
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      // Animate skill bars when skills section is visible
      if (e.target.closest('#skills')) animateSkillBars();
    }
  });
}, { threshold: 0.12 });

function initReveal() {
  document.querySelectorAll('.reveal, .exp-item').forEach(el => observer.observe(el));
}

// ── Hero Section ───────────────────────────────────────────────
function renderHero() {
  document.getElementById('hero-name').textContent = STATE.profile.name;
  document.getElementById('hero-title').textContent = STATE.profile.title;
  document.getElementById('hero-bio').textContent = STATE.profile.bio;
  document.getElementById('hero-status').textContent = STATE.profile.status;
  renderHeroPhoto();
}

function renderHeroPhoto() {
  const img = document.getElementById('hero-photo-img');
  const placeholder = document.getElementById('hero-photo-placeholder');
  if (STATE.profile.photo) {
    img.src = STATE.profile.photo;
    img.style.display = 'block';
    placeholder.style.display = 'none';
  } else {
    img.style.display = 'none';
    placeholder.style.display = 'flex';
  }
}

// Photo Upload
document.getElementById('photo-upload-btn').addEventListener('click', () => {
  document.getElementById('photo-file-input').click();
});
document.getElementById('photo-file-input').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = ev => {
    STATE.profile.photo = ev.target.result;
    renderHeroPhoto();
    saveState();
    toast('Profile photo updated!');
  };
  reader.readAsDataURL(file);
});

// Edit Profile Modal
document.getElementById('btn-edit-profile').addEventListener('click', () => {
  document.getElementById('edit-name').value = STATE.profile.name;
  document.getElementById('edit-title').value = STATE.profile.title;
  document.getElementById('edit-bio').value = STATE.profile.bio;
  document.getElementById('edit-bio2').value = STATE.profile.bio2;
  document.getElementById('edit-email').value = STATE.profile.email;
  document.getElementById('edit-phone').value = STATE.profile.phone;
  document.getElementById('edit-location').value = STATE.profile.location;
  document.getElementById('edit-linkedin').value = STATE.profile.linkedin;
  document.getElementById('edit-github').value = STATE.profile.github;
  document.getElementById('edit-status').value = STATE.profile.status;
  openModal('modal-profile');
});

document.getElementById('save-profile').addEventListener('click', () => {
  STATE.profile.name = document.getElementById('edit-name').value;
  STATE.profile.title = document.getElementById('edit-title').value;
  STATE.profile.bio = document.getElementById('edit-bio').value;
  STATE.profile.bio2 = document.getElementById('edit-bio2').value;
  STATE.profile.email = document.getElementById('edit-email').value;
  STATE.profile.phone = document.getElementById('edit-phone').value;
  STATE.profile.location = document.getElementById('edit-location').value;
  STATE.profile.linkedin = document.getElementById('edit-linkedin').value;
  STATE.profile.github = document.getElementById('edit-github').value;
  STATE.profile.status = document.getElementById('edit-status').value;
  saveState();
  renderHero();
  renderAbout();
  renderContact();
  closeModal('modal-profile');
  toast('Profile updated successfully!');
});

// ── Stats ─────────────────────────────────────────────────────
function updateStats() {
  document.getElementById('stat-exp').textContent = STATE.experience.length + '+';
  document.getElementById('stat-projects').textContent = STATE.projects.length + '+';
  document.getElementById('stat-skills').textContent = STATE.skills.length + '+';
  document.getElementById('stat-certs').textContent = STATE.certificates.length;
}

// ── About Section ──────────────────────────────────────────────
function renderAbout() {
  document.getElementById('about-bio').textContent = STATE.profile.bio;
  document.getElementById('about-bio2').textContent = STATE.profile.bio2;

  const p = STATE.profile;
  document.getElementById('about-email-val').textContent = p.email;
  document.getElementById('about-location-val').textContent = p.location;
  document.getElementById('about-linkedin-val').textContent = p.linkedin;
  document.getElementById('about-status-val').textContent = p.status;

  // Qualifications
  const container = document.getElementById('qualifications-list');
  container.innerHTML = STATE.qualifications.map(q => `
    <div class="qual-item" data-id="${q.id}">
      <span class="qual-year">${q.year}</span>
      <div class="qual-info">
        <h4>${q.degree}</h4>
        <p>${q.institution}</p>
      </div>
      <div style="display:flex;gap:6px;margin-left:auto;align-items:center;">
        ${isAdmin ? `<button class="btn btn-ghost btn-sm" onclick="editQual(${q.id})">✏️</button>
        <button class="btn btn-danger btn-sm" onclick="deleteQual(${q.id})">✕</button>` : ''}
      </div>
    </div>
  `).join('');
}

// Qualifications CRUD
document.getElementById('btn-add-qual').addEventListener('click', () => {
  currentEditId = null;
  document.getElementById('modal-qual-title').textContent = 'Add Qualification';
  document.getElementById('qual-year').value = '';
  document.getElementById('qual-degree').value = '';
  document.getElementById('qual-institution').value = '';
  openModal('modal-qual');
});

let currentEditId = null;

window.editQual = function(id) {
  currentEditId = id;
  const q = STATE.qualifications.find(q => q.id === id);
  document.getElementById('modal-qual-title').textContent = 'Edit Qualification';
  document.getElementById('qual-year').value = q.year;
  document.getElementById('qual-degree').value = q.degree;
  document.getElementById('qual-institution').value = q.institution;
  openModal('modal-qual');
};

window.deleteQual = function(id) {
  STATE.qualifications = STATE.qualifications.filter(q => q.id !== id);
  saveState(); renderAbout(); toast('Qualification removed!');
};

document.getElementById('save-qual').addEventListener('click', () => {
  const year = document.getElementById('qual-year').value.trim();
  const degree = document.getElementById('qual-degree').value.trim();
  const institution = document.getElementById('qual-institution').value.trim();
  if (!degree || !year) return;
  if (currentEditId) {
    const q = STATE.qualifications.find(q => q.id === currentEditId);
    Object.assign(q, { year, degree, institution });
  } else {
    STATE.qualifications.unshift({ id: genId(), year, degree, institution });
  }
  saveState(); renderAbout(); closeModal('modal-qual');
  toast(currentEditId ? 'Qualification updated!' : 'Qualification added!');
  currentEditId = null;
});

// ── Skills Section ─────────────────────────────────────────────
function getCategories() {
  return ['All', ...new Set(STATE.skills.map(s => s.category))];
}

function renderSkills() {
  // Category buttons
  const catContainer = document.getElementById('skill-categories');
  catContainer.innerHTML = getCategories().map(cat => `
    <button class="cat-btn ${cat === STATE.activeSkillCat ? 'active' : ''}" 
      onclick="filterSkills('${cat}')">${cat}</button>
  `).join('');

  // Skills grid
  const filtered = STATE.activeSkillCat === 'All'
    ? STATE.skills
    : STATE.skills.filter(s => s.category === STATE.activeSkillCat);

  document.getElementById('skills-grid').innerHTML = filtered.map(s => `
    <div class="skill-card">
      <div class="skill-card-actions">
        ${isAdmin ? `<button class="btn-edit-card" onclick="editSkill(${s.id})" title="Edit">✏️</button>
        <button class="btn-del-card" onclick="deleteSkill(${s.id})" title="Delete">✕</button>` : ''}
      </div>
      <div class="skill-icon">${s.icon}</div>
      <div class="skill-name">${s.name}</div>
      <div class="skill-category-tag">${s.category.toUpperCase()}</div>
      <div class="skill-bar">
        <div class="skill-bar-fill" data-level="${s.level}" style="width:0%"></div>
      </div>
      <div class="skill-level">${s.level}%</div>
    </div>
  `).join('');

  setTimeout(animateSkillBars, 100);
}

function animateSkillBars() {
  document.querySelectorAll('.skill-bar-fill').forEach(bar => {
    bar.style.width = bar.dataset.level + '%';
  });
}

window.filterSkills = function(cat) {
  STATE.activeSkillCat = cat;
  renderSkills();
};

document.getElementById('btn-add-skill').addEventListener('click', () => {
  currentEditId = null;
  document.getElementById('modal-skill-title').textContent = 'Add Skill';
  document.getElementById('skill-icon').value = '🔧';
  document.getElementById('skill-name-input').value = '';
  document.getElementById('skill-category-input').value = '';
  document.getElementById('skill-level-input').value = 75;
  document.getElementById('skill-level-display').textContent = '75%';
  openModal('modal-skill');
});

window.editSkill = function(id) {
  currentEditId = id;
  const s = STATE.skills.find(s => s.id === id);
  document.getElementById('modal-skill-title').textContent = 'Edit Skill';
  document.getElementById('skill-icon').value = s.icon;
  document.getElementById('skill-name-input').value = s.name;
  document.getElementById('skill-category-input').value = s.category;
  document.getElementById('skill-level-input').value = s.level;
  document.getElementById('skill-level-display').textContent = s.level + '%';
  openModal('modal-skill');
};

window.deleteSkill = function(id) {
  STATE.skills = STATE.skills.filter(s => s.id !== id);
  saveState(); renderSkills(); updateStats(); toast('Skill removed!');
};

document.getElementById('skill-level-input').addEventListener('input', function() {
  document.getElementById('skill-level-display').textContent = this.value + '%';
});

document.getElementById('save-skill').addEventListener('click', () => {
  const icon = document.getElementById('skill-icon').value.trim() || '🔧';
  const name = document.getElementById('skill-name-input').value.trim();
  const category = document.getElementById('skill-category-input').value.trim() || 'General';
  const level = parseInt(document.getElementById('skill-level-input').value);
  if (!name) return;
  if (currentEditId) {
    const s = STATE.skills.find(s => s.id === currentEditId);
    Object.assign(s, { icon, name, category, level });
  } else {
    STATE.skills.push({ id: genId(), icon, name, category, level });
  }
  saveState(); renderSkills(); updateStats(); closeModal('modal-skill');
  toast(currentEditId ? 'Skill updated!' : 'Skill added!');
  currentEditId = null;
});

// ── Experience Section ─────────────────────────────────────────
function renderExperience() {
  document.getElementById('exp-timeline').innerHTML = STATE.experience.map(e => `
    <div class="exp-item reveal">
      <div class="exp-card">
        <div class="exp-card-header">
          <div class="exp-role">${e.role}</div>
          <div class="exp-period">${e.period}</div>
        </div>
        <div class="exp-company">🏢 ${e.company}</div>
        <div class="exp-location">📍 ${e.location} · <span style="color:var(--gold)">${e.type}</span></div>
        <div class="exp-desc">${e.description}</div>
        <div class="exp-tags">${e.tags.map(t => `<span class="exp-tag">${t}</span>`).join('')}</div>
        <div class="exp-card-actions">
          ${isAdmin ? `<button class="btn btn-ghost btn-sm" onclick="editExp(${e.id})">✏️ Edit</button>
          <button class="btn btn-danger btn-sm" onclick="deleteExp(${e.id})">✕ Remove</button>` : ''}
        </div>
      </div>
    </div>
  `).join('');
  initReveal();
  updateStats();
}

document.getElementById('btn-add-exp').addEventListener('click', () => {
  currentEditId = null;
  clearExpForm();
  document.getElementById('modal-exp-title').textContent = 'Add Experience';
  openModal('modal-exp');
});

function clearExpForm() {
  ['exp-role', 'exp-company', 'exp-location', 'exp-period', 'exp-type', 'exp-desc', 'exp-tags'].forEach(id => {
    document.getElementById(id).value = '';
  });
}

window.editExp = function(id) {
  currentEditId = id;
  const e = STATE.experience.find(e => e.id === id);
  document.getElementById('modal-exp-title').textContent = 'Edit Experience';
  document.getElementById('exp-role').value = e.role;
  document.getElementById('exp-company').value = e.company;
  document.getElementById('exp-location').value = e.location;
  document.getElementById('exp-period').value = e.period;
  document.getElementById('exp-type').value = e.type;
  document.getElementById('exp-desc').value = e.description;
  document.getElementById('exp-tags').value = e.tags.join(', ');
  openModal('modal-exp');
};

window.deleteExp = function(id) {
  STATE.experience = STATE.experience.filter(e => e.id !== id);
  saveState(); renderExperience(); toast('Experience removed!');
};

document.getElementById('save-exp').addEventListener('click', () => {
  const role = document.getElementById('exp-role').value.trim();
  const company = document.getElementById('exp-company').value.trim();
  if (!role || !company) return;
  const data = {
    role, company,
    location: document.getElementById('exp-location').value.trim(),
    period: document.getElementById('exp-period').value.trim(),
    type: document.getElementById('exp-type').value,
    description: document.getElementById('exp-desc').value.trim(),
    tags: document.getElementById('exp-tags').value.split(',').map(t => t.trim()).filter(Boolean)
  };
  if (currentEditId) {
    Object.assign(STATE.experience.find(e => e.id === currentEditId), data);
  } else {
    STATE.experience.unshift({ id: genId(), ...data });
  }
  saveState(); renderExperience(); closeModal('modal-exp');
  toast(currentEditId ? 'Experience updated!' : 'Experience added!');
  currentEditId = null;
});

// ── Projects Section ───────────────────────────────────────────
function renderProjects() {
  document.getElementById('projects-grid').innerHTML = STATE.projects.map(p => `
    <div class="proj-card">
      <div class="proj-thumb">
        ${p.image ? `<img src="${p.image}" alt="${p.name}">` : `<span style="font-size:3.5rem">${p.icon}</span>`}
      </div>
      <div class="proj-body">
        <div class="proj-name">${p.name}</div>
        <div class="proj-desc">${p.description}</div>
        <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join('')}</div>
        <div class="proj-links">
          ${p.github ? `<a href="${p.github}" class="btn btn-ghost btn-sm" target="_blank">🔀 GitHub</a>` : ''}
          ${p.live ? `<a href="${p.live}" class="btn btn-outline btn-sm" target="_blank">🚀 Live Demo</a>` : ''}
        </div>
      </div>
      <div class="proj-card-actions">
        ${isAdmin ? `<button class="btn btn-ghost btn-sm" onclick="editProject(${p.id})">✏️ Edit</button>
        <button class="btn btn-danger btn-sm" onclick="deleteProject(${p.id})">✕ Remove</button>` : ''}
      </div>
    </div>
  `).join('');
  updateStats();
}

document.getElementById('btn-add-project').addEventListener('click', () => {
  currentEditId = null;
  ['proj-name', 'proj-desc', 'proj-tags', 'proj-github', 'proj-live'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('proj-icon').value = '🚀';
  document.getElementById('modal-proj-title').textContent = 'Add Project';
  openModal('modal-proj');
});

window.editProject = function(id) {
  currentEditId = id;
  const p = STATE.projects.find(p => p.id === id);
  document.getElementById('modal-proj-title').textContent = 'Edit Project';
  document.getElementById('proj-icon').value = p.icon;
  document.getElementById('proj-name').value = p.name;
  document.getElementById('proj-desc').value = p.description;
  document.getElementById('proj-tags').value = p.tags.join(', ');
  document.getElementById('proj-github').value = p.github || '';
  document.getElementById('proj-live').value = p.live || '';
  openModal('modal-proj');
};

window.deleteProject = function(id) {
  STATE.projects = STATE.projects.filter(p => p.id !== id);
  saveState(); renderProjects(); toast('Project removed!');
};

document.getElementById('save-proj').addEventListener('click', () => {
  const name = document.getElementById('proj-name').value.trim();
  if (!name) return;
  const data = {
    name,
    icon: document.getElementById('proj-icon').value.trim() || '🚀',
    description: document.getElementById('proj-desc').value.trim(),
    tags: document.getElementById('proj-tags').value.split(',').map(t => t.trim()).filter(Boolean),
    github: document.getElementById('proj-github').value.trim(),
    live: document.getElementById('proj-live').value.trim(),
    image: null
  };
  if (currentEditId) {
    Object.assign(STATE.projects.find(p => p.id === currentEditId), data);
  } else {
    STATE.projects.push({ id: genId(), ...data });
  }
  saveState(); renderProjects(); closeModal('modal-proj');
  toast(currentEditId ? 'Project updated!' : 'Project added!');
  currentEditId = null;
});

// ── Certificates Section ───────────────────────────────────────
function renderCertificates() {
  document.getElementById('certs-grid').innerHTML = STATE.certificates.map(c => `
    <div class="cert-card">
      <div class="cert-icon">${c.icon}</div>
      <div class="cert-info">
        <div class="cert-name">${c.name}</div>
        <div class="cert-issuer">${c.issuer}</div>
        <div class="cert-date">📅 ${c.date}</div>
        ${c.link ? `<a href="${c.link}" target="_blank" style="font-size:0.75rem;color:var(--gold);text-decoration:none;margin-top:6px;display:inline-block;">View Certificate →</a>` : ''}
      </div>
      <div class="cert-card-actions">
        ${isAdmin ? `<button class="btn-edit-card" onclick="editCert(${c.id})" title="Edit">✏️</button>
        <button class="btn-del-card" onclick="deleteCert(${c.id})" title="Delete">✕</button>` : ''}
      </div>
    </div>
  `).join('');
  updateStats();
}

document.getElementById('btn-add-cert').addEventListener('click', () => {
  currentEditId = null;
  document.getElementById('modal-cert-title').textContent = 'Add Certificate';
  ['cert-name', 'cert-issuer', 'cert-date', 'cert-link'].forEach(id => document.getElementById(id).value = '');
  document.getElementById('cert-icon').value = '🏅';
  openModal('modal-cert');
});

window.editCert = function(id) {
  currentEditId = id;
  const c = STATE.certificates.find(c => c.id === id);
  document.getElementById('modal-cert-title').textContent = 'Edit Certificate';
  document.getElementById('cert-icon').value = c.icon;
  document.getElementById('cert-name').value = c.name;
  document.getElementById('cert-issuer').value = c.issuer;
  document.getElementById('cert-date').value = c.date;
  document.getElementById('cert-link').value = c.link || '';
  openModal('modal-cert');
};

window.deleteCert = function(id) {
  STATE.certificates = STATE.certificates.filter(c => c.id !== id);
  saveState(); renderCertificates(); toast('Certificate removed!');
};

document.getElementById('save-cert').addEventListener('click', () => {
  const name = document.getElementById('cert-name').value.trim();
  const issuer = document.getElementById('cert-issuer').value.trim();
  if (!name || !issuer) return;
  const data = {
    name, issuer,
    icon: document.getElementById('cert-icon').value.trim() || '🏅',
    date: document.getElementById('cert-date').value.trim(),
    link: document.getElementById('cert-link').value.trim()
  };
  if (currentEditId) {
    Object.assign(STATE.certificates.find(c => c.id === currentEditId), data);
  } else {
    STATE.certificates.push({ id: genId(), ...data });
  }
  saveState(); renderCertificates(); closeModal('modal-cert');
  toast(currentEditId ? 'Certificate updated!' : 'Certificate added!');
  currentEditId = null;
});

// ── Contact Section ────────────────────────────────────────────
function renderContact() {
  const p = STATE.profile;
  document.getElementById('contact-email').textContent = p.email;
  document.getElementById('contact-phone').textContent = p.phone;
  document.getElementById('contact-location').textContent = p.location;
  document.getElementById('contact-linkedin-link').textContent = p.linkedin;
  document.getElementById('contact-linkedin-link').href = 'https://' + p.linkedin;
  document.getElementById('contact-github-link').textContent = p.github;
  document.getElementById('contact-github-link').href = 'https://' + p.github;
}

// Contact form (frontend-only)
document.getElementById('contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  toast('Message sent! (Connect to a backend to enable real sending)');
  this.reset();
});

// Footer name
function renderFooter() {
  document.getElementById('footer-name').textContent = STATE.profile.name;
}

// ── Initialize ─────────────────────────────────────────────────
function init() {
  loadState();
  renderHero();
  renderAbout();
  renderSkills();
  renderExperience();
  renderProjects();
  renderCertificates();
  renderContact();
  renderFooter();
  updateStats();
  initReveal();
}

document.addEventListener('DOMContentLoaded', init);
