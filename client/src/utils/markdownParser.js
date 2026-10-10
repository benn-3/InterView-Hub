// Markdown Frontmatter & Metadata Parser

/**
 * Parses frontmatter YAML block and content body
 * Format:
 * ---
 * title: Polymorphism
 * subject: OOP
 * category: Java
 * difficulty: medium
 * importance: high
 * tags:
 *   - oop
 *   - java
 * ---
 */
export const parseFrontmatter = (rawContent) => {
  if (!rawContent || typeof rawContent !== 'string') {
    return { metadata: {}, content: '' };
  }

  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = rawContent.match(frontmatterRegex);

  if (!match) {
    return { metadata: {}, content: rawContent.trim() };
  }

  const yamlBlock = match[1];
  const markdownBody = match[2];
  const metadata = {};

  const lines = yamlBlock.split(/\r?\n/);
  let currentArrayKey = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    // Check array item: "- item"
    if (trimmed.startsWith('-') && currentArrayKey) {
      const val = trimmed.replace(/^-\s*/, '').trim().replace(/^['"](.*)['"]$/, '$1');
      if (!Array.isArray(metadata[currentArrayKey])) {
        metadata[currentArrayKey] = [];
      }
      metadata[currentArrayKey].push(val);
      continue;
    }

    // Key value pair: "key: value"
    const colonIdx = line.indexOf(':');
    if (colonIdx !== -1) {
      const key = line.slice(0, colonIdx).trim();
      const rawVal = line.slice(colonIdx + 1).trim();

      if (rawVal === '') {
        // Might be starting an array
        currentArrayKey = key;
        metadata[key] = [];
      } else {
        currentArrayKey = null;
        let value = rawVal.replace(/^['"](.*)['"]$/, '$1');
        // Handle inline arrays: [a, b, c]
        if (value.startsWith('[') && value.endsWith(']')) {
          value = value
            .slice(1, -1)
            .split(',')
            .map(s => s.trim().replace(/^['"](.*)['"]$/, '$1'))
            .filter(Boolean);
        }
        metadata[key] = value;
      }
    }
  }

  return {
    metadata,
    content: markdownBody
  };
};

/**
 * Extracts Table of Contents headings from Markdown
 */
export const extractHeadings = (markdown) => {
  if (!markdown) return [];

  const headingRegex = /^(#{1,4})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    let text = match[2].trim();
    
    // Clean markdown links, bold, code inside heading text
    text = text.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    text = text.replace(/[*_`]/g, '');

    const id = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/^-+|-+$/g, '');

    if (id) {
      headings.push({
        level,
        text,
        id
      });
    }
  }

  return headings;
};
