import { Link } from 'react-router-dom';
import { quizCards } from '../data/topics';
import QuizCard from '../components/QuizCard';

export default function QuizPage() {
  return (
    <div className="page-container">
      <div className="topic-header">
        <div className="topic-breadcrumb">
          <Link to="/">Home</Link>
          <span className="separator">›</span>
          <span>Quiz</span>
        </div>
        <h1 className="topic-title">
          <span className="topic-icon">📝</span>
          Quiz Cards
        </h1>
        <div className="topic-meta">
          <span className="topic-tag">{quizCards.length} cards</span>
        </div>
      </div>

      <div className="content-block">
        <p>Click a card to reveal the answer. Great for spaced repetition and self-testing.</p>
      </div>

      <div className="quiz-section">
        {quizCards.map((card, i) => (
          <QuizCard key={i} question={card.question} answer={card.answer} index={i} />
        ))}
      </div>
    </div>
  );
}
