import { CONTENT as t } from "@/lib/content";
import { PRODUCTS, BUNDLE, BUNDLE_VALUE, MIN_PRICE, rupiah } from "@/lib/products";

const TAROT = PRODUCTS.find((p) => p.grantsTarot);

export default function Home() {
  const save = BUNDLE_VALUE - BUNDLE.price;

  return (
    <>
      <header className="site-header">
        <div className="wrap header-inner">
          <a className="logo" href="/">
            The Higher Soul
          </a>
          <nav className="nav">
            <a href="#harga">{t.nav.products}</a>
            <a href="#cara-pesan">{t.nav.how}</a>
            <a href="#tanya-jawab">{t.nav.faq}</a>
            <a href="#tarot">{t.nav.tarot}</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div>
              <h1>{t.headline}</h1>
              <p className="lead">{t.sub}</p>
              <p className="hero-actions">
                <a className="btn btn-primary" href="#harga">
                  {t.ctaPrimary}
                </a>
                <a className="text-link" href="#contoh">
                  {t.ctaSample}
                </a>
              </p>
              <p className="price-note">
                Mulai {rupiah(MIN_PRICE)}. Paket Lengkap {rupiah(BUNDLE.price)}.
              </p>
            </div>
            <figure className="hero-number" aria-label={`${t.heroSample.label}: Life Path ${t.heroSample.number}`}>
              <span className="mono">{t.heroSample.date}</span>
              <span className="mono hero-sum">{t.heroSample.sum}</span>
              <span className="big-number">{t.heroSample.number}</span>
              <figcaption>{t.heroSample.caption}</figcaption>
            </figure>
          </div>
        </section>

        <section className="section">
          <div className="wrap narrow">
            <h2>{t.reasonsTitle}</h2>
            <ul className="reasons">
              {t.reasons.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
            <p className="aside">{t.reasonsClose}</p>
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap">
            <h2>{t.numbersTitle}</h2>
            <dl className="defs">
              {t.numbers.map((n) => (
                <div key={n.name}>
                  <dt>
                    {n.name} <span className="mono">{n.from}</span>
                  </dt>
                  <dd>{n.body}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="section" id="harga">
          <div className="wrap">
            <h2>{t.productsTitle}</h2>
            <p className="section-sub">{t.productsSub}</p>

            <a className="bundle-row" href={`/order?items=${BUNDLE.id}`}>
              <span className="bundle-text">
                <span className="tag">Hemat {rupiah(save)}</span>
                <strong>{BUNDLE.title}</strong>
                <span>{BUNDLE.body}</span>
              </span>
              <span className="bundle-price">
                <s>{rupiah(BUNDLE_VALUE)}</s>
                <strong>{rupiah(BUNDLE.price)}</strong>
                <span className="text-link">Pesan</span>
              </span>
            </a>

            <table className="price-table">
              <tbody>
                {PRODUCTS.map((p) => (
                  <tr key={p.id}>
                    <th scope="row">{p.title}</th>
                    <td className="price-desc">{p.body}</td>
                    <td className="price-amount mono">{rupiah(p.price)}</td>
                    <td className="price-action">
                      <a className="text-link" href={`/order?items=${p.id}`}>
                        Pesan
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="section section-alt" id="contoh">
          <div className="wrap sample-grid">
            <div>
              <h2>{t.sampleTitle}</h2>
              <p>{t.sampleIntro}</p>
              <p className="aside">{t.sample.footerNote}</p>
            </div>
            <article className="sample-page">
              <p className="mono">
                {t.sample.name} · {t.sample.birthDate}
              </p>
              {t.sample.numbers.map((n) => (
                <div className="sample-number-row" key={n.label}>
                  <span className="sample-number">{n.number}</span>
                  <p>
                    <strong>{n.label}.</strong> {n.body}
                  </p>
                </div>
              ))}
              <hr />
              {t.sample.sections.map((s) => (
                <p key={s.title}>
                  <strong>{s.title}.</strong> {s.body}
                </p>
              ))}
            </article>
          </div>
        </section>

        <section className="section" id="tarot">
          <div className="wrap narrow">
            <h2>{t.tarotTitle}</h2>
            <p>{t.tarotBody}</p>
            <p className="hero-actions">
              <a className="btn btn-primary" href={`/order?items=${TAROT.id}`}>
                Pesan tarot · {rupiah(TAROT.price)}
              </a>
              <a className="text-link" href={`/order?items=${BUNDLE.id}`}>
                Sudah termasuk di Paket Lengkap
              </a>
            </p>
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap narrow">
            <h2>{t.originTitle}</h2>
            {t.originBody.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </section>

        <section className="section" id="cara-pesan">
          <div className="wrap narrow">
            <h2>{t.howTitle}</h2>
            <ol className="steps">
              {t.howSteps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
            <p>
              <a className="btn btn-primary" href={`/order?items=${BUNDLE.id}`}>
                Pesan Paket Lengkap
              </a>
            </p>
          </div>
        </section>

        <section className="section section-alt" id="tanya-jawab">
          <div className="wrap narrow">
            <h2>{t.faqTitle}</h2>
            <div className="faq">
              {t.faq.map((f, i) => (
                <details key={i}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="wrap footer-inner">
          <span>© {new Date().getFullYear()} The Higher Soul</span>
          <span>{t.footerNote}</span>
        </div>
      </footer>
    </>
  );
}
