import { useMemo } from 'react';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const html = useMemo(() => {
    let processed = content;

    // Headers with IDs
    processed = processed.replace(/^## (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h2 id="${id}">${text}</h2>`;
    });

    processed = processed.replace(/^### (.+)$/gm, (_, text) => {
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<h3 id="${id}">${text}</h3>`;
    });

    // Code blocks
    processed = processed.replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
      return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
    });

    // Inline code
    processed = processed.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Bold
    processed = processed.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');

    // Italic
    processed = processed.replace(/\*([^*]+)\*/g, '<em>$1</em>');

    // Links
    processed = processed.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

    // Blockquotes
    processed = processed.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

    // Unordered lists
    processed = processed.replace(/^- (.+)$/gm, '<li>$1</li>');
    processed = processed.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Ordered lists
    processed = processed.replace(/^\d+\. (.+)$/gm, '<li>$1</li>');

    // Paragraphs
    processed = processed.split('\n\n').map(block => {
      if (block.startsWith('<')) return block;
      if (block.trim() === '') return '';
      return `<p>${block.replace(/\n/g, ' ')}</p>`;
    }).join('\n');

    return processed;
  }, [content]);

  return (
    <div 
      className="prose-blog"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
