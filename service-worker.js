const CACHE_NAME = 'mitravel-cache-v1';
const ASSETS = [
  '/',
  '/home.html',
  '/manifest.json',
  'css/styles.min.css',
  'js/app.min.js',
  // Добавьте все важные пути вашего приложения
  ...Object.values(manifest.icons).map(icon => icon.src)
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});
