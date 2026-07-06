import { useState } from 'react';

export default function QuizCard({ question, answer, index }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="quiz-card-container"
      role="button"
      tabIndex={0}
      aria-label={`Quiz card ${index + 1}: ${question}. Press Enter to reveal answer.`}
      onClick={() => setFlipped((prev) => !prev)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          setFlipped((prev) => !prev);
        }
      }}
    >
      <div className={`quiz-card${flipped ? ' flipped' : ''}`}>
        <div className="quiz-card-face quiz-card-front">
          <span className="quiz-label">Question {index + 1}</span>
          <p className="quiz-question">{question}</p>
          <span className="quiz-hint">Click to reveal answer</span>
        </div>

        <div className="quiz-card-face quiz-card-back">
          <span className="quiz-label">Answer</span>
          <p className="quiz-answer">{answer}</p>
          <span className="quiz-hint">Click to see question</span>
        </div>
      </div>
    </div>
  );
}
