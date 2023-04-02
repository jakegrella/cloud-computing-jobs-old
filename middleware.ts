import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const unauthorizedResponse = new NextResponse(
  JSON.stringify({ message: "unauthorized" }),
  {
    status: 401,
    headers: { "content-type": "application/json" },
  }
);

export const config = {
  matcher: ["/api/:path*"], // all API routes
};

export async function middleware(req: NextRequest, res: NextResponse) {
  if (
    req.method === "GET" || // GET requests do not need auth
    req.nextUrl.pathname === "/api/token" || // /token is different auth
    (req.method === "POST" && req.nextUrl.pathname === "/api/jobs")
  ) {
    return NextResponse.next();
  }

  const auth = req.headers.get("authorization");
  if (!auth) return unauthorizedResponse;

  // Get token from auth header, remove 'Bearer '
  const token = auth.substring(7);
  if (!token) return unauthorizedResponse;

  // verify token
  try {
    const secret = new TextEncoder().encode(process.env.API_SECRET_KEY);
    await jwtVerify(token, secret);
  } catch (err) {
    return unauthorizedResponse;
  }
}
