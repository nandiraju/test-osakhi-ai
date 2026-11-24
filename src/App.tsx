import { Layout } from './components/Layout';
import { Tilt3D } from './components/Tilt3D';
import { siteConfig } from './data/siteConfig';

export function App({ initialSlug }: { initialSlug?: string }) {
  const pathSlug =
    initialSlug ??
    (typeof window !== 'undefined' ? window.location.pathname.replace(/^\/+|\/+$/g, '') : '');

  const page = siteConfig.pages.find((p) => p.slug === pathSlug) ?? siteConfig.pages[0];
  const content = page.content;

  return (
    <Layout currentSlug={page.slug}>
      <section className="hero">
        <div className="hero-copy">
          <h1>{content?.heroHeadline ?? page.h1}</h1>
          <p>{content?.heroSubheadline ?? page.description}</p>
          <a className="cta-btn cta-btn-3d" href={content?.ctaHref ?? '#overview'}>
            <span>{content?.ctaText ?? 'Get Started'}</span>
          </a>
        </div>
        <div className="hero-media-stage">
          <Tilt3D className="hero-tilt-frame" maxTilt={10} scale={1.03}>
            <img
              src="/images/hero.png"
              alt={`${siteConfig.brand.name} — ${page.h1}`}
              width={1600}
              height={900}
              loading="eager"
              fetchPriority="high"
            />
            <div className="hero-float-badge hero-float-top" aria-hidden="true">
              <span className="pulse-dot" />
              <span>Live Health Sync</span>
            </div>
            <div className="hero-float-badge hero-float-bottom" aria-hidden="true">
              <span>Encrypted &amp; Private</span>
            </div>
          </Tilt3D>
        </div>
      </section>

      <section id="overview" className="sections-grid" aria-label="Page sections">
        {(content?.sections ?? []).map((sec: { heading: string; body: string }, idx: number) => (
          <Tilt3D
            key={sec.heading}
            className="card-3d-shell"
            maxTilt={8}
            scale={1.025}
            revealOnScroll
            revealDelayMs={idx * 90}
          >
            <article className="card card-3d">
              <h2>{sec.heading}</h2>
              <p>{sec.body}</p>
            </article>
          </Tilt3D>
        ))}
      </section>

      {content?.faqItems && content.faqItems.length > 0 ? (
        <section aria-label="Frequently Asked Questions" style={{ paddingBottom: '3rem' }}>
          <h2>Frequently Asked Questions</h2>
          {content.faqItems.map((faq: { question: string; answer: string }, idx: number) => (
            <Tilt3D
              key={faq.question}
              className="card-3d-shell"
              maxTilt={5}
              scale={1.012}
              revealOnScroll
              revealDelayMs={idx * 70}
              style={{ marginBottom: '1rem' }}
            >
              <article className="card card-3d">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </article>
            </Tilt3D>
          ))}
        </section>
      ) : null}
    </Layout>
  );
}

export default App;
