import { useState } from 'react';
import { Link } from 'react-router-dom';
import { interviewQuestions, interviewSteps, latencyNumbers, powersOfTwo } from '../data/topics';
import LatencyChart from '../components/LatencyChart';

export default function InterviewPrep() {
  const [expandedStep, setExpandedStep] = useState(0);
  const [selectedTimeline, setSelectedTimeline] = useState('medium');

  return (
    <div className="page-container">
      <div className="topic-header">
        <div className="topic-breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">›</span>
          <span>Interview Prep</span>
        </div>
        <h1 className="topic-title">
          <span className="topic-icon">🎯</span>
          System Design Interview Prep
        </h1>
        <div className="topic-meta">
          <span className="topic-tag">Interview</span>
        </div>
      </div>

      <div className="content-block">
        <p>
          The system design interview is an <strong>open-ended conversation</strong>. You are expected to lead it.
          Use the following steps to guide the discussion. Practice with the interview questions below.
        </p>
      </div>

      {/* Study Guide */}
      <div className="section-header">
        <h2>📋 Study Guide</h2>
        <p>Adjust based on your timeline, experience, and target companies.</p>
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

      <div className="callout info">
        <strong>{selectedTimeline === 'short' ? 'Short' : selectedTimeline === 'medium' ? 'Medium' : 'Long'} timeline:</strong>{' '}
        {selectedTimeline === 'short'
          ? 'Aim for breadth with system design topics. Practice by solving some interview questions.'
          : selectedTimeline === 'medium'
          ? 'Aim for breadth and some depth with system design topics. Practice by solving many interview questions.'
          : 'Aim for breadth and more depth with system design topics. Practice by solving most interview questions.'}
      </div>

      {/* How to Approach */}
      <div className="section-header">
        <h2>🧭 How to Approach a System Design Question</h2>
        <p>Follow these steps to structure your answer.</p>
      </div>

      <div className="interview-steps">
        {interviewSteps.map((step, i) => (
          <div key={i} className="interview-step">
            <button className="step-header" onClick={() => setExpandedStep(expandedStep === i ? -1 : i)} aria-expanded={expandedStep === i} aria-controls={`step-content-${i}`}>
              <div className="step-number">{step.step}</div>
              <div className="step-title">{step.title}</div>
              <div className={`step-toggle ${expandedStep === i ? 'open' : ''}`}>▼</div>
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

      {/* Back of the Envelope */}
      <div className="section-header">
        <h2>🧮 Back-of-the-Envelope Calculations</h2>
        <p>You might be asked to estimate by hand. Here are useful references.</p>
      </div>

      <LatencyChart data={latencyNumbers} />

      <div style={{ marginTop: '2rem' }}>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 650, marginBottom: '1rem' }}>Powers of Two</h3>
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
      </div>

      {/* Interview Questions */}
      <div className="section-header">
        <h2>💡 Practice Questions</h2>
        <p>Common system design interview questions with sample solutions.</p>
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
    </div>
  );
}
