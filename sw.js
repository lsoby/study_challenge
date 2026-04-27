// StudySync Service Worker v2.0
const CACHE_NAME = 'studysync-v2';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icon-192.svg',
  '/icon-512.svg',
  'https://fonts.googleapis.com/css2?family=Sora:wght@300;400;500;600;700&family=Space+Mono:wght@400;700&display=swap'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(STATIC_ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  const url = event.request.url;
  if (url.includes('firebaseio.com') || url.includes('googleapis.com/identitytoolkit') || url.includes('gstatic.com/firebasejs')) {
    return;
  }
  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;
      return fetch(event.request).then(response => {
        if (event.request.method === 'GET' && response.status === 200) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        if (event.request.destination === 'document') {
          return caches.match('/index.html');
        }
      });
    })
  );
});

// ── BACKGROUND TIMER via SharedWorker messages ──
// The page posts messages to keep the SW alive and get accurate elapsed time
let timerState = null; // { startTs, pausedElapsed, running, paused }

self.addEventListener('message', event => {
  const { type, data } = event.data || {};

  if (type === 'TIMER_SYNC') {
    // Page is syncing timer state so SW knows about it
    timerState = data;
  }

  if (type === 'GET_ELAPSED') {
    // Page asks for current elapsed (for when tab resumes)
    let elapsed = 0;
    if (timerState) {
      elapsed = timerState.pausedElapsed || 0;
      if (timerState.running && !timerState.paused && timerState.startTs) {
        elapsed += Math.floor((Date.now() - timerState.startTs) / 1000);
      }
    }
    event.source.postMessage({ type: 'ELAPSED_RESPONSE', elapsed });
  }
});
