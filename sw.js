// guarda el juego en el aparato para que funcione sin internet
const V='kablok-v19', FILES=['./','index.html','manifest.json','icono-192.png','icono-512.png'];
self.addEventListener('install',e=>{ e.waitUntil(caches.open(V).then(c=>c.addAll(FILES))); self.skipWaiting(); });
self.addEventListener('activate',e=>{ e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(n=>n!==V).map(n=>caches.delete(n))))); self.clients.claim(); });
// primero busca la versión nueva en internet; si no hay conexión, usa la guardada
self.addEventListener('fetch',e=>{ if(e.request.method!=='GET'||new URL(e.request.url).origin!==location.origin) return;
  e.respondWith(fetch(e.request).then(r=>{ const c=r.clone(); caches.open(V).then(x=>x.put(e.request,c)); return r; }).catch(()=>caches.match(e.request).then(r=>r||caches.match('index.html')))); });
