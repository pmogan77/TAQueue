self.addEventListener('install', e =>{
    console.log("Install!");
    e.waitUntil(
        caches.open("static").then(cache =>{
            return cache.addAll(["./","./Home.js", "./App.css"]);
        })
    );
});

self.addEventListener('fetch', e=>{
    console.log("Intercepting Fetch URL: "+e.request.url);

    e.respondWith(
        caches.match(e.request).then(response => {
            return response || fetch(e.request);
        })
    )
})