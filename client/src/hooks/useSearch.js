import { useState, useMemo } from 'react';
import { allTopics } from '../utils/markdownLoader';
import { getSearchSnippet } from '../utils/helpers';

/**
 * Hook for full-text searching across markdown files
 */
export function useSearch(initialQuery = '') {
  const [query, setQuery] = useState(initialQuery);
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    
    return allTopics
      .filter(topic => {
        // Subject filter
        if (selectedSubject !== 'all' && topic.subject.toLowerCase() !== selectedSubject.toLowerCase()) {
          return false;
        }
        // Difficulty filter
        if (selectedDifficulty !== 'all' && topic.difficulty !== selectedDifficulty.toLowerCase()) {
          return false;
        }

        if (!trimmed) return true;

        const titleMatch = topic.title.toLowerCase().includes(trimmed);
        const subjectMatch = topic.subject.toLowerCase().includes(trimmed);
        const tagsMatch = topic.tags.some(tag => tag.toLowerCase().includes(trimmed));
        const contentMatch = topic.markdown.toLowerCase().includes(trimmed);

        return titleMatch || subjectMatch || tagsMatch || contentMatch;
      })
      .map(topic => {
        let score = 0;
        const trimmed = query.trim().toLowerCase();

        if (trimmed) {
          if (topic.title.toLowerCase() === trimmed) score += 100;
          else if (topic.title.toLowerCase().includes(trimmed)) score += 50;
          if (topic.tags.some(t => t.toLowerCase() === trimmed)) score += 30;
          if (topic.subject.toLowerCase().includes(trimmed)) score += 20;
          if (topic.markdown.toLowerCase().includes(trimmed)) score += 10;
        }

        return {
          ...topic,
          score,
          snippet: trimmed ? getSearchSnippet(topic.markdown, trimmed) : topic.markdown.slice(0, 120) + '...'
        };
      })
      .sort((a, b) => {
        if (query.trim()) {
          return b.score - a.score;
        }
        return a.title.localeCompare(b.title);
      });
  }, [query, selectedSubject, selectedDifficulty]);

  return {
    query,
    setQuery,
    selectedSubject,
    setSelectedSubject,
    selectedDifficulty,
    setSelectedDifficulty,
    results,
    totalCount: results.length
  };
}
