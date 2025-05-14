declare module 'react-markdown' {
  import { ComponentType } from 'react';

  interface ReactMarkdownProps {
    children: string;
    className?: string;
    components?: {
      [nodeType: string]: ComponentType<any>;
    };
    remarkPlugins?: any[];
    rehypePlugins?: any[];
  }

  const ReactMarkdown: ComponentType<ReactMarkdownProps>;
  export default ReactMarkdown;
}
