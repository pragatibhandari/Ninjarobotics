/**
 * main.js — NinjaRobotics site logic
 * ────────────────────────────────────
 * Reads from SITE_DATA (data.js) and renders all dynamic sections.
 * Also handles: scroll-aware nav, mobile menu toggle, scroll-reveal,
 * stat counter animation, and ticker duplication.
 */

/* ============================================================
   UTILITY HELPERS
============================================================ */

/**
 * Create an element with optional class and innerHTML.
 * @param {string} tag
 * @param {string|string[]} [classes]
 * @param {string} [html]
 * @returns {HTMLElement}
 */
function el(tag, classes, html) {
  const node = document.createElement(tag);
  if (classes) {
    const list = Array.isArray(classes) ? classes : [classes];
    node.classList.add(...list.filter(Boolean));
  }
  if (html !== undefined) node.innerHTML = html;
  return node;
}

/**
 * Query selector shorthand.
 * @param {string} selector
 * @returns {HTMLElement|null}
 */
const qs = (selector) => document.querySelector(selector);

/**
 * Animate a number from 0 to target over a duration.
 * Handles plain numbers and strings like "12.5Mt", "80%+", "IP65+".
 * @param {HTMLElement} node
 * @param {string} target
 * @param {number} duration ms
 */
function animateCounter(node, target, duration = 1400) {
  const numMatch = target.match(/[\d.]+/);
  if (!numMatch) {
    node.textContent = target;
    return;
  }
  const endVal = parseFloat(numMatch[0]);
  const prefix = target.slice(0, target.indexOf(numMatch[0]));
  const suffix = target.slice(target.indexOf(numMatch[0]) + numMatch[0].length);
  const hasDecimal = numMatch[0].includes(".");
  const decimals = hasDecimal ? numMatch[0].split(".")[1].length : 0;

  let start = null;
  function step(ts) {
    if (!start) start = ts;
    const progress = Math.min((ts - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = (endVal * ease).toFixed(decimals);
    node.textContent = `${prefix}${current}${suffix}`;
    if (progress < 1) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
}

/* ============================================================
   RENDER FUNCTIONS  (one per section)
============================================================ */

function renderHeroStats() {
  const container = qs("#heroStats");
  if (!container) return;
  SITE_DATA.heroStats.forEach(({ num, label }) => {
    const stat = el("div", "stat");
    const numEl = el("div", "stat__num");
    numEl.dataset.target = num;
    numEl.textContent = num; // real value for non-JS / initial state
    const labelEl = el("p", "stat__label", label);
    stat.append(numEl, labelEl);
    container.append(stat);
  });
}

function renderTicker() {
  const inner = qs("#tickerInner");
  if (!inner) return;
  // Duplicate items so the loop looks seamless
  const items = [...SITE_DATA.ticker, ...SITE_DATA.ticker];
  items.forEach(({ icon, text }) => {
    const span = el("span", null, `${icon} <b>${text}</b>`);
    inner.append(span);
  });
}

function renderProblems() {
  const grid = qs("#problemGrid");
  if (!grid) return;
  SITE_DATA.problems.forEach(({ icon, title, desc }) => {
    const card = el("div", "card");
    card.innerHTML = `
      <div class="card__icon">${icon}</div>
      <h3 class="card__title">${title}</h3>
      <p class="card__desc">${desc}</p>
    `;
    grid.append(card);
  });
}

function renderFeatures() {
  const list = qs("#featureList");
  if (!list) return;
  SITE_DATA.features.forEach(({ title, desc }) => {
    const li = el("li", "feature-list__item");
    li.innerHTML = `
      <span class="feature-list__dot" aria-hidden="true"></span>
      <div>
        <h4 class="feature-list__title">${title}</h4>
        <p class="feature-list__desc">${desc}</p>
      </div>
    `;
    list.append(li);
  });
}

function renderSteps() {
  const container = qs("#stepsList");
  if (!container) return;
  SITE_DATA.steps.forEach(({ num, title, desc }) => {
    const step = el("div", "step");
    step.innerHTML = `
      <div class="step__num" aria-hidden="true">${num}</div>
      <h3 class="step__title">${title}</h3>
      <p class="step__desc">${desc}</p>
    `;
    container.append(step);
  });
}

function renderValidation() {
  const grid = qs("#valGrid");
  if (!grid) return;
  SITE_DATA.validation.forEach(({ num, label }) => {
    const card = el("div", "val-card");
    const numEl = el("div", "val-card__num");
    numEl.dataset.target = num;
    numEl.textContent = num;
    const labelEl = el("p", "val-card__label", label);
    card.append(numEl, labelEl);
    grid.append(card);
  });
}

function renderBusinessModel() {
  const grid = qs("#bmGrid");
  if (!grid) return;
  SITE_DATA.businessModel.forEach(({ title, desc }) => {
    const card = el("div", "bm-card");
    card.innerHTML = `
      <h3 class="bm-card__title">${title}</h3>
      <p class="bm-card__desc">${desc}</p>
    `;
    grid.append(card);
  });
}

function renderTimeline() {
  const container = qs("#timeline");
  if (!container) return;
  SITE_DATA.phases.forEach(({ tag, title, desc }, i) => {
    const phase = el("div", ["phase", i === 0 ? "phase--active" : null]);
    phase.innerHTML = `
      <p class="phase__tag">${tag}</p>
      <h3 class="phase__title">${title}</h3>
      <p class="phase__desc">${desc}</p>
    `;
    container.append(phase);
  });
}

function renderTeam() {
  const grid = qs("#teamGrid");
  if (!grid) return;

  SITE_DATA.team.forEach(({ name, role, initial, img }) => {
    const member = el("div", "member");
    member.innerHTML = `
      <div class="member__avatar-wrap">
        <div class="member__avatar member__avatar--fallback" aria-hidden="true">${initial}</div>
        ${img ? `<img class="member__avatar member__avatar--photo" src="${img}" alt="${name}" loading="lazy">` : ""}
      </div>
      <h3 class="member__name">${name}</h3>
      <p class="member__role">${role}</p>
    `;
    if (img) {
      const photo = member.querySelector(".member__avatar--photo");
      photo.addEventListener("error", () => photo.remove());
    }
    grid.append(member);
  });
}

function renderContact() {
  const list = qs("#contactLinks");
  if (!list) return;
  SITE_DATA.contact.forEach(({ icon, text }) => {
    const li = el("li", "contact__link");
    li.innerHTML = `<span class="contact__icon" aria-hidden="true">${icon}</span>${text}`;
    list.append(li);
  });
}

function renderFooterYear() {
  const el = qs("#footerYear");
  if (el) el.textContent = new Date().getFullYear();
}

/**
 * SVG icons for social media links, keyed by SITE_DATA.social[].name.
 */
const SOCIAL_ICONS = {
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.61 0 4.28 2.38 4.28 5.47v6.27zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.47 1.38.9.42.42.67.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.47.96-.9 1.38-.42.42-.82.67-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.56-.22-.96-.47-1.38-.9-.42-.42-.67-.82-.9-1.38-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.47-.96.9-1.38.42-.42.82-.67 1.38-.9.42-.16 1.06-.36 2.23-.41 1.27-.06 1.65-.07 4.85-.07M12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.31-1.46.72-2.13 1.38C1.35 2.68.94 3.35.63 4.14.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.31.79.72 1.46 1.38 2.13.67.66 1.34 1.07 2.13 1.38.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.38.66-.67 1.07-1.34 1.38-2.13.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.87 5.87 0 0 0-1.38-2.13A5.87 5.87 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zm0 10.16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z"/></svg>`,
};

/**
 * Render social media links into any element matching the given selector.
 * @param {string} selector
 */
function renderSocial(selector) {
  const container = qs(selector);
  if (!container) return;
  SITE_DATA.social.forEach(({ name, label, url }) => {
    const link = el("a", "social__link", SOCIAL_ICONS[name] || "");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", label);
    container.append(link);
  });
}

/* ============================================================
   BEHAVIOURS
============================================================ */

/** Sticky nav: add .nav--scrolled class after scrolling 60px */
function initScrollNav() {
  const nav = qs("#nav");
  if (!nav) return;
  const handler = () => {
    nav.classList.toggle("nav--scrolled", window.scrollY > 60);
  };
  window.addEventListener("scroll", handler, { passive: true });
}

/** Mobile hamburger toggle */
function initMobileMenu() {
  const toggle = qs("#navToggle");
  const links = qs("#navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const open = links.classList.toggle("nav__links--open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  // Close menu when a link is clicked
  links.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      links.classList.remove("nav__links--open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/**
 * Scroll-reveal: add .revealed class to elements with [data-reveal]
 * as they enter the viewport.
 */
function initScrollReveal() {
  const targets = document.querySelectorAll(
    ".card, .step, .val-card, .bm-card, .phase, .member, .stat, .feature-list__item"
  );

  targets.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 60}ms`;
    el.classList.add("reveal");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  targets.forEach((el) => observer.observe(el));
}

/**
 * Counter animation: trigger when stat elements enter viewport.
 */
function initCounters() {
  const counters = document.querySelectorAll("[data-target]");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target, entry.target.dataset.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  counters.forEach((el) => observer.observe(el));
}

/* ============================================================
   INIT — render everything, then wire up behaviours
============================================================ */

function init() {
  // Render all dynamic sections
  renderHeroStats();
  renderTicker();
  renderProblems();
  renderFeatures();
  renderSteps();
  renderValidation();
  renderBusinessModel();
  renderTimeline();
  renderTeam();
  renderContact();
  renderSocial("#contactSocial");
  renderSocial("#footerSocial");
  renderFooterYear();

  // Wire up interactive behaviours
  initScrollNav();
  initMobileMenu();
  initScrollReveal();
  initCounters();
}

document.addEventListener("DOMContentLoaded", init);
