import { notFound } from 'next/navigation';
import { getPostBySlug, getPostBySlugAsync, getAllSlugsAsync } from '@/lib/api';
import { Metadata } from 'next';
import { format, parseISO } from 'date-fns';
import Link from 'next/link';
import { getPersonalInfo } from '@/lib/data';
import React from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';

// This function runs at build time to generate static paths
export async function generateStaticParams() {
  const slugs = await getAllSlugsAsync();
  return slugs.map((slug) => ({
    slug: encodeURIComponent(String(slug))
  }));
}

// This function generates metadata for the page
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  // Extract and decode the slug from params
  const slug = decodeURIComponent(params.slug);
  
  // Get the post data asynchronously
  const post = await getPostBySlugAsync(slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  // Get personal info
  const personalInfo = getPersonalInfo();

  return {
    title: `${post.title} | ${personalInfo.name}'s Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
      authors: [personalInfo.name],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
    },
  };
}

// This is the main page component
export default async function BlogPostPage({ 
  params 
}: { 
  params: { slug: string } 
}) {
  // Get the slug from params and decode it
  const decodedSlug = decodeURIComponent(params.slug);
  
  // Get the post data asynchronously
  const post = await getPostBySlugAsync(decodedSlug);

  if (!post) {
    notFound();
  }

  const postDate = parseISO(post.date);
  const readTime = Math.ceil(post.content.split(' ').length / 200);

  // Return the post content directly
  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back to blog link */}
        <Link 
          href="/blog" 
          className="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 mb-8 transition-colors"
        >
          <i className="mdi mdi-arrow-left text-xl mr-2"></i>
          Back to blog
        </Link>

        {/* Article header */}
        <header className="mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-6 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center">
              <span>
                {format(postDate, 'MMMM d, yyyy')}
              </span>
              <span className="mx-2">•</span>
              <span>{readTime} min read</span>
            </div>
            
            <div className="mt-2 sm:mt-0">
              <span>Posted in </span>
              <div className="inline-flex flex-wrap gap-2">
                {post.tags.map((tag, index) => (
                  <Link 
                    key={tag} 
                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                    className="text-cyan-600 dark:text-cyan-400 hover:underline"
                  >
                    {tag}{index < post.tags.length - 1 ? ',' : ''}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </header>

        {/* Article content */}
        <div className="prose dark:prose-invert max-w-none">
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Related posts or navigation */}
        <div className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700">
          <div className="flex justify-between">
            <Link 
              href="/blog" 
              className="inline-flex items-center text-cyan-600 dark:text-cyan-400 hover:text-cyan-700 dark:hover:text-cyan-300 transition-colors"
            >
              <i className="mdi mdi-arrow-left text-xl mr-2"></i>
              Back to blog
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}
