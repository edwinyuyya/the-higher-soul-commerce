import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export async function POST(req) {
  const { password } = await req.json().catch(() => ({}));
  if (!isAdmin(password)) return NextResponse.json({ error: "Password salah." }, { status: 401 });

  try {
    const { data, error } = await getSupabaseAdmin()
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (error) throw error;
    return NextResponse.json({ orders: data });
  } catch (err) {
    return NextResponse.json({ error: err.message || "Gagal memuat order." }, { status: 500 });
  }
}
