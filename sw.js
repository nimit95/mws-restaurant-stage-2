
importScripts('serviceworker-cache-polyfill.js');

let cacheName = 'restaurant-sw-v'
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll([
        'index.html',
        'restaurant.html',
        'css/main.css',
        'css/responsive.css',
        'js/dbhelper.js',
        'js/main.js',
        'js/restaurant_info.js',
        'images/*',
        'js/register.js',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
        'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js'
      ]);
    }).catch( e => {
      console.log(e);
    })
  );
});


self.addEventListener('activate', event => {
  event.waitUntil(
      caches.keys().then( cacheNames =>  {
          return Promise.all(
              cacheNames.filter(cacheName => {
                  return cacheName.startsWith('restaurant-sw-') && cacheName != cacheName;
              }).map(cacheName => {
                  return caches.delete(cacheName);
              })
          );
      })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request, {
      ignoreSearch: true
    }).then(function(response) {
      return response || fetch(event.request);
    }).catch( e => {
      console.log(e);
    })
  );
});