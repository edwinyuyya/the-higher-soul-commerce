"use client";

import { useState } from "react";

function fmt(d) {
  return d ? new Date(d).toLocaleString("id-ID") : "-";
}

function PaidCell({ order, password, onChange }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  async function markPaid() {
    if (!confirm(`Tandai order ${order.full_name} (${order.amount_display}) sudah dibayar?`)) return;
    setBusy(true);
    setErr("");
    try {
      const res = await fetch(`/api/admin/orders/${order.id}/mark-paid`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal");
      onChange(order.id, { payment_status: "paid" });
    } catch (e) {
      setErr(e.message);
    } finally {
      setBusy(false);
    }
  }

  if (order.payment_status === "paid") return <span className="badge badge-paid">paid</span>;
  return (
    <div>
      <button className="btn btn-outline" style={{ padding: "6px 14px", fontSize: "0.78rem" }} onClick={markPaid} disabled={busy}>
        {busy ? "..." : "Tandai sudah bayar"}
      </button>
      {err && <div style={{ color: "var(--danger)", fontSize: "0.75rem", marginTop: 4 }}>{err}</div>}
    </div>
  );
}

function PdfCell({ order, password, onChange }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");

  if (order.payment_status !== "paid") return <span className="badge badge-pending">belum bayar</span>;
  if (order.delivered_at) return <span className="badge badge-paid">Terkirim {fmt(order.delivered_at)}</span>;

  async function upload(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    setErr("");
    try {
      const fd = new FormData();
      fd.append("password", password);
      fd.append("file", file);
      const res = await fetch(`/api/admin/orders/${order.id}/send-pdf`, { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Gagal mengirim PDF");
      onChange(order.id, { delivered_at: new Date().toISOString() });
    } catch (e2) {
      setErr(e2.message);
    } finally {
      setBusy(false);
      e.target.value = "";
    }
  }

  return (
    <div>
      <label className="btn btn-primary" style={{ padding: "6px 14px", fontSize: "0.78rem" }}>
        {busy ? "Mengirim..." : "Upload & Kirim PDF"}
        <input type="file" accept="application/pdf" onChange={upload} disabled={busy} style={{ display: "none" }} />
      </label>
      {err && <div style={{ color: "var(--danger)", fontSize: "0.75rem", marginTop: 4 }}>{err}</div>}
    </div>
  );
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [orders, setOrders] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login gagal");
      setOrders(data.orders);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  function change(id, patch) {
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, ...patch } : o)));
  }

  if (!orders) {
    return (
      <div className="admin-page">
        <div className="wrap" style={{ maxWidth: 360 }}>
          <h2>Admin Login</h2>
          <form onSubmit={login}>
            {error && <div className="error-box">{error}</div>}
            <div className="field">
              <label>Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? "..." : "Masuk"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="wrap">
        <h2>Daftar Order ({orders.length})</h2>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Tanggal</th>
                <th>Order ID</th>
                <th>Pesanan</th>
                <th>Nama</th>
                <th>Tgl Lahir</th>
                <th>Jam / Kota Lahir</th>
                <th>WhatsApp</th>
                <th>Email</th>
                <th>Total</th>
                <th>Pembayaran</th>
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{fmt(o.created_at)}</td>
                  <td>{o.order_code || "-"}</td>
                  <td>{o.items || "Blueprint"}</td>
                  <td>{o.full_name}</td>
                  <td>{o.birth_date}</td>
                  <td>{o.birth_time || o.birth_place ? `${o.birth_time || "-"} / ${o.birth_place || "-"}` : "-"}</td>
                  <td>{o.whatsapp}</td>
                  <td>{o.email}</td>
                  <td>{o.amount_display}</td>
                  <td>
                    <PaidCell order={o} password={password} onChange={change} />
                  </td>
                  <td>
                    <PdfCell order={o} password={password} onChange={change} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
