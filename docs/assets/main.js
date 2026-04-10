// ===== LANGUAGE SWITCH =====
function getLang() { return document.documentElement.lang || 'cs'; }

function setLang(lang, save) {
  document.documentElement.lang = lang;
  if (save !== false) localStorage.setItem('sem-lang', lang);
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  // Update copy button labels to match language
  document.querySelectorAll('.copy-btn').forEach(btn => {
    if (!btn.classList.contains('copied')) btn.innerHTML = copyIcon();
  });
  // Re-scroll to anchor if present (bilingual pages have -en suffixed IDs)
  if (location.hash) scrollToLangAnchor(location.hash);
}

// ===== BILINGUAL ANCHOR NAVIGATION =====
function scrollToLangAnchor(hash) {
  const id = hash.replace(/^#/, '');
  const lang = getLang();
  const el = (lang === 'en' ? document.getElementById(id + '-en') : null)
           || document.getElementById(id);
  // Delay > browser's own anchor scroll so we win the race
  if (el) setTimeout(() => el.scrollIntoView({ behavior: 'auto', block: 'start' }), 150);
}

// Intercept anchor clicks – handles both href="#id" and href="page.html#id"
document.addEventListener('click', e => {
  const a = e.target.closest('a');
  if (!a || getLang() !== 'en') return;
  const href = a.getAttribute('href') || '';
  let hash;
  if (href.startsWith('#')) {
    hash = href;
  } else {
    const idx = href.indexOf('#');
    if (idx === -1) return;
    // Only intercept same-page links
    const page = href.slice(0, idx);
    const current = location.pathname.split('/').pop() || 'index.html';
    if (page && page !== current) return;
    hash = href.slice(idx);
  }
  const enEl = document.getElementById(hash.slice(1) + '-en');
  if (enEl) {
    e.preventDefault();
    enEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
});

document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => setLang(btn.dataset.lang));
});

// ===== COPY BUTTON =====
function copyIcon() {
  const label = getLang() === 'en' ? 'Copy' : 'Kopírovat';
  return '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> ' + label;
}

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const block = btn.closest('.code-block');
    const code = block.querySelector('pre code') || block.querySelector('pre');
    navigator.clipboard.writeText(code.innerText).then(() => {
      const copiedLabel = getLang() === 'en' ? 'Copied' : 'Zkopírováno';
      btn.classList.add('copied');
      btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> ' + copiedLabel;
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = copyIcon();
      }, 2000);
    });
  });
});

// ===== IMPL SWITCHER =====
function initSwitcher(container) {
  const tabs = container.querySelectorAll('.impl-tab');
  const panels = container.querySelectorAll('.impl-panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => t.classList.remove('active'));
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      container.querySelector(`.impl-panel[data-panel="${target}"]`)?.classList.add('active');
    });
  });
}
document.querySelectorAll('.impl-switcher').forEach(initSwitcher);

// ===== ACTIVE NAV LINK =====
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-link').forEach(link => {
  const href = link.getAttribute('href');
  if (href && (href === currentPage || href.endsWith('/' + currentPage))) {
    link.classList.add('active');
    const subNav = link.closest('.nav-sub');
    if (subNav) {
      const parentLink = subNav.previousElementSibling;
      if (parentLink?.classList.contains('nav-link')) parentLink.classList.add('active');
    }
  }
});

// Expand nav-sub only on events.html
if (currentPage === 'events.html') {
  document.querySelectorAll('.nav-sub').forEach(sub => sub.classList.add('open'));
}

// ===== ON-PAGE TOC HIGHLIGHT =====
const tocLinks = document.querySelectorAll('.toc a[href^="#"]');
if (tocLinks.length) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        tocLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.toc a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-20% 0px -70% 0px' });
  document.querySelectorAll('h2[id], h3[id]').forEach(h => observer.observe(h));
}

// Init copy button icons on load
document.querySelectorAll('.copy-btn').forEach(btn => {
  if (!btn.innerHTML.trim()) btn.innerHTML = copyIcon();
});

// Init language (after all functions are defined)
(function initLang() {
  let lang = localStorage.getItem('sem-lang');
  if (!lang) {
    lang = (navigator.language || '').startsWith('cs') || (navigator.language || '').startsWith('sk') ? 'cs' : 'en';
  }
  setLang(lang, false);
})();
