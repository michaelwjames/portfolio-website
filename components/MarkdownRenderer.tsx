'use client';

import React, { useEffect, useState } from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  const [html, setHtml] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Process markdown in the client
    const processMarkdown = async () => {
      try {
        // Process lists first (both ordered and unordered)
        let processed = content
          // Process unordered lists
          .replace(/^\s*[-*+]\s+(.*$)/gm, (match, item) => {
            return `\n<li class="ml-5 mb-1 list-disc">${item.trim()}</li>\n`;
          })
          // Process ordered lists
          .replace(/^\s*\d+\.\s+(.*$)/gm, (match, item) => {
            return `\n<li class="ml-5 mb-1 list-decimal">${item.trim()}</li>\n`;
          })
          // Wrap consecutive list items in <ul> or <ol>
          .replace(/(<li[^>]*>[\s\S]*?<\/li>(?:\s*<li[^>]*>[\s\S]*?<\/li>)*)/g, (match) => {
            // Check if it's an ordered list (starts with a number)
            const isOrdered = /\d+\./.test(match);
            const listTag = isOrdered ? 'ol' : 'ul';
            return `<${listTag} class="my-4 ml-6 space-y-1">${match}</${listTag}>`;
          });

        // Process bold text
        processed = processed
          .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold">$1</strong>')
          .replace(/__([^_]+)__/g, '<strong class="font-semibold">$1</strong>');

        // Process italic text
        processed = processed
          .replace(/\*([^*]+)\*/g, '<em class="italic">$1</em>')
          .replace(/_([^_]+)_/g, '<em class="italic">$1</em>');

        // Process markdown links
        processed = processed.replace(
          /\[([^\]]+)\]\(([^)]+)\)/g,
          '<a href="$2" class="text-cyan-600 dark:text-cyan-400 hover:underline" target="_blank" rel="noopener noreferrer">$1</a>'
        );

        // Process code blocks
        processed = processed.replace(
          /```(\w*)\n([\s\S]*?)\n```/g,
          (match, language, code) => {
            const langClass = language ? `language-${language}` : '';
            return `<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 text-sm"><code class="block text-cyan-600 dark:text-cyan-400 font-mono ${langClass}">${code}</code></pre>`;
          }
        );

        // Process inline code
        processed = processed.replace(
          /`([^`]+)`/g,
          '<code class="bg-gray-100 dark:bg-gray-800 text-cyan-600 dark:text-cyan-400 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
        );

        // Process blockquotes
        processed = processed.replace(
          /^>\s*(.*$)/gm,
          '<blockquote class="border-l-4 border-cyan-500 pl-4 py-2 my-6 text-gray-700 dark:text-gray-300 italic">$1</blockquote>'
        );

        // Process headings
        processed = processed
          .replace(/^#\s+(.*$)/gm, '<h1 class="text-3xl font-bold my-6">$1</h1>')
          .replace(/^##\s+(.*$)/gm, '<h2 class="text-2xl font-bold my-5">$1</h2>')
          .replace(/^###\s+(.*$)/gm, '<h3 class="text-xl font-bold my-4">$1</h3>');

        // Process paragraphs (only for text that's not already wrapped in other tags)
        const withParagraphs = processed
          .split('\n\n')
          .map(paragraph => {
            const trimmed = paragraph.trim();
            if (!trimmed) return '';
            // Skip if already wrapped in a block-level tag
            if (/^<(p|h[1-6]|ul|ol|li|blockquote|pre|code)/i.test(trimmed)) {
              return paragraph;
            }
            return `<p class="mb-4">${paragraph}</p>`;
          })
          .join('\n\n');

        setHtml(withParagraphs);
      } catch (error) {
        console.error('Error processing markdown:', error);
        setHtml('<p class="text-red-500">Error loading content. Please try again later.</p>');
      } finally {
        setIsLoading(false);
      }
    };

    processMarkdown();
  }, [content]);

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
      </div>
    );
  }

  return (
    <div 
      className="prose dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }} 
    />
  );
};

export default MarkdownRenderer;
