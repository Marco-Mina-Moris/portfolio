import type { NextRequest } from "next/server";

/**
 * Same-origin proxy for live app demos whose APIs don't send CORS headers.
 * Each demo's proxy-sw.js rewrites https://<api-host>/... to /proxy/<app>/..., and this forwards the call
 * server-side, the way the native app would. Only the hosts below are reachable, so it is not an open proxy.
 */
const UPSTREAMS: Record<string, string> = {
    "acta-chemical": "https://admin.acta-chemical.com",
    "bright-star": "https://admin.brightstar-egy.com",
    daniella: "https://admin.daniella-eg.com",
    news: "https://newsapi.org",
    scorepulse: "https://webws.365scores.com",
};

const FORWARD_REQUEST_HEADERS = ["accept", "accept-language", "authorization", "content-type", "x-requested-with", "x-locale"];
const FORWARD_RESPONSE_HEADERS = ["content-type", "cache-control", "etag", "last-modified", "expires"];

// Some upstreams (e.g. NewsAPI) reject requests without a user agent or with a browser Origin.
const USER_AGENT = "Mozilla/5.0 (Linux; Android 14) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0.0.0 Mobile Safari/537.36";

export const dynamic = "force-dynamic";

async function handler(request: NextRequest, { params }: { params: Promise<{ app: string; path: string[] }> }) {
    const { app, path } = await params;
    const upstream = UPSTREAMS[app];
    if (!upstream) return new Response("Unknown demo", { status: 404 });

    const target = `${upstream}/${path.map(encodeURIComponent).join("/")}${request.nextUrl.search}`;

    const headers = new Headers({ "user-agent": USER_AGENT });
    for (const name of FORWARD_REQUEST_HEADERS) {
        const value = request.headers.get(name);
        if (value) headers.set(name, value);
    }

    const hasBody = request.method !== "GET" && request.method !== "HEAD";
    let response: Response;
    try {
        response = await fetch(target, {
            method: request.method,
            headers,
            body: hasBody ? await request.arrayBuffer() : undefined,
            redirect: "follow",
            cache: "no-store",
        });
    } catch {
        return new Response("Upstream unavailable", { status: 502 });
    }

    const out = new Headers();
    for (const name of FORWARD_RESPONSE_HEADERS) {
        const value = response.headers.get(name);
        if (value) out.set(name, value);
    }
    return new Response(response.body, { status: response.status, headers: out });
}

export { handler as GET, handler as HEAD, handler as POST, handler as PUT, handler as PATCH, handler as DELETE };
