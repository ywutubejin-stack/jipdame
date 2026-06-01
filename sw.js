const CACHE_NAME = 'jipdame-v6';

self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  // API 요청은 캐시 안 함
  if (e.request.url.includes('supabase') ||
      e.request.url.includes('apis.data') ||
      e.request.url.includes('kakao') ||
      e.request.url.includes('dapi.kakao')) {
    return
  }
  // 나머지는 네트워크 우선
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)))
});
