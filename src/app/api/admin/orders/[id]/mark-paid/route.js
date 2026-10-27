import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function POST(req, { params }) {
  const { password } = await req.json().catch(() => ({}));
  if (!isAdmin(password)) return NextResponse.json({ error: "Password salah." }, { status: 401 });

  const { error } = await getSupabaseAdmin().from("orders").update({ payment_status: "paid" }).eq("id", params.id);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
