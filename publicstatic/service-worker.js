// give your cache a name
const cacheName = 'my-cache';
const version = 3
// put the static assets and routes you want to cache here
// const filesToCache = [
//   '/',
//   '/index.html',
//   '/404.html',
//   '/poli1.mp3',
//   '/Measure car speed and direction_files/speed.js',
//   '/Measure car speed and direction_files/style.css',
//   '/Measure car speed and direction_files/jquery-1.7.2.js.download',
//   '/Measure car speed and direction_files/d3.js.download',

// ];

// the event handler for the activate event
self.addEventListener('activate', e => self.clients.claim());

// the event handler for the install event 
// typically used to cache assets
self.addEventListener('install', e => {
  console.log('caching removed on 6-sep 21')
  // e.waitUntil(
  //   caches.open(cacheName)
  //   .then(cache => cache.addAll(filesToCache))
  // );
});

// the fetch event handler, to intercept requests and serve all 
// static assets from the cache
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
    .then(response => response ? response : fetch(e.request))
  )
});