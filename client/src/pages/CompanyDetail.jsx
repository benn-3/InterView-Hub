import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Building2,
  ExternalLink,
  ChevronLeft,
  Briefcase,
  CheckCircle2,
  Circle,
  HelpCircle,
  Code2,
  Layers,
  Brain,
  MessageSquareCode,
  AlertCircle,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Share2,
  Clock,
  ShieldAlert
} from 'lucide-react';
import { getCompanyById, STANDARDIZED_ROLES } from '../data/companiesData';
import { getCompanyPrep, toggleCompanyChecklistItem, setCompanyTargetRole } from '../utils/storage';
import './CompanyDetail.css';

export default function CompanyDetail() {
  const { companyId } = useParams();
  const company = useMemo(() => getCompanyById(companyId), [companyId]);

  const [activeTab, setActiveTab] = useState('overview'); // 'overview' | 'rounds' | 'questions' | 'checklist'
  const [selectedRole, setSelectedRole] = useState(() => {
    if (!company) return 'swe';
    const prep = getCompanyPrep(company.id);
    return prep.targetRole || (company.rolesSupported[0] || 'swe');
  });

  const [expandedQuestion, setExpandedQuestion] = useState(null);
  const [checklistCompleted, setChecklistCompleted] = useState(() => {
    if (!company) return [];
    return getCompanyPrep(company.id).completedChecklist || [];
  });

  // Keep target role synced
  useEffect(() => {
    if (company) {
      setCompanyTargetRole(company.id, selectedRole);
    }
  }, [company, selectedRole]);

  if (!company) {
    return (
      <div className="company-not-found">
        <Building2 size={48} />
        <h2>Company not found</h2>
        <p>The company you are looking for does not exist in our directory.</p>
        <Link to="/companies" className="back-to-companies-btn">
          <ChevronLeft size={18} />
          <span>Back to All Companies</span>
        </Link>
      </div>
    );
  }

  const handleToggleChecklist = (itemId) => {
    const updated = toggleCompanyChecklistItem(company.id, itemId);
    setChecklistCompleted([...updated]);
  };

  const checklistTotal = company.checklist ? company.checklist.length : 0;
  const checklistDone = checklistCompleted.length;
  const readinessPercentage =
    checklistTotal > 0 ? Math.round((checklistDone / checklistTotal) * 100) : 0;

  // Filter questions for the selected role
  const roleQuestions = useMemo(() => {
    return company.questions.filter((q) => !q.roleId || q.roleId === selectedRole || selectedRole === 'all');
  }, [company, selectedRole]);

  return (
    <div className="company-detail-page">
      {/* Top Breadcrumb */}
      <div className="company-breadcrumb">
        <Link to="/companies" className="breadcrumb-back-link">
          <ChevronLeft size={16} />
          <span>All Companies</span>
        </Link>
        <span className="breadcrumb-separator">/</span>
        <span className="breadcrumb-current">{company.name}</span>
      </div>

      {/* Hero Banner */}
      <div className="company-header-card">
        <div className="company-header-main">
          <div
            className="company-header-avatar"
            style={{
              backgroundColor: `${company.color}20`,
              color: company.color,
              borderColor: `${company.color}40`,
            }}
          >
            <span>{company.logoText}</span>
          </div>

          <div className="company-header-info">
            <div className="company-badge-row">
              <span className="company-tier-tag">{company.tier}</span>
              <span className="company-hq-tag">{company.headquarters}</span>
            </div>
            <h1 className="company-detail-title">{company.name}</h1>
            <p className="company-industry-text">{company.industry}</p>
          </div>

          <div className="company-header-actions">
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="official-careers-btn"
              >
                <span>Official Careers</span>
                <ExternalLink size={14} />
              </a>
            )}
          </div>
        </div>

        {/* Readiness Meter */}
        <div className="company-readiness-banner">
          <div className="readiness-info">
            <span className="readiness-label">Preparation Readiness</span>
            <span className="readiness-score">
              {readinessPercentage}% ({checklistDone}/{checklistTotal} tasks completed)
            </span>
          </div>
          <div className="readiness-progress-track">
            <div
              className="readiness-progress-fill"
              style={{ width: `${readinessPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Target Role Selector Strip */}
      <div className="target-role-bar">
        <div className="role-bar-title">
          <Briefcase size={17} />
          <span>Select Your Target Role:</span>
        </div>
        <div className="role-pills-scroll">
          {STANDARDIZED_ROLES.map((role) => {
            const isSupported = company.rolesSupported.includes(role.id);
            const isSelected = selectedRole === role.id;
            return (
              <button
                key={role.id}
                className={`role-pill-btn ${isSelected ? 'selected' : ''} ${!isSupported ? 'secondary-role' : ''}`}
                onClick={() => setSelectedRole(role.id)}
              >
                <span>{role.name}</span>
                {isSelected && <CheckCircle2 size={14} />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="company-nav-tabs">
        <button
          className={`company-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Company Overview & Strategy
        </button>
        <button
          className={`company-tab ${activeTab === 'rounds' ? 'active' : ''}`}
          onClick={() => setActiveTab('rounds')}
        >
          Round-by-Round Breakdown ({company.rounds.length})
        </button>
        <button
          className={`company-tab ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          Question Bank ({roleQuestions.length})
        </button>
        <button
          className={`company-tab ${activeTab === 'checklist' ? 'active' : ''}`}
          onClick={() => setActiveTab('checklist')}
        >
          Preparation Checklist ({checklistDone}/{checklistTotal})
        </button>
      </div>

      {/* TAB CONTENT 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="tab-pane overview-pane">
          <div className="overview-grid">
            <div className="overview-main-col">
              <section className="overview-section">
                <h2 className="section-heading">About {company.name}</h2>
                <p className="overview-body-text">{company.description}</p>
                
                <div className="disclaimer-alert-box">
                  <AlertCircle size={18} className="alert-icon" />
                  <div>
                    <strong>Public Hiring Process Notice:</strong>
                    <p>
                      {company.hiringProcessNote} Hiring processes vary dynamically by team, seniority level, geographic location, and recruitment season. All questions below are curated practice materials.
                    </p>
                  </div>
                </div>
              </section>

              <section className="overview-section">
                <h2 className="section-heading">Primary Products & Ecosystem</h2>
                <div className="products-grid">
                  {company.products.map((p, idx) => (
                    <div key={idx} className="product-card-item">
                      <Sparkles size={16} className="product-icon" />
                      <span>{p}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section className="overview-section">
                <h2 className="section-heading">Preparation Strategy & Tips</h2>
                <ul className="prep-tips-list">
                  {company.preparationTips.map((tip, idx) => (
                    <li key={idx} className="prep-tip-item">
                      <CheckCircle2 size={16} className="tip-check" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* Quick Practice Sidebar */}
            <div className="overview-side-col">
              <div className="practice-tools-card">
                <h3 className="tools-title">Practice Tools</h3>
                <p className="tools-desc">Jump into focused practice for {company.name}:</p>
                
                <div className="tool-links-stack">
                  <Link to="/practice/mcqs" className="tool-link-item">
                    <Brain size={18} />
                    <div>
                      <strong>Technical MCQs</strong>
                      <span>Timed conceptual practice</span>
                    </div>
                  </Link>

                  <Link to="/flashcards" className="tool-link-item">
                    <Layers size={18} />
                    <div>
                      <strong>Concept Flashcards</strong>
                      <span>Spaced repetition memory review</span>
                    </div>
                  </Link>

                  <Link to="/coding" className="tool-link-item">
                    <Code2 size={18} />
                    <div>
                      <strong>DSA Playground</strong>
                      <span>Practice LeetCode style problems</span>
                    </div>
                  </Link>

                  <Link to="/mock-interview" className="tool-link-item">
                    <MessageSquareCode size={18} />
                    <div>
                      <strong>Mock Interview Mode</strong>
                      <span>Simulated technical interview</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT 2: ROUNDS */}
      {activeTab === 'rounds' && (
        <div className="tab-pane rounds-pane">
          <div className="rounds-timeline-header">
            <h2>Standard Interview Round Sequence</h2>
            <p>
              Expected progression for technical engineering roles at {company.name}.
            </p>
          </div>

          <div className="rounds-timeline">
            {company.rounds.map((rnd, idx) => (
              <div key={rnd.id} className="timeline-card">
                <div className="timeline-marker">
                  <span>{idx + 1}</span>
                </div>
                <div className="timeline-content">
                  <div className="timeline-card-header">
                    <div>
                      <h3 className="round-title">{rnd.title}</h3>
                      <span className="round-focus-badge">{rnd.focus}</span>
                    </div>
                    <span className="round-duration-tag">
                      <Clock size={14} />
                      <span>{rnd.duration}</span>
                    </span>
                  </div>
                  <p className="round-desc-text">{rnd.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB CONTENT 3: QUESTIONS */}
      {activeTab === 'questions' && (
        <div className="tab-pane questions-pane">
          <div className="questions-pane-header">
            <div>
              <h2>{company.name} Technical Question Bank</h2>
              <p>Practice model answers, architectural trade-offs, and follow-up prompts.</p>
            </div>
            <span className="question-count-badge">
              {roleQuestions.length} Questions Available
            </span>
          </div>

          <div className="questions-accordion-list">
            {roleQuestions.map((q) => {
              const isOpen = expandedQuestion === q.id;
              return (
                <div key={q.id} className={`question-accordion-card ${isOpen ? 'open' : ''}`}>
                  <button
                    className="question-card-header"
                    onClick={() => setExpandedQuestion(isOpen ? null : q.id)}
                  >
                    <div className="question-header-left">
                      <div className="question-tag-row">
                        <span className={`diff-pill ${q.difficulty}`}>{q.difficulty}</span>
                        <span className="topic-pill">{q.topic}</span>
                        <span className="round-pill">{q.round}</span>
                      </div>
                      <h3 className="question-text">{q.question}</h3>
                    </div>
                    <div className="accordion-arrow">
                      {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  {isOpen && (
                    <div className="question-card-body">
                      <div className="model-answer-section">
                        <h4>Model Answer & Technical Explanation:</h4>
                        <p className="answer-text">{q.answer}</p>
                      </div>

                      {q.followUp && (
                        <div className="follow-up-section">
                          <h4>
                            <HelpCircle size={15} />
                            <span>Interviewer Follow-Up Question:</span>
                          </h4>
                          <p className="follow-up-text">"{q.followUp}"</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB CONTENT 4: CHECKLIST */}
      {activeTab === 'checklist' && (
        <div className="tab-pane checklist-pane">
          <div className="checklist-pane-header">
            <div>
              <h2>Preparation Readiness Checklist</h2>
              <p>Track your personal study progress for {company.name}. Changes save automatically.</p>
            </div>
            <div className="checklist-stats">
              <span className="completed-counter">
                {checklistDone} of {checklistTotal} Completed
              </span>
            </div>
          </div>

          <div className="checklist-items-stack">
            {company.checklist && company.checklist.map((item) => {
              const isChecked = checklistCompleted.includes(item.id);
              return (
                <div
                  key={item.id}
                  className={`checklist-item-row ${isChecked ? 'completed' : ''}`}
                  onClick={() => handleToggleChecklist(item.id)}
                >
                  <button className="checkbox-toggle-btn" aria-label="Toggle task">
                    {isChecked ? (
                      <CheckCircle2 size={22} className="check-icon-active" />
                    ) : (
                      <Circle size={22} className="check-icon-inactive" />
                    )}
                  </button>
                  <div className="checklist-item-content">
                    <span className="checklist-item-title">{item.title}</span>
                    <span className="checklist-category-badge">{item.category}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
