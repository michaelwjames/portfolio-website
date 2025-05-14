import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function BlogNavLink() {
  const pathname = usePathname();
  const isActive = pathname?.startsWith('/blog');

  return (
    <Link
      href="/blog"
      className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? 'bg-gray-900 text-white'
          : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
      }`}
    >
      <i className="mdi mdi-post mr-2"></i>
      Blog
    </Link>
  );
}
