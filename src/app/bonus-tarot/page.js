import { BUNDLE, SINGLES_TOTAL, STORE, rupiah } from "@/lib/products";

export const metadata = {
  title: "Bonus Tarot — The Higher Soul",
};

export default function BonusTarotPage() {
  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="logo" href="/">
            The Higher Soul
          </a>
        </div>
      </header>

      <section className="tarot-band" style={{ minHeight: "70vh" }}>
        <div className="wrap">
          <div className="tarot-cards" aria-hidden="true">
            🂠🂠🂠
          </div>
          <h2>Tarot Master khusus pembeli Paket Lengkap</h2>
          <p>
            Pikirkan satu pertanyaan, kocok kartu, pilih 3 + 1 kartu, dan Master Tarot menjawab pertanyaanmu lewat kartu yang
            keluar. Akses tarot jadi bonus untuk setiap pembelian {BUNDLE.title}.
          </p>
          <p style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f6e3b6" }}>
            <s style={{ opacity: 0.6, fontWeight: 400, marginRight: 10 }}>{rupiah(SINGLES_TOTAL)}</s>
            {rupiah(BUNDLE.price)}
          </p>
          <a className="btn btn-gold" href={`/order?items=${BUNDLE.id}`}>
            Pesan Paket Lengkap + Bonus Tarot
          </a>
          <p style={{ marginTop: 28, fontSize: "0.9rem" }}>
            Sudah membeli Paket Lengkap? Link tarot pribadimu kami kirim lewat WhatsApp setelah transfer dicek. Belum
            menerima? Chat <strong>{STORE.whatsappDisplay}</strong>.
          </p>
        </div>
      </section>
    </>
  );
}
