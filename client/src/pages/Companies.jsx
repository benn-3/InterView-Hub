import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Building2,
  Search,
  Filter,
  ArrowRight,
  ExternalLink,
  Briefcase,
  Layers,
  CheckCircle2,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { companiesData, COMPANY_CATEGORIES, STANDARDIZED_ROLES } from '../data/companiesData';
import { getCompanyPrep } from '../utils/storage';
import './Companies.css';

export default function Companies() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTier, setSelectedTier] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');

  const filteredCompanies = useMemo(() => {
    return companiesData.filter((company) => {
      // Search filter
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        company.name.toLowerCase().includes(term) ||
        company.description.toLowerCase().includes(term) ||
        company.industry.toLowerCase().includes(term) ||
        company.products.some((p) => p.toLowerCase().includes(term));

      // Tier filter
      const matchesTier = selectedTier === 'all' || company.tierId === selectedTier;

      // Role filter
      const matchesRole = selectedRole === 'all' || company.rolesSupported.includes(selectedRole);

      return matchesSearch && matchesTier && matchesRole;
    });
  }, [searchTerm, selectedTier, selectedRole]);

  return (
    <div className="companies-page">
      {/* Hero Header */}
      <div className="companies-hero">
        <div className="companies-hero-tag">
          <Building2 size={16} />
          <span>Curated Company Question Banks</span>
        </div>
        <h1 className="companies-hero-title">
          Company-Wise <span className="gradient-text">Interview Preparation</span>
        </h1>
        <p className="companies-hero-subtitle">
          Master real interview workflows, round-by-round sequences, role-specific question banks,
          and interactive preparation checklists across 35+ top technology companies.
        </p>

        {/* Metric Badges */}
        <div className="companies-metric-strip">
          <div className="metric-pill">
            <span className="metric-num">35+</span>
            <span className="metric-label">Target Companies</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num">5</span>
            <span className="metric-label">Industry Tiers</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num">12</span>
            <span className="metric-label">Engineering Roles</span>
          </div>
          <div className="metric-pill">
            <span className="metric-num">100%</span>
            <span className="metric-label">Free & Unlocked</span>
          </div>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="companies-toolbar">
        {/* Search */}
        <div className="companies-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search by company, product (e.g. AWS, Spark), or industry..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm('')}>
              ✕
            </button>
          )}
        </div>

        {/* Role Selector */}
        <div className="companies-role-filter">
          <Briefcase size={16} className="filter-icon" />
          <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="all">All Engineering Roles</option>
            {STANDARDIZED_ROLES.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tier Category Tabs */}
      <div className="companies-tier-tabs">
        <button
          className={`tier-tab-btn ${selectedTier === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedTier('all')}
        >
          All Companies ({companiesData.length})
        </button>
        {COMPANY_CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={`tier-tab-btn ${selectedTier === cat.id ? 'active' : ''}`}
            onClick={() => setSelectedTier(cat.id)}
          >
            {cat.name} ({cat.count})
          </button>
        ))}
      </div>

      {/* Company Cards Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="companies-grid">
          {filteredCompanies.map((company) => {
            const prep = getCompanyPrep(company.id);
            const checklistCount = company.checklist ? company.checklist.length : 0;
            const completedCount = prep.completedChecklist ? prep.completedChecklist.length : 0;
            const progressPct =
              checklistCount > 0 ? Math.round((completedCount / checklistCount) * 100) : 0;

            return (
              <div key={company.id} className="company-card">
                <div className="company-card-header">
                  <div
                    className="company-logo-avatar"
                    style={{ backgroundColor: `${company.color}20`, color: company.color, borderColor: `${company.color}40` }}
                  >
                    <span>{company.logoText}</span>
                  </div>
                  <div className="company-meta">
                    <span className="company-tier-badge">{company.tier}</span>
                    <h3 className="company-name">{company.name}</h3>
                  </div>
                </div>

                <p className="company-desc">{company.description}</p>

                {/* Key Products */}
                <div className="company-products-list">
                  {company.products.slice(0, 4).map((p, idx) => (
                    <span key={idx} className="product-tag">
                      {p}
                    </span>
                  ))}
                  {company.products.length > 4 && (
                    <span className="product-tag more">+{company.products.length - 4}</span>
                  )}
                </div>

                {/* Stats row */}
                <div className="company-stats-row">
                  <div className="company-stat-item">
                    <span className="stat-val">{company.rounds.length}</span>
                    <span className="stat-label">Interview Rounds</span>
                  </div>
                  <div className="company-stat-item">
                    <span className="stat-val">{company.questions.length}</span>
                    <span className="stat-label">Model Q&As</span>
                  </div>
                  <div className="company-stat-item">
                    <span className="stat-val">{progressPct}%</span>
                    <span className="stat-label">Readiness</span>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="company-card-footer">
                  <Link to={`/companies/${company.id}`} className="company-enter-btn">
                    <span>View Preparation Kit</span>
                    <ChevronRight size={17} />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="companies-empty-state">
          <Building2 size={48} className="empty-icon" />
          <h3>No companies match your criteria</h3>
          <p>Try searching for a different company name, technology, or clear your filters.</p>
          <button
            className="reset-filters-btn"
            onClick={() => {
              setSearchTerm('');
              setSelectedTier('all');
              setSelectedRole('all');
            }}
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
}
