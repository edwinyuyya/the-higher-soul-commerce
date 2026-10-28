"use client";

import { useState } from "react";
import { fbTrack } from "@/lib/fbpixel";
import { PRODUCTS, BUNDLE, STORE, rupiah, resolveItems } from "@/lib/products";

export default function OrderForm({ initialItems }) {
  const [picked, setPicked] = useState(() => new Set(initialItems));
  const [step, setStep] = useState("form");
  const [form, setForm] = useState({
    fullName: "",
    birthDate: "",
    birthTime: "",
    birthPlace: "",
    whatsapp: "",
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState(null);
  const [copied, setCopied] = useState(false);

  const sel = resolveItems([...picked]);

  function toggle(id) {
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else {
        if (id === BUNDLE.id) next.clear();
        else next.delete(BUNDLE.id);
        // Numerologi Lengkap sudah berisi Life Path & Destiny: pilihan yang tumpang tindih dilepas.
        const p = PRODUCTS.find((x) => x.id === id);
        (p?.includes || []).forEach((x) => next.delete(x));
        PRODUCTS.filter((x) => x.includes?.includes(id)).forEach((x) => next.delete(x.id));
        next.add(id);
      }
      return next;
    });
  }

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!sel.items.length) return setError("Pilih minimal satu laporan dulu.");
    if (!form.fullName || !form.whatsapp || (sel.needsBirthDate && (!form.birthDate || !form.email))) {
      return setError("Mohon lengkapi semua data.");
    }
    if (sel.needsBirthTime && (!form.birthTime || !form.birthPlace)) {
      return setError("Human Design butuh jam dan kota lahir.");
    }

    setLoading(true);
    try {
      const res = await fetch("/api/orders/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [...picked],
          full_name: form.fullName,
          birth_date: form.birthDate,
          birth_time: form.birthTime,
          birth_place: form.birthPlace,
          whatsapp: form.whatsapp,
          email: form.email,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal membuat pesanan");
      setOrder(data);
      setStep("transfer");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (step === "transfer" && order) {
    const lines = [
      "Halo, saya sudah transfer untuk The Higher Soul.",
      `Order ID: ${order.orderCode}`,
      `Pesanan: ${order.itemsLabel}`,
      `Nominal: ${order.amountDisplay}`,
      `Nama: ${form.fullName}`,
    ];
    if (sel.needsBirthDate) lines.push(`Tanggal lahir: ${form.birthDate}`);
    if (sel.needsBirthTime) lines.push(`Jam lahir: ${form.birthTime}`, `Kota lahir: ${form.birthPlace}`);
    lines.push("(Bukti transfer saya lampirkan)");
    const waHref = `https://wa.me/${STORE.whatsappNumber}?text=${encodeURIComponent(lines.join("\n"))}`;

    return (
      <div className="transfer-box">
        <p className="mono">Pesanan {order.orderCode} · {order.itemsLabel}</p>
        <p>Transfer tepat sejumlah ini, termasuk tiga angka terakhirnya:</p>
        <p className="transfer-amount">{order.amountDisplay}</p>
        <p className="mono">Tiga angka terakhir itu kode pesananmu, jadi jangan dibulatkan.</p>
        <div className="bank-details">
          <p>{STORE.bankName}</p>
          <p className="bank-number">{STORE.accountNumber}</p>
          <p>a.n. {STORE.accountHolder}</p>
          <button
            type="button"
            className="btn btn-outline copy-btn"
            onClick={() => {
              navigator.clipboard?.writeText(STORE.accountNumber.replace(/\s/g, "")).then(() => {
                setCopied(true);
                setTimeout(() => setCopied(false), 1600);
              });
            }}
          >
            {copied ? "Tersalin" : "Salin nomor rekening"}
          </button>
        </div>
        <p>
          Setelah transfer, tekan tombol di bawah dan lampirkan bukti transfernya. Kami cek hari itu juga, paling lambat 1x24
          jam kerja.
        </p>
        <a
          className="btn btn-primary btn-block"
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            fbTrack("InitiateCheckout", {
              value: order.amount,
              currency: "IDR",
              content_name: order.itemsLabel,
            })
          }
        >
          Kirim bukti transfer lewat WhatsApp
        </a>
        <p className="mono" style={{ marginTop: 14 }}>
          Atau chat langsung ke {STORE.whatsappDisplay}.
          {sel.needsBirthDate && " Laporan dikirim ke emailmu."}
          {sel.grantsTarot && " Link Tarot Master dikirim lewat WhatsApp."}
        </p>
      </div>
    );
  }

  const nudge =
    !picked.has(BUNDLE.id) && sel.total >= BUNDLE.price * 0.75
      ? sel.total >= BUNDLE.price
        ? `Lebih hemat ambil Paket Lengkap ${rupiah(BUNDLE.price)}`
        : `Tambah ${rupiah(BUNDLE.price - sel.total)} saja untuk Paket Lengkap`
      : "";

  return (
    <form onSubmit={handleSubmit}>
      {error && <div className="error-box">{error}</div>}

      <div className="pick-list">
        <button
          type="button"
          className="product-bundle"
          aria-pressed={picked.has(BUNDLE.id)}
          onClick={() => toggle(BUNDLE.id)}
        >
          <h3>{BUNDLE.title}</h3>
          <p className="product-body">{BUNDLE.body}</p>
          <span className="product-price">{rupiah(BUNDLE.price)}</span>
          <span className="pick-check" aria-hidden="true" />
        </button>
        {PRODUCTS.map((p) => (
          <button
            type="button"
            key={p.id}
            className="product-card"
            aria-pressed={picked.has(p.id)}
            onClick={() => toggle(p.id)}
          >
            <h3>{p.title}</h3>
            <p className="product-body">{p.body}</p>
            <span className="product-price">{rupiah(p.price)}</span>
            <span className="pick-check" aria-hidden="true" />
          </button>
        ))}
      </div>

      <div className="order-price">Total {rupiah(sel.total)}</div>
      {nudge && (
        <p className="pick-nudge">
          <button type="button" className="link-btn" onClick={() => setPicked(new Set([BUNDLE.id]))}>
            {nudge}
          </button>
        </p>
      )}

      <div className="field">
        <label htmlFor="fullName">Nama lengkap sesuai akta</label>
        <input id="fullName" type="text" value={form.fullName} onChange={(e) => update("fullName", e.target.value)} required />
      </div>
      {sel.needsBirthDate && (
        <div className="field">
          <label htmlFor="birthDate">Tanggal lahir</label>
          <input id="birthDate" type="date" value={form.birthDate} onChange={(e) => update("birthDate", e.target.value)} required />
        </div>
      )}
      {sel.needsBirthTime && (
        <div className="field-row">
          <div className="field">
            <label htmlFor="birthTime">Jam lahir</label>
            <input id="birthTime" type="time" value={form.birthTime} onChange={(e) => update("birthTime", e.target.value)} required />
            <small>Kalau tidak tahu pasti, isi perkiraan terdekat.</small>
          </div>
          <div className="field">
            <label htmlFor="birthPlace">Kota lahir</label>
            <input
              id="birthPlace"
              type="text"
              value={form.birthPlace}
              onChange={(e) => update("birthPlace", e.target.value)}
              placeholder="Contoh: Surabaya"
              required
            />
          </div>
        </div>
      )}
      <div className="field">
        <label htmlFor="whatsapp">Nomor WhatsApp</label>
        <input
          id="whatsapp"
          type="tel"
          value={form.whatsapp}
          onChange={(e) => update("whatsapp", e.target.value)}
          placeholder="0813xxxxxxxx"
          required
        />
      </div>
      {sel.needsBirthDate && (
        <div className="field">
          <label htmlFor="email">Email, untuk kirim PDF</label>
          <input id="email" type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required />
        </div>
      )}
      <button type="submit" className="btn btn-primary btn-block" disabled={loading || !sel.items.length}>
        {loading ? "Sebentar…" : "Lanjut ke pembayaran"}
      </button>
    </form>
  );
}
