let CACHE = "ornek-site-v20260327185007";
let CORE = ["/","/site.css","/site.js","/logo.png","/favicon.png","/favicon.ico"];
let PRODUCTS = ["/products/ornek-icecek-1.html","/products/ornek-icecek-2.html","/products/ornek-icecek-3.html","/products/ornek-urun-1.html","/products/ornek-urun-2.html","/products/ornek-urun-3.html","/img/products/ornek-icecek-1.jpg","/img/products/ornek-icecek-2.jpg","/img/products/ornek-icecek-3.jpg","/img/products/ornek-urun-1.jpg","/img/products/ornek-urun-2.jpg","/img/products/ornek-urun-3.jpg"];
let PAGES = ["/pages/gizlilik-politikasi.html","/pages/hakkimizda.html","/pages/satis-sozlesmesi.html","/pages/site-haritasi.html","/pages/urunlerimiz.html","/index.html","/404.html","/img/address.png","/img/basket.png","/img/delete.png","/img/email.png","/img/facebook.png","/img/instagram.png","/img/linkedin.png","/img/map.png","/img/menu-close.png","/img/menu-open.png","/img/minus.png","/img/phone.png","/img/plus.png","/img/telegram.png","/img/whatsapp.png","/img/youtube.png","/img/pages/hero-header.jpg"];

self.addEventListener("install", function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(c) { return c.addAll(CORE); })
  );
  self.skipWaiting();
});

self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(k) { return k !== CACHE; })
            .map(function(k) { return caches.delete(k); })
      );
    })
  );
  self.clients.claim();
});

self.addEventListener("message", function(e) {
  if (e.data === "cache-all") {
    caches.open(CACHE).then(function(c) {
      let urls = PRODUCTS.concat(PAGES);
      Promise.allSettled(
        urls.map(function(url) { return c.add(url); })
      );
    });
  }
});

self.addEventListener("fetch", function(e) {
  if (e.request.method !== "GET") return;

  let url = new URL(e.request.url);
  let isCore = CORE.indexOf(url.pathname) !== -1;

  if (isCore) {
    e.respondWith(
      fetch(e.request).then(function(res) {
        let clone = res.clone();
        caches.open(CACHE).then(function(c) { c.put(url.pathname, clone); });
        return res;
      }).catch(function() {
        return caches.match(url.pathname);
      })
    );
    return;
  }

  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(function(cached) {
      let fetched = fetch(e.request).then(function(res) {
        let clone = res.clone();
        caches.open(CACHE).then(function(c) { c.put(url.pathname, clone); });
        return res;
      }).catch(function() {
        return cached;
      });
      return cached || fetched;
    })
  );
});
