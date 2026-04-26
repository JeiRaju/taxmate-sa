/**
 * learn.js
 * Rendering engine for the Knowledge Hub (learn.html) and Article reader (article.html).
 */

import { ARTICLES, CATEGORIES } from '../data/taxKnowledge.js';

function difficultyBadge(level) {
  const labels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' };
  return `<span class="difficulty-badge ${level}">${labels[level] ?? level}</span>`;
}

function articleCardHTML(article) {
  const cat = CATEGORIES.find(c => c.id === article.category);
  return `
    <a class="article-card" href="article.html#${article.id}" aria-label="${article.title}">
      <div class="card-icon">${article.icon}</div>
      <div class="card-category">${cat ? cat.icon + ' ' + cat.label : article.category}</div>
      <div class="card-title">${article.title}</div>
      <p class="card-summary">${article.summary}</p>
      <div class="card-footer">
        ${difficultyBadge(article.difficulty)}
        <span class="card-arrow">→</span>
      </div>
    </a>
  `;
}

// ── Learn page ────────────────────────────────────────────────────────────────

export function initLearnPage() {
  const featuredGrid    = document.getElementById('featuredGrid');
  const articleGrid     = document.getElementById('articleGrid');
  const searchInput     = document.getElementById('searchInput');
  const categoryTabs    = document.getElementById('categoryTabs');
  const articlesHeading = document.getElementById('articlesHeading');

  let activeCategory = 'all';
  let searchQuery    = '';

  // Featured: first 3 beginner articles
  const featured = ARTICLES.filter(a => a.difficulty === 'beginner').slice(0, 3);
  if (featuredGrid) {
    featuredGrid.innerHTML = featured.map(articleCardHTML).join('');
  }

  // Build category tabs
  if (categoryTabs) {
    const tabs = [
      `<button class="tab-btn active" data-cat="all">All</button>`,
      ...CATEGORIES.map(c => `<button class="tab-btn" data-cat="${c.id}">${c.icon} ${c.label}</button>`),
    ].join('');
    categoryTabs.innerHTML = tabs;

    categoryTabs.addEventListener('click', e => {
      const btn = e.target.closest('.tab-btn');
      if (!btn) return;
      categoryTabs.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.dataset.cat;
      renderGrid();
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      searchQuery = e.target.value.trim().toLowerCase();
      renderGrid();
    });
  }

  function renderGrid() {
    if (!articleGrid) return;

    const q = searchQuery;
    const filtered = ARTICLES.filter(a => {
      const catMatch  = activeCategory === 'all' || a.category === activeCategory;
      const textMatch = !q || [a.title, a.summary, ...(a.tags ?? [])].some(s =>
        s.toLowerCase().includes(q)
      );
      return catMatch && textMatch;
    });

    if (filtered.length === 0) {
      articleGrid.innerHTML = `
        <div class="empty-state">
          <div class="icon">🔍</div>
          <p>No articles match your search.</p>
        </div>
      `;
    } else {
      articleGrid.innerHTML = filtered.map(articleCardHTML).join('');
    }

    if (articlesHeading) {
      const catLabel = CATEGORIES.find(c => c.id === activeCategory)?.label;
      articlesHeading.textContent = q
        ? `Results for "${q}" (${filtered.length})`
        : activeCategory === 'all'
          ? `All Articles (${filtered.length})`
          : `${catLabel ?? activeCategory} (${filtered.length})`;
    }
  }

  renderGrid();
}

// ── Article page ─────────────────────────────────────────────────────────────

export function initArticlePage() {
  function render(id) {
    const article  = ARTICLES.find(a => a.id === id);
    const notFound = document.getElementById('articleNotFound');
    const content  = document.getElementById('articleContent');

    if (!article) {
      if (notFound) notFound.style.display = 'block';
      if (content)  content.style.display  = 'none';
      return;
    }

    if (notFound) notFound.style.display = 'none';
    if (content)  content.style.display  = 'block';

    const cat = CATEGORIES.find(c => c.id === article.category);

    const icon       = document.getElementById('articleIcon');
    const breadcrumb = document.getElementById('articleBreadcrumb');
    const title      = document.getElementById('articleTitle');
    const badge      = document.getElementById('articleBadge');
    const body       = document.getElementById('articleBody');
    const related    = document.getElementById('relatedGrid');

    if (icon)       icon.textContent = article.icon;
    if (breadcrumb) breadcrumb.innerHTML = `
      <a href="learn.html">Learn</a>
      <span>›</span>
      <span>${cat ? cat.label : article.category}</span>
    `;
    if (title) title.textContent = article.title;
    if (badge) badge.innerHTML   = difficultyBadge(article.difficulty);
    if (body)  body.innerHTML    = article.body;

    document.title = `${article.title} — TaxMate SA`;

    if (related) {
      const others = ARTICLES.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3);
      related.innerHTML = others.length
        ? others.map(articleCardHTML).join('')
        : '<p style="color:var(--text-muted);font-size:14px">No related articles.</p>';
    }
  }

  render(window.location.hash.slice(1));
  window.addEventListener('hashchange', () => render(window.location.hash.slice(1)));
}
