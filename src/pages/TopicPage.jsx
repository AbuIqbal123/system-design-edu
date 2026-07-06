import { useParams, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { topics, categories } from '../data/topics';
import ContentRenderer from '../components/ContentRenderer';
import Icon from '../components/Icon';

export default function TopicPage({ completedTopics, onToggleComplete }) {
  const { topicId } = useParams();
  const topic = topics.find(t => t.id === topicId);
  const topicIndex = topics.findIndex(t => t.id === topicId);
  const prevTopic = topicIndex > 0 ? topics[topicIndex - 1] : null;
  const nextTopic = topicIndex < topics.length - 1 ? topics[topicIndex + 1] : null;
  const category = categories.find(c => c.id === topic?.category);
  const isCompleted = completedTopics.has(topicId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topicId]);

  if (!topic) {
    return (
      <div className="page-container">
        <div className="not-found">
          <h1>404</h1>
          <p>Topic not found</p>
          <Link to="/" className="btn btn-primary" style={{ marginTop: '1.5rem' }}>
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-container">
      {/* Header */}
      <div className="topic-header">
        <div className="topic-breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">›</span>
          {category && <span>{category.icon} {category.label}</span>}
          <span className="separator">›</span>
          <span>{topic.title}</span>
        </div>

        <h1 className="topic-title">
          <span className="topic-icon"><Icon name={topic.icon} size={32} /></span>
          {topic.title}
        </h1>

        <div className="topic-meta">
          <span className="topic-tag">{category?.label}</span>
          <button
            className={`completion-toggle ${isCompleted ? 'completed' : ''}`}
            onClick={() => onToggleComplete(topicId)}
          >
            {isCompleted ? <><Icon name="check-circle" size={16} /> Completed</> : <><Icon name="circle" size={16} /> Mark as completed</>}
          </button>
        </div>
      </div>

      {/* Content */}
      <ContentRenderer content={topic.content} />

      {/* Subtopics */}
      {topic.subtopics && topic.subtopics.map((sub, i) => (
        <div key={i}>
          <div className="content-block">
            <h2 id={sub.id}>{sub.title}</h2>
          </div>
          <ContentRenderer content={sub.content} />
        </div>
      ))}

      {/* Sources */}
      {topic.sources && topic.sources.length > 0 && (
        <div className="sources-section">
          <h4><Icon name="file-text" size={16} /> Source(s) and further reading</h4>
          <ul>
            {topic.sources.map((s, i) => (
              <li key={i}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Prev / Next Navigation */}
      <div className="topic-nav">
        {prevTopic ? (
          <Link to={`/topic/${prevTopic.id}`} className="topic-nav-link prev">
            <div className="nav-label">← Previous</div>
            <div className="nav-title">{prevTopic.icon} {prevTopic.title}</div>
          </Link>
        ) : <div />}
        {nextTopic ? (
          <Link to={`/topic/${nextTopic.id}`} className="topic-nav-link next">
            <div className="nav-label">Next →</div>
            <div className="nav-title">{nextTopic.icon} {nextTopic.title}</div>
          </Link>
        ) : <div />}
      </div>
    </div>
  );
}
