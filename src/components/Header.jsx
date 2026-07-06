import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from './Icon';

export default function Header({ sidebarOpen, onToggleSidebar, topics = [], completedTopics = 0, totalTopics = 0 }) {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  const filteredTopics = query.trim()
    ? topics.filter((t) =>
        t.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const progressPercent = totalTopics > 0 ? Math.round((completedTopics / totalTopics) * 100) : 0;
  const circumference = 2 * Math.PI * 18;
  const strokeOffset = circumference - (progressPercent / 100) * circumference;

  useEffect(() => {
    function handleClickOutside(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowResults(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    setActiveIndex(-1);
  }, [query]);

  function handleResultClick(topicId) {
    setQuery('');
    setShowResults(false);
    navigate(`/topic/${topicId}`);
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
    setShowResults(e.target.value.trim().length > 0);
  }

  return (
    <header className={`header${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
      <div className="header-left">
        <button className="menu-toggle" onClick={onToggleSidebar} aria-label="Toggle sidebar">
          <Icon name="menu" size={18} />
        </button>

        <div className="search-bar" ref={searchRef}>
          <span className="search-icon"><Icon name="search" size={14} /></span>
          <input
            type="text"
            placeholder="Search topics..."
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.trim() && setShowResults(true)}
            aria-label="Search topics"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActiveIndex((prev) =>
                  prev >= filteredTopics.length - 1 ? 0 : prev + 1
                );
              } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActiveIndex((prev) =>
                  prev <= 0 ? filteredTopics.length - 1 : prev - 1
                );
              } else if (e.key === 'Enter') {
                if (activeIndex >= 0) {
                  handleResultClick(filteredTopics[activeIndex].id);
                }
              } else if (e.key === 'Escape') {
                setShowResults(false);
                setActiveIndex(-1);
              }
            }}
          />

          {showResults && filteredTopics.length > 0 && (
            <div className="search-results" role="listbox">
              {filteredTopics.map((topic, index) => (
                <button
                  key={topic.id}
                  className="search-result-item"
                  onClick={() => handleResultClick(topic.id)}
                  role="option"
                  aria-selected={index === activeIndex}
                >
                  <span className="result-icon">{topic.icon}</span>
                  <span className="result-title">{topic.title}</span>
                  <span className="result-category">{topic.category}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="header-right">
        <div className="progress-badge">
          <svg className="progress-ring" width="44" height="44" viewBox="0 0 44 44">
            <circle
              className="ring-bg"
              cx="22"
              cy="22"
              r="18"
              fill="none"
              strokeWidth="3"
            />
            <circle
              className="ring-fill"
              cx="22"
              cy="22"
              r="18"
              fill="none"
              strokeWidth="3"
              strokeDasharray={circumference}
              strokeDashoffset={strokeOffset}
              strokeLinecap="round"
              transform="rotate(-90 22 22)"
            />
          </svg>
          <span>{progressPercent}%</span>
        </div>
      </div>
    </header>
  );
}
