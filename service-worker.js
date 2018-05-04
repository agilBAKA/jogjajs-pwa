 
self.addEventListener('install', function(event) {
  console.log('SW Installed!')

  event.waitUntil(
    caches.open('staticAssets')
      .then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/dist/style.css',
          '/dist/images/notif.svg',
          '/app.js',
          'https://fonts.googleapis.com/css?family=Karla:400,700'
        ])
      })
  )
});

self.addEventListener('activate', function() {
  console.log('SW Activated!')
});


addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        if (response) {
          return response;     // if valid response is found in cache return it
        } else {
          return fetch(event.request)     //fetch from internet
            .then(function(res) {
              return caches.open('staticAssets')
                .then(function(cache) {
                  cache.put(event.request.url, res.clone());    //save the response for future
                  return res;   // return the fetched data
                })
            })
            .catch(function(err) {       // fallback mechanism
              return caches.open('staticAssets')
                .then(function(cache) {
                  return cache.match('/offline.html');
                });
            });
        }
      })
  );
}); 