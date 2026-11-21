import { readFileSync } from 'node:fs';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { loadEnv } from 'vite';

const mode = process.env.NODE_ENV || 'development';
const fileEnv = loadEnv(mode, process.cwd(), '');
const rawSite = (process.env.PUBLIC_SITE_URL || fileEnv.PUBLIC_SITE_URL || 'https://marktech.example').trim();

function resolveSite(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    throw new Error(
      `PUBLIC_SITE_URL inválida (${value}). Use só a origem, por exemplo https://www.seudominio.com.br`,
    );
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') {
    throw new Error('PUBLIC_SITE_URL precisa começar com http:// ou https://');
  }
  if (url.pathname !== '/' || url.search || url.hash) {
    throw new Error(
      'PUBLIC_SITE_URL deve ser apenas a origem, sem caminho, consulta ou âncora. Exemplo: https://www.seudominio.com.br',
    );
  }
  return url.origin;
}

const site = resolveSite(rawSite);

if (site === 'https://marktech.example') {
  console.warn(
    '\n[marktech] PUBLIC_SITE_URL não definido. Canonical, sitemap e JSON-LD usam o placeholder https://marktech.example\n',
  );
}

const vercel = JSON.parse(readFileSync(new URL('./vercel.json', import.meta.url), 'utf8'));
const previewHeaders = Object.fromEntries(
  vercel.headers[0].headers.map((header) => {
    if (header.key !== 'Content-Security-Policy') return [header.key, header.value];
    return [header.key, header.value.replace('; upgrade-insecure-requests', '')];
  }),
);

export default defineConfig({
  site,
  output: 'static',
  trailingSlash: 'always',
  prefetch: false,
  build: {
    inlineStylesheets: 'never',
  },
  integrations: [
    sitemap({
      filter: (page) => !/\/404(?:\.html)?\/?$/.test(page),
    }),
  ],
  vite: {
    server: { headers: previewHeaders },
    preview: { headers: previewHeaders },
  },
});
