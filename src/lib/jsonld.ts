import { contactEmail, defaultDescription, publisherName, siteName } from './site';

export interface Crumb {
  name: string;
  path: string;
}

export interface ArticleMeta {
  published: string;
  updated: string;
  image: string;
  imageAlt: string;
}

export interface ArticleStep {
  name: string;
  text: string;
}

interface PageGraphInput {
  path: string;
  title: string;
  description: string;
  crumbs?: Crumb[];
  article?: ArticleMeta & { steps?: ArticleStep[] };
}

function abs(site: URL, path: string): string {
  return new URL(path, site).href;
}

export function pageGraph(site: URL, input: PageGraphInput) {
  const pageUrl = abs(site, input.path);
  const orgId = abs(site, '/#organization');
  const siteId = abs(site, '/#website');
  const personId = abs(site, '/#marcos');
  const logo = abs(site, '/brand/marktech-logo.png');

  const graph: Record<string, unknown>[] = [
    {
      '@type': 'Organization',
      '@id': orgId,
      name: siteName,
      url: site.href,
      email: contactEmail,
      description: defaultDescription,
      logo: {
        '@type': 'ImageObject',
        url: logo,
        width: 512,
        height: 512,
      },
    },
    {
      '@type': 'WebSite',
      '@id': siteId,
      name: siteName,
      url: site.href,
      inLanguage: 'pt-BR',
      description: defaultDescription,
      publisher: { '@id': orgId },
    },
    {
      '@type': 'Person',
      '@id': personId,
      name: publisherName,
      url: abs(site, '/sobre/'),
      email: contactEmail,
    },
  ];

  if (input.crumbs && input.crumbs.length >= 2) {
    graph.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: input.crumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: abs(site, crumb.path),
      })),
    });
  }

  if (input.article) {
    const imageUrl = abs(site, input.article.image);
    graph.push({
      '@type': 'Article',
      '@id': `${pageUrl}#article`,
      headline: input.title,
      description: input.description,
      inLanguage: 'pt-BR',
      mainEntityOfPage: pageUrl,
      datePublished: input.article.published,
      dateModified: input.article.updated,
      image: {
        '@type': 'ImageObject',
        url: imageUrl,
        width: 1920,
        height: 1080,
        caption: input.article.imageAlt,
      },
      author: { '@id': personId },
      publisher: { '@id': orgId },
      ...(input.article.steps && input.article.steps.length > 0
        ? {
            hasPart: input.article.steps.map((step, index) => ({
              '@type': 'WebPageElement',
              '@id': `${pageUrl}#passo-${index + 1}`,
              name: step.name,
              text: step.text,
              position: index + 1,
            })),
          }
        : {}),
    });
  }

  return {
    '@context': 'https://schema.org',
    '@graph': graph,
  };
}
