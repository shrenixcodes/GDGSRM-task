
import React, { useState } from 'react';
import quizData from './QuizData';
import './index.css';

function App() {
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const currentQuestion = quizData[currentQ];

  const handleOptionClick = (option) => {
    setSelected(option);
  };

  const handleNext = () => {
    if (!selected) return;

    const correct = selected === currentQuestion.answer;
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) setScore(score + 1);

    setTimeout(() => {
      setShowFeedback(false);
      setSelected('');
      if (currentQ + 1 < quizData.length) {
        setCurrentQ(currentQ + 1);
      } else {
        setShowResults(true);
      }
    }, 1000);
  };

  const restartQuiz = () => {
    setCurrentQ(0);
    setScore(0);
    setSelected('');
    setShowResults(false);
  };

  return (
    <div className="quiz-container">
      <h1>🌸 Pink Quiz World</h1>

      {!showResults ? (
        <>
          <div className="question-box">
            <h2>Question {currentQ + 1} of {quizData.length}</h2>
            <p>{currentQuestion.question}</p>

            <div className="options">
              {currentQuestion.options.map(option => (
                <button
                  key={option}
                  className={`option-btn ${selected === option ? 'selected' : ''}`}
                  onClick={() => handleOptionClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>

            {showFeedback && (
              <p className={`feedback ${isCorrect ? 'correct' : 'wrong'}`}>
                {isCorrect ? '✅ Correct!' : '❌ Wrong!'}
              </p>
            )}

            <button className="next-btn" onClick={handleNext}>Next</button>
          </div>
        </>
      ) : (
        <div className="results">
          <h2>Quiz Completed!</h2>
          <p>You scored {score} out of {quizData.length}</p>
          <button className="restart-btn" onClick={restartQuiz}>Restart Quiz</button>
        </div>
      )}
    </div>
  );
}

export default App;
