import { BUNDLE, PRODUCTS, BUNDLE_VALUE, STORE, rupiah } from "@/lib/products";

const TAROT = PRODUCTS.find((p) => p.grantsTarot);

export const metadata = {
  title: "Tarot Master · The Higher Soul",
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

      <main className="section">
        <div className="wrap narrow">
          <h1>Tarot Master</h1>
          <p className="lead">
            Pikirkan satu pertanyaan, kocok kartunya, lalu pilih tiga kartu ditambah satu kartu kunci. Master Tarot membaca
            kartu yang keluar khusus untuk pertanyaanmu.
          </p>
          <p>Halaman ini hanya bisa dibuka lewat link pribadi yang kami kirim setelah pembayaran.</p>

          <table className="price-table" style={{ margin: "28px 0" }}>
            <tbody>
              <tr>
                <th scope="row">{TAROT.title}</th>
                <td className="price-desc">{TAROT.body}</td>
                <td className="price-amount mono">{rupiah(TAROT.price)}</td>
                <td className="price-action">
                  <a className="text-link" href={`/order?items=${TAROT.id}`}>
                    Pesan
                  </a>
                </td>
              </tr>
              <tr>
                <th scope="row">{BUNDLE.title}</th>
                <td className="price-desc">{BUNDLE.body}</td>
                <td className="price-amount mono">
                  <s>{rupiah(BUNDLE_VALUE)}</s> {rupiah(BUNDLE.price)}
                </td>
                <td className="price-action">
                  <a className="text-link" href={`/order?items=${BUNDLE.id}`}>
                    Pesan
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <p className="aside">Sudah bayar tapi belum menerima link? Chat kami di {STORE.whatsappDisplay}.</p>
        </div>
      </main>
    </>
  );
}
