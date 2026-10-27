import { NextResponse } from "next/server";
import { TAROT_COOKIE, isValidTarotToken } from "@/lib/tarotAccess";

// Tarot hanya untuk pembeli Paket Lengkap yang punya link pribadi.
export async function middleware(req) {
  const url = req.nextUrl;
  const fromLink = url.searchParams.get("akses");

  if (fromLink) {
    const back = new URL("/tarot", url);
    if (!(await isValidTarotToken(fromLink))) return NextResponse.redirect(new URL("/bonus-tarot", url));
    const res = NextResponse.redirect(back);
    res.cookies.set(TAROT_COOKIE, fromLink, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
    });
    return res;
  }

  if (await isValidTarotToken(req.cookies.get(TAROT_COOKIE)?.value)) {
    return NextResponse.rewrite(new URL("/tarot/index.html", url));
  }
  return NextResponse.redirect(new URL("/bonus-tarot", url));
}

export const config = {
  matcher: ["/tarot", "/tarot/index.html"],
};
