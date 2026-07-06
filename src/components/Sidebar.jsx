import { Link, useLocation } from 'react-router-dom';
import Icon from './Icon';

export default function Sidebar({ topics = [], categories = [], completedTopics = new Set(), isOpen, onClose }) {
  const location = useLocation();

  const topicsByCategory = categories.map((cat) => ({
    ...cat,
    topics: topics.filter((t) => t.category === cat.id),
  }));

  return (
    <>
      {isOpen && <div className="mobile-overlay" onClick={onClose} />}

      <aside className={`sidebar${isOpen ? '' : ' collapsed'}${isOpen ? ' mobile-open' : ''}`}>
        <div className="sidebar-header">
          <Link to="/" className="sidebar-logo">
            <span className="logo-icon"><Icon name="building" size={18} /></span>
            <span className="logo-text">
              System Design <span>Primer</span>
            </span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          {topicsByCategory.map((cat) => (
            <div key={cat.id} className="sidebar-category">
              <div className="sidebar-category-header">
                <Icon name={cat.icon} size={14} /> {cat.label}
              </div>

              {cat.topics.map((topic) => {
                const isActive = location.pathname === `/topic/${topic.id}`;
                const isCompleted = completedTopics.has(topic.id);

                return (
                  <Link
                    key={topic.id}
                    to={`/topic/${topic.id}`}
                    className={`sidebar-link${isActive ? ' active' : ''}${isCompleted ? ' completed' : ''}`}
                  >
                    <span className="link-icon"><Icon name={topic.icon} size={16} /></span>
                    <span>{topic.title}</span>
                    {isCompleted && <span className="link-check"><Icon name="check-circle" size={14} /></span>}
                  </Link>
                );
              })}
            </div>
          ))}

          <div className="sidebar-category">
            <Link
              to="/interview"
              className={`sidebar-link${location.pathname === '/interview' ? ' active' : ''}`}
            >
              <span className="link-icon"><Icon name="target" size={16} /></span>
              <span>Interview Prep</span>
            </Link>
            <Link
              to="/quiz"
              className={`sidebar-link${location.pathname === '/quiz' ? ' active' : ''}`}
            >
              <span className="link-icon"><Icon name="pen-line" size={16} /></span>
              <span>Quiz</span>
            </Link>
          </div>
        </nav>

        <div className="sidebar-footer">
          <a
            href="https://github.com/donnemartin/system-design-primer"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon name="star" size={14} /> GitHub Source
          </a>
        </div>
      </aside>
    </>
  );
}
