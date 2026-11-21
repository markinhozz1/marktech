import { getCollection, type CollectionEntry } from 'astro:content';
import { categories, type Category } from '../data/categories';

export function readingMinutes(body: string | undefined): number {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function sortArticles(articles: CollectionEntry<'articles'>[]): CollectionEntry<'articles'>[] {
  return [...articles].sort((a, b) => {
    const featuredA = a.data.featured ?? 999;
    const featuredB = b.data.featured ?? 999;
    if (featuredA !== featuredB) return featuredA - featuredB;
    return b.data.published.localeCompare(a.data.published);
  });
}

export function categoriesWithArticles(articles: CollectionEntry<'articles'>[]): Category[] {
  const slugs = new Set(articles.map((article) => article.data.category));
  return categories.filter((category) => slugs.has(category.slug));
}

export async function publishedArticles(): Promise<CollectionEntry<'articles'>[]> {
  const articles = await getCollection('articles', ({ data }) => data.draft !== true);
  return sortArticles(articles);
}

export async function relatedArticles(
  current: CollectionEntry<'articles'>,
): Promise<CollectionEntry<'articles'>[]> {
  const articles = await publishedArticles();
  const sameCategory = articles.filter(
    (article) => article.id !== current.id && article.data.category === current.data.category,
  );
  const otherCategories = articles.filter(
    (article) => article.id !== current.id && article.data.category !== current.data.category,
  );
  return [...sameCategory, ...otherCategories].slice(0, 3);
}
