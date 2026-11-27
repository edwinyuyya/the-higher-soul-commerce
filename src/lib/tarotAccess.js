// Link tarot pribadi untuk pembeli Paket Lengkap: /tarot?akses=<kode order>.<tanda tangan>.
// Tanda tangan dibuat dari TAROT_SECRET (atau token bot Telegram bila belum diset),
// jadi link tidak bisa dibuat-buat. Dipakai di server dan di middleware (edge).

export const TAROT_COOKIE = "hs_tarot";

function secret() {
  return process.env.TAROT_SECRET || process.env.TELEGRAM_BOT_TOKEN || "";
}

async function sign(code) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const mac = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(code));
  return Array.from(new Uint8Array(mac).slice(0, 10), (b) => b.toString(16).padStart(2, "0")).join("");
}

export async function makeTarotToken(code) {
  if (!secret()) return null;
  return `${code}.${await sign(code)}`;
}

export async function isValidTarotToken(token) {
  if (!secret() || typeof token !== "string") return false;
  const dot = token.lastIndexOf(".");
  if (dot < 1) return false;
  const code = token.slice(0, dot);
  return token.slice(dot + 1) === (await sign(code));
}
