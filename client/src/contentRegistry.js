// src/contentRegistry.js
// Centralized registry for all curriculum learning content.
// Maps 15 subject areas to study materials (Markdown), interview questions, MCQs, and flashcards.

import { interviewQuestionsData } from './data/interviewQuestions.js';
import { mcqsData } from './data/mcqs.js';
import { flashcardsData } from './data/flashcards.js';
import { codingProblemsData } from './data/codingProblems.js';
import { sqlProblemsData } from './data/sqlProblems.js';
import { parseFrontmatter, extractHeadings } from './utils/markdownParser.js';

// Safe Vite import with '?raw' and eager loading
const rawMarkdownModules = import.meta.glob('/src/content/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default'
});

/**
 * Normalizes text to URL slug
 */
export const toSlug = (text) => {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/^-+|-+$/g, '');
};

// Canonical 15 Subjects Definition
export const CURRICULUM_SUBJECTS = [
  {
    id: 'oop',
    slug: 'oop',
    title: 'Object-Oriented Programming (OOP)',
    shortTitle: 'OOP',
    category: 'Core Computer Science',
    icon: 'Boxes',
    color: '#6366f1',
    description: 'Encapsulation, Inheritance, Polymorphism, Abstraction, SOLID principles, and design patterns in Java & C++.'
  },
  {
    id: 'dsa',
    slug: 'dsa',
    title: 'Data Structures & Algorithms',
    shortTitle: 'DSA',
    category: 'Core Computer Science',
    icon: 'Binary',
    color: '#10b981',
    description: 'Arrays, Strings, Linked Lists, Trees, Graphs, Dynamic Programming, Big-O analysis and problem-solving patterns.'
  },
  {
    id: 'dbms',
    slug: 'dbms',
    title: 'Database Management Systems (DBMS)',
    shortTitle: 'DBMS',
    category: 'Core Computer Science',
    icon: 'Database',
    color: '#06b6d4',
    description: 'Relational model, ACID properties, Transactions, Concurrency Control, Normalization (1NF-BCNF), and Indexing.'
  },
  {
    id: 'sql',
    slug: 'sql',
    title: 'SQL & Relational Databases',
    shortTitle: 'SQL',
    category: 'Databases & Querying',
    icon: 'Table',
    color: '#3b82f6',
    description: 'Complex Joins, Aggregations, Window Functions, CTEs, Subqueries, Query Optimization and Schema Design.'
  },
  {
    id: 'os',
    slug: 'os',
    title: 'Operating Systems',
    shortTitle: 'OS',
    category: 'Core Computer Science',
    icon: 'Cpu',
    color: '#f59e0b',
    description: 'Process management, Threads, CPU Scheduling, Deadlocks, Virtual Memory, Paging, and File Systems.'
  },
  {
    id: 'networks',
    slug: 'networks',
    title: 'Computer Networks',
    shortTitle: 'Networks',
    category: 'Core Computer Science',
    icon: 'Network',
    color: '#8b5cf6',
    description: 'OSI 7 Layers, TCP/IP, HTTP/HTTPS, DNS, WebSockets, TLS Handshake, Routing, and Network Security.'
  },
  {
    id: 'webdev',
    slug: 'webdev',
    title: 'Web Development & APIs',
    shortTitle: 'Web Dev',
    category: 'Software Engineering',
    icon: 'Globe',
    color: '#14b8a6',
    description: 'REST APIs, GraphQL, Frontend architecture, Event Loop, DOM rendering, CORS, Web Security, and Authentication.'
  },
  {
    id: 'linux',
    slug: 'linux',
    title: 'Linux & Shell Scripting',
    shortTitle: 'Linux',
    category: 'Systems & Tools',
    icon: 'Terminal',
    color: '#eab308',
    description: 'Linux architecture, File permissions (chmod/chown), Process signals, Bash scripting, pipes, and system diagnostics.'
  },
  {
    id: 'aws',
    slug: 'aws',
    title: 'AWS & Cloud Computing',
    shortTitle: 'AWS',
    category: 'Cloud & Infrastructure',
    icon: 'Cloud',
    color: '#f97316',
    description: 'EC2, S3, IAM, VPC, Lambda, RDS, DynamoDB, CloudFront, Route53, and Well-Architected Framework.'
  },
  {
    id: 'devops',
    slug: 'devops',
    title: 'DevOps & CI/CD Pipelines',
    shortTitle: 'DevOps',
    category: 'DevOps & Cloud',
    icon: 'Workflow',
    color: '#ec4899',
    description: 'Continuous Integration, Continuous Delivery, GitHub Actions, Jenkins, GitOps, and release strategies.'
  },
  {
    id: 'docker',
    slug: 'docker',
    title: 'Docker & Containerization',
    shortTitle: 'Docker',
    category: 'DevOps & Cloud',
    icon: 'Layers',
    color: '#0284c7',
    description: 'Dockerfile instructions, Multi-stage builds, Container lifecycle, Networking, Volumes, and Docker Compose.'
  },
  {
    id: 'kubernetes',
    slug: 'kubernetes',
    title: 'Kubernetes & Orchestration',
    shortTitle: 'Kubernetes',
    category: 'DevOps & Cloud',
    icon: 'Anchor',
    color: '#3b82f6',
    description: 'Pods, Deployments, Services, Ingress, ConfigMaps, Secrets, HPA, Architecture, and production troubleshooting.'
  },
  {
    id: 'terraform',
    slug: 'terraform',
    title: 'Terraform & Infrastructure as Code',
    shortTitle: 'Terraform',
    category: 'DevOps & Cloud',
    icon: 'Code2',
    color: '#7c3aed',
    description: 'HCL syntax, Providers, State management, Remote backends, Modules, Variables, and Terraform workflow.'
  },
  {
    id: 'devsecops',
    slug: 'devsecops',
    title: 'DevSecOps & Observability',
    shortTitle: 'DevSecOps',
    category: 'DevOps & Cloud',
    icon: 'ShieldCheck',
    color: '#ef4444',
    description: 'Vulnerability scanning (SAST/DAST), Secrets management, Prometheus, Grafana, ELK stack, Tracing, and SRE metrics.'
  },
  {
    id: 'system-design',
    slug: 'system-design',
    title: 'System Design & Distributed Systems',
    shortTitle: 'System Design',
    category: 'Software Engineering',
    icon: 'Server',
    color: '#059669',
    description: 'Scalability, Load balancing, Caching (Redis), CAP theorem, Sharding, Message Queues (Kafka/RabbitMQ), and Microservices.'
  }
];

// Helper to match subject aliases
export const matchesSubject = (itemSubject, targetSubjectId) => {
  if (!itemSubject || !targetSubjectId) return false;
  const s1 = toSlug(itemSubject);
  const s2 = toSlug(targetSubjectId);
  if (s1 === s2) return true;

  const aliases = {
    oop: ['oop', 'oops', 'object-oriented-programming', 'java-oop', 'programming', 'java'],
    programming: ['programming', 'oop', 'oops', 'object-oriented-programming', 'java-oop', 'java'],
    dsa: ['dsa', 'data-structures', 'algorithms', 'data-structures-algorithms'],
    dbms: ['dbms', 'database-management-systems', 'database'],
    sql: ['sql', 'rdbms', 'postgresql', 'mysql'],
    os: ['os', 'operating-systems', 'operating-system'],
    'operating-systems': ['operating-systems', 'os', 'operating-system'],
    networks: ['networks', 'computer-networks', 'cn', 'networking'],
    networking: ['networking', 'networks', 'computer-networks', 'cn'],
    webdev: ['webdev', 'web-development', 'web', 'frontend', 'backend', 'api'],
    'web-development': ['web-development', 'webdev', 'web', 'frontend', 'backend', 'api'],
    linux: ['linux', 'shell', 'bash', 'unix'],
    aws: ['aws', 'cloud', 'amazon-web-services'],
    devops: ['devops', 'cicd', 'ci-cd'],
    docker: ['docker', 'containers', 'containerization'],
    kubernetes: ['kubernetes', 'k8s', 'orchestration'],
    terraform: ['terraform', 'iac', 'infrastructure-as-code'],
    devsecops: ['devsecops', 'monitoring', 'observability', 'security'],
    'system-design': ['system-design', 'systemdesign', 'distributed-systems', 'architecture']
  };

  const list = aliases[s2] || [s2];
  return list.includes(s1) || list.some(alias => s1.includes(alias));
};

/**
 * Index all markdown files into structured topics
 */
export const loadAllMarkdownTopics = () => {
  const topics = [];

  for (const [filePath, rawContent] of Object.entries(rawMarkdownModules)) {
    try {
      const { metadata, content } = parseFrontmatter(rawContent);

      // Infer subject from folder structure: e.g. "/src/content/programming/polymorphism.md"
      const pathParts = filePath.split('/');
      const fileNameWithExt = pathParts[pathParts.length - 1];
      const fileName = fileNameWithExt.replace(/\.md$/i, '');
      const folderSubject = pathParts.length >= 4 ? pathParts[pathParts.length - 2] : 'general';

      const inferredTitle = fileName
        .split(/[-_]+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');

      let normalizedSubject = toSlug(metadata.subject || folderSubject);
      if (normalizedSubject === 'programming' || normalizedSubject === 'java') normalizedSubject = 'oop';
      else if (normalizedSubject === 'networking') normalizedSubject = 'networks';
      else if (normalizedSubject === 'operating-systems') normalizedSubject = 'os';
      else if (normalizedSubject === 'web-development') normalizedSubject = 'webdev';

      const subjectId = normalizedSubject;
      const title = metadata.title || inferredTitle;
      const slug = toSlug(fileName);
      const id = `${subjectId}_${slug}`;

      // Extract headings for table of contents
      const headings = extractHeadings(content);

      topics.push({
        id,
        title,
        slug,
        subjectId,
        subject: metadata.subject || folderSubject.toUpperCase(),
        category: metadata.category || metadata.subject || folderSubject,
        path: filePath,
        markdown: content,
        rawContent,
        difficulty: (metadata.difficulty || 'medium').toLowerCase(),
        importance: (metadata.importance || 'medium').toLowerCase(),
        tags: Array.isArray(metadata.tags)
          ? metadata.tags
          : (metadata.tags ? [metadata.tags] : [subjectId]),
        headings
      });
    } catch (err) {
      console.error(`Error parsing markdown file at ${filePath}:`, err);
    }
  }

  return topics;
};

// Pre-computed topics list
export const allMarkdownTopics = loadAllMarkdownTopics();

/**
 * Returns structured content for a specific subject
 * @param {string} subjectIdOrSlug
 */
export const getSubjectContent = (subjectIdOrSlug) => {
  const cleanId = toSlug(subjectIdOrSlug);
  const subjectMeta = CURRICULUM_SUBJECTS.find(s => s.slug === cleanId || matchesSubject(s.slug, cleanId)) || {
    id: cleanId,
    slug: cleanId,
    title: cleanId.toUpperCase(),
    shortTitle: cleanId.toUpperCase(),
    category: 'General',
    icon: 'BookOpen',
    color: '#8b5cf6',
    description: `Interview preparation materials for ${cleanId.toUpperCase()}`
  };

  const topics = allMarkdownTopics.filter(t => matchesSubject(t.subjectId, subjectMeta.slug) || matchesSubject(t.subject, subjectMeta.slug));
  const questions = interviewQuestionsData.filter(q => matchesSubject(q.subject, subjectMeta.slug));
  const mcqs = mcqsData.filter(m => matchesSubject(m.subject, subjectMeta.slug));
  const flashcards = flashcardsData.filter(f => matchesSubject(f.subject, subjectMeta.slug));
  const coding = codingProblemsData.filter(c => matchesSubject(c.subject, subjectMeta.slug));
  const sql = sqlProblemsData.filter(() => subjectMeta.slug === 'sql');

  return {
    ...subjectMeta,
    studyMaterial: topics,
    topics,
    interviewQuestions: questions,
    mcqs,
    flashcards,
    codingProblems: coding,
    sqlProblems: sql,
    counts: {
      topics: topics.length,
      questions: questions.length,
      mcqs: mcqs.length,
      flashcards: flashcards.length,
      coding: coding.length,
      sql: sql.length,
      total: topics.length + questions.length + mcqs.length + flashcards.length
    }
  };
};

/**
 * Retrieves registry object mapping each curriculum subject
 */
export const contentRegistry = CURRICULUM_SUBJECTS.reduce((acc, subj) => {
  acc[subj.slug] = getSubjectContent(subj.slug);
  return acc;
}, {});

/**
 * Returns list of all subjects with real content counts
 */
export const getAllSubjects = () => {
  return CURRICULUM_SUBJECTS.map(s => getSubjectContent(s.slug));
};

/**
 * Retrieves a topic by ID or slug
 */
export const getTopicById = (idOrSlug) => {
  if (!idOrSlug) return null;
  const clean = toSlug(idOrSlug);
  return (
    allMarkdownTopics.find(t => t.id === idOrSlug || t.slug === idOrSlug || t.id.toLowerCase() === clean) ||
    allMarkdownTopics.find(t => t.slug.toLowerCase().includes(clean) || clean.includes(t.slug.toLowerCase())) ||
    null
  );
};

/**
 * Returns previous and next topic for seamless curriculum navigation
 */
export const getNextPreviousTopic = (topicId) => {
  const current = getTopicById(topicId);
  if (!current) return { prev: null, next: null };

  const subjectTopics = allMarkdownTopics.filter(t => matchesSubject(t.subjectId, current.subjectId));
  const currentIndex = subjectTopics.findIndex(t => t.id === current.id);

  return {
    prev: currentIndex > 0 ? subjectTopics[currentIndex - 1] : null,
    next: currentIndex < subjectTopics.length - 1 ? subjectTopics[currentIndex + 1] : null
  };
};

/**
 * Load raw markdown on demand (compatibility function)
 */
export async function loadMarkdown(path) {
  if (rawMarkdownModules[path]) {
    return rawMarkdownModules[path];
  }
  return '';
}
