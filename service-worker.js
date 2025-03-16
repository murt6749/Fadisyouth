// service-worker.js
const CACHE_NAME = 'fadisyouth-cache-v1';
const urlsToCache = [
  '/',                   // Ensure this points to your home page (index.html)
  '/index.html',         // Your main HTML file
  '/manifest.json',      // Your manifest file
  '/featured.jpg',       // Example image (update with any local images you need)
  // Add any additional local assets (CSS, JS, icons, etc.) that you want available offline.
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached response if found; otherwise fetch from network.
        return response || fetch(event.request);
      })
  );
});

self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName);
            }
          })
        );
      })
  );
});
