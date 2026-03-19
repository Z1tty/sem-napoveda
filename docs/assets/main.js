// ===== COPY BUTTON =====
document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const block = btn.closest('.code-block');
    const code = block.querySelector('pre code') || block.querySelector('pre');
    navigator.clipboard.writeText(code.innerText).then(() => {
      btn.classList.add('copied');
      btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Zkopírováno';
      setTimeout(() => {
        btn.classList.remove('copied');
        btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Kopírovat';
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
  if (!btn.innerHTML.trim()) {
    btn.innerHTML = '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg> Kopírovat';
  }
});
