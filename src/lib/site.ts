export const siteName = 'MarkTech';
export const contactEmail = 'contatomarkinhozz@gmail.com';
export const publisherName = 'Marcos';
export const contentReviewed = '2026-11-21';

export const defaultDescription =
  'Tutoriais em português para resolver problemas do WhatsApp no Android, em Samsung, Motorola e Xiaomi. Site independente, sem vínculo com o WhatsApp ou com a Meta.';

export const independenceNotice =
  'O MarkTech é um site independente, sem vínculo com o WhatsApp ou com a Meta.';

export function requireSite(site: URL | undefined): URL {
  if (!site) {
    throw new Error('A opção site do Astro não está definida.');
  }
  return site;
}

export function formatDate(iso: string): string {
  const [year, month, day] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat('pt-BR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function articlePath(category: string, id: string): string {
  return `/${category}/${id}/`;
}
