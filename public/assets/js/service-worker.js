const FILES_TO_CACHE = [
    "/",
    "/assets/css/accountStyle.css",
    "/assets/css/capp.jpg",
    "/assets/css/checkout_style.css",
    "/assets/css/espresso.jpg",
    "/assets/css/espressoV2.jpg",
    "/assets/css/espressoV3.jpg",
    "/assets/css/footer_style.css",
    "/assets/css/espressoV3.jpg",
    "/assets/css/headShotExample.jpg",
    "/assets/css/headShotExampleV2.jpg",
    "/assets/css/headShotExampleV3.jpg",
    "/assets/css/headShotExampleV4.jpg",
    "/assets/css/headShotExample.jpg",
    "/assets/css/Latte.png",
    "/assets/css/LatteV2.jpeg",
    "/assets/css/menu.css",
    "/assets/css/product_config.css",
    "/assets/css/productModal.css",
    "/assets/css/Latte.png",
    "/assets/css/regularCoffeeExample.jpeg",
    "/assets/css/storeCropped.png",
    "/assets/css/storeInterior.jpg",
    "/assets/css/style.css",
    "/assets/images/Americano.jpg",
    "/assets/images/BlondeRoast.jpg",
    "/assets/images/ButterCroissant.jpg",
    "/assets/images/ButterscotchLatte.jpg",
    "/assets/images/capp.jpg",
    "/assets/images/capuccino.jpg",
    "/assets/images/chitchat_logo2.jpg",
    "/assets/images/coffeeAndBeans.jpg",
    "/assets/images/coffeeAndBeansV2.jpg",
    "/assets/images/DarkRoast.jpg",
    "/assets/images/DecafPikeRoast.jpg",
    "/assets/images/defocused.jpg",
    "/assets/images/englishBreakfastTea.jpg",
    "/assets/images/espresso.jpeg",
    "/assets/images/espresso.jpg",
    "/assets/images/espressoV2.jpg",
    "/assets/images/espressoV3.jpg",
    "/assets/images/espressoV3.jpg",
    "/assets/images/HazelnutLatte.jpg",
    "public/assets/images/headShotExample.jpg",
"/assets/images/headShotExampleV2.jpeg",
"/assets/images/headShotExampleV3.jpg",
"/assets/images/headShotExampleV4.jpeg",
"/assets/images/IcedLemonCake.jpg",
"/assets/images/icon-72x72.jpeg",
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
"/assets/images/storeInterior.jpg",
"/assets/js/cart.js",
"/assets/js/checkout_func.js",
"/assets/js/createProduct_func.js",
"/assets/js/login.js",
"/assets/js/menu.js",
"/assets/js/merch.js",
"/assets/js/orderAdminlist.js",
"/assets/js/productEdit.js",
"/assets/js/service-worker.js",
"/assets/js/signup.js",
"/manifest.webmanifest",
"views/layouts/main-admin.handlebars",
"views/layouts/main-registration.handlebars",
"views/layouts/main.handlebars",
"views/partials/login-modal.handlebars",
"views/partials/nav.handlebars",
"views/users/registration.handlebars",
"views/checkout.handlebars",
"views/createProduct.handlebars",
"views/error.handlebars",
"views/home.handlebars",
"views/mainPage.handlebars",
"views/manageAccounts.handlebars",
"views/menu.handlebars",
"views/merch.handlebars",
"views/orderFullfill.handlebars",
"views/orderList.handlebars",
"views/shop.handlebars",
"views/shoppingCart.handlebars"


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
  