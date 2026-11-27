import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { notifyNewOrder } from "@/lib/notify";
import { resolveItems, rupiah } from "@/lib/products";
import { makeTarotToken } from "@/lib/tarotAccess";

export const dynamic = "force-dynamic";

const clean = (v, max = 200) => String(v || "").trim().slice(0, max);

function orderCode() {
  return "HS-" + Math.random().toString(36).slice(2, 8).toUpperCase();
}

/**
 * Menyimpan pesanan ke Supabase. Kolom produk/jam/kota lahir baru ada setelah
 * supabase/add-product-columns.sql dijalankan; sebelum itu pesanan tetap
 * disimpan dengan kolom lama dan isi pesanan ditaruh di amount_display.
 * Kalau database gagal, pembeli tetap bisa membayar: semua data ikut terkirim
 * lewat WhatsApp dan Telegram.
 */
async function saveOrder(order) {
  const db = getSupabaseAdmin();
  const base = {
    market: "id",
    full_name: order.full_name,
    birth_date: order.birth_date || null,
    whatsapp: order.whatsapp,
    email: order.email || null,
    amount: order.amount,
    payment_status: "pending",
  };
  const attempts = [
    {
      ...base,
      amount_display: order.amount_display,
      order_code: order.order_code,
      items: order.items_label,
      birth_time: order.birth_time || null,
      birth_place: order.birth_place || null,
    },
    { ...base, amount_display: `${order.amount_display} · ${order.items_label} · ${order.order_code}` },
  ];
  const { amount, ...withoutAmount } = attempts[1];
  attempts.push(withoutAmount);
  let lastError = null;
  for (const row of attempts) {
    const { error } = await db.from("orders").insert(row);
    if (!error) return;
    lastError = error;
  }
  throw lastError;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Data tidak valid." }, { status: 400 });
  }

  const sel = resolveItems(body.items);
  const order = {
    full_name: clean(body.full_name),
    birth_date: clean(body.birth_date, 10),
    birth_time: clean(body.birth_time, 5),
    birth_place: clean(body.birth_place, 80),
    whatsapp: clean(body.whatsapp, 30),
    email: clean(body.email, 120),
  };

  if (!sel.items.length) return NextResponse.json({ error: "Pilih minimal satu laporan." }, { status: 400 });
  const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(order.birth_date);
  if (!order.full_name || !order.whatsapp || (sel.needsBirthDate && (!dateOk || !order.email))) {
    return NextResponse.json({ error: "Mohon lengkapi semua data." }, { status: 400 });
  }
  if (sel.needsBirthTime && (!order.birth_time || !order.birth_place)) {
    return NextResponse.json({ error: "Human Design butuh jam dan kota lahir." }, { status: 400 });
  }

  // Nominal unik: 3 angka terakhir membedakan transfer tiap pesanan.
  const uniqueCode = 100 + Math.floor(Math.random() * 900);
  order.amount = sel.total + uniqueCode;
  order.amount_display = rupiah(order.amount);
  order.items_label = sel.items.map((p) => p.title).join(" + ");
  order.order_code = orderCode();
  if (!dateOk) order.birth_date = "";

  // Tarot Master (sendiri atau dalam Paket Lengkap): link pribadi ikut di
  // notifikasi Telegram, admin meneruskannya ke pembeli setelah transfer dicek.
  if (sel.grantsTarot) {
    const token = await makeTarotToken(order.order_code);
    if (token) order.tarot_link = `${new URL(req.url).origin}/tarot?akses=${encodeURIComponent(token)}`;
  }

  try {
    await saveOrder(order);
  } catch (err) {
    console.error("Gagal menyimpan pesanan ke Supabase:", err?.message || err);
  }
  try {
    await notifyNewOrder(order);
  } catch (err) {
    console.error("Gagal mengirim notifikasi Telegram:", err?.message || err);
  }

  return NextResponse.json({
    orderCode: order.order_code,
    amount: order.amount,
    amountDisplay: order.amount_display,
    itemsLabel: order.items_label,
  });
}
