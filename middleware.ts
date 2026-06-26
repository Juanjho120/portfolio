import { NextResponse, type NextRequest } from "next/server";

function isAdminBasicAuthEnabled() {
  return process.env.ADMIN_ANALYTICS_BASIC_AUTH_ENABLED === "true";
}

function unauthorized() {
  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Portfolio Analytics"',
    },
  });
}

export function middleware(request: NextRequest) {
  if (!isAdminBasicAuthEnabled()) {
    return NextResponse.next();
  }

  const expectedUser = process.env.ADMIN_ANALYTICS_BASIC_AUTH_USER;
  const expectedPassword = process.env.ADMIN_ANALYTICS_BASIC_AUTH_PASSWORD;

  if (!expectedUser || !expectedPassword) {
    return new NextResponse("Admin analytics authentication is not configured", { status: 404 });
  }

  const authorization = request.headers.get("authorization");

  if (!authorization?.startsWith("Basic ")) {
    return unauthorized();
  }

  const encodedCredentials = authorization.slice("Basic ".length);
  const decodedCredentials = atob(encodedCredentials);
  const separatorIndex = decodedCredentials.indexOf(":");

  if (separatorIndex === -1) {
    return unauthorized();
  }

  const username = decodedCredentials.slice(0, separatorIndex);
  const password = decodedCredentials.slice(separatorIndex + 1);

  if (username !== expectedUser || password !== expectedPassword) {
    return unauthorized();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
