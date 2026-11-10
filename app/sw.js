// Tax OTG service worker — makes the installed app open instantly.
// App files: served from cache at once, refreshed in the background (stale-while-revalidate).
// Supabase / CDN requests are never touched here.
const CACHE = 'tax-otg-app-v12';
const SHELL = ['./', './index.html', './config.js', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png'];
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL.map(u => new Request(u, { cache: 'reload' }))))); self.skipWaiting(); });
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const key = url.pathname.endsWith('/') ? './' : e.request;
  e.respondWith(caches.open(CACHE).then(async cache => {
    const hit = await cache.match(key, { ignoreSearch: true });
    const net = fetch(e.request).then(r => { if (r.ok) cache.put(key, r.clone()); return r; }).catch(() => hit);
    return hit || net;
  }));
});
