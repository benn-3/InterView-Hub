// Helper functions for UI formatting, icons, and snippets

/**
 * Generates an excerpt snippet with search highlight around matching words
 */
export const getSearchSnippet = (content, query, maxLength = 160) => {
  if (!content || !query) return '';
  const cleanContent = content.replace(/[#*`_~[\]()]/g, ' ').replace(/\s+/g, ' ');
  const lowerContent = cleanContent.toLowerCase();
  const lowerQuery = query.toLowerCase();

  const matchIndex = lowerContent.indexOf(lowerQuery);
  if (matchIndex === -1) {
    return cleanContent.slice(0, maxLength) + (cleanContent.length > maxLength ? '...' : '');
  }

  const start = Math.max(0, matchIndex - 40);
  const end = Math.min(cleanContent.length, matchIndex + query.length + 80);
  let snippet = cleanContent.slice(start, end);

  if (start > 0) snippet = '...' + snippet;
  if (end < cleanContent.length) snippet = snippet + '...';

  return snippet;
};

/**
 * Returns subject brand color / styling gradient
 */
export const getSubjectMeta = (subjectName = '') => {
  const s = (subjectName || '').toLowerCase();
  if (s.includes('oop')) {
    return { color: '#6366f1', bg: 'rgba(99, 102, 241, 0.12)', border: 'rgba(99, 102, 241, 0.3)', icon: 'Boxes' };
  }
  if (s.includes('java')) {
    return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.3)', icon: 'Coffee' };
  }
  if (s.includes('dbms')) {
    return { color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.3)', icon: 'Database' };
  }
  if (s.includes('sql')) {
    return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.12)', border: 'rgba(59, 130, 246, 0.3)', icon: 'Table' };
  }
  if (s.includes('dsa')) {
    return { color: '#10b981', bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.3)', icon: 'Binary' };
  }
  if (s.includes('devops')) {
    return { color: '#ec4899', bg: 'rgba(236, 72, 153, 0.12)', border: 'rgba(236, 72, 153, 0.3)', icon: 'Workflow' };
  }
  if (s.includes('aws') || s.includes('cloud')) {
    return { color: '#f97316', bg: 'rgba(249, 115, 22, 0.12)', border: 'rgba(249, 115, 22, 0.3)', icon: 'Cloud' };
  }
  if (s.includes('linux')) {
    return { color: '#eab308', bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.3)', icon: 'Terminal' };
  }
  if (s.includes('kube') || s.includes('docker')) {
    return { color: '#0284c7', bg: 'rgba(2, 132, 199, 0.12)', border: 'rgba(2, 132, 199, 0.3)', icon: 'Layers' };
  }
  return { color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.12)', border: 'rgba(139, 92, 246, 0.3)', icon: 'BookOpen' };
};

/**
 * Format timestamp into readable date
 */
export const formatDate = (timestamp) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};
