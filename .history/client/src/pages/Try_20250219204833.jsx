import React, { useState } from "react";

const quizData = [
  {
    question: "What does GIS stand for?",
    options: ["Geospatial Information System", "Global Internet System", "Geographic Information System", "General Imaging Software"],
    correct: "Geographic Information System",
  },
  {
    question: "Which tool is commonly used for spatial analysis?",
    options: ["Photoshop", "QGIS", "Excel", "Illustrator"],
    correct: "QGIS",
  },
  {
    question: "Remote sensing primarily involves the use of?",
    options: ["Cameras", "Satellites", "Telescopes", "Radios"],
    correct: "Satellites",
  },
];

const Quiz = () => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Handle option selection
  const handleSelect = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  // Calculate and submit score
  const handleSubmit = () => {
    let newScore = 0;
    quizData.forEach((q, index) => {
      if (answers[index] === q.correct) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">Geospatial Quiz</h2>

      {quizData.map((q, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-lg font-semibold">{q.question}</h3>
          <div className="mt-2 space-y-2">
            {q.options.map((option) => (
              <button
                key={option}
                className={`block w-full text-left p-2 rounded-md border ${
                  submitted
                    ? option === q.correct
                      ? "bg-green-500 text-white"
                      : answers[index] === option
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                    : "hover:bg-blue-200"
                }`}
                onClick={() => handleSelect(index, option)}
                disabled={submitted}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white font-bold py-2 mt-4 rounded-md hover:bg-blue-700"
        >
          Submit Quiz
        </button>
      ) : (
        <p className="text-center mt-4 font-bold text-lg">
          Your Score: {score} / {quizData.length}
        </p>
      )}
    </div>
  );
};

export default Quiz;
