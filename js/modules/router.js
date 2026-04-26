/**
 * router.js
 * Hash-based routing helpers for article navigation.
 */

export function getArticleId() {
  return window.location.hash.slice(1) || null;
}

export function onHashChange(callback) {
  window.addEventListener('hashchange', () => callback(getArticleId()));
}
