import React, { useState } from "react";
import Navbar from "../components/Navbar";

const quizLevels = {
  beginner: [
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
  ],
  intermediate: [
    {
      question: "Which type of data is used in GIS?",
      options: ["Raster & Vector", "Audio & Video", "Text & Numbers", "All of the above"],
      correct: "Raster & Vector",
    },
    {
      question: "What is remote sensing used for?",
      options: ["Mapping", "Weather forecasting", "Disaster management", "All of the above"],
      correct: "All of the above",
    },
  ],
  advanced: [
    {
      question: "Which satellite imagery has the highest resolution?",
      options: ["Landsat", "Sentinel-2", "WorldView-4", "MODIS"],
      correct: "WorldView-4",
    },
    {
      question: "What is LiDAR mainly used for?",
      options: ["Underwater mapping", "Terrain elevation mapping", "Weather monitoring", "GPS tracking"],
      correct: "Terrain elevation mapping",
    },
  ],
};

const Quiz = () => {
  const [level, setLevel] = useState("beginner");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const questions = quizLevels[level];

  // Handle option selection
  const handleSelect = (questionIndex, option) => {
    setAnswers({ ...answers, [questionIndex]: option });
  };

  // Calculate and submit score
  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach((q, index) => {
      if (answers[index] === q.correct) {
        newScore += 1;
      }
    });
    setScore(newScore);
    setSubmitted(true);
  };

  return (
    <>
    <Navbar/>
    <div className="flex flex-col md:flex-row h-screen">
      {/* Sidebar Toggle Button (Only visible on small screens) */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden p-3 bg-blue-600 text-white font-bold w-full"
      >
        {isSidebarOpen ? "Close Levels" : "Select Level"}
      </button>

      {/* Sidebar for selecting level */}
      <div className={`w-full md:w-1/4 bg-gray-800 text-white p-6 absolute md:relative transition-all duration-300 ${isSidebarOpen ? "left-0" : "-left-full"} md:left-0 md:block`}>
        <h2 className="text-xl font-bold mb-4">Select Level</h2>
        {Object.keys(quizLevels).map((lvl) => (
          <button
            key={lvl}
            onClick={() => {
              setLevel(lvl);
              setAnswers({});
              setSubmitted(false);
              setScore(0);
              setIsSidebarOpen(false);
            }}
            className={`w-full p-3 mb-2 text-left rounded-md text-lg ${level === lvl ? "bg-blue-500" : "hover:bg-gray-600"
              }`}
          >
            {lvl.charAt(0).toUpperCase() + lvl.slice(1)}
          </button>
        ))}
      </div>

      {/* Quiz Section */}
      <div className="w-full md:w-3/4 p-6">
        <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">
          {level.charAt(0).toUpperCase() + level.slice(1)} Quiz
        </h2>

        {questions.map((q, index) => (
          <div key={index} className="mb-6">
            <h3 className="text-lg font-semibold">{q.question}</h3>
            <div className="mt-2 space-y-2">
              {q.options.map((option) => (
                <button
                  key={option}
                  className={`block w-full text-left p-3 rounded-md border text-sm sm:text-base ${submitted
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
            className="w-full bg-blue-600 text-white font-bold py-3 mt-4 rounded-md hover:bg-blue-700"
          >
            Submit Quiz
          </button>
        ) : (
          <p className="text-center mt-4 font-bold text-lg">
            Your Score: {score} / {questions.length}
          </p>
        )}
      </div>
    </div>
    </>
  );
};

export default Quiz;
