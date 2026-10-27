import { CONTENT as t } from "@/lib/content";
import { PRODUCTS, BUNDLE, SINGLES_TOTAL, MIN_PRICE, rupiah } from "@/lib/products";

export default function Home() {
  const save = SINGLES_TOTAL - BUNDLE.price;

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="logo" href="/">
            The Higher Soul
          </a>
          <nav className="nav">
            <a href="#pilihan">{t.nav.products}</a>
            <a href="#how">{t.nav.how}</a>
            <a href="#faq">{t.nav.faq}</a>
            <a className="nav-tarot" href="#tarot">
              {t.nav.tarot}
            </a>
          </nav>
        </div>
      </header>

      <section className="hero">
        <div className="wrap">
          <p className="eyebrow">{t.eyebrow}</p>
          <h1>{t.headline}</h1>
          <p className="lead">{t.sub}</p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#pilihan">
              {t.ctaPrimary}
            </a>
            <a className="btn btn-outline" href="#tarot">
              {t.ctaTarot}
            </a>
          </div>
          <p className="price-note">
            Mulai {rupiah(MIN_PRICE)} · Paket Lengkap {rupiah(BUNDLE.price)}
          </p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <h2 style={{ textAlign: "center" }}>{t.painTitle}</h2>
          <div className="pain-list">
            {t.painItems.map((item, i) => (
              <div className="pain-item" key={i}>
                {item}
              </div>
            ))}
          </div>
          <p className="pain-close">{t.painClose}</p>
        </div>
      </section>

      <section className="section section-alt">
        <div className="wrap">
          <h2 style={{ textAlign: "center" }}>{t.conceptTitle}</h2>
          <div className="concept-grid" style={{ marginTop: 40 }}>
            {t.conceptItems.map((c, i) => (
              <div className="concept-card" key={i}>
                <h3>{c.title}</h3>
                <p>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="pilihan">
        <div className="wrap">
          <h2>{t.productsTitle}</h2>
          <p className="section-sub">{t.productsSub}</p>

          <a className="product-bundle" href={`/order?items=${BUNDLE.id}`} style={{ textDecoration: "none" }}>
            <span className="product-badge">Hemat {rupiah(save)}</span>
            <h3>{BUNDLE.title}</h3>
            <p className="product-body">{BUNDLE.body}</p>
            <span className="product-price">
              <s>{rupiah(SINGLES_TOTAL)}</s>
              {rupiah(BUNDLE.price)}
            </span>
            <span className="product-link">Pesan Paket Lengkap →</span>
          </a>

          <p className="product-or">atau pilih satuan</p>
          <div className="product-grid">
            {PRODUCTS.map((p) => (
              <a className="product-card" key={p.id} href={`/order?items=${p.id}`} style={{ textDecoration: "none" }}>
                <span className="product-icon" aria-hidden="true">
                  {p.icon}
                </span>
                <h3>{p.title}</h3>
                <p className="product-body">{p.body}</p>
                <span className="product-price">{rupiah(p.price)}</span>
                <span className="product-link">Pesan →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="tarot-band" id="tarot">
        <div className="wrap">
          <div className="tarot-cards" aria-hidden="true">
            🂠🂠🂠
          </div>
          <h2>{t.tarotTitle}</h2>
          <p>{t.tarotBody}</p>
          <a className="btn btn-gold" href={`/order?items=${BUNDLE.id}`}>
            ✦ Pesan Paket Lengkap + Bonus Tarot
          </a>
        </div>
      </section>

      <section className="section origin-section">
        <div className="wrap origin-inner">
          <h2>{t.originTitle}</h2>
          <p>{t.originBody}</p>
        </div>
      </section>

      <section className="section section-alt" id="sample">
        <div className="wrap">
          <h2>{t.sampleTitle}</h2>
          <p className="section-sub">{t.sampleIntro}</p>
          <div className="sample-card">
            <div className="sample-badge">{t.sample.badge}</div>
            <div className="sample-header">
              <div>
                <div className="sample-name">{t.sample.name}</div>
                <div className="sample-dob">{t.sample.birthDate}</div>
              </div>
            </div>
            <div className="sample-numbers">
              {[t.sample.lifePath, t.sample.destiny].map((n, i) => (
                <div className="sample-number-card" key={i}>
                  <div className="sample-number">{n.number}</div>
                  <div className="sample-number-title">{n.title}</div>
                  <p>{n.body}</p>
                </div>
              ))}
            </div>
            <div className="sample-sections">
              {t.sample.sections.map((s, i) => (
                <div className="sample-section-row" key={i}>
                  <span className="sample-section-icon">{s.icon}</span>
                  <div>
                    <div className="sample-section-title">{s.title}</div>
                    <p>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <p className="sample-footer-note">{t.sample.footerNote}</p>
          </div>
        </div>
      </section>

      <section className="section" id="how">
        <div className="wrap">
          <h2>{t.howTitle}</h2>
          <div className="steps" style={{ marginTop: 40 }}>
            {t.howSteps.map((s, i) => (
              <div className="step-card" key={i}>
                <div className="step-num">{i + 1}</div>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="price-band">
        <div className="wrap">
          <h2>{t.priceTitle}</h2>
          <div className="price-tag">
            <s>{rupiah(SINGLES_TOTAL)}</s>
            {rupiah(BUNDLE.price)}
          </div>
          <p className="desc">{t.priceBody}</p>
          <a className="btn btn-primary" href={`/order?items=${BUNDLE.id}`}>
            Pesan Paket Lengkap
          </a>
        </div>
      </section>

      <section className="section section-alt" id="faq">
        <div className="wrap">
          <h2>{t.faqTitle}</h2>
          <div className="faq-list" style={{ marginTop: 40 }}>
            {t.faq.map((f, i) => (
              <div className="faq-item" key={i}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} The Higher Soul</span>
          <span>{t.footerNote}</span>
        </div>
      </footer>
    </>
  );
}
