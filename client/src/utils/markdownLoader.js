import { parseFrontmatter, extractHeadings } from './markdownParser';

/**
 * Reusable Markdown Content Loader
 * Discovers markdown files using Vite's import.meta.glob
 */

// Use import.meta.glob to load all markdown files under /src/content/
const markdownModules = import.meta.glob('/src/content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

/**
 * Normalizes subject names into title-cased or canonical uppercase names
 * e.g., 'oop' -> 'OOP', 'dbms' -> 'DBMS', 'sql' -> 'SQL', 'dsa' -> 'DSA', 'aws' -> 'AWS', 'java' -> 'Java'
 */
export const formatSubjectName = (rawSubject) => {
  if (!rawSubject) return 'General';
  const clean = String(rawSubject).toLowerCase().trim();
  if (clean === 'programming' || clean === 'oop' || clean === 'oops' || clean === 'java') return 'OOP';
  if (clean === 'operating-systems' || clean === 'os') return 'OS';
  if (clean === 'networking' || clean === 'networks') return 'Networks';
  if (clean === 'web-development' || clean === 'webdev') return 'Web Dev';

  const upper = rawSubject.toUpperCase();
  const knownAcronyms = ['OOP', 'OOPS', 'DBMS', 'SQL', 'DSA', 'AWS', 'API', 'OS', 'CI/CD'];
  if (knownAcronyms.includes(upper)) return upper;
  
  // Title case
  return rawSubject
    .split(/[-_ ]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

/**
 * Converts a string to a clean URL slug
 */
export const toSlug = (text) => {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
};

/**
 * Loads, parses and indexes all markdown files
 */
export const loadAllTopics = () => {
  const topics = [];

  for (const [filePath, rawContent] of Object.entries(markdownModules)) {
    try {
      const { metadata, content } = parseFrontmatter(rawContent);

      // Infer subject and filename from path: e.g. "/src/content/oop/polymorphism.md"
      const pathParts = filePath.split('/');
      const fileNameWithExt = pathParts[pathParts.length - 1];
      const fileName = fileNameWithExt.replace(/\.md$/i, '');
      const folderSubject = pathParts.length >= 4 ? pathParts[pathParts.length - 2] : 'general';

      const inferredTitle = fileName
        .split(/[-_]+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      const subjectName = formatSubjectName(metadata.subject || folderSubject);
      const title = metadata.title || inferredTitle;
      const slug = toSlug(fileName);
      const id = `${toSlug(subjectName)}_${slug}`;

      // Extract headings for Table of Contents
      const headings = extractHeadings(content);

      topics.push({
        id,
        title,
        slug,
        subject: subjectName,
        category: metadata.category || subjectName,
        path: filePath,
        markdown: content,
        rawContent,
        difficulty: (metadata.difficulty || 'medium').toLowerCase(),
        importance: (metadata.importance || 'medium').toLowerCase(),
        tags: Array.isArray(metadata.tags)
          ? metadata.tags
          : (metadata.tags ? [metadata.tags] : [subjectName.toLowerCase()]),
        headings
      });
    } catch (err) {
      console.error(`Error loading markdown file ${filePath}:`, err);
    }
  }

  // Sort by importance (high first) and title
  return topics.sort((a, b) => {
    if (a.importance === 'high' && b.importance !== 'high') return -1;
    if (b.importance === 'high' && a.importance !== 'high') return 1;
    return a.title.localeCompare(b.title);
  });
};

/**
 * Pre-loaded topics list
 */
export const allTopics = loadAllTopics();

/**
 * Dynamically computes subjects from the loaded topics
 * Does NOT hard-code subjects!
 */
export const getSubjects = (topicsList = allTopics) => {
  const subjectMap = {};

  topicsList.forEach(topic => {
    const subj = topic.subject;
    if (!subjectMap[subj]) {
      subjectMap[subj] = {
        name: subj,
        slug: toSlug(subj),
        topics: [],
        categories: new Set()
      };
    }
    subjectMap[subj].topics.push(topic);
    if (topic.category) {
      subjectMap[subj].categories.add(topic.category);
    }
  });

  return Object.values(subjectMap).map(subj => ({
    ...subj,
    topicCount: subj.topics.length,
    categories: Array.from(subj.categories)
  })).sort((a, b) => b.topicCount - a.topicCount);
};

/**
 * Get topic by ID or Slug
 */
export const getTopicById = (idOrSlug, topicsList = allTopics) => {
  return topicsList.find(t => t.id === idOrSlug || t.slug === idOrSlug);
};

/**
 * Get topics by subject
 */
export const getTopicsBySubject = (subjectSlug, topicsList = allTopics) => {
  return topicsList.filter(t => toSlug(t.subject) === toSlug(subjectSlug));
};
