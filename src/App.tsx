import { Layout } from './components/Layout';
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
        <div>
          <h1>{content?.heroHeadline ?? page.h1}</h1>
          <p>{content?.heroSubheadline ?? page.description}</p>
          <a className="cta-btn" href={content?.ctaHref ?? '#overview'}>
            {content?.ctaText ?? 'Get Started'}
          </a>
        </div>
        <div>
          <img
            src="/images/hero.png"
            alt={`${siteConfig.brand.name} — ${page.h1}`}
            width={1600}
            height={900}
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </section>

      <section id="overview" className="sections-grid" aria-label="Page sections">
        {(content?.sections ?? []).map((sec: { heading: string; body: string }) => (
          <article className="card" key={sec.heading}>
            <h2>{sec.heading}</h2>
            <p>{sec.body}</p>
          </article>
        ))}
      </section>

      {content?.faqItems && content.faqItems.length > 0 ? (
        <section aria-label="Frequently Asked Questions" style={{ paddingBottom: '3rem' }}>
          <h2>Frequently Asked Questions</h2>
          {content.faqItems.map((faq: { question: string; answer: string }) => (
            <article className="card" key={faq.question} style={{ marginBottom: '1rem' }}>
              <h3>{faq.question}</h3>
              <p>{faq.answer}</p>
            </article>
          ))}
        </section>
      ) : null}
    </Layout>
  );
}

export default App;
