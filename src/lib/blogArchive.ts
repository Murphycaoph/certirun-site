import type { CollectionEntry } from "astro:content";

export type BlogArchivePost = {
  title: string;
  date: string;
  tag: string;
  tagSlug: string;
  excerpt: string;
  href: string;
  readTime: string;
  featured: boolean;
};

export type BlogTagSummary = {
  label: string;
  slug: string;
  count: number;
};

export const BLOG_ARCHIVE_PAGE_SIZE = 5;

export const toTagSlug = (value: string | null | undefined) =>
  (value ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

export const mapBlogPosts = (entries: CollectionEntry<"blog">[]): BlogArchivePost[] =>
  [...entries]
    .sort((a, b) => new Date(b.data.date).getTime() - new Date(a.data.date).getTime())
    .map((entry) => {
      const tag = entry.data.tag ?? "Insights";

      return {
        title: entry.data.title,
        date: entry.data.date,
        tag,
        tagSlug: toTagSlug(tag),
        excerpt: entry.data.excerpt ?? "",
        href: `/blog/${entry.slug}`,
        readTime: entry.data.readTime ?? "5 min read",
        featured: entry.data.featured ?? false,
      };
    });

export const getTagSummaries = (posts: BlogArchivePost[]): BlogTagSummary[] => {
  const tags = new Map<string, BlogTagSummary>();

  posts.forEach((post) => {
    const slug = post.tagSlug || "insights";
    const existing = tags.get(slug);

    if (existing) {
      existing.count += 1;
      return;
    }

    tags.set(slug, {
      label: post.tag || "Insights",
      slug,
      count: 1,
    });
  });

  return Array.from(tags.values()).sort((a, b) =>
    a.label.localeCompare(b.label, "en", { sensitivity: "base" })
  );
};

export const findTagSummary = (
  tags: BlogTagSummary[],
  requestedTag: string | null | undefined
) => {
  const slug = toTagSlug(requestedTag);
  return tags.find((tag) => tag.slug === slug) ?? null;
};
