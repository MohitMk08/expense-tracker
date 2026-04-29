const CACHE_NAME = "expense-app-v1";

// Install
self.addEventListener("install", (event) => {
    self.skipWaiting();
});

// Activate
self.addEventListener("activate", (event) => {
    self.clients.claim();
});

// Fetch (SAFE: always prefer network)
self.addEventListener("fetch", (event) => {
    event.respondWith(
        fetch(event.request).catch(() => caches.match(event.request))
    );
});