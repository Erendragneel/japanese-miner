const CACHE_NAME='language-miner-v6.4.100-voice-and-style-controls';
const APP_SHELL=[
  './',
  './index.html',
  './styles.css',
  './v5.css',
  './v6-6460.css',
  './multilingual-preview.css',
  './n5-vocabulary-1000.js',
  './multilingual-course-data.js',
  './game-6460.js',
  './v5-6400.js',
  './v6.js',
  './recovery-6460.js',
  './patreon-config.js',
  './cloud-auth.js',
  './auth-utilities.js',
  './patreon-linking.js',
  './interface-localization.js',
  './multilingual-preview.js',
  './manifest.webmanifest',
  './anime-miner-v1.png',
  './language-miner-logo.png',
  './language-miner-icon-32.png',
  './language-miner-icon-180.png',
  './language-miner-icon-192.png',
  './language-miner-icon-512.png',
  './language-miner-icon-maskable-192.png',
  './language-miner-icon-maskable-512.png'
];

self.addEventListener('install',event=>{
  event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>(key.startsWith('japanese-miner-')||key.startsWith('language-miner-'))&&key!==CACHE_NAME).map(key=>caches.delete(key)))).then(()=>self.clients.claim()));
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET'||request.headers.has('range'))return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin)return;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(response=>{
      const copy=response.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',copy));
      return response;
    }).catch(()=>caches.match('./index.html')));
    return;
  }
  event.respondWith(caches.match(request).then(cached=>cached||fetch(request).then(response=>{
    if(response&&response.status===200){
      const copy=response.clone();
      caches.open(CACHE_NAME).then(cache=>cache.put(request,copy));
    }
    return response;
  })));
});
