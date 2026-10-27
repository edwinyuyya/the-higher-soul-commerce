import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { isAdmin } from "@/lib/admin";
import { sendBlueprintEmail } from "@/lib/resend";

export const dynamic = "force-dynamic";

export async function POST(req, { params }) {
  const form = await req.formData();
  if (!isAdmin(form.get("password"))) return NextResponse.json({ error: "Password salah." }, { status: 401 });

  const file = form.get("file");
  if (!file || typeof file.arrayBuffer !== "function") {
    return NextResponse.json({ error: "File PDF belum dipilih." }, { status: 400 });
  }

  const db = getSupabaseAdmin();
  const { data: order, error } = await db.from("orders").select("*").eq("id", params.id).single();
  if (error || !order) return NextResponse.json({ error: "Order tidak ditemukan." }, { status: 404 });

  try {
    await sendBlueprintEmail({
      to: order.email,
      fullName: order.full_name,
      pdfBuffer: Buffer.from(await file.arrayBuffer()),
      fileName: `Blueprint-${order.full_name.replace(/[^A-Za-z0-9]+/g, "-")}.pdf`,
    });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }

  await db.from("orders").update({ delivered_at: new Date().toISOString() }).eq("id", params.id);
  return NextResponse.json({ ok: true });
}
