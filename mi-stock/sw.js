/* Mi stock · funciona sin internet. Versión 1795723103 */
const CACHE = "mi-stock-1795723103";
const BASICO = ["./", "./index.html", "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png", "./icons/apple-touch-icon.png"];
self.addEventListener("install", e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(BASICO)).then(()=>self.skipWaiting())); });
self.addEventListener("activate", e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith("mi-stock-") && k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
const guardar = (req, res)=>{ if(res && (res.ok || res.type==="opaque")){ const copia=res.clone(); caches.open(CACHE).then(c=>c.put(req, copia)); } return res; };
self.addEventListener("fetch", e=>{
  const req = e.request; if(req.method!=="GET") return;
  const url = new URL(req.url);
  if(/supabase\.co$/.test(url.hostname)) return; // los datos los maneja la app
  const mismo = url.origin===self.location.origin;
  if(req.mode==="navigate"){ e.respondWith(fetch(req).then(r=>guardar(new Request("./index.html"), r)).catch(()=>caches.match("./index.html"))); return; }
  if(mismo && /\.(js|webmanifest)$/.test(url.pathname)){ e.respondWith(fetch(req).then(r=>guardar(req,r)).catch(()=>caches.match(req).then(m=>m||caches.match(req,{ignoreSearch:true})))); return; }
  if(mismo || /(jsdelivr\.net|fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com|unpkg\.com)$/.test(url.hostname)){
    e.respondWith(caches.match(req).then(m=>{ const red=fetch(req).then(r=>guardar(req,r)).catch(()=>m); return m||red; }));
  }
});
