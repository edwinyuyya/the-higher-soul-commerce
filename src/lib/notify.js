export async function notifyNewOrder(order) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    console.warn("Notifikasi Telegram dilewati: TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID belum diset.");
    return;
  }

  const lines = [
    "🔮 *Order Baru — The Higher Soul*",
    "",
    `Pesanan: ${order.items_label}`,
    `Nama Lengkap: ${order.full_name}`,
    `Tanggal Lahir: ${order.birth_date}`,
  ];
  if (order.birth_time || order.birth_place) {
    lines.push(`Jam Lahir: ${order.birth_time || "-"}`, `Kota Lahir: ${order.birth_place || "-"}`);
  }
  lines.push(
    `WhatsApp: ${order.whatsapp}`,
    `Email: ${order.email}`,
    `Total Bayar: ${order.amount_display}`,
    "",
    `Order ID: ${order.order_code}`
  );
  if (order.tarot_link) {
    lines.push("", "Bonus Tarot (kirim ke pembeli setelah transfer dicek):", order.tarot_link);
  }

  // Tanpa parse_mode: nama atau email berisi _ atau * membuat Markdown Telegram gagal.
  const res = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text: lines.join("\n").replace(/\*/g, "") }),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(`Telegram ${res.status}: ${data.description || "gagal"}`);
  }
}
