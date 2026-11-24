import React from 'react';
import { siteConfig } from '../data/siteConfig';
import { Ambient3DBackground } from './Ambient3DBackground';

interface LayoutProps {
  currentSlug: string;
  children: React.ReactNode;
}

export function Layout({ currentSlug, children }: LayoutProps) {
  return (
    <div className="page-shell">
      <Ambient3DBackground />
      <header className="site-header">
        <div className="container nav-inner">
          <a href="/" className="brand-link">
            <img src="/images/logo.svg" alt={`${siteConfig.brand.name} logo`} width={36} height={36} />
            <span>{siteConfig.brand.name}</span>
          </a>
          <nav aria-label="Primary navigation">
            <ul className="nav-links">
              {siteConfig.pages.filter((p) => p.indexable).map((p) => {
                const href = p.slug ? `/${p.slug}/` : '/';
                const isCurrent = p.slug === currentSlug;
                return (
                  <li key={p.slug || 'home'}>
                    <a href={href} aria-current={isCurrent ? 'page' : undefined}>
                      {p.h1}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>
      </header>
      <main className="container">{children}</main>
      <footer className="site-footer">
        <div className="container">
          <p>
            © {new Date().getFullYear()} {siteConfig.brand.name}. {siteConfig.brand.tagline}
          </p>
          <p>
            {siteConfig.pages.filter((p) => p.indexable).map((p, idx) => (
              <React.Fragment key={p.slug || 'home'}>
                {idx > 0 ? ' · ' : null}
                <a href={p.slug ? `/${p.slug}/` : '/'}>{p.h1}</a>
              </React.Fragment>
            ))}
          </p>
        </div>
      </footer>
    </div>
  );
}
