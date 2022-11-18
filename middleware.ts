import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest, res: NextResponse) {
  const auth = req.headers.get("authorization");

  // not great
  // if (auth !== `Bearer ${process.env.API_SECRET_KEY}`) {
  //   return new NextResponse(JSON.stringify({ message: "unauthorized" }), {
  //     status: 401,
  //     headers: { "content-type": "application/json" },
  //   });
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/:path*"],
};
