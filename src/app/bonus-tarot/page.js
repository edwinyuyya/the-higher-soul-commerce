import { BUNDLE, PRODUCTS, BUNDLE_VALUE, STORE, rupiah } from "@/lib/products";

const TAROT = PRODUCTS.find((p) => p.grantsTarot);

export const metadata = {
  title: "Tarot Master — The Higher Soul",
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
          <h2>Tarot Master</h2>
          <p>
            Pikirkan satu pertanyaan, kocok kartu, pilih 3 + 1 kartu, dan Master Tarot menjawab pertanyaanmu lewat kartu yang
            keluar. Akses pribadinya bisa kamu ambil sendiri, atau gratis di {BUNDLE.title}.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-gold" href={`/order?items=${TAROT.id}`}>
              Baca Tarot · {rupiah(TAROT.price)}
            </a>
            <a className="btn btn-outline-light" href={`/order?items=${BUNDLE.id}`}>
              Paket Lengkap + Tarot · <s style={{ opacity: 0.7 }}>{rupiah(BUNDLE_VALUE)}</s> {rupiah(BUNDLE.price)}
            </a>
          </div>
          <p style={{ marginTop: 28, fontSize: "0.9rem" }}>
            Sudah membeli? Link tarot pribadimu kami kirim lewat WhatsApp setelah transfer dicek. Belum
            menerima? Chat <strong>{STORE.whatsappDisplay}</strong>.
          </p>
        </div>
      </section>
    </>
  );
}
