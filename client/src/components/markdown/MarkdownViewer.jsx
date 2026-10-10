import React from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import CodeBlock from './CodeBlock';
import './MarkdownViewer.css';

// Slug generator for headings
const textToId = (text) => {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const extractText = (children) => {
  if (!children) return '';
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (children.props && children.props.children) return extractText(children.props.children);
  return '';
};

export default function MarkdownViewer({ content }) {
  if (!content) {
    return (
      <div style={{ color: 'var(--text-muted)', padding: '2rem 0' }}>
        No content available for this topic.
      </div>
    );
  }

  const customComponents = {
    // Generate IDs on headings so TOC links jump smoothly
    h1: ({ children, ...props }) => {
      const text = extractText(children);
      const id = textToId(text);
      return <h1 id={id} {...props}>{children}</h1>;
    },
    h2: ({ children, ...props }) => {
      const text = extractText(children);
      const id = textToId(text);
      return <h2 id={id} {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }) => {
      const text = extractText(children);
      const id = textToId(text);
      return <h3 id={id} {...props}>{children}</h3>;
    },
    h4: ({ children, ...props }) => {
      const text = extractText(children);
      const id = textToId(text);
      return <h4 id={id} {...props}>{children}</h4>;
    },

    // Custom code block rendering with Copy button
    code: ({ node, inline, className, children, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const codeString = String(children).replace(/\n$/, '');

      if (!inline && (match || String(children).includes('\n'))) {
        return (
          <CodeBlock
            language={match ? match[1] : 'text'}
            value={codeString}
          />
        );
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
  };

  return (
    <article className="markdown-article">
      <Markdown
        remarkPlugins={[remarkGfm]}
        components={customComponents}
      >
        {content}
      </Markdown>
    </article>
  );
}
