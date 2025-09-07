const CACHE_NAME = 'musicplayer-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/function.js',
  '/lol.png',
  '/lol.png'
];

// Install service worker and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// Activate service worker
self.addEventListener('activate', event => {
  console.log('Service Worker activated');
});

// Fetch files from cache first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

