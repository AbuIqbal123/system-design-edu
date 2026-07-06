import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { topics, categories } from './data/topics';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ReadingProgress from './components/ReadingProgress';
import Home from './pages/Home';
import TopicPage from './pages/TopicPage';
import InterviewPrep from './pages/InterviewPrep';
import QuizPage from './pages/QuizPage';

function useCompletedTopics() {
  const [completed, setCompleted] = useState(() => {
    try {
      const saved = localStorage.getItem('completed-topics');
      return new Set(saved ? JSON.parse(saved) : []);
    } catch {
      return new Set();
    }
  });

  useEffect(() => {
    localStorage.setItem('completed-topics', JSON.stringify([...completed]));
  }, [completed]);

  const toggle = (topicId) => {
    setCompleted((prev) => {
      const next = new Set(prev);
      if (next.has(topicId)) next.delete(topicId);
      else next.add(topicId);
      return next;
    });
  };

  return [completed, toggle];
}

export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedTopics, toggleComplete] = useCompletedTopics();

  return (
    <BrowserRouter>
      <div className="app-layout">
        <Sidebar
          topics={topics}
          categories={categories}
          completedTopics={completedTopics}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />
        <Header
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
          topics={topics}
          completedTopics={completedTopics.size}
          totalTopics={topics.length}
        />
        <ReadingProgress sidebarOpen={sidebarOpen} />
        <main className={`main-content${sidebarOpen ? '' : ' sidebar-collapsed'}`}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topic/:topicId" element={<TopicPage completedTopics={completedTopics} onToggleComplete={toggleComplete} />} />
            <Route path="/interview" element={<InterviewPrep />} />
            <Route path="/quiz" element={<QuizPage />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
