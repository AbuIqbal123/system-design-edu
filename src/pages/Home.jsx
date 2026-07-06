import { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories, topics, interviewQuestions, interviewSteps, quizCards, latencyNumbers, powersOfTwo } from '../data/topics';
import QuizCard from '../components/QuizCard';
import LatencyChart from '../components/LatencyChart';
import Icon from '../components/Icon';

export default function Home() {
  const [selectedTimeline, setSelectedTimeline] = useState('medium');
  const [expandedStep, setExpandedStep] = useState(0);

  const topicsByCategory = categories.map(cat => ({
    ...cat,
    count: topics.filter(t => t.category === cat.id).length
  }));

  return (
    <div className="page-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge"><Icon name="rocket" size={16} /> Open Source Learning Platform</div>
          <h1>
            The <span className="gradient-text">System Design</span> Primer
          </h1>
          <p>
            Learn how to design large-scale systems. Prep for the system design interview.
            An organized collection of resources to help you build systems at scale.
          </p>
          <div className="hero-actions">
            <Link to={`/topic/${topics[0]?.id || 'performance-vs-scalability'}`} className="btn btn-primary">
              Start Learning →
            </Link>
            <Link to="/interview" className="btn btn-secondary">
              Interview Prep
            </Link>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="stat-value">{topics.length}</div>
              <div className="stat-label">Topics</div>
            </div>
            <div className="hero-stat">
              <div className="stat-value">{interviewQuestions.length}</div>
              <div className="stat-label">Interview Questions</div>
            </div>
            <div className="hero-stat">
              <div className="stat-value">{quizCards.length}</div>
              <div className="stat-label">Quiz Cards</div>
            </div>
            <div className="hero-stat">
              <div className="stat-value">∞</div>
              <div className="stat-label">Trade-offs</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <div className="section-header">
        <h2><Icon name="book-open" size={24} /> Explore Topics</h2>
        <p>Everything is a trade-off. Learn the fundamentals of system design.</p>
      </div>

      <div className="categories-grid">
        {topicsByCategory.map((cat, i) => (
          <Link
            to={cat.id === 'interview' ? '/interview' : `/topic/${topics.find(t => t.category === cat.id)?.id || ''}`}
            key={cat.id}
            className="category-card animate-in"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            <div className="card-icon">{cat.icon}</div>
            <h3>{cat.label}</h3>
            <p>{cat.description}</p>
            <div className="card-count">{cat.count} topics</div>
          </Link>
        ))}
      </div>

      {/* Study Guide */}
      <div className="section-header">
        <h2><Icon name="clipboard-list" size={24} /> Study Guide</h2>
        <p>Adjust your study plan based on your interview timeline.</p>
      </div>

      <div className="study-timeline-selector">
        {['short', 'medium', 'long'].map(t => (
          <button
            key={t}
            className={`timeline-btn ${selectedTimeline === t ? 'active' : ''}`}
            onClick={() => setSelectedTimeline(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)} Timeline
          </button>
        ))}
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Recommendation</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Read through system design topics for broad understanding</td>
              <td><Icon name="check-circle" size={16} /> Recommended</td>
            </tr>
            <tr>
              <td>Read company engineering blogs for your target companies</td>
              <td><Icon name="check-circle" size={16} /> Recommended</td>
            </tr>
            <tr>
              <td>Read through real world architectures</td>
              <td><Icon name="check-circle" size={16} /> Recommended</td>
            </tr>
            <tr>
              <td>Review how to approach system design questions</td>
              <td><Icon name="check-circle" size={16} /> Recommended</td>
            </tr>
            <tr>
              <td>Work through system design interview questions</td>
              <td>{selectedTimeline === 'short' ? <><Icon name="pen-line" size={16} /> Some</> : selectedTimeline === 'medium' ? <><Icon name="pen-line" size={16} /> Many</> : <><Icon name="pen-line" size={16} /> Most</>}</td>
            </tr>
            <tr>
              <td>Work through OO design interview questions</td>
              <td>{selectedTimeline === 'short' ? <><Icon name="pen-line" size={16} /> Some</> : selectedTimeline === 'medium' ? <><Icon name="pen-line" size={16} /> Many</> : <><Icon name="pen-line" size={16} /> Most</>}</td>
            </tr>
            <tr>
              <td>Review additional system design questions</td>
              <td>{selectedTimeline === 'short' ? <><Icon name="pen-line" size={16} /> Some</> : selectedTimeline === 'medium' ? <><Icon name="pen-line" size={16} /> Many</> : <><Icon name="pen-line" size={16} /> Most</>}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* How to Approach */}
      <div className="section-header">
        <h2><Icon name="target" size={24} /> How to Approach a System Design Interview</h2>
        <p>Use these steps to guide the discussion. The interview is an open-ended conversation — you are expected to lead it.</p>
      </div>

      <div className="interview-steps">
        {interviewSteps.map((step, i) => (
          <div key={i} className="interview-step">
            <button className="step-header" onClick={() => setExpandedStep(expandedStep === i ? -1 : i)} aria-expanded={expandedStep === i} aria-controls={`step-content-${i}`}>
              <div className="step-number">{step.step}</div>
              <div className="step-title">{step.title}</div>
              <div className={`step-toggle ${expandedStep === i ? 'open' : ''}`}><Icon name="chevron-down" size={14} /></div>
            </button>
            {expandedStep === i && (
              <div className="step-content" id={`step-content-${i}`}>
                <p>{step.description}</p>
                <ul>
                  {step.questions.map((q, j) => (
                    <li key={j}>{q}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Interview Questions */}
      <div className="section-header">
        <h2><Icon name="lightbulb" size={24} /> System Design Interview Questions</h2>
        <p>Common questions with sample discussions, code, and diagrams.</p>
      </div>

      <div className="interview-grid">
        {interviewQuestions.map((q, i) => (
          <div key={i} className="interview-card animate-in" style={{ animationDelay: `${i * 0.05}s` }}>
            <img src={q.image} alt={q.title} className="card-image" loading="lazy" />
            <div className="card-body">
              <div className="card-title">{q.title}</div>
              <span className={`difficulty-badge ${q.difficulty.toLowerCase()}`}>
                {q.difficulty}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Latency Numbers */}
      <div className="section-header">
        <h2><Icon name="zap" size={24} /> Latency Numbers Every Programmer Should Know</h2>
        <p>Understanding relative speeds helps you make informed design decisions.</p>
      </div>

      <LatencyChart data={latencyNumbers} />

      {/* Powers of Two */}
      <div className="section-header">
        <h2><Icon name="calculator" size={24} /> Powers of Two Table</h2>
        <p>Handy reference for back-of-the-envelope calculations.</p>
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Power</th>
              <th>Exact Value</th>
              <th>Approx Value</th>
              <th>Bytes</th>
            </tr>
          </thead>
          <tbody>
            {powersOfTwo.map((row, i) => (
              <tr key={i}>
                <td style={{ fontFamily: 'var(--font-mono)' }}>2<sup>{row.power}</sup></td>
                <td style={{ fontFamily: 'var(--font-mono)' }}>{row.exact}</td>
                <td>{row.approx || '—'}</td>
                <td>{row.bytes || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Quiz Cards */}
      <div className="section-header">
        <h2><Icon name="layout-grid" size={24} /> Test Your Knowledge</h2>
        <p>Click a card to reveal the answer. Great for spaced repetition.</p>
      </div>

      <div className="quiz-section">
        {quizCards.slice(0, 6).map((card, i) => (
          <QuizCard key={i} question={card.question} answer={card.answer} index={i} />
        ))}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <Link to="/quiz" className="btn btn-secondary">
            View All {quizCards.length} Quiz Cards →
          </Link>
        </div>
      </div>
    </div>
  );
}
