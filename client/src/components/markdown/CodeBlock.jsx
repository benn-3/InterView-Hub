import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export default function CodeBlock({ language, value }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div style={{
      position: 'relative',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      margin: '1.25rem 0',
      background: 'var(--bg-code)',
      border: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow-md)'
    }}>
      {/* Code Header Bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.4rem 1rem',
        background: 'rgba(255, 255, 255, 0.03)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
        fontSize: '0.75rem',
        fontFamily: 'var(--font-mono)',
        color: 'var(--text-muted)'
      }}>
        <span style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
          {language || 'code'}
        </span>
        <button
          onClick={handleCopy}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.35rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '4px',
            background: copied ? 'var(--accent-success-light)' : 'rgba(255, 255, 255, 0.08)',
            color: copied ? 'var(--accent-success)' : 'var(--text-secondary)',
            fontSize: '0.75rem',
            fontWeight: 600,
            transition: 'all var(--transition-fast)'
          }}
          aria-label={copied ? 'Copied code' : 'Copy code'}
        >
          {copied ? <Check size={13} strokeWidth={3} /> : <Copy size={13} />}
          <span>{copied ? 'COPIED ✓' : 'COPY'}</span>
        </button>
      </div>

      {/* Code Content */}
      <pre style={{
        margin: 0,
        padding: '1.25rem',
        overflowX: 'auto',
        fontSize: '0.875rem',
        lineHeight: 1.6,
        fontFamily: 'var(--font-mono)'
      }}>
        <code>{value}</code>
      </pre>
    </div>
  );
}
