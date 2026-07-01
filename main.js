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
  SITE_DATA.team.forEach(({ name, role, initial }) => {
    const member = el("div", "member");
    member.innerHTML = `
      <div class="member__avatar" aria-hidden="true">${initial}</div>
      <h3 class="member__name">${name}</h3>
      <p class="member__role">${role}</p>
    `;
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
  renderFooterYear();

  // Wire up interactive behaviours
  initScrollNav();
  initMobileMenu();
  initScrollReveal();
  initCounters();
}

document.addEventListener("DOMContentLoaded", init);
