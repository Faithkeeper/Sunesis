const CACHE_NAME = 'apokalupsis-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/public/index.html',
  '/public/style.css',
  '/public/act1.js',
  '/public/act2.js',
  '/public/act3.js',
  '/public/act4.js',
  '/public/act5.js',
  '/public/act6.js',
  '/public/app.js',
  '/static/world.html'
];

// 1. Install Phase: Save files to local cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Caching Game Assets');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// 2. Fetch Phase: Serve from cache if offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      // Return cached file, or try the network
      return response || fetch(event.request).catch(() => {
        // If both fail (offline and not in cache), you could return an offline page
        console.log('[SW] Asset not found in cache or network');
      });
    })
  );
});

