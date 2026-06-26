import { NextResponse, type NextRequest } from "next/server";

const BASIC_AUTH_PREFIX = "Basic ";
const ADMIN_REALM = "Portfolio Analytics";

function isAdminBasicAuthEnabled() {
  const explicitFlag = process.env.ADMIN_ANALYTICS_BASIC_AUTH_ENABLED;

  if (explicitFlag === "true") {
    return true;
  }

  if (explicitFlag === "false") {
    return false;
  }

  return process.env.VERCEL_ENV === "production";
}

function applyAdminSecurityHeaders(response: NextResponse) {
  response.headers.set("Cache-Control", "no-store, max-age=0");
  response.headers.set("Pragma", "no-cache");
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "no-referrer");

  return response;
}

function unauthorized() {
  return applyAdminSecurityHeaders(
    new NextResponse("Authentication required", {
      status: 401,
      headers: {
        "WWW-Authenticate": `Basic realm="${ADMIN_REALM}", charset="UTF-8"`,
      },
    }),
  );
}

function missingConfiguration() {
  return applyAdminSecurityHeaders(new NextResponse("Not found", { status: 404 }));
}

function safeDecodeBasicCredentials(authorization: string) {
  if (!authorization.startsWith(BASIC_AUTH_PREFIX)) {
    return null;
  }

  try {
    const decodedCredentials = atob(authorization.slice(BASIC_AUTH_PREFIX.length));
    const separatorIndex = decodedCredentials.indexOf(":");

    if (separatorIndex === -1) {
      return null;
    }

    return {
      username: decodedCredentials.slice(0, separatorIndex),
      password: decodedCredentials.slice(separatorIndex + 1),
    };
  } catch {
    return null;
  }
}

function safeEqual(left: string, right: string) {
  const maxLength = Math.max(left.length, right.length);
  let mismatch = left.length === right.length ? 0 : 1;

  for (let index = 0; index < maxLength; index += 1) {
    mismatch |= (left.charCodeAt(index) || 0) ^ (right.charCodeAt(index) || 0);
  }

  return mismatch === 0;
}

export function middleware(request: NextRequest) {
  if (!isAdminBasicAuthEnabled()) {
    return applyAdminSecurityHeaders(NextResponse.next());
  }

  const expectedUser = process.env.ADMIN_ANALYTICS_BASIC_AUTH_USER;
  const expectedPassword = process.env.ADMIN_ANALYTICS_BASIC_AUTH_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return missingConfiguration();
  }

  const credentials = safeDecodeBasicCredentials(request.headers.get("authorization") ?? "");

  if (!credentials) {
    return unauthorized();
  }

  const validUser = safeEqual(credentials.username, expectedUser);
  const validPassword = safeEqual(credentials.password, expectedPassword);

  if (!validUser || !validPassword) {
    return unauthorized();
  }

  return applyAdminSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/admin/:path*"],
};
