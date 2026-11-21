import { readFileSync } from 'node:fs';
import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');

const requiredArticles = [
  '/nao-funciona/whatsapp-nao-abre-no-android/',
  '/audio-e-mensagens/whatsapp-nao-envia-ou-nao-grava-audio/',
  '/backup-e-conversas/backup-do-whatsapp-travado-no-google-drive/',
  '/espaco-e-armazenamento/armazenamento-do-whatsapp-cheio/',
];

const forbidden = [
  'googlesyndication',
  'adsbygoogle',
  'pagead2',
  'googletagmanager',
  'google-analytics',
  'doubleclick',
  'gtag(',
  'GBWhatsApp',
  'whatsapp plus mod',
];

const notice = 'O MarkTech é um site independente, sem vínculo com o WhatsApp ou com a Meta.';

function fail(message) {
  console.error(message);
  process.exitCode = 1;
}

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

let distStat;
try {
  distStat = await stat(dist);
} catch {
  fail('Pasta dist/ não encontrada. Rode npm run build antes de npm run verify.');
  process.exit(1);
}
if (!distStat.isDirectory()) fail('dist/ não é uma pasta.');

const files = await walk(dist);
const htmlFiles = files.filter((file) => file.endsWith('.html'));
if (htmlFiles.length === 0) fail('Nenhum HTML em dist/.');

const routes = new Set();
const assetPaths = new Set();
for (const file of files) {
  const rel = path.relative(dist, file).split(path.sep).join('/');
  assetPaths.add(`/${rel}`);
  if (rel.endsWith('/index.html')) routes.add(`/${rel.slice(0, -'index.html'.length)}`);
  if (rel === 'index.html') routes.add('/');
  if (rel === '404.html') routes.add('/404.html');
}

function localTarget(url) {
  const clean = url.split('#')[0].split('?')[0];
  if (clean === '/' || clean.endsWith('/')) return routes.has(clean);
  return assetPaths.has(clean) || routes.has(`${clean}/`);
}

const titles = new Map();
const descriptions = new Map();

for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const rel = path.relative(dist, file);
  const is404 = rel === '404.html';

  if (!html.includes(notice)) fail(`${rel} não tem o aviso de site independente.`);
  if (!html.includes('lang="pt-BR"')) fail(`${rel} não declara pt-BR.`);

  const robots = html.match(/<meta name="robots" content="([^"]+)"/)?.[1] ?? '';
  if (is404) {
    if (!robots.includes('noindex')) fail('A página 404 precisa de noindex.');
  } else if (robots.includes('noindex')) {
    fail(`${rel} está com noindex.`);
  }

  for (const term of forbidden) {
    if (html.toLowerCase().includes(term.toLowerCase())) fail(`${rel} contém termo proibido: ${term}`);
  }

  const title = html.match(/<title>([^<]+)<\/title>/)?.[1] ?? '';
  const description = html.match(/<meta name="description" content="([^"]+)"/)?.[1] ?? '';
  if (!title || !description) fail(`${rel} sem title ou description.`);
  if (titles.has(title)) fail(`Title repetido: ${title}`);
  if (descriptions.has(description)) fail(`Description repetida: ${description}`);
  titles.set(title, rel);
  descriptions.set(description, rel);
  if (description.length < 50 || description.length > 180) {
    fail(`${rel} description fora do intervalo (50–180): ${description.length}`);
  }

  if (!is404) {
    const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
    if (!canonical || canonical !== ogUrl) fail(`${rel} canonical e og:url divergem.`);
    if (!canonical.startsWith('http')) fail(`${rel} canonical não é absoluto.`);
  }

  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (scripts.length !== 1) fail(`${rel} deveria ter um JSON-LD.`);
  let data;
  try {
    data = JSON.parse(scripts[0][1]);
  } catch {
    fail(`${rel} JSON-LD inválido.`);
    continue;
  }
  if (data['@context'] !== 'https://schema.org' || !Array.isArray(data['@graph'])) {
    fail(`${rel} JSON-LD sem @graph schema.org.`);
  }
  const types = new Set(data['@graph'].map((node) => node['@type']));
  for (const type of ['Organization', 'WebSite', 'Person']) {
    if (!types.has(type)) fail(`${rel} sem ${type} no JSON-LD.`);
  }
  const org = data['@graph'].find((node) => node['@type'] === 'Organization');
  if (!org?.name || !org?.url || !org?.logo?.url) fail(`${rel} Organization incompleta.`);
  const website = data['@graph'].find((node) => node['@type'] === 'WebSite');
  if (!website?.name || !website?.url) fail(`${rel} WebSite incompleto.`);

  const person = data['@graph'].find((node) => node['@type'] === 'Person');
  if (person?.name !== 'Marcos' || typeof person?.url !== 'string' || !person.url.endsWith('/sobre/')) {
    fail(`${rel} Person precisa ser Marcos e apontar para /sobre/.`);
  }

  if (types.has('HowTo')) fail(`${rel} não deve publicar JSON-LD HowTo.`);

  if (html.includes('property="article:published_time"')) {
    if (!types.has('Article') || !types.has('BreadcrumbList')) {
      fail(`${rel} de artigo sem Article e BreadcrumbList.`);
    }
    if (!html.includes('>Marcos</a>')) fail(`${rel} não assina o artigo como Marcos.`);
    const article = data['@graph'].find((node) => node['@type'] === 'Article');
    for (const key of ['headline', 'description', 'datePublished', 'dateModified', 'mainEntityOfPage']) {
      if (!article?.[key]) fail(`${rel} Article sem ${key}.`);
    }
    if (article?.author?.['@id'] !== person?.['@id']) fail(`${rel} Article sem autor Marcos.`);
    if (!article?.image?.url || article.image.width < 1200 || article.image.height < 675) {
      fail(`${rel} imagem do Article abaixo de 1200 px ou sem url.`);
    }
    if (!article || !Array.isArray(article.hasPart) || article.hasPart.length < 3) {
      fail(`${rel} Article sem os passos em hasPart.`);
    } else {
      article.hasPart.forEach((step, index) => {
        if (step['@type'] !== 'WebPageElement' || !step.name || !step.text || step.text.length < 40) {
          fail(`${rel} passo ${index + 1} do Article incompleto.`);
        }
        if (!html.includes(`id="passo-${index + 1}"`)) fail(`${rel} sem âncora do passo ${index + 1}.`);
      });
    }
  }

  const crumbs = data['@graph'].find((node) => node['@type'] === 'BreadcrumbList');
  if (crumbs) {
    const items = crumbs.itemListElement ?? [];
    if (items.length < 2) fail(`${rel} BreadcrumbList curto.`);
    items.forEach((item, index) => {
      if (item.position !== index + 1 || !item.name || !item.item) {
        fail(`${rel} item ${index + 1} da trilha incompleto.`);
      }
    });
  }

  const hrefs = [...html.matchAll(/\b(?:href|src|srcset)="([^"]+)"/g)].map((match) => match[1]);
  for (const raw of hrefs) {
    for (const part of raw.split(',')) {
      const url = part.trim().split(/\s+/)[0];
      if (
        !url ||
        url.startsWith('#') ||
        url.startsWith('mailto:') ||
        url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('data:')
      ) {
        continue;
      }
      if (!url.startsWith('/')) fail(`${rel} tem URL relativa solta: ${url}`);
      if (!localTarget(url)) fail(`${rel} aponta para ${url}, que não existe em dist/.`);
    }
  }

  const images = [...html.matchAll(/<img\b([^>]+)>/g)];
  for (const image of images) {
    if (!/\balt="[^"]*"/.test(image[1])) fail(`${rel} tem img sem alt.`);
    if (!/\bwidth="\d+"/.test(image[1]) || !/\bheight="\d+"/.test(image[1])) {
      fail(`${rel} tem img sem largura e altura.`);
    }
  }
}

for (const route of requiredArticles) {
  if (!routes.has(route)) fail(`Artigo obrigatório ausente: ${route}`);
}

const robots = await readFile(path.join(dist, 'robots.txt'), 'utf8');
if (!/User-agent:\s*\*/.test(robots) || !/Allow:\s*\//.test(robots) || /Disallow:\s*\//.test(robots)) {
  fail('robots.txt não está liberado.');
}
if (!/Sitemap:\s+https?:\/\/\S+sitemap-index\.xml/.test(robots)) fail('robots.txt sem Sitemap.');

const sitemap = await readFile(path.join(dist, 'sitemap-index.xml'), 'utf8');
if (!sitemap.includes('sitemap-0.xml')) fail('sitemap-index.xml sem sitemap-0.xml.');
const sitemapBody = await readFile(path.join(dist, 'sitemap-0.xml'), 'utf8');
for (const route of requiredArticles) {
  if (!sitemapBody.includes(route)) fail(`Sitemap sem ${route}`);
}
if (sitemapBody.includes('/404')) fail('Sitemap não deve listar a página 404.');
if (!routes.has('/dicas-e-recursos/') && (sitemapBody.includes('/dicas-e-recursos/') || htmlFiles.some((file) => file.includes(`${path.sep}dicas-e-recursos${path.sep}`)))) {
  fail('Categoria sem artigo não deve gerar página nem entrar no sitemap.');
}
for (const slug of ['nao-funciona', 'backup-e-conversas', 'espaco-e-armazenamento', 'audio-e-mensagens']) {
  const categoryHtml = await readFile(path.join(dist, slug, 'index.html'), 'utf8');
  if (!categoryHtml.includes('id="artigos"')) fail(`/${slug}/ sem o título Artigos.`);
}

const vercelConfig = JSON.parse(readFileSync(new URL('../vercel.json', import.meta.url), 'utf8'));
const hsts = vercelConfig.headers?.[0]?.headers?.find((header) => header.key === 'Strict-Transport-Security');
if (hsts?.value !== 'max-age=63072000; includeSubDomains') {
  fail('vercel.json sem Strict-Transport-Security: max-age=63072000; includeSubDomains.');
}

if (process.env.PUBLIC_ADS_ENABLED !== 'true') {
  const withSlot = htmlFiles.filter((file) => readFileSync(file, 'utf8').includes('Espaço reservado para anúncio'));
  if (withSlot.length > 0) fail('AdSlot apareceu com a flag desligada.');
}

if (process.env.VERCEL_ENV === 'production') {
  const configured = (process.env.PUBLIC_SITE_URL ?? '').trim();
  let blocked = !configured;
  try {
    const host = new URL(configured).hostname;
    if (host === 'marktech.example' || host.endsWith('.marktech.example')) blocked = true;
  } catch {
    blocked = true;
  }
  if (blocked) {
    fail('VERCEL_ENV=production com PUBLIC_SITE_URL vazio ou placeholder marktech.example.');
  }
  const published = [robots, sitemap, sitemapBody, ...htmlFiles.map((file) => readFileSync(file, 'utf8'))].join('\n');
  if (published.includes('marktech.example')) {
    fail('O dist de produção ainda contém o placeholder marktech.example.');
  }
}

if (files.some((file) => file.endsWith(`${path.sep}ads.txt`) || file.endsWith('/ads.txt'))) {
  fail('ads.txt não deve ser publicado.');
}

const cover = path.join(dist, 'images/covers/whatsapp-nao-abre-no-android.webp');
const coverMeta = await sharp(cover).metadata();
if ((coverMeta.width ?? 0) < 1200 || Math.abs((coverMeta.width ?? 1) / (coverMeta.height ?? 1) - 16 / 9) > 0.01) {
  fail(`Capa fora do formato 16:9 ≥1200 (${coverMeta.width}x${coverMeta.height}).`);
}

if (process.exitCode) {
  console.error('Verificação do dist/ falhou.');
} else {
  console.log(`Verificação ok: ${htmlFiles.length} páginas HTML, links internos, JSON-LD, robots e capas.`);
}
