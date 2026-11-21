import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadEnv } from 'vite';

const placeholderHost = 'marktech.example';

function argvIndicatesProduction(argv) {
  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];
    if (arg === '--prod' || arg === '--prod=true') return true;
    if (arg === '--environment=production' || arg === '--target=production') return true;
    if ((arg === '--environment' || arg === '--target') && argv[index + 1] === 'production') {
      return true;
    }
  }
  return false;
}

function ancestorIndicatesProduction() {
  if (process.platform !== 'linux') return false;
  const seen = new Set();
  let pid = process.ppid;
  while (pid > 1 && !seen.has(pid)) {
    seen.add(pid);
    let cmdline = '';
    let parent = 0;
    try {
      cmdline = readFileSync(`/proc/${pid}/cmdline`, 'utf8');
      const stat = readFileSync(`/proc/${pid}/stat`, 'utf8');
      const afterCommand = stat.slice(stat.lastIndexOf(')') + 2);
      parent = Number(afterCommand.split(' ')[1]);
    } catch {
      break;
    }
    if (argvIndicatesProduction(cmdline.split('\0').filter(Boolean))) return true;
    pid = parent;
  }
  return false;
}

export function explicitSiteUrl() {
  const fileEnv = loadEnv(process.env.NODE_ENV || 'production', process.cwd(), '');
  return (process.env.PUBLIC_SITE_URL ?? fileEnv.PUBLIC_SITE_URL ?? '').trim();
}

export function isPlaceholderSite(value) {
  if (!value) return true;
  try {
    const url = new URL(value);
    return url.hostname === placeholderHost || url.hostname.endsWith(`.${placeholderHost}`);
  } catch {
    return true;
  }
}

/**
 * Alvo de produção.
 * Na infraestrutura da Vercel, VERCEL_ENV e VERCEL_TARGET_ENV vêm preenchidos.
 * O `vercel build` local, com ou sem --prod, define VERCEL=1 e não define
 * VERCEL_ENV. Esse par vale em qualquer sistema operacional e recusa o
 * placeholder. O `npm run build` comum não define VERCEL e não entra aqui.
 * A leitura de `--prod` no processo ancestral só existe no Linux e cobre o
 * caminho de prebuild quando a CLI não exporta VERCEL.
 */
export function isProductionTarget() {
  if (process.env.VERCEL_ENV === 'production') return true;
  if (process.env.VERCEL_TARGET_ENV === 'production') return true;
  if (process.env.VERCEL === '1' && !process.env.VERCEL_ENV) return true;
  return ancestorIndicatesProduction();
}

export function productionSiteError(value = explicitSiteUrl()) {
  if (!isProductionTarget()) return '';
  if (!value) {
    return 'Build de produção recusado: PUBLIC_SITE_URL está vazio. Configure a origem HTTPS na Vercel. O código continua usando o placeholder marktech.example fora de produção.';
  }
  if (isPlaceholderSite(value)) {
    return 'Build de produção recusado: PUBLIC_SITE_URL usa o placeholder marktech.example. Configure a origem HTTPS real na variável de ambiente.';
  }
  try {
    const url = new URL(value);
    if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash) {
      return 'Em produção, PUBLIC_SITE_URL precisa ser só a origem HTTPS, sem caminho.';
    }
  } catch {
    return `PUBLIC_SITE_URL inválida em produção (${value}).`;
  }
  return '';
}

const isDirect = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isDirect) {
  const error = productionSiteError();
  if (error) {
    console.error(error);
    process.exit(1);
  }
}
