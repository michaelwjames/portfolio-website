import blogPosts from '@/data/blog_posts.json';

export type BlogPost = {
  id: number;
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  tags: string[];
};

export function getAllPosts(): BlogPost[] {
  return blogPosts as BlogPost[];
}

// Synchronous version (for client components)
export function getPostBySlug(slug: string): BlogPost | undefined {
  return (blogPosts as BlogPost[]).find((post) => post.slug === slug);
}

// Async version (for server components and metadata)
export async function getPostBySlugAsync(slug: string): Promise<BlogPost | undefined> {
  // Simulate async operation
  return new Promise((resolve) => {
    const post = (blogPosts as BlogPost[]).find((post) => post.slug === slug);
    resolve(post);
  });
}

export function getAllSlugs(): string[] {
  return (blogPosts as BlogPost[]).map((post) => post.slug);
}

// Async version for static generation
export async function getAllSlugsAsync(): Promise<string[]> {
  return new Promise((resolve) => {
    const slugs = (blogPosts as BlogPost[]).map((post) => post.slug);
    resolve(slugs);
  });
}
