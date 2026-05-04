const data = window.TalentFlowData;

const icons = {
  briefcase: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M10 6h4V5a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v1Zm-2 0V5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v1h2.5A2.5 2.5 0 0 1 21 8.5v9A2.5 2.5 0 0 1 18.5 20h-13A2.5 2.5 0 0 1 3 17.5v-9A2.5 2.5 0 0 1 5.5 6H8Zm11 5.2V8.5a.5.5 0 0 0-.5-.5h-13a.5.5 0 0 0-.5.5v2.7c2.16.92 4.5 1.4 7 1.4s4.84-.48 7-1.4ZM5 13.34v4.16c0 .28.22.5.5.5h13a.5.5 0 0 0 .5-.5v-4.16a18.62 18.62 0 0 1-7 1.26c-2.48 0-4.82-.42-7-1.26Z"/></svg>',
  users: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm0-2a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm7.5 2a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Zm0-2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3ZM2 19.3C2 15.92 5.03 13 9.5 13S17 15.92 17 19.3c0 .94-.75 1.7-1.68 1.7H3.68C2.75 21 2 20.24 2 19.3Zm2-.3h11c-.18-2.2-2.26-4-5.5-4S4.18 16.8 4 19Zm13.18-3.52c.7-.31 1.52-.48 2.32-.48 2.77 0 4.5 1.86 4.5 4.2 0 .99-.81 1.8-1.8 1.8h-3.46c.17-.53.26-1.1.26-1.7 0-1.42-.65-2.73-1.82-3.82Z"/></svg>',
  calendar: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2a1 1 0 0 1 1 1v1h8V3a1 1 0 1 1 2 0v1h1.5A2.5 2.5 0 0 1 22 6.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 19.5v-13A2.5 2.5 0 0 1 4.5 4H6V3a1 1 0 0 1 1-1Zm13 8H4v9.5c0 .28.22.5.5.5h15a.5.5 0 0 0 .5-.5V10ZM4.5 6a.5.5 0 0 0-.5.5V8h16V6.5a.5.5 0 0 0-.5-.5h-15Zm2.5 7h3v3H7v-3Zm5 0h3v3h-3v-3Z"/></svg>',
  chart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 3a1 1 0 0 1 1 1v15h14a1 1 0 1 1 0 2H5a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1Zm14.7 4.29a1 1 0 0 1 .01 1.41l-5.1 5.16a1 1 0 0 1-1.36.06l-2.8-2.35-2.72 3.16a1 1 0 1 1-1.52-1.3l3.37-3.92a1 1 0 0 1 1.4-.11l2.83 2.37 4.48-4.47a1 1 0 0 1 1.41-.01Z"/></svg>',
};

const API_URL = "http://localhost:5002/api";

let state = {
  activeTab: "Dashboard",
  role: localStorage.getItem("talentflow-role") || "Recruiter",
  theme: localStorage.getItem("talentflow-theme") || "light",
  isLoggedIn: !!localStorage.getItem("talentflow-token"),
  token: localStorage.getItem("talentflow-token"),
  currentUserName: localStorage.getItem("talentflow-username") || "Guest User",
  stage: data.stages[0].name,
  workflow: data.workflowSteps[0],
  botOpen: false,
  tipIndex: 0,
  globalSearch: "",
  companySearch: "",
  location: "Bengaluru",
  roleFilter: "All",
  workModeFilter: "All",
  resumeTemplate: data.resumeDesigner.templates[0],
  appFilter: '',
  selectedCandidateId: null,
  botHistory: JSON.parse(localStorage.getItem("talentflow-bot")) || [
    {type:'ai', text:'Hello! I am JAMS. I analyze your work to give you the best tips and reminders. How can I help you today?'}
  ],
  botThinking: false,
};

const candidates = [
  { id: 1, name: 'John Doe', initials: 'JD', role: 'Frontend Engineer', skills: 'React, TypeScript', exp: '4 yrs', status: 'Applied', gradient: 'linear-gradient(135deg,#facc15,#f59e0b)', email: 'john.doe@example.com', phone: '+1 234 567 890' },
  { id: 2, name: 'Alice Wang', initials: 'AW', role: 'Product Designer', skills: 'Figma, UX', exp: '3 yrs', status: 'Shortlisted', gradient: 'linear-gradient(135deg,#a78bfa,#7c3aed)', email: 'alice.w@example.com', phone: '+1 345 678 901' },
  { id: 3, name: 'Bob Chen', initials: 'BC', role: 'Backend Engineer', skills: 'Go, PostgreSQL', exp: '6 yrs', status: 'Interview', gradient: 'linear-gradient(135deg,#4ade80,#16a34a)', email: 'bob.c@example.com', phone: '+1 456 789 012' },
  { id: 4, name: 'Sara Lee', initials: 'SL', role: 'DevOps Engineer', skills: 'Kubernetes, AWS', exp: '5 yrs', status: 'Rejected', gradient: 'linear-gradient(135deg,#fb7185,#e11d48)', email: 'sara.l@example.com', phone: '+1 567 890 123' },
];

function initials(name) {
  return name.split(" ").map((part) => part[0]).join("");
}

function panelHeader(title, action) {
  return `<div class="panel-header"><h2>${title}</h2><span>${action}</span></div>`;
}




function renderSidebar() {
  let navItems = [];
  if (state.role === 'Candidate') {
    navItems = ["Dashboard", "My Opportunities", "Applications", "Interviews", "Resources"];
  } else if (state.role === 'Hiring Manager') {
    navItems = ["Dashboard", "Team Pipeline", "Interviews", "Feedback", "Reports"];
  } else if (state.role === 'Recruiter' || state.role === 'Admin') {
    navItems = ["Dashboard", "Jobs", "Applications", "Interviews", "Pipeline", "Reports", "Messages", "Settings"];
  } else {
    // Fallback if role is messed up
    navItems = ["Dashboard"];
  }

  const roleGradients = {
    'Recruiter': 'linear-gradient(135deg,#f59e0b,#facc15)',
    'Candidate': 'linear-gradient(135deg,#60a5fa,#2563eb)',
    'Hiring Manager': 'linear-gradient(135deg,#a78bfa,#7c3aed)'
  };

  const currentGradient = roleGradients[state.role] || roleGradients['Recruiter'];

  const secondaryGroupStart = navItems.findIndex((item) => ['Reports', 'Messages', 'Settings', 'Resources'].includes(item));
  const primaryItems = secondaryGroupStart === -1 ? navItems : navItems.slice(0, secondaryGroupStart);
  const secondaryItems = secondaryGroupStart === -1 ? [] : navItems.slice(secondaryGroupStart);

  const renderLinkList = (itemsList) => itemsList.map(item => `
          <a href="#" class="rec-nav-item ${state.activeTab === item ? 'active' : ''}" data-action="switch-tab" data-tab="${item}">${item}</a>
        `).join('');

  return `
    <aside class="rec-sidebar">
      <div class="rec-sidebar-decor">
        <div class="rec-sidebar-line"></div>
      </div>
      <div style="display:flex;align-items:center;gap:12px;padding:0 8px;margin-bottom:28px;position:relative;z-index:2;">
        <div style="width:36px;height:36px;border-radius:10px;background:${currentGradient};display:flex;align-items:center;justify-content:center;font-weight:900;font-size:12px;color:#fff;box-shadow:0 4px 12px rgba(0,0,0,0.1);">JAMS</div>
        <div>
          <div style="font-size:14px;font-weight:700;color:var(--text-main);">JAMS</div>
          <div style="font-size:11px;color:var(--text-dim);">${state.role}</div>
        </div>
      </div>

      <nav style="display:flex;flex-direction:column;gap:8px;position:relative;z-index:2;">
        ${navItems.map(item => `
          <a href="#" class="rec-nav-item ${state.activeTab === item ? 'active' : ''}" data-action="switch-tab" data-tab="${item}">${item}</a>
        `).join('')}
      </nav>

      ${renderBot()}
    </aside>
  `;
}

function renderTopbar() {
  const userName = state.currentUserName || "User";

  const gradients = {
    'Recruiter':      'linear-gradient(90deg,#facc15,#f59e0b)',
    'Candidate':      'linear-gradient(90deg,#60a5fa,#2563eb)',
    'Hiring Manager': 'linear-gradient(90deg,#a78bfa,#7c3aed)',
  };
  const borders = {
    'Recruiter':      'rgba(250,204,21,0.08)',
    'Candidate':      'rgba(96,165,250,0.08)',
    'Hiring Manager': 'rgba(167,139,250,0.08)',
  };
  const grad   = gradients[state.role] || gradients['Recruiter'];
  const border = borders[state.role]   || borders['Recruiter'];

  return `
    <header style="display:flex;align-items:center;justify-content:space-between;padding:16px 32px;background:var(--bg-header);border-bottom:1px solid var(--border-subtle);position:sticky;top:0;z-index:50;">
      <div>
        <div style="font-size:11px;color:var(--text-dim);margin-bottom:2px;">Welcome back, ${userName}</div>
        <div style="font-size:20px;font-weight:800;background:${grad};-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${state.activeTab || state.role + ' Workspace'}</div>
      </div>
      <div style="display:flex;align-items:center;gap:16px;">
        <button class="theme-toggle" data-action="theme" aria-label="Toggle theme" style="background:var(--bg-card); border:1px solid var(--border-subtle); color:var(--text-main); padding:8px 16px; border-radius:12px; cursor:pointer; font-size:13px; display:flex; align-items:center; gap:8px; font-weight:600; box-shadow:0 2px 4px rgba(0,0,0,0.02);">
          <span>${state.theme === "light" ? "☀️ Light" : "🌙 Dark"}</span>
        </button>
        <div style="display:flex;align-items:center;gap:6px;">
          <div style="width:7px;height:7px;border-radius:50%;background:#4ade80;box-shadow:0 0 8px #4ade80;"></div>
          <span style="font-size:11px;color:var(--text-dim);">Live</span>
        </div>
        <button data-action="logout" style="padding:8px 18px;background:rgba(251,113,133,0.12);border:1px solid rgba(251,113,133,0.2);border-radius:10px;color:#fb7185;font-size:13px;font-weight:600;cursor:pointer;">Logout</button>
      </div>
    </header>
  `;
}

function renderBot() {
  return `
    <div class="rec-bot-container ${state.botOpen ? 'open' : ''}">
      <div class="rec-bot-bubble">
        <div class="rec-bot-chat-header">
          <span>🤖 JAMS AI</span>
          <span style="cursor:pointer;opacity:0.5;font-size:18px;" data-action="bot">×</span>
        </div>
        <div class="rec-bot-chat-history" id="bot-chat-history">
          ${state.botHistory.map(m => `
            <div class="rec-bot-msg ${m.type}">
              ${m.text}
            </div>
          `).join('')}
          ${state.botThinking ? `<div class="rec-bot-msg ai" style="font-style:italic;opacity:0.7;">JAMS is analyzing...</div>` : ''}
        </div>
        <div class="rec-bot-input-wrap">
          <input type="text" class="rec-bot-input" id="bot-user-input" placeholder="Message JAMS..." />
          <button class="rec-btn primary sm" data-action="send-bot-msg">Send</button>
        </div>
      </div>
      <div class="rec-bot-avatar" data-action="bot">
        <div class="bot-head">
          <div class="bot-eye"></div>
          <div class="bot-eye"></div>
        </div>
        <div class="bot-body">
          <div class="bot-arm left"></div>
          <div class="bot-heart"></div>
          <div class="bot-arm right"></div>
        </div>
        <div class="bot-legs-wrap">
          <div class="bot-leg"></div>
          <div class="bot-leg"></div>
        </div>
        <div class="rec-bot-badge" style="bottom: auto; top: -10px; right: 10px;"></div>
      </div>
      <div style="font-size:10px;font-weight:800;color:var(--accent-role);margin-top:4px;text-transform:uppercase;letter-spacing:1px;">JAMS</div>
    </div>
  `;
}

function renderDiscoveryHub() {
  const query = state.companySearch.trim().toLowerCase();
  const companies = data.companies.filter((company) => (
    !query ||
    company.name.toLowerCase().includes(query) ||
    company.industry.toLowerCase().includes(query) ||
    company.hiringFor.toLowerCase().includes(query)
  ));
  const opportunities = data.opportunities.filter((job) => {
    const locationMatch = state.location === "All" || job.location === state.location || job.location === "Remote";
    const roleMatch = state.roleFilter === "All" || job.title.toLowerCase().includes(state.roleFilter.toLowerCase()) || job.tags.some((tag) => tag.toLowerCase().includes(state.roleFilter.toLowerCase()));
    const modeMatch = state.workModeFilter === "All" || job.type === state.workModeFilter;
    return locationMatch && roleMatch && modeMatch;
  });

  return `<section class="discovery-hub architecture-panel" id="companies">
    <div class="discovery-hero">
      <div>
        <p class="eyebrow">Company discovery</p>
        <h2>Find companies, nearby roles, and people to connect with.</h2>
      </div>
      <div class="discovery-search">
        <input data-input="companySearch" value="${state.companySearch}" placeholder="Search company, industry, or skill" />
        <select data-input="location">
          <option ${state.location === "All" ? "selected" : ""}>All</option>
          ${data.filters.locations.map((location) => `<option ${state.location === location ? "selected" : ""}>${location}</option>`).join("")}
        </select>
      </div>
    </div>
    <div class="filter-strip">
      <span>Role</span>
      ${["All"].concat(data.filters.roles).map((role) => `<button data-filter-role="${role}" class="${state.roleFilter === role ? "selected" : ""}">${role}</button>`).join("")}
      <span>Mode</span>
      ${["All"].concat(data.filters.workModes).map((mode) => `<button data-filter-mode="${mode}" class="${state.workModeFilter === mode ? "selected" : ""}">${mode}</button>`).join("")}
    </div>
    <div class="company-grid">
      ${companies.map((company) => `<article class="company-card ${company.color}">
        <div class="company-logo">${company.name.slice(0, 2).toUpperCase()}</div>
        <div><strong>${company.name}</strong><p>${company.industry} / ${company.location}</p></div>
        <span>${company.roles} roles</span>
        <small>${company.hiringFor}</small>
        <button>View company</button>
      </article>`).join("") || `<div class="empty-state">No companies found. Try another skill or location.</div>`}
    </div>
    <div class="opportunity-board">
      ${panelHeader("Opportunities Near You", `${opportunities.length} matches`)}
      <div class="opportunity-list">
        ${opportunities.map((job) => `<article class="opportunity-card">
          <div><strong>${job.title}</strong><p>${job.company} / ${job.location} / ${job.type}</p></div>
          <div class="job-tags">${job.tags.map((tag) => `<span>${tag}</span>`).join("")}</div>
          <div class="opportunity-meta"><span>${job.salary}</span><strong>${job.match}% match</strong><button>Apply</button></div>
        </article>`).join("") || `<div class="empty-state">No nearby opportunities match the selected filters.</div>`}
      </div>
    </div>
  </section>`;
}

function renderProfilesConnect() {
  return `<article class="panel architecture-panel profiles-panel" id="profiles">
    ${panelHeader("Profiles & Connect", "Network")}
    <div class="profile-grid">
      ${data.candidateProfiles.map((profile) => `<article class="profile-card ${profile.color}">
        <div class="profile-ring" style="--score:${profile.completeness}">${initials(profile.name)}</div>
        <strong>${profile.name}</strong>
        <p>${profile.headline} / ${profile.location}</p>
        <span>${profile.status}</span>
        <small>${profile.completeness}% profile / ${profile.connections} connections</small>
        <button>Connect</button>
      </article>`).join("")}
    </div>
  </article>`;
}

function renderResumeDesigner() {
  return `<article class="panel architecture-panel resume-designer" id="resume-designer">
    <div class="resume-builder-copy">
      ${panelHeader("Resume Designer", `${data.resumeDesigner.score}% ATS score`)}
      <p>Choose a template, arrange sections, and improve ATS readiness before applying.</p>
      <div class="template-row">
        ${data.resumeDesigner.templates.map((template) => `<button data-template="${template}" class="${state.resumeTemplate === template ? "selected" : ""}">${template}</button>`).join("")}
      </div>
      <div class="resume-suggestions">
        ${data.resumeDesigner.suggestions.map((tip) => `<div><span></span>${tip}</div>`).join("")}
      </div>
    </div>
    <div class="resume-preview">
      <div class="resume-paper">
        <h3>${state.resumeTemplate}</h3>
        ${data.resumeDesigner.sections.map((section, index) => `<div class="resume-section" style="--delay:${index * 60}ms"><strong>${section}</strong><span></span></div>`).join("")}
      </div>
    </div>
  </article>`;
}

function renderAttentionRail() {
  return `<section class="attention-rail" aria-label="Attention notifications">
    ${data.alerts.map((alert) => `<button class="attention-pill ${alert.color}"><span></span><strong>${alert.label}</strong><small>${alert.action}</small></button>`).join("")}
  </section>`;
}

function renderHero() {
  return `
    <section class="hero-panel">
      <div>
        <p class="eyebrow">Recruitment command center</p>
        <h1>Move every candidate from resume to offer with one clear workflow.</h1>
        <p class="hero-copy">A realistic hiring workspace for recruiters, managers, and candidates with resume parsing, interviews, feedback, reporting, and protected role access.</p>
      </div>
      <div class="hero-actions"><button class="button primary">Post job</button><button class="button secondary">Schedule</button></div>
      <div class="hero-visual" aria-hidden="true">
        <div class="mini-window"><span></span><span></span><span></span><strong>Pipeline health</strong>
          <div class="mini-chart">${["42%", "68%", "54%", "86%", "73%"].map((height) => `<i style="--h:${height}"></i>`).join("")}</div>
        </div>
      </div>
    </section>
  `;
}

function renderMetrics() {
  return `<section class="metric-grid" aria-label="Hiring metrics">
    ${data.metrics.map((metric, index) => `
      <article class="metric-card ${metric.tone}" style="--delay:${index * 70}ms">
        <span class="metric-icon">${icons[metric.icon]}</span>
        <div><p>${metric.label}</p><strong>${metric.value}</strong><small>${metric.trend}</small></div>
      </article>
    `).join("")}
  </section>`;
}

function renderWorkflow() {
  return `
    <article class="workflow-experience architecture-panel">
      <div class="workflow-copy">
        <p class="eyebrow">Interactive hiring path</p>
        <h2>${state.workflow.title}</h2>
        <p>${state.workflow.detail}</p>
      </div>
      <div class="workflow-orbit" aria-label="Hover hiring steps">
        ${data.workflowSteps.map((step, index) => `
          <button class="workflow-node ${step.color} ${state.workflow.name === step.name ? "active" : ""}" data-workflow="${step.name}" style="--i:${index}">
            <span>${icons[step.icon]}</span><strong>${step.name}</strong><small>${step.title}</small>
          </button>
        `).join("")}
      </div>
    </article>
  `;
}

function renderFeatureOrbit() {
  return `<article class="panel architecture-panel feature-orbit-panel">
    ${panelHeader("ATS Options Inspired by Real Hiring Platforms", "Hover options")}
    <div class="feature-orbit-grid">
      ${data.atsOptions.map((feature) => `<button class="feature-bubble ${feature.color}"><span>${feature.badge}</span><strong>${feature.name}</strong><small>${feature.detail}</small></button>`).join("")}
    </div>
  </article>`;
}

function renderPipeline() {
  const selectedStage = data.stages.find((stage) => stage.name === state.stage);
  return `<article class="panel wide" id="candidates">
    ${panelHeader("Candidate Pipeline", "Kanban view")}
    <div class="stage-tabs">
      ${data.stages.map((stage) => `<button data-stage="${stage.name}" class="${state.stage === stage.name ? "selected" : ""}">${stage.name}<span>${stage.count}</span></button>`).join("")}
    </div>
    <div class="candidate-list">
      ${selectedStage.candidates.map((candidate) => `
        <div class="candidate-card">
          <div class="candidate-avatar">${initials(candidate.name)}</div>
          <div class="candidate-main">
            <strong>${candidate.name}</strong><p>${candidate.role} / ${candidate.source}</p>
            <div class="skill-row">${candidate.skills.map((skill) => `<span>${skill}</span>`).join("")}</div>
          </div>
          <div class="score-ring" style="--score:${candidate.score}"><span>${candidate.score}</span></div>
        </div>
      `).join("")}
    </div>
  </article>`;
}

function renderSchedule() {
  return `<article class="panel" id="interviews">
    ${panelHeader("Today's Interviews", "Synced")}
    <div class="timeline">
      ${data.interviews.map((interview) => `
        <div class="timeline-item"><time>${interview.time}</time><div><strong>${interview.candidate}</strong><p>${interview.type}</p><small>${interview.panel} / ${interview.status}</small></div></div>
      `).join("")}
    </div>
  </article>`;
}

function renderResumeParser() {
  return `<article class="panel" id="resume-parser">
    ${panelHeader("Resume Parser", `${data.parsedResume.match}% match`)}
    <div class="resume-drop"><span>${icons.briefcase}</span><div><strong>${data.parsedResume.file}</strong><p>Profile created from resume parsing</p></div></div>
    <div class="parsed-fields">${data.parsedResume.fields.map((field) => `<div><span>${field.label}</span><strong>${field.value}</strong></div>`).join("")}</div>
  </article>`;
}

function renderJobs() {
  return `<article class="panel wide" id="jobs">
    ${panelHeader("Open Jobs", "18 active")}
    <div class="job-table">
      ${data.jobs.map((job) => `<div class="job-row"><div><strong>${job.title}</strong><p>${job.department} / ${job.location}</p></div><span>${job.applicants} applicants</span><span class="priority ${job.priority.toLowerCase()}">${job.priority}</span><span>${job.status}</span></div>`).join("")}
    </div>
  </article>`;
}

function renderAnalytics() {
  return `<article class="panel" id="reports">
    ${panelHeader("Hiring Analytics", "Live")}
    <div class="analytics-list">${data.analytics.map((item) => `<div class="analytics-item"><div><strong>${item.label}</strong><span>${item.value}%</span></div><progress value="${item.value}" max="100"></progress></div>`).join("")}</div>
  </article>`;
}

function renderSourceQuality() {
  return `<article class="panel" id="sources">
    ${panelHeader("Source Quality", "Live mix")}
    <div class="source-list">
      ${data.sources.map((source) => `<div class="source-item"><div><strong>${source.name}</strong><span>${source.candidates} candidates</span></div><div class="source-bar ${source.color}"><i style="width:${source.quality}%"></i></div><small>${source.quality}% quality</small></div>`).join("")}
    </div>
  </article>`;
}

function renderHiringHealth() {
  return `<article class="panel health-panel">
    ${panelHeader("Hiring Health", "Needs attention")}
    <div class="health-grid">${data.hiringHealth.map((item) => `<div class="health-card"><span>${item.label}</span><strong>${item.value}</strong><p>${item.detail}</p></div>`).join("")}</div>
  </article>`;
}

function renderFeedback() {
  return `<article class="panel" id="feedback">
    ${panelHeader("Feedback Queue", "2 new")}
    <div class="feedback-list">${data.feedback.map((item) => `<div class="feedback-card"><strong>${item.verdict}</strong><p>${item.candidate}</p><small>${item.note}</small><span>${item.interviewer}</span></div>`).join("")}</div>
  </article>`;
}

function renderNotifications() {
  return `<article class="panel">
    ${panelHeader("Smart Alerts", "3 updates")}
    <div class="notification-list">${data.notifications.map((item) => `<div class="notification-card ${item.tone}"><span></span><div><strong>${item.title}</strong><p>${item.detail}</p></div></div>`).join("")}</div>
  </article>`;
}

function renderArchitecture() {
  return `<article class="panel wide architecture-panel" id="architecture">
    ${panelHeader("MERN Service Structure", "Upgradeable")}
    <div class="service-map">${data.services.map((service) => `<div class="service-card ${service.tone}"><strong>${service.name}</strong><span>${service.detail}</span></div>`).join("")}</div>
    <div class="database-strip"><strong>MongoDB collections</strong><div>${data.collections.map((item) => `<span>${item}</span>`).join("")}</div></div>
    <details class="blueprint-details"><summary>Project diagrams from the Word document</summary><div class="blueprint-grid"><img src="./docx_media/image3.png" alt="MERN architecture diagram from project document" /><img src="./docx_media/image2.png" alt="Recruiter candidate and hiring manager user flow diagram" /></div></details>
  </article>`;
}

function renderActivity() {
  return `<article class="panel" id="dashboard">
    ${panelHeader("Automation Log", "Updated now")}
    <ul class="activity-list">${data.activity.map((item) => `<li>${item}</li>`).join("")}</ul>
  </article>`;
}

function renderHelperBot() {
  return `<aside class="helper-bot ${state.botOpen ? "open" : ""}" aria-label="TalentFlow helper bot">
    <button class="bot-avatar" data-action="bot" aria-label="Open helper bot"><span class="bot-face"><i></i><i></i></span></button>
    <div class="bot-card">
      <div><strong>Buddy Bot</strong><button data-action="close-bot" aria-label="Close helper bot">x</button></div>
      <p>${data.botTips[state.tipIndex]}</p>
      <div class="bot-actions"><button data-action="next-tip">Next tip</button><a href="#candidates">Open pipeline</a></div>
    </div>
  </aside>`;
}

function renderLoginSignup() {
  if (typeof state.authMode === 'undefined') {
    state.authMode = 'login';
    state.registeredUsers = [];
  }
  if (!state.registerRole) {
    state.registerRole = 'Recruiter';
  }

  const isLogin = state.authMode === 'login';
  const selectedRole = state.registerRole;

  let extraFields = '';
  if (!isLogin) {
    if (selectedRole === 'Candidate') {
      extraFields = `
        <div class="form-group"><label>Phone Number</label><input type="tel" id="auth-phone" placeholder="e.g. +1 234 567 8900" /></div>
        <div class="form-group"><label>Resume Upload</label><input type="file" id="auth-resume" style="padding: 10px;" /></div>
        <div class="form-group"><label>Skills</label><input type="text" id="auth-skills" placeholder="e.g. React, Node.js, Design" /></div>
        <div class="form-group"><label>Education</label><input type="text" id="auth-education" placeholder="Highest degree / University" /></div>
        <div class="form-group"><label>Experience</label><input type="text" id="auth-experience" placeholder="Years of experience" /></div>
        <div class="form-group"><label>Portfolio / LinkedIn</label><input type="url" id="auth-link" placeholder="https://..." /></div>
      `;
    } else if (selectedRole === 'Recruiter') {
      extraFields = `
        <div class="form-group"><label>Company Name</label><input type="text" id="auth-company" placeholder="Company Name" /></div>
        <div class="form-group"><label>Company Email (Optional)</label><input type="email" id="auth-company-email" placeholder="email@company.com" /></div>
        <div class="form-group"><label>Company Website</label><input type="url" id="auth-website" placeholder="https://company.com" /></div>
        <div class="form-group"><label>Job Role / Position</label><input type="text" id="auth-role-desc" placeholder="e.g. Senior Recruiter" /></div>
        <div class="form-group"><label>Company Description</label><textarea id="auth-desc" rows="3" placeholder="Briefly describe the company" style="width:100%; border-radius:10px; border:1px solid #e2e8f0; padding:10px; font-family:inherit; outline:none; resize:vertical; box-sizing:border-box;"></textarea></div>
      `;
    } else if (selectedRole === 'Hiring Manager') {
      extraFields = `
        <div class="form-group"><label>Company Name</label><input type="text" id="auth-company" placeholder="Company Name" /></div>
        <div class="form-group"><label>Department</label><input type="text" id="auth-dept" placeholder="e.g. Engineering, Marketing" /></div>
        <div class="form-group"><label>Role / Designation</label><input type="text" id="auth-role-desc" placeholder="e.g. Director of Engineering" /></div>
        <div class="form-group"><label>Work Email (Optional)</label><input type="email" id="auth-company-email" placeholder="work@company.com" /></div>
      `;
    }
  }

  return `
    <div class="auth-wrapper">
      <div class="rec-interactive-bg">
        <div class="rec-grid-lines"></div>
      </div>
      <div class="auth-left">
        <div class="auth-left-bg-circle"></div>
        <div class="auth-pill-container">
          <div class="auth-pill">JAMS</div>
        </div>
        <h1 class="auth-title">Login to JAMS</h1>
        <p class="auth-desc">Your role is already saved with your account. Sign in and we will open the right workspace for candidate, recruiter, or hiring manager.</p>
        
        <div class="auth-glass-panel">
          <div class="sit-line"></div>
          
          <label class="char-group char-recruiter">
            <input type="radio" name="auth-role" value="Recruiter" data-input="registerRole" ${selectedRole === 'Recruiter' ? 'checked' : ''}>
            <div class="char-bubble">
              <strong>Recruiter</strong>
              <span>Create jobs</span>
            </div>
            <div class="char-figure">
              <div class="head"></div>
              <div class="body yellow">
                <div class="prop white"></div>
              </div>
              <div class="legs"><div class="leg"></div><div class="leg"></div></div>
            </div>
          </label>

          <label class="char-group char-manager">
            <input type="radio" name="auth-role" value="Hiring Manager" data-input="registerRole" ${selectedRole === 'Hiring Manager' ? 'checked' : ''}>
            <div class="char-bubble bubble-higher">
              <strong>Manager</strong>
              <span>Hire the candidate</span>
            </div>
            <div class="char-figure">
              <div class="head"></div>
              <div class="body white">
                <div class="prop gray"></div>
              </div>
              <div class="legs"><div class="leg"></div><div class="leg"></div></div>
            </div>
          </label>

          <label class="char-group char-candidate">
            <input type="radio" name="auth-role" value="Candidate" data-input="registerRole" ${selectedRole === 'Candidate' ? 'checked' : ''}>
            <div class="char-bubble bubble-lower">
              <strong>Candidate</strong>
              <span>Looks for opportunity</span>
            </div>
            <div class="char-figure">
              <div class="head"></div>
              <div class="body orange">
                <div class="prop white"></div>
              </div>
              <div class="legs"><div class="leg"></div><div class="leg"></div></div>
            </div>
          </label>
        </div>
      </div>

      <div class="auth-right">
        <div class="auth-right-inner">
          <h2>${isLogin ? 'Welcome back' : 'Create Account'}</h2>
          <p>${isLogin ? 'Use the same role you selected when you created your account.' : 'Select a role from the left panel and set up your credentials.'}</p>
          
          ${!isLogin ? `
          <div class="form-group">
            <label>Full Name</label>
            <input type="text" id="auth-fullname" placeholder="Enter your full name" />
          </div>` : ''}
          <div class="form-group">
            <label>Email</label>
            <input type="email" id="auth-email" placeholder="Enter your email" />
          </div>
          <div class="form-group">
            <label>Password</label>
            <input type="password" id="auth-password" placeholder="Enter your password" />
          </div>

          ${extraFields}
          
          ${isLogin ? 
            `<button class="login-btn" data-action="submit-login">Login</button>
            <div class="auth-footer">
              New user? <a href="#" data-action="switch-register">Create account</a>
            </div>` : 
            `<button class="login-btn" data-action="submit-register">Create Account</button>
            <div class="auth-footer">
              Already have an account? <a href="#" data-action="switch-login">Login</a>
            </div>`
          }
        </div>
      </div>
    </div>
  `;
}

function renderRecruiterDashboard() {
  const tab = state.activeTab || 'Dashboard';

  if (tab === 'Dashboard') return `
    <div class="rec-workspace">
      <div class="rec-section-header">
        <div>
          <h2>Executive Overview</h2>
          <span>Performance metrics for ${data.company.name}</span>
        </div>
        <button class="rec-btn primary">＋ Post New Job</button>
      </div>

      <div class="rec-stat-grid">
        <div class="rec-stat-card"><div class="stat-num blue">12</div><div class="stat-label">Active Jobs</div><div class="stat-delta green">↑ +2 this week</div></div>
        <div class="rec-stat-card"><div class="stat-num yellow">340</div><div class="stat-label">Total Apps</div><div class="stat-delta green">↑ +32 new</div></div>
        <div class="rec-stat-card"><div class="stat-num green">45</div><div class="stat-label">Shortlisted</div><div class="stat-delta green">↑ +5 today</div></div>
        <div class="rec-stat-card"><div class="stat-num rose">280</div><div class="stat-label">Rejected</div><div class="stat-delta rose">↓ -10 this week</div></div>
      </div>

      <div class="rec-grid">
        <div class="rec-card">
          <div class="rec-card-header"><h3>📈 Applications per Job</h3></div>
          <div style="height:200px;display:flex;align-items:flex-end;gap:12px;padding:20px 0;">
            ${[{l:'Frontend',v:142,c:'var(--accent-yellow)'},{l:'Designer',v:89,c:'var(--accent-blue)'},{l:'Backend',v:64,c:'var(--accent-green)'},{l:'DevOps',v:37,c:'var(--accent-violet)'},{l:'QA',v:28,c:'var(--accent-rose)'}].map(b=>`<div style="flex:1;display:flex;flex-direction:column;align-items:center;gap:8px;"><div style="width:100%;height:${(b.v/142)*100}%;background:linear-gradient(to top,${b.c},${b.c}aa);border-radius:6px;position:relative;"><span style="position:absolute;top:-20px;width:100%;text-align:center;font-size:10px;font-weight:700;color:${b.c};">${b.v}</span></div><span style="font-size:10px;color:var(--text-muted);">${b.l}</span></div>`).join('')}
          </div>
        </div>
        <div class="rec-card">
          <div class="rec-card-header"><h3>⚡ Recent Activity</h3></div>
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div class="rec-activity-item"><div class="rec-activity-dot yellow"></div><div><div class="rec-activity-text"><strong>Alice Wang</strong> applied for <strong>Senior Frontend Engineer</strong></div><div class="rec-activity-time">2 mins ago</div></div></div>
            <div class="rec-activity-item"><div class="rec-activity-dot green"></div><div><div class="rec-activity-text"><strong>Bob Chen</strong> was shortlisted for <strong>Product Designer</strong></div><div class="rec-activity-time">18 mins ago</div></div></div>
            <div class="rec-activity-item"><div class="rec-activity-dot violet"></div><div><div class="rec-activity-text">Interview scheduled with <strong>Sara Lee</strong> — Tomorrow 10:00 AM</div><div class="rec-activity-time">1 hour ago</div></div></div>
          </div>
        </div>
      </div>
    </div>`;
}

function renderJobDetail() {
  const job = state.selectedJob;
  const tab = state.jobDetailTab || 'Overview';
  const tabs = ['Overview','Applicants','Pipeline','Interviews','Analytics','Communication'];
  const colors = {Active:'#4ade80',Paused:'#fb923c',Draft:'var(--text-dim)'};

  const tabContent = () => {
    if (tab === 'Overview') return `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;margin-bottom:24px;">
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:14px;padding:20px;">
          <div style="font-size:11px;color:var(--text-dim);margin-bottom:6px;">SALARY</div>
          <div style="font-size:22px;font-weight:800;color:#facc15;">${job.salary}</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:14px;padding:20px;">
          <div style="font-size:11px;color:var(--text-dim);margin-bottom:6px;">APPLICANTS</div>
          <div style="font-size:22px;font-weight:800;color:#60a5fa;">${job.apps}</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:14px;padding:20px;">
          <div style="font-size:11px;color:var(--text-dim);margin-bottom:6px;">LOCATION</div>
          <div style="font-size:16px;font-weight:700;color:var(--text-main);">${job.location}</div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:14px;padding:20px;">
          <div style="font-size:11px;color:var(--text-dim);margin-bottom:6px;">TYPE</div>
          <div style="font-size:16px;font-weight:700;color:var(--text-main);">${job.type}</div>
        </div>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:14px;padding:20px;margin-bottom:20px;">
        <div style="font-size:13px;font-weight:600;color:var(--text-muted);margin-bottom:12px;">REQUIRED SKILLS</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap;">${job.skills.map(s=>`<span class="rec-tag">${s}</span>`).join('')}</div>
      </div>
      <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:14px;padding:20px;">
        <div style="font-size:13px;font-weight:600;color:var(--text-muted);margin-bottom:12px;">JOB DESCRIPTION</div>
        <p style="font-size:13px;color:var(--text-muted);line-height:1.8;margin:0;">We are looking for an experienced ${job.title} to join our growing team. You will work closely with cross-functional teams to build and scale our products. The ideal candidate has strong technical skills, good communication, and a passion for building great user experiences.</p>
      </div>
    `;
    if (tab === 'Applicants') return `
      <div class="rec-filter-bar" style="margin-bottom:20px;display:flex;gap:12px;">
        <select class="rec-filter-select" style="background:var(--bg-card);color:var(--text-main);border:1px solid var(--border-subtle);padding:8px;border-radius:8px;"><option>All Status</option><option>Applied</option><option>Shortlisted</option><option>Interview</option></select>
        <select class="rec-filter-select" style="background:var(--bg-card);color:var(--text-main);border:1px solid var(--border-subtle);padding:8px;border-radius:8px;"><option>All Experience</option><option>0-2 yrs</option><option>2-5 yrs</option><option>5+ yrs</option></select>
      </div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${[{n:'John Doe',i:'JD',g:'#facc15,#f59e0b',c:'#0d0d0d',s:'Applied',sk:'React, TypeScript',e:'4 yrs'},{n:'Alice Wang',i:'AW',g:'#a78bfa,#7c3aed',c:'#fff',s:'Shortlisted',sk:'Figma, UX',e:'3 yrs'},{n:'Bob Chen',i:'BC',g:'#4ade80,#16a34a',c:'#fff',s:'Interview',sk:'Go, PostgreSQL',e:'6 yrs'}].map(a=>`
          <div style="display:flex;align-items:center;gap:16px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:14px;padding:16px;transition:border-color 0.2s;">
            <span class="rec-avatar" style="background:linear-gradient(135deg,${a.g});color:${a.c};width:44px;height:44px;font-size:15px;flex-shrink:0;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:700;">${a.i}</span>
            <div style="flex:1;">
              <div style="font-size:15px;font-weight:700;color:var(--text-main);">${a.n}</div>
              <div style="font-size:12px;color:var(--text-dim);margin-top:2px;">${a.sk} &middot; ${a.e} exp</div>
            </div>
            <span class="rec-badge ${a.s.toLowerCase()}" style="padding:4px 10px;border-radius:999px;font-size:10px;font-weight:700;">${a.s}</span>
            <div style="display:flex;gap:8px;">
              <button class="rec-btn primary" style="font-size:11px;padding:6px 12px;">Shortlist</button>
              <button class="rec-btn secondary" style="font-size:11px;padding:6px 12px;">Reject</button>
            </div>
          </div>
        `).join('')}
      </div>
    `;
    if (tab === 'Pipeline') return `
      <div style="display:flex;gap:16px;overflow-x:auto;padding-bottom:16px;">
        ${[{l:'Applied',c:'#60a5fa',cards:['John Doe · Frontend · 4yr']},{l:'Shortlisted',c:'#facc15',cards:['Alice Wang · Design · 3yr']},{l:'Interview',c:'#a78bfa',cards:['Bob Chen · Backend · 6yr']},{l:'Offer',c:'#4ade80',cards:[]},{l:'Hired',c:'#22d3ee',cards:[]},{l:'Rejected',c:'#fb7185',cards:['Tom Raj · DevOps · 1yr']}].map(col=>`
          <div style="min-width:180px;flex:1;background:var(--bg-card);border-radius:16px;padding:16px;border:1px solid var(--border-subtle);">
            <div style="display:flex;justify-content:space-between;margin-bottom:14px;"><span style="font-size:11px;font-weight:700;color:${col.c};text-transform:uppercase;">${col.l}</span><span style="font-size:10px;color:var(--text-dim);">${col.cards.length}</span></div>
            ${col.cards.length ? col.cards.map(c=>`<div style="background:var(--bg-workspace);padding:10px;border-radius:10px;border:1px solid var(--border-subtle);margin-bottom:8px;"><div style="font-size:12px;font-weight:700;color:var(--text-main);">${c.split('·')[0]}</div><div style="font-size:10px;color:var(--text-dim);">${c.split('·').slice(1).join('·')}</div></div>`).join('') : `<div style="font-size:11px;color:var(--text-dim);text-align:center;padding:20px 0;">Empty</div>`}
          </div>
        `).join('')}
      </div>
    `;
    if (tab === 'Interviews') return `
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:18px;padding:24px;"><h3 style="font-size:14px;color:var(--text-muted);margin-bottom:16px;">📅 Scheduled</h3>
          <div style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-workspace);border-radius:14px;border:1px solid var(--border-subtle);">
            <span style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#a78bfa,#7c3aed);color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">AW</span>
            <div><div style="font-weight:600;color:var(--text-main);">Alice Wang</div><div style="font-size:11px;color:var(--text-dim);">May 2 · 10:00 AM · Zoom</div></div>
          </div>
        </div>
        <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:18px;padding:24px;"><h3 style="font-size:14px;color:var(--text-muted);margin-bottom:16px;">✅ Completed</h3>
          <div style="display:flex;align-items:center;gap:12px;padding:14px;background:var(--bg-workspace);border-radius:14px;border:1px solid var(--border-subtle);">
            <span style="width:36px;height:36px;border-radius:50%;background:linear-gradient(135deg,#facc15,#f59e0b);color:#0d0d0d;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:12px;flex-shrink:0;">JD</span>
            <div><div style="font-weight:600;color:var(--text-main);">John Doe</div><div style="font-size:11px;color:var(--text-dim);">Yesterday · Rated: Strong Hire</div></div>
          </div>
        </div>
      </div>
    `;
    if (tab === 'Analytics') return `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px;">
        ${[{l:'Total Applied',v:job.apps,c:'#60a5fa'},{l:'Shortlisted',v:45,c:'#facc15'},{l:'Interviews',v:15,c:'#a78bfa'},{l:'Hired',v:3,c:'#4ade80'},{l:'Rejected',v:80,c:'#fb7185'},{l:'Conversion',v:'2.1%',c:null}].map(r=>`
          <div style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:18px;padding:22px;"><h3 style="font-size:11px;color:var(--text-dim);margin:0 0 8px 0;text-transform:uppercase;">${r.l}</h3><div style="font-size:32px;font-weight:800;color:${r.c||'var(--text-main)'};">${r.v}</div></div>
        `).join('')}
      </div>
    `;
    if (tab === 'Communication') return `
      <div style="display:grid;grid-template-columns:220px 1fr;height:450px;background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:18px;overflow:hidden;">
        <div style="border-right:1px solid var(--border-subtle);padding:16px;background:var(--bg-workspace);">
          <div style="font-size:12px;font-weight:700;margin-bottom:16px;color:var(--text-dim);">CONTACTS</div>
          <div style="padding:10px;background:var(--bg-card);border-radius:10px;color:var(--text-main);font-weight:700;font-size:13px;border:1px solid var(--border-subtle);">John Doe</div>
        </div>
        <div style="display:flex;flex-direction:column;padding:20px;">
          <div style="flex:1;display:flex;flex-direction:column;gap:12px;overflow-y:auto;padding:10px;">
            <div style="align-self:flex-start;background:var(--bg-workspace);padding:10px 14px;border-radius:14px;border:1px solid var(--border-subtle);font-size:13px;max-width:80%;">Hi! Any update on my application?</div>
            <div style="align-self:flex-end;background:#facc15;color:#0d0d0d;padding:10px 14px;border-radius:14px;font-size:13px;max-width:80%;">Hi John! You've been shortlisted. We'll be in touch soon.</div>
          </div>
          <div style="display:flex;gap:10px;margin-top:20px;padding-top:16px;border-top:1px solid var(--border-subtle);">
            <input type="text" placeholder="Type a message..." style="flex:1;background:var(--bg-workspace);border:1px solid var(--border-subtle);border-radius:10px;padding:10px;color:var(--text-main);outline:none;" />
            <button class="rec-btn primary">Send</button>
          </div>
        </div>
      </div>
    `;
    return '';
  };

  return `
    <div class="rec-workspace" style="padding:32px;min-height:100vh;">
      <div style="display:flex;align-items:center;gap:12px;margin-bottom:28px;">
        <button data-action="close-job-detail" class="rec-btn secondary">← Back</button>
        <div style="flex:1;">
          <div style="font-size:24px;font-weight:800;color:var(--text-main);">${job.title}</div>
          <div style="font-size:13px;color:var(--text-dim);margin-top:2px;">${job.location} · ${job.type} · Deadline: ${job.deadline}</div>
        </div>
        <span class="rec-badge active" style="padding:6px 16px;font-size:12px;">${job.status}</span>
        <button class="rec-btn secondary">✏️ Edit</button>
        <button class="rec-btn danger" style="background:rgba(251,113,133,0.1);color:#fb7185;border:1px solid rgba(251,113,133,0.2);">⏸ Pause</button>
      </div>
      <div style="display:flex;gap:6px;margin-bottom:28px;border-bottom:1px solid var(--border-subtle);padding-bottom:0;">
        ${tabs.map(t=>`<button data-action="job-detail-tab" data-tab="${t}" style="padding:12px 20px;border:none;background:transparent;cursor:pointer;font-size:13px;font-weight:600;border-bottom:2px solid ${tab===t?'#facc15':'transparent'};color:${tab===t?'#facc15':'var(--text-dim)'};transition:all 0.15s;">${t}</button>`).join('')}
      </div>
      ${tabContent()}
    </div>
  `;
}

function renderRecruiterJobs() {
  if (state.showCreateJobForm) {
    return `
      <div class="rec-workspace">
        <div class="rec-section-header">
          <div>
            <h2>Post New Vacancy</h2>
            <span>Define the role and requirements</span>
          </div>
          <button class="rec-btn secondary" data-action="cancel-job">← Cancel</button>
        </div>
        <div class="rec-card">
          <div class="rec-form">
            <div class="rec-field"><label>Job Title</label><input type="text" placeholder="e.g. Senior Frontend Engineer" /></div>
            <div class="rec-field"><label>Description</label><textarea style="height:120px;" placeholder="Describe the role..."></textarea></div>
            <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
              <div class="rec-field"><label>Salary</label><input type="text" placeholder="e.g. ₹15–22 LPA" /></div>
              <div class="rec-field"><label>Location</label><input type="text" placeholder="Remote / Bengaluru" /></div>
            </div>
            <button class="rec-btn primary" style="padding:16px;">Publish Opportunity</button>
          </div>
        </div>
      </div>
    `;
  }

  if (state.selectedJob) return renderJobDetail();

  const jobs = [
    {id:1,title:'Senior Frontend Engineer',location:'Remote',type:'Full-time',salary:'₹15–22 LPA',apps:142,status:'Active',skills:['React','TypeScript']},
    {id:2,title:'Product Designer',location:'New York',type:'Full-time',salary:'$90–120K',apps:89,status:'Active',skills:['Figma','UX']},
    {id:3,title:'Backend Engineer',location:'Bengaluru',type:'Full-time',salary:'₹12–18 LPA',apps:64,status:'Paused',skills:['Go','SQL']}
  ];
  const filteredJobs = jobs;

  return `
    <div class="rec-workspace">
      <div class="rec-section-header">
        <div>
          <h2>Job Management</h2>
          <span>Manage your active requisitions</span>
        </div>
        <button class="rec-btn primary" data-action="create-job">＋ Create Job</button>
      </div>
      <div class="rec-grid">
        ${jobs.map(j => `
          <div class="rec-card" data-action="open-job" data-job-id="${j.id}" style="cursor:pointer;">
            <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
              <div style="font-size:18px;font-weight:800;color:var(--text-main);">${j.title}</div>
              <span class="rec-status ${j.status.toLowerCase()}">${j.status}</span>
            </div>
            <div style="font-size:13px;color:var(--text-muted);margin-bottom:16px;">${j.location} · ${j.salary}</div>
            <div style="display:flex;gap:6px;margin-bottom:20px;">
              ${j.skills.map(s => `<span class="rec-tag">${s}</span>`).join('')}
            </div>
            <div style="display:flex;justify-content:space-between;align-items:center;padding-top:16px;border-top:1px solid var(--border-subtle);">
              <span style="font-size:12px;font-weight:700;">${j.apps} applicants</span>
              <button class="rec-btn secondary sm">Manage</button>
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}


function renderRecruiterApplications() {
  return `
    <div class="rec-workspace" style="padding:32px;">
      <div class="rec-section-header">
        <h2>${state.appFilter ? `📄 ${state.appFilter} Candidates` : '📂 Applications'}</h2>
        <div>
          ${state.appFilter ? `<button class="rec-btn secondary" data-action="filter-apps" data-filter="" style="margin-right:8px;">✕ Clear Filter</button>` : ''}
          <span>360 total applicants</span>
        </div>
      </div>
      <div class="rec-filter-bar">
        <select class="rec-filter-select"><option>All Jobs</option><option>Frontend Engineer</option><option>Designer</option></select>
        <select class="rec-filter-select"><option>All Skills</option><option>React</option><option>Node.js</option><option>Python</option></select>
        <select class="rec-filter-select"><option>All Experience</option><option>0–2 years</option><option>2–5 years</option><option>5+ years</option></select>
        <select class="rec-filter-select"><option>All Status</option><option>Applied</option><option>Shortlisted</option><option>Interview</option><option>Rejected</option></select>
      </div>
      <div class="rec-table-wrap">
        <table class="rec-table">
          <thead><tr><th>Candidate</th><th>Applied For</th><th>Skills</th><th>Experience</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody>
            ${filterBySearch(candidates, state.globalSearch, ['name', 'role', 'skills', 'status']).filter(c => !state.appFilter || c.status === state.appFilter).map(c => `
              <tr data-action="view-candidate" data-id="${c.id}" style="cursor:pointer;">
                <td><span class="rec-avatar" style="background:${c.gradient};color:${c.initials === 'JD' ? '#0d0d0d' : '#fff'};">${c.initials}</span><strong>${c.name}</strong></td>
                <td>${c.role}</td><td>${c.skills}</td><td>${c.exp}</td>
                <td><span class="rec-status ${c.status.toLowerCase()}">${c.status}</span></td>
                <td><button class="rec-action-btn">View Profile</button></td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `;
}

function renderCandidateProfile() {
  const candidate = candidates.find(c => c.id === Number(state.selectedCandidateId));
  if (!candidate) return '';
  
  return `
    <div class="rec-workspace" style="padding:32px;">
      <div class="rec-section-header">
        <button class="rec-btn secondary" data-action="switch-tab" data-tab="Applications">← Back to Applications</button>
        <h2>Candidate Profile</h2>
        <div class="rec-btn-group">
          <button class="rec-btn primary">Hire Now</button>
          <button class="rec-btn secondary">Message</button>
        </div>
      </div>
      
      <div style="display:grid;grid-template-columns:300px 1fr;gap:24px;margin-top:20px;">
        <div class="rec-chart-card" style="text-align:center;padding:32px;">
          <span class="rec-avatar" style="width:100px;height:100px;font-size:32px;background:${candidate.gradient};color:${candidate.initials === 'JD' ? '#0d0d0d' : '#fff'};margin-bottom:16px;display:inline-flex;align-items:center;justify-content:center;border-radius:50%;">${candidate.initials}</span>
          <h2 style="margin:0;color:var(--text-main);">${candidate.name}</h2>
          <p style="color:var(--text-muted);margin:8px 0;">${candidate.role}</p>
          <span class="rec-status ${candidate.status.toLowerCase()}">${candidate.status}</span>
          
          <div style="margin-top:24px;text-align:left;border-top:1px solid var(--border-subtle);padding-top:24px;">
            <div style="margin-bottom:12px;"><strong style="display:block;font-size:11px;color:var(--text-muted);text-transform:uppercase;">Email</strong><span style="color:var(--text-main);">${candidate.email}</span></div>
            <div style="margin-bottom:12px;"><strong style="display:block;font-size:11px;color:var(--text-muted);text-transform:uppercase;">Phone</strong><span style="color:var(--text-main);">${candidate.phone}</span></div>
            <div style="margin-bottom:12px;"><strong style="display:block;font-size:11px;color:var(--text-muted);text-transform:uppercase;">Location</strong><span style="color:var(--text-main);">San Francisco, CA</span></div>
          </div>
        </div>
        
        <div style="display:flex;flex-direction:column;gap:20px;">
          <div class="rec-chart-card">
            <h3 style="margin-top:0;">Experience & Skills</h3>
            <p style="color:var(--text-main);line-height:1.6;">${candidate.name} has over ${candidate.exp} of experience in the industry, specializing in ${candidate.skills}. They have worked with top-tier companies and contributed to high-impact projects.</p>
            <div style="display:flex;gap:8px;margin-top:16px;">
              ${candidate.skills.split(', ').map(s => `<span class="rec-tag">${s}</span>`).join('')}
            </div>
          </div>
          
          <div class="rec-chart-card">
            <h3 style="margin-top:0;">Resume Preview</h3>
            <div style="height:300px;background:var(--bg-workspace);border:1px dashed var(--border-subtle);border-radius:12px;display:grid;place-items:center;color:var(--text-muted);">
              <div style="text-align:center;">
                <i class="fas fa-file-pdf" style="font-size:48px;margin-bottom:12px;"></i>
                <p>Resume_${candidate.name.replace(' ','_')}.pdf</p>
                <button class="rec-btn secondary">Download PDF</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderRecruiterInterviews() {
  const interviews = [
    {name:'Alice Wang',role:'Product Designer',time:'Tomorrow · 10:00 AM · Zoom'},
    {name:'Bob Chen',role:'Backend Engineer',time:'May 4 · 2:30 PM · Google Meet'},
    {name:'John Doe',role:'Frontend Engineer',time:'Yesterday · Feedback: Strong Hire'},
  ];
  const filteredInterviews = filterBySearch(interviews, state.globalSearch, [
    (i) => `${i.name} ${i.role} ${i.time}`,
  ]);

  return `
    <div class="rec-workspace" style="padding:32px;">
      <div class="rec-section-header"><h2>📅 Interview Scheduling</h2><button class="rec-btn primary">＋ Schedule Interview</button></div>
      <div class="rec-interview-grid">
        <div class="rec-chart-card">
          <h3 style="color:var(--amber);">🟡 Upcoming Interviews</h3>
          ${filteredInterviews.filter(i => i.name !== 'John Doe').map(i => `
            <div class="rec-activity-item">
              <span class="rec-avatar" style="background:linear-gradient(135deg,#a78bfa,#7c3aed);color:#fff;flex-shrink:0;">${initials(i.name)}</span>
              <div><div style="font-size:14px;font-weight:600;color:var(--text-main);">${i.name}</div><div style="font-size:12px;color:var(--text-muted);">${i.role}</div><div class="rec-activity-time">${i.time}</div></div>
            </div>`).join('')}
        </div>
        <div class="rec-chart-card">
          <h3 style="color:var(--green);">✅ Completed Recently</h3>
          ${filteredInterviews.filter(i => i.name === 'John Doe').map(i => `
            <div class="rec-activity-item">
              <span class="rec-avatar" style="background:linear-gradient(135deg,#facc15,#f59e0b);color:#0d0d0d;flex-shrink:0;">${initials(i.name)}</span>
              <div><div style="font-size:14px;font-weight:600;color:var(--text-main);">${i.name}</div><div style="font-size:12px;color:var(--text-muted);">${i.role}</div><div class="rec-activity-time">${i.time}</div></div>
            </div>`).join('')}
        </div>
      </div>
    </div>
  `;
}

function renderRecruiterPipeline() {
  return `
    <div class="rec-workspace" style="padding:32px;">
      <div class="rec-section-header"><h2>👥 Candidate Pipeline</h2><span>Drag cards across stages</span></div>
      <div class="rec-kanban">
        <div class="rec-kanban-col">
          <div class="rec-kanban-col-header"><span class="rec-kanban-col-title" style="color:#60a5fa;">Applied</span><span class="rec-kanban-count">2</span></div>
          <div class="rec-kanban-card"><div class="rec-kanban-card-name">John Doe</div><div class="rec-kanban-card-role">Frontend Engineer · 4 yrs</div></div>
          <div class="rec-kanban-card"><div class="rec-kanban-card-name">Riya Singh</div><div class="rec-kanban-card-role">QA Engineer · 2 yrs</div></div>
        </div>
        <div class="rec-kanban-col">
          <div class="rec-kanban-col-header"><span class="rec-kanban-col-title" style="color:#facc15;">Shortlisted</span><span class="rec-kanban-count">1</span></div>
          <div class="rec-kanban-card"><div class="rec-kanban-card-name">Jane Smith</div><div class="rec-kanban-card-role">Product Designer · 3 yrs</div></div>
        </div>
        <div class="rec-kanban-col">
          <div class="rec-kanban-col-header"><span class="rec-kanban-col-title" style="color:#a78bfa;">Interview</span><span class="rec-kanban-count">1</span></div>
          <div class="rec-kanban-card"><div class="rec-kanban-card-name">Alice Wong</div><div class="rec-kanban-card-role">Backend Engineer · 5 yrs</div></div>
        </div>
        <div class="rec-kanban-col">
          <div class="rec-kanban-col-header"><span class="rec-kanban-col-title" style="color:#4ade80;">Selected</span><span class="rec-kanban-count">0</span></div>
          <div style="font-size:12px;color:rgba(255,255,255,0.2);text-align:center;padding:20px 0;">Drop here</div>
        </div>
        <div class="rec-kanban-col">
          <div class="rec-kanban-col-header"><span class="rec-kanban-col-title" style="color:#fb7185;">Rejected</span><span class="rec-kanban-count">1</span></div>
          <div class="rec-kanban-card"><div class="rec-kanban-card-name">Tom Raj</div><div class="rec-kanban-card-role">DevOps · 1 yr</div></div>
        </div>
      </div>
    </div>
  `;
}

function renderRecruiterReports() {
  return `
    <div class="rec-workspace" style="padding:32px;">
      <div class="rec-section-header"><h2>📊 Reports & Analytics</h2></div>
      <div class="rec-reports-grid">
        <div class="rec-report-card"><h3>Hires This Month</h3><div class="big-num">3</div><div style="font-size:12px;color:#4ade80;margin-top:6px;">↑ +1 vs last month</div></div>
        <div class="rec-report-card"><h3>Avg. Time to Hire</h3><div class="big-num" style="color:#60a5fa;">18d</div><div style="font-size:12px;color:#4ade80;margin-top:6px;">↓ 3 days faster</div></div>
        <div class="rec-report-card"><h3>Top Performing Job</h3><div style="font-size:18px;font-weight:700;color:#facc15;margin-top:8px;">Frontend Eng</div><div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;">142 applicants</div></div>
        <div class="rec-report-card"><h3>Offer Acceptance Rate</h3><div class="big-num" style="color:#a78bfa;">85%</div></div>
        <div class="rec-report-card"><h3>Pipeline Conversion</h3><div class="big-num" style="color:#4ade80;">13%</div><div style="font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;">Applied → Hired</div></div>
        <div class="rec-report-card"><h3>Active Requisitions</h3><div class="big-num">12</div></div>
      </div>
    </div>
  `;
}
function renderRecruiterMessages() {
  return `
    <div class="rec-workspace" style="padding:32px;">
      <div class="rec-section-header"><h2>💬 Messages</h2></div>
      <div class="rec-messages-layout">
        <div class="rec-messages-list">
          <div class="rec-msg-contact active"><span class="rec-avatar" style="background:linear-gradient(135deg,#facc15,#f59e0b);color:#0d0d0d;flex-shrink:0;">JD</span><div><div class="rec-msg-contact-name">John Doe</div><div class="rec-msg-contact-preview">Thanks for the update!</div></div></div>
          <div class="rec-msg-contact"><span class="rec-avatar" style="background:linear-gradient(135deg,#a78bfa,#7c3aed);color:#fff;flex-shrink:0;">AW</span><div><div class="rec-msg-contact-name">Alice Wang</div><div class="rec-msg-contact-preview">When is the interview?</div></div></div>
          <div class="rec-msg-contact"><span class="rec-avatar" style="background:linear-gradient(135deg,#4ade80,#16a34a);color:#fff;flex-shrink:0;">BC</span><div><div class="rec-msg-contact-name">Bob Chen</div><div class="rec-msg-contact-preview">I'm available on Friday.</div></div></div>
        </div>
        <div class="rec-chat-area">
          <div class="rec-chat-bubble received">Hi! Just wanted to check the status of my application.</div>
          <div class="rec-chat-bubble sent">Hi John! You've been shortlisted. We'll schedule your interview soon.</div>
          <div class="rec-chat-bubble received">That's great news! Thank you so much!</div>
        </div>
      </div>
    </div>
  `;
}
function renderRecruiterSettings() {
  return `
    <div class="rec-workspace">
      <div class="rec-section-header">
        <div>
          <h2>System Settings</h2>
          <span>Manage your workspace and preferences</span>
        </div>
      </div>

      <div class="rec-grid">
        <div class="rec-card">
          <div class="rec-card-header"><h3>👤 Profile Settings</h3></div>
          <div class="rec-form">
            <div class="rec-field"><label>Full Name</label><input type="text" value="${state.currentUserName || ''}" placeholder="Your name" /></div>
            <div class="rec-field"><label>Email Address</label><input type="email" placeholder="you@company.com" /></div>
            <div class="rec-field"><label>Job Title</label><input type="text" placeholder="Senior Recruiter" /></div>
            <button class="rec-btn primary">Save Profile</button>
          </div>
        </div>
        <div class="rec-card">
          <div class="rec-card-header"><h3>🏢 Company Workspace</h3></div>
          <div class="rec-form">
            <div class="rec-field"><label>Company Name</label><input type="text" placeholder="Company Inc." /></div>
            <div class="rec-field"><label>Website</label><input type="text" placeholder="https://company.com" /></div>
            <div class="rec-field"><label>Industry</label><select><option>Technology</option><option>Finance</option><option>Healthcare</option></select></div>
            <button class="rec-btn secondary">Update Workspace</button>
          </div>
        </div>
        <div class="rec-card">
          <div class="rec-card-header"><h3>🔒 Security</h3></div>
          <div class="rec-form">
            <div class="rec-field"><label>Current Password</label><input type="password" placeholder="••••••••" /></div>
            <div class="rec-field"><label>New Password</label><input type="password" placeholder="••••••••" /></div>
            <button class="rec-btn secondary">Change Password</button>
          </div>
        </div>
        <div class="rec-card">
          <div class="rec-card-header"><h3>🔔 Notifications</h3></div>
          <div class="rec-form">
            ${['New Job Applications', 'Interview Reminders', 'System Updates'].map(n => `
              <label style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-workspace);border-radius:12px;cursor:pointer;">
                <span style="font-size:13px;font-weight:600;">${n}</span>
                <input type="checkbox" checked style="width:auto;" />
              </label>
            `).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}

function renderCandidateWorkspace() {
  const tab = state.activeTab || 'Dashboard';

  if (tab === 'Dashboard') return `
    <div class="rec-workspace">
      <div class="rec-section-header">
        <div>
          <h2>Candidate Dashboard</h2>
          <span>Your application journey</span>
        </div>
      </div>

      <div class="rec-stat-grid">
        <div class="rec-stat-card"><div class="stat-num blue">12</div><div class="stat-label">Apps Sent</div><div class="stat-delta green">↑ +2 this week</div></div>
        <div class="rec-stat-card"><div class="stat-num violet">3</div><div class="stat-label">Interviews</div><div class="stat-delta violet">↑ +1 upcoming</div></div>
        <div class="rec-stat-card"><div class="stat-num green">5</div><div class="stat-label">Shortlisted</div><div class="stat-delta green">↑ +2 new</div></div>
        <div class="rec-stat-card"><div class="stat-num">82%</div><div class="stat-label">Profile Strength</div></div>
      </div>

      <div class="rec-grid">
        <div class="rec-card">
          <div class="rec-card-header"><h3>🕐 Recent Applications</h3></div>
          <div style="display:flex;flex-direction:column;gap:16px;">
            ${[{t:'Senior Frontend Engineer',c:'Google',s:'Shortlisted',col:'var(--accent-yellow)'},{t:'Product Designer',c:'Figma',s:'Under Review',col:'var(--accent-blue)'}].map(a=>`
              <div style="display:flex;justify-content:space-between;align-items:center;padding:12px;background:var(--bg-workspace);border-radius:14px;">
                <div><div style="font-weight:700;">${a.t}</div><div style="font-size:12px;color:var(--text-muted);">${a.c}</div></div>
                <span class="rec-status" style="color:${a.col};">${a.s}</span>
              </div>`).join('')}
          </div>
        </div>
        <div class="rec-card">
          <div class="rec-card-header"><h3>📅 Upcoming Interviews</h3></div>
          <div style="padding:16px;background:var(--accent-blue-dim);border:1px solid var(--accent-blue);border-radius:16px;">
            <div style="font-weight:800;color:var(--text-main);">Google · Technical Round</div>
            <div style="font-size:12px;color:var(--text-muted);margin-top:6px;">Tomorrow · 11:00 AM · Google Meet</div>
          </div>
        </div>
      </div>
    </div>`;

  if (tab === 'My Opportunities') {
    const opportunities = [{t:'Senior Frontend Engineer',c:'Google',l:'Remote',s:'₹18–25 LPA',tags:['React','TypeScript'],m:92},{t:'UX Designer',c:'Figma',l:'San Francisco',s:'$110K',tags:['Figma','UX Research'],m:87},{t:'Full Stack Developer',c:'Stripe',l:'Remote',s:'$140K',tags:['Node.js','React','AWS'],m:79},{t:'Product Manager',c:'Meta',l:'Menlo Park',s:'$160K',tags:['Strategy','Roadmap'],m:65}];
    const filteredOpportunities = filterBySearch(opportunities, state.globalSearch, [(job) => `${job.t} ${job.c} ${job.l} ${job.s} ${job.tags.join(' ')}`]);
    return `
      <div class="rec-workspace">
        <div class="rec-section-header"><h2>🔍 Job Opportunities</h2></div>
        <div class="rec-job-grid">
          ${filteredOpportunities.map(j=>`
            <div class="rec-job-card">
              <div class="rec-job-card-title">${j.t}</div>
              <div class="rec-job-card-meta">${j.c} · ${j.l} · ${j.s}</div>
              <div class="rec-tag-row">${j.tags.map(t=>`<span class="rec-tag">${t}</span>`).join('')}</div>
              <div style="display:flex;align-items:center;justify-content:space-between;margin-top:12px;">
                <span style="font-size:13px;font-weight:700;color:var(--green);">${j.m}% match</span>
                <button class="rec-btn primary">Apply Now</button>
              </div>
            </div>`).join('')}
        </div>
      </div>`;
  }

  if (tab === 'Applications') {
    const applications = [{c:'Google',r:'Senior Frontend Engineer',s:'Shortlisted',col:'#facc15',d:'Apr 20'},{c:'Figma',r:'Product Designer',s:'Under Review',col:'#60a5fa',d:'Apr 22'},{c:'Stripe',r:'Full Stack Developer',s:'Applied',col:'#a78bfa',d:'Apr 25'},{c:'Meta',r:'Product Manager',s:'Rejected',col:'#fb7185',d:'Apr 18'}];
    const filteredApplications = filterBySearch(applications, state.globalSearch, [(app) => `${app.c} ${app.r} ${app.s} ${app.d}`]);
    return `
      <div class="rec-workspace">
        <div class="rec-section-header"><h2>📂 My Applications</h2></div>
        <div class="rec-table-wrap">
          <table class="rec-table">
            <thead><tr><th>Company</th><th>Role</th><th>Status</th><th>Applied</th></tr></thead>
            <tbody>
              ${filteredApplications.map(a=>`
                <tr>
                  <td><strong>${a.c}</strong></td>
                  <td>${a.r}</td>
                  <td><span class="rec-status" style="background:rgba(255,255,255,0.06);color:${a.col};">${a.s}</span></td>
                  <td>${a.d}</td>
                </tr>`).join('')}
            </tbody>
          </table>
        </div>
      </div>`;
  }

  if (tab === 'Interviews') {
    const interviews = [{c:'Google',r:'Technical Round',d:'Tomorrow · 11:00 AM',platform:'Google Meet'},{c:'Figma',r:'Design Challenge',d:'May 5 · 3:00 PM',platform:'Zoom'},{c:'Stripe',r:'HR Round',d:'Apr 24 · Positive feedback',platform:'In-person'}];
    const filteredInterviews = filterBySearch(interviews, state.globalSearch, [(i) => `${i.c} ${i.r} ${i.d} ${i.platform}`]);
    return `
      <div class="rec-workspace">
        <div class="rec-section-header"><h2>📅 Interviews</h2></div>
        <div class="rec-charts">
          <div class="rec-chart-card">
            <h3>Upcoming</h3>
            ${filteredInterviews.filter(i => i.c !== 'Stripe').map(i=>`<div class="rec-activity-item"><div><div style="font-weight:600;color:var(--text-main);">${i.c} · ${i.r}</div><div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${i.d} · ${i.platform}</div></div></div>`).join('')}
          </div>
          <div class="rec-chart-card">
            <h3>Completed</h3>
            ${filteredInterviews.filter(i => i.c === 'Stripe').map(i=>`<div class="rec-activity-item"><div><div style="font-weight:600;color:var(--text-main);">${i.c} · ${i.r}</div><div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${i.d}</div></div></div>`).join('')}
          </div>
        </div>
      </div>`;
  }

  if (tab === 'Resources') {
    const contacts = [{n:'Sarah Chen',t:'Recruiter @ Google',i:'SC',g:'#facc15,#f59e0b',c:'#0d0d0d'},{n:'Mike Patel',t:'HM @ Stripe',i:'MP',g:'#60a5fa,#2563eb',c:'#fff'},{n:'Lisa Wong',t:'Designer @ Figma',i:'LW',g:'#a78bfa,#7c3aed',c:'#fff'}];
    const filteredContacts = filterBySearch(contacts, state.globalSearch, [(p) => `${p.n} ${p.t}`]);
    return `
      <div class="rec-workspace">
        <div class="rec-section-header"><h2>👥 Network</h2></div>
        <div class="rec-stat-grid" style="grid-template-columns:repeat(3,1fr);">
          ${filteredContacts.map(p=>`
            <div class="rec-stat-card" style="text-align:center;">
              <div style="width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,${p.g});display:flex;align-items:center;justify-content:center;font-weight:800;font-size:18px;color:${p.c};margin:0 auto 12px;">${p.i}</div>
              <div style="font-size:15px;font-weight:700;color:var(--text-main);">${p.n}</div>
              <div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${p.t}</div>
              <button class="rec-btn secondary sm" style="margin-top:12px;">Connect</button>
            </div>`).join('')}
        </div>
      </div>`;
  }

  return '';
}

function renderHiringManagerWorkspace() {
  const tab = state.activeTab || 'Dashboard';

  if (tab === 'Dashboard') return `
    <div class="rec-workspace">
      <div class="rec-section-header">
        <div>
          <h2>Hiring Pipeline</h2>
          <span>Department: Product & Engineering</span>
        </div>
      </div>

      <div class="rec-stat-grid">
        <div class="rec-stat-card"><div class="stat-num violet">8</div><div class="stat-label">Open Roles</div><div class="stat-delta violet">↑ +2 this month</div></div>
        <div class="rec-stat-card"><div class="stat-num yellow">12</div><div class="stat-label">Interviews</div><div class="stat-delta yellow">↑ +3 this week</div></div>
        <div class="rec-stat-card"><div class="stat-num rose">4</div><div class="stat-label">Pending Feedback</div><div class="stat-delta rose">⚠ Action required</div></div>
        <div class="rec-stat-card"><div class="stat-num green">2</div><div class="stat-label">Offers Sent</div></div>
      </div>

      <div class="rec-grid">
        <div class="rec-card">
          <div class="rec-card-header"><h3>📋 Feedback Required</h3></div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            ${[{n:'Alice Wang',r:'Designer'},{n:'Bob Chen',r:'Backend'}].map(f=>`
              <div style="display:flex;align-items:center;gap:16px;padding:12px;background:var(--bg-workspace);border-radius:16px;">
                <div class="rec-avatar" style="background:var(--accent-violet);color:#fff;">${f.n[0]}</div>
                <div style="flex:1;"><div style="font-weight:700;">${f.n}</div><div style="font-size:11px;color:var(--text-muted);">${f.r}</div></div>
                <button class="rec-btn primary sm">Submit</button>
              </div>`).join('')}
          </div>
        </div>
        <div class="rec-card">
          <div class="rec-card-header"><h3>📅 Today's Interviews</h3></div>
          <div style="display:flex;flex-direction:column;gap:12px;">
            <div style="padding:14px;background:var(--accent-violet-dim);border:1px solid var(--accent-violet);border-radius:14px;">
              <div style="font-weight:700;">Sara Lee · DevOps</div>
              <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">2:00 PM · Zoom</div>
            </div>
          </div>
        </div>
      </div>
    </div>`;



  if (tab === 'Team Pipeline') return `
    <div class="rec-workspace">
      <div class="rec-section-header"><h2>👥 Team Pipeline</h2></div>
      <div class="rec-kanban">
        ${[{l:'Applied',c:'#60a5fa',cards:['Alice Wang · Designer','Bob Chen · Backend']},{l:'Shortlisted',c:'#facc15',cards:['Sara Lee · DevOps']},{l:'Interview',c:'#a78bfa',cards:['James Park · Frontend']},{l:'Offer',c:'#4ade80',cards:[]},{l:'Hired',c:'#22d3ee',cards:[]}].map(col=>`
          <div class="rec-kanban-col">
            <div class="rec-kanban-col-header"><span class="rec-kanban-col-title" style="color:${col.c};">${col.l}</span><span class="rec-kanban-count">${col.cards.length}</span></div>
            ${col.cards.length ? col.cards.map(c=>`<div class="rec-kanban-card"><div class="rec-kanban-card-name">${c}</div></div>`).join('') : `<div style="font-size:12px;color:var(--text-muted);text-align:center;padding:16px 0;">Empty</div>`}
          </div>`).join('')}
      </div>
    </div>`;

  if (tab === 'Interviews') return `
    <div class="rec-workspace">
      <div class="rec-section-header"><h2>📅 Interview Schedule</h2></div>
      <div class="rec-charts">
        <div class="rec-chart-card">
          <h3>Scheduled</h3>
          ${[{n:'Sara Lee',r:'DevOps',d:'Today 2:00 PM · Zoom'},{n:'James Park',r:'Frontend',d:'Tomorrow 10:00 AM · Meet'}].map(i=>`<div class="rec-activity-item"><div><div style="font-weight:600;color:var(--text-main);">${i.n} · ${i.r}</div><div style="font-size:12px;color:var(--text-muted);margin-top:4px;">${i.d}</div></div></div>`).join('')}
        </div>
        <div class="rec-chart-card">
          <h3>Completed</h3>
          <div class="rec-activity-item"><div><div style="font-weight:600;color:var(--text-main);">Alice Wang · Design Review</div><div style="font-size:12px;color:var(--text-muted);margin-top:4px;">Yesterday · Awaiting feedback</div></div></div>
        </div>
      </div>
    </div>`;

  if (tab === 'Feedback') return `
    <div class="rec-workspace">
      <div class="rec-section-header"><h2>💬 Feedback Queue</h2></div>
      <div style="display:flex;flex-direction:column;gap:12px;">
        ${[{n:'Alice Wang',r:'Product Designer',v:'Strong Hire',c:'var(--green)'},{n:'Bob Chen',r:'Backend Engineer',v:'Hire',c:'var(--amber)'},{n:'Tom Raj',r:'DevOps',v:'No Hire',c:'var(--rose)'}].map(f=>`
          <div class="rec-activity-item" style="background:var(--bg-card);border:1px solid var(--border-subtle);border-radius:14px;padding:18px;">
            <div class="rec-avatar" style="background:linear-gradient(135deg,var(--accent-yellow),var(--accent-yellow-dim));color:#0d0d0d;flex-shrink:0;">${f.n.split(' ').map(w=>w[0]).join('')}</div>
            <div style="flex:1;"><div style="font-size:15px;font-weight:700;color:var(--text-main);">${f.n}</div><div style="font-size:12px;color:var(--text-muted);">${f.r}</div></div>
            <span class="rec-status" style="background:var(--bg-workspace);color:${f.c};">${f.v}</span>
            <button class="rec-btn secondary sm">Review</button>
          </div>`).join('')}
      </div>
    </div>`;

  if (tab === 'Reports') return `
    <div class="rec-workspace">
      <div class="rec-section-header"><h2>📊 Reports</h2></div>
      <div class="rec-stat-grid">
        <div class="rec-stat-card"><div class="stat-num blue">5</div><div class="stat-label">Roles Filled</div></div>
        <div class="rec-stat-card"><div class="stat-num violet">3.2</div><div class="stat-label">Avg Rounds</div></div>
        <div class="rec-stat-card"><div class="stat-num green">80%</div><div class="stat-label">Offer Acceptance</div></div>
      </div>
    </div>`;

  return `<div class="rec-workspace" style="text-align:center;padding:48px;color:var(--text-muted);">Select a tab to view content</div>`;
}

function renderApp() {
  document.body.dataset.theme = state.theme || 'light';
  document.body.dataset.userRole = state.role || 'Recruiter';
  
  if (!state.isLoggedIn) {
    document.getElementById("root").innerHTML = renderLoginSignup();
    return;
  }

  const roleContent = () => {
    const role = state.role;
    if (role === 'Candidate') return renderCandidateWorkspace();
    if (role === 'Hiring Manager') return renderHiringManagerWorkspace();
    
    // Recruiter Logic
    const tab = state.activeTab || 'Dashboard';
    if (tab === 'Dashboard') return renderRecruiterDashboard();
    if (tab === 'Jobs') return renderRecruiterJobs();
    if (tab === 'Applications') return renderRecruiterApplications();
    if (tab === 'Interviews') return renderRecruiterInterviews();
    if (tab === 'Pipeline') return renderRecruiterPipeline();
    if (tab === 'Reports') return renderRecruiterReports();
    if (tab === 'Messages') return renderRecruiterMessages();
    if (tab === 'Settings') return renderRecruiterSettings();
    if (tab === 'CandidateDetail') return renderCandidateProfile();
    return renderRecruiterDashboard();
  };

  // Unified Workspace Layout (Locked Flex)
  document.getElementById("root").innerHTML = `
    <main style="display:flex;min-height:100vh;background:var(--bg-workspace);overflow-x:hidden;">
      ${renderSidebar()}
      <section style="flex:1;min-width:0;display:flex;flex-direction:column;position:relative;z-index:1;">
        <div class="rec-interactive-bg" style="background:var(--bg-workspace);">
          <div class="rec-grid-lines"></div>
        </div>
        ${renderTopbar()}
        <div style="flex:1;overflow-y:auto;position:relative;z-index:2;">
          ${roleContent()}
        </div>
      </section>
    </main>
  `;
}

document.addEventListener("click", (event) => {
  const roleButton = event.target.closest("[data-role]");
  const stageButton = event.target.closest("[data-stage]");
  const actionButton = event.target.closest("[data-action]");
  const roleFilterButton = event.target.closest("[data-filter-role]");
  const modeFilterButton = event.target.closest("[data-filter-mode]");
  const templateButton = event.target.closest("[data-template]");

  if (roleButton) {
    const r = roleButton.dataset.role;
    state.role = r;
    state.registerRole = r; // Sync for registration
  }
  if (stageButton) state.stage = stageButton.dataset.stage;
  if (roleFilterButton) state.roleFilter = roleFilterButton.dataset.filterRole;
  if (modeFilterButton) state.workModeFilter = modeFilterButton.dataset.filterMode;
  if (templateButton) state.resumeTemplate = templateButton.dataset.template;
  if (actionButton?.dataset.action === "theme") {
    state.theme = state.theme === "light" ? "dark" : "light";
    localStorage.setItem("talentflow-theme", state.theme);
    renderApp();
    return;
  }
  if (actionButton?.dataset.action === "bot") state.botOpen = !state.botOpen;
  if (actionButton?.dataset.action === "send-bot-msg") {
    const input = document.getElementById("bot-user-input");
    const text = input.value.trim();
    if (text) {
      state.botHistory.push({type:'user', text});
      input.value = "";
      state.botThinking = true;
      renderApp();
      
      setTimeout(() => {
        let response = "";
        const lower = text.toLowerCase();
        if (lower.includes("hello") || lower.includes("hi")) response = "Hello! I am JAMS. I am currently analyzing your hiring pipeline and self-optimizing my algorithms. 🤖";
        else if (lower.includes("tip")) response = "Analysis complete: Your 'React' candidates have the highest retention. Try prioritizing similar skillsets. 💡";
        else if (lower.includes("work") || lower.includes("reminder")) response = "Work Status: You have 3 pending interviews today. I've sent reminders to the candidates. ✅";
        else response = "I've processed your message and added it to my training set. I am evolving to better assist you with your specific workflow. 🧠";
        
        state.botHistory.push({type:'ai', text: response});
        state.botThinking = false;
        renderApp();
        const history = document.getElementById("bot-chat-history");
        if (history) history.scrollTop = history.scrollHeight;
      }, 1500);
    }
  }
  if (actionButton?.dataset.action === "close-bot") state.botOpen = false;

  if (actionButton?.dataset.action === "switch-register") {
    event.preventDefault();
    state.authMode = 'register';
  }
  if (actionButton?.dataset.action === "switch-login") {
    event.preventDefault();
    state.authMode = 'login';
  }
  if (actionButton?.dataset.action === "submit-register") {
    event.preventDefault();
    const fullname = document.getElementById("auth-fullname") ? document.getElementById("auth-fullname").value : "";
    const email = document.getElementById("auth-email").value;
    const password = document.getElementById("auth-password").value;
    const role = state.registerRole || "Recruiter";
    
    if (!fullname || !email || !password) {
      alert("Please enter your full name, email, and password.");
      return;
    }
    
    const submitBtn = actionButton;
    submitBtn.textContent = "Creating...";
    submitBtn.disabled = true;

    fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: fullname, email, password, role })
    })
    .then(res => res.json())
    .then(data => {
      submitBtn.textContent = "Create Account";
      submitBtn.disabled = false;
      if (data.token) {
        localStorage.setItem("talentflow-token", data.token);
        localStorage.setItem("talentflow-role", data.user.role);
        localStorage.setItem("talentflow-username", data.user.name);
        state.token = data.token;
        state.role = data.user.role;
        state.currentUserName = data.user.name;
        state.isLoggedIn = true;
        renderApp();
      } else {
        alert(data.message || (data.errors ? data.errors[0].msg : "Failed to create account"));
      }
    })
    .catch(err => {
      submitBtn.textContent = "Create Account";
      submitBtn.disabled = false;
      alert("Error connecting to server. Make sure the backend is running on port 5002.");
    });
  }
  if (actionButton?.dataset.action === "submit-login") {
    event.preventDefault();
    const email = document.getElementById("auth-email").value;
    const password = document.getElementById("auth-password").value;
    
    if (!email && !password) {
      state.isLoggedIn = true;
      state.activeTab = "Dashboard";
      renderApp();
      return;
    }

    const submitBtn = actionButton;
    submitBtn.textContent = "Logging in...";
    submitBtn.disabled = true;

    fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
      submitBtn.textContent = "Login";
      submitBtn.disabled = false;
      if (data.token) {
        localStorage.setItem("talentflow-token", data.token);
        localStorage.setItem("talentflow-role", data.user.role);
        localStorage.setItem("talentflow-username", data.user.name);
        state.token = data.token;
        state.role = data.user.role;
        state.currentUserName = data.user.name;
        state.activeTab = "Dashboard"; 
        state.isLoggedIn = true;
        renderApp();
      } else {
        alert(data.message || "Invalid credentials");
      }
    })
    .catch(err => {
      submitBtn.textContent = "Login";
      submitBtn.disabled = false;
      alert("Error connecting to server. Make sure the backend is running on port 5002.");
    });
  }
  if (actionButton?.dataset.action === "logout") {
    state.isLoggedIn = false;
    state.token = null;
    localStorage.removeItem("talentflow-token");
    renderApp();
  }

  if (actionButton?.dataset.action === "switch-tab") {
    event.preventDefault();
    state.activeTab = actionButton.dataset.tab;
    renderApp();
    return;
  }

  if (actionButton?.dataset.action === "create-job") {
    event.preventDefault();
    state.showCreateJobForm = true;
    renderApp();
    return;
  }
  if (actionButton?.dataset.action === "cancel-job" || actionButton?.dataset.action === "save-job") {
    event.preventDefault();
    state.showCreateJobForm = false;
    renderApp();
    return;
  }

  if (actionButton?.dataset.action === "open-job") {
    event.preventDefault();
    const jobs = [
      {id:1,title:'Senior Frontend Engineer',location:'Remote',type:'Full-time',salary:'₹15–22 LPA',deadline:'May 15',apps:142,status:'Active',skills:['React','TypeScript','Node.js']},
      {id:2,title:'Product Designer',location:'New York',type:'Full-time',salary:'$90–120K',deadline:'May 20',apps:89,status:'Active',skills:['Figma','UX Research']},
      {id:3,title:'Backend Engineer',location:'Bengaluru',type:'Full-time',salary:'₹12–18 LPA',deadline:'Jun 1',apps:64,status:'Paused',skills:['Go','PostgreSQL','Docker']},
      {id:4,title:'DevOps Engineer',location:'Remote',type:'Contract',salary:'₹10–14 LPA',deadline:'Jun 15',apps:37,status:'Draft',skills:['Kubernetes','AWS','CI/CD']},
      {id:5,title:'QA Engineer',location:'Hyderabad',type:'Full-time',salary:'₹8–12 LPA',deadline:'May 30',apps:28,status:'Active',skills:['Selenium','Cypress']},
    ];
    const id = parseInt(actionButton.dataset.jobId);
    state.selectedJob = jobs.find(j => j.id === id) || jobs[0];
    state.jobDetailTab = 'Overview';
    renderApp();
    return;
  }
  if (actionButton?.dataset.action === "close-job-detail") {
    state.selectedJob = null;
    state.jobDetailTab = null;
    renderApp();
    return;
  }
  if (actionButton?.dataset.action === "job-detail-tab") {
    state.jobDetailTab = actionButton.dataset.tab;
    renderApp();
    return;
  }

  if (roleButton || stageButton || actionButton || roleFilterButton || modeFilterButton || templateButton) {
    const candidateCard = event.target.closest("[data-action='view-candidate']");
    if (candidateCard) {
      state.activeTab = 'CandidateDetail';
      state.selectedCandidateId = candidateCard.dataset.id;
      renderApp();
      return;
    }

    const filterAppsButton = event.target.closest("[data-action='filter-apps']");
    if (filterAppsButton) {
      state.activeTab = 'Applications';
      state.appFilter = filterAppsButton.dataset.filter;
      renderApp();
      return;
    }

    if (actionButton && (actionButton.dataset.action === "submit-register" || actionButton.dataset.action === "submit-login" || actionButton.dataset.action === "logout" || actionButton.dataset.action === "theme")) {
      if (actionButton.dataset.action === "theme") {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', state.theme);
        renderApp();
      }
      return;
    }
    renderApp();
  }
});

document.addEventListener("input", (event) => {
  const input = event.target.closest("[data-input]");
  if (!input) return;
  state[input.dataset.input] = input.value;
  renderApp();
});

document.addEventListener("change", (event) => {
  const input = event.target.closest("[data-input]");
  if (!input) return;
  state[input.dataset.input] = input.value;
  renderApp();
});

document.addEventListener("mouseover", (event) => {
  const workflowButton = event.target.closest("[data-workflow]");
  if (!workflowButton) return;
  state.workflow = data.workflowSteps.find((step) => step.name === workflowButton.dataset.workflow);
  renderApp();
});

document.addEventListener("mousemove", (event) => {
  const x = (event.clientX / window.innerWidth) * 100;
  const y = (event.clientY / window.innerHeight) * 100;
  document.body.style.setProperty('--mouse-x', `${x}%`);
  document.body.style.setProperty('--mouse-y', `${y}%`);
});

renderApp();
