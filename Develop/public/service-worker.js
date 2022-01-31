const VERSION = 'version1';
const APP_PREFIX = 'cache';  
const CACHE_NAME = APP_PREFIX + VERSION;

const FILES_LIST = [
    "/",
  "./index.html",
  "./css/styles.css",
  "./js/idb.js",
  "./js/index.js",
  "./manifest.json",
  "./icons/icon-72x72.png",
  "./icons/icon-96x96.png",
  "./icons/icon-128x128.png",
  "./icons/icon-144x144.png",
  "./icons/icon-152x152.png",
  "./icons/icon-192x192.png",
  "./icons/icon-384x384.png",
  "./icons/icon-512x512.png"
];

const DATA_CACHE_NAME = "data-cache-" + VERSION;

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(FILES_LIST);
    })
  );
});

self.addEventListener("fetch", function(event) {
  if (event.request.url.includes("/api/")) {
    event.respondWith(
      caches.open(DATA_CACHE_NAME).then(cache => {
        return fetch(event.request)
          .then(response => {
            if (response.status === 200) {
              cache.put(event.request.url, response.clone());
            }

            return response;
          })
      })
    );
    return;
  }

  // default
//   event.respondWith(
//     fetch(event.request).catch(function() {
//       return caches.match(event.request).then(function(response) {
//         if (response) {
//           return response;
//         } else if (event.request.headers.get("accept").includes("text/html")) {
//           return caches.match("/");
//         }
//       });
//     })
//   );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys().then(function (keyList) {
      let cache = keyList.filter(function (key) {
        return key.indexOf(APP_PREFIX);
      })
      cache.push(CACHE_NAME);

      return Promise.all(keyList.map(function (key, i) {
        if (cache.indexOf(key) === -1) {
          return caches.delete(keyList[i]);
        }
      }));
    })
  );
});