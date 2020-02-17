console.log("Hello from your service worker!");

const FILES_TO_CACHE = [
  "/assets/images/Americano.jpg",
  "/assets/images/BlondeRoast.jpg",
  "/assets/images/ButterCroissant.jpg",
  "/assets/images/ButterscotchLatte.jpg",
  "/assets/images/capp.jpg",
  "/assets/images/capuccino.jpg",
  "/assets/images/chitchat_logo2.jpg",
  "/assets/images/coffeeAndBeans.jpg",
  "/assets/images/coffeeAndBeansV2.jpg",
  "/assets/images/coffeeCup.jpg",
  "/assets/images/coffeeCuptV2.jpg",
  "/assets/images/DarkRoast.jpg",
  "/assets/images/DecafPikeRoast.jpg",
  "/assets/images/defocused.jpg",
  "/assets/images/englishBreakfastTea.jpg",
  "/assets/images/espresso.jpeg",
  "/assets/images/espresso.jpg",
  "/assets/images/espressoV2.jpg",
  "/assets/images/espressoV3.jpg",
  "/assets/images/HazelnutLatte.jpg",
  "/assets/images/headShotExample.jpg",
  "/assets/images/headShotExampleV2.jpeg",
  "/assets/images/headShotExampleV3.jpg",
  "/assets/images/headShotExampleV4.jpeg",
  "/assets/images/IcedLemonCake.jpg",
  "/assets/images/latte.jpg",
  "/assets/images/Latte.png",
  "/assets/images/LatteV2.jpeg",
  "/assets/images/Macchiato.jpg",
  "/assets/images/matcha.jpg",
  "/assets/images/matchaCopy.jpg",
  "/assets/images/matchaCopyV2.jpg",
  "/assets/images/multiCoffee.jpg",
  "/assets/images/regularCoffeeExample.jpeg",
  "/assets/images/storeCropped.png",
  "/assets/images/storeInterior.jpg"
  ];


  const CACHE_NAME = "static-cache-v2";
  const DATA_CACHE_NAME = "data-cache-v1";
  
  // install
  self.addEventListener("install", function(evt) {
    evt.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        console.log("Your files were pre-cached successfully!");
        return cache.addAll(FILES_TO_CACHE);
      })
    );
  
    self.skipWaiting();
  });
  
  self.addEventListener("activate", function(evt) {
    evt.waitUntil(
      caches.keys().then(keyList => {
        return Promise.all(
          keyList.map(key => {
            if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
              console.log("Removing old cache data", key);
              return caches.delete(key);
            }
          })
        );
      })
    );
  
    self.clients.claim();
  });
  
  // fetch
  self.addEventListener("fetch", function(evt) {
    if (evt.request.url.includes("/api/")) {
      evt.respondWith(
        caches.open(DATA_CACHE_NAME).then(cache => {
          return fetch(evt.request)
            .then(response => {
              // If the response was good, clone it and store it in the cache.
              if (response.status === 200) {
                cache.put(evt.request.url, response.clone());
              }
  
              return response;
            })
            .catch(err => {
              // Network request failed, try to get it from the cache.
                return cache.match(evt.request);
              
            });
        }).catch(err => {
          console.log(err)
        })
      );
  
      return;
    }
  
    evt.respondWith(
      caches.open(CACHE_NAME).then(cache => {
        return cache.match(evt.request).then(response => {
          return response || fetch(evt.request);
        });
      })
    );
  });
  