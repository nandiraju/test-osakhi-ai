import fs from 'node:fs/promises';
import path from 'node:path';

const distDir = path.resolve(process.cwd(), 'dist');
const manifestPath = path.resolve(process.cwd(), 'prerender-pages.json');
const template = await fs.readFile(path.join(distDir, 'index.html'), 'utf8');
const pages = JSON.parse(await fs.readFile(manifestPath, 'utf8'));

for (const page of pages) {
  let html = template;
  // Swap the marked SEO head block per page (prevents duplicate meta tags / GA4 snippets)
  const seoRe = /<!--seo-head-->[\s\S]*?<!--\/seo-head-->/;
  html = seoRe.test(html)
    ? html.replace(seoRe, () => page.headHtml)
    : html.replace(/<title>[\s\S]*?<\/title>/i, () => page.headHtml);
  html = html.replace(
    '<div id="root"></div>',
    () => `<div id="root">${page.bodyHtml}</div>`,
  );

  const outFile = page.slug
    ? path.join(distDir, page.slug, 'index.html')
    : path.join(distDir, 'index.html');
  await fs.mkdir(path.dirname(outFile), { recursive: true });
  await fs.writeFile(outFile, html, 'utf8');
}
console.log(`Pre-rendered ${pages.length} static HTML pages.`);
