const CACHE_NAME = __VERSION__
const MANIFEST = __MANIFEST__

const urlsToCache = ['/offline.html']

self.addEventListener("install", async event => {
  const cache = await caches.open(CACHE_NAME)
  return cache.addAll(urlsToCache)
})

self.addEventListener("fetch", e => {
  e.respondWith(getResponseByRequest(e.request))
})

const getResponseByRequest = async request => {
  const cache = await caches.open(CACHE_NAME)
  const cachedResponse = await cache.match(request)
  return cachedResponse || fetch(request)
    .catch(err => caches.match('/offline.html'))
}