import { Metadata } from 'next';
import { PortfolioHeader } from '@/components/portfolio-header';
import { getPersonalInfo } from '@/lib/data';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read the latest articles and insights on web development, design, and more.',
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const personalInfo = getPersonalInfo();
  
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 transition-colors duration-200">
      <PortfolioHeader />
      <main className="pt-24 pb-16 bg-white dark:bg-zinc-900">
        <div className="container mx-auto px-4">
          {children}
        </div>
      </main>
      <footer className="bg-zinc-100 dark:bg-zinc-800 py-8 transition-colors duration-200">
        <div className="container mx-auto px-4 text-center">
          <p className="text-zinc-600 dark:text-zinc-300">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
