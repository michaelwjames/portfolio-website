import Link from 'next/link';
import { getAllPosts } from '@/lib/api';

export const metadata = {
  title: 'Blog',
  description: 'Read my latest blog posts about web development and more.',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 to-blue-600 mb-4">
          Blog
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
          Thoughts, tutorials, and insights on web development, design, and technology.
        </p>
      </div>
      
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📝</div>
          <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white mb-2">No posts yet</h2>
          <p className="text-zinc-600 dark:text-zinc-400">Check back soon for new articles!</p>
        </div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const postDate = new Date(post.date);
            return (
              <article 
                key={post.id} 
                className="group bg-white dark:bg-zinc-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-3">
                    <time 
                      dateTime={post.date} 
                      className="text-sm font-medium text-cyan-600 dark:text-cyan-400"
                      title={postDate.toLocaleDateString()}
                    >
                      {postDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </time>
                    <div className="flex space-x-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span 
                          key={tag} 
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-200"
                        >
                          {tag}
                        </span>
                      ))}
                      {post.tags.length > 2 && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                          +{post.tags.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    <Link href={`/blog/${post.slug}`} className="hover:no-underline">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="inline-flex items-center text-sm text-cyan-600 dark:text-cyan-400 font-medium">
                      Read more
                      <svg 
                        className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M9 5l7 7-7 7" 
                        />
                      </svg>
                    </span>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {Math.ceil(post.content.split(' ').length / 200)} min read
                    </span>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
