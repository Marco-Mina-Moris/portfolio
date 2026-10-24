// Routes this demo's API calls through the portfolio's same-origin proxy (the APIs lack usable CORS headers).
const UPSTREAMS = {"https://newsapi.org": "/proxy/news"}; // upstream origin -> same-origin proxy path
const ONLINE_CHECKS = []; // connectivity probes that a browser would block

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (event) => event.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (event) => {
  const url = event.request.url;
  if (ONLINE_CHECKS.some((origin) => url.startsWith(origin))) {
    event.respondWith(new Response("", { status: 200 }));
    return;
  }
  for (const [origin, proxy] of Object.entries(UPSTREAMS)) {
    if (url.startsWith(origin + "/")) {
      event.respondWith(forward(event.request, proxy + url.slice(origin.length)));
      return;
    }
  }
});

async function forward(request, target) {
  const init = { method: request.method, headers: new Headers(request.headers), redirect: "follow" };
  if (request.method !== "GET" && request.method !== "HEAD") init.body = await request.arrayBuffer();
  return fetch(target, init);
}
