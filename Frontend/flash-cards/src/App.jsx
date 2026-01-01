import { useState } from "react";
import FrontContent from "./frontContent";
import BackContent from "./BackContent";
import questions from "./questions.json";

function App() {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [progress, setProgress] = useState(1);

  const questionCount = questions.length;
  const percentageJump = 100 / questionCount;

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = async () => {
    if (isAnimating || progress == questionCount) return;
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    await delay(400);
    if (showAnswer) {
      setShowAnswer(false);
    }
    setProgress(progress + 1);
    await delay(400);
    setIsAnimating(false);
  };

  const handlePrevious = async () => {
    if (isAnimating || progress == 1) return;
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    await delay(400);
    if (showAnswer) {
      setShowAnswer(false);
    }
    setProgress(progress - 1);
    await delay(400);
    setIsAnimating(false);
  };

  const handleAnswer = async () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setIsFlipped(!isFlipped);
    await delay(400);
    setShowAnswer(!showAnswer);
    await delay(400);
    setIsAnimating(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <header className="flex items-center justify-end h-12 p-1.5 border rounded-lg text-md font-semibold">
        <div className="relative flex w-full h-full mr-16 items-center">
          <div
            style={{ width: `${progress * percentageJump}%` }}
            className="slow-transition bg-gray-300 h-full rounded-md"
          ></div>
          <p
            style={{ marginLeft: `${progress * percentageJump}%` }}
            className="slow-transition absolute left-1.5 text-center text-sm"
          >
            {progress * percentageJump}%
          </p>
        </div>
        <p className="mr-1 w-25 text-center border border-gray-200 rounded-md">
          {progress} of {questionCount}
        </p>
      </header>
      <main className="flex flex-col p-1.5 gap-2 items-center justify-center border rounded-lg">
        <div className="flip-card min-w-full w-xl h-75 bg-transparent rounded-lg">
          <div className={`flip-card-inner ${isFlipped ? "flipped" : ""}`}>
            <div
              className={`flip-card-front flex flex-col items-center justify-center rounded-lg
                ${showAnswer ? "bg-[#333]" : "bg-gray-200"}
                ${showAnswer ? "text-white" : "text-black"}`}
            >
              {showAnswer ? (
                <BackContent questionID={progress} />
              ) : (
                <FrontContent questionID={progress} />
              )}
            </div>
            <div
              className={`flip-card-back flex flex-col items-center justify-center rounded-lg
              ${showAnswer ? "bg-[#333]" : "bg-gray-200"}
              ${showAnswer ? "text-white" : "text-black"}`}
            >
              {showAnswer ? (
                <BackContent questionID={progress} />
              ) : (
                <FrontContent questionID={progress} />
              )}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 w-full px-4 py-2 font-semibold bg-gray-200 text-lg rounded-lg">
          <button
            onClick={handlePrevious}
            className="flex gap-1 items-center justify-start"
          >
            <p>&#60;</p>
            <p>Previous</p>
          </button>
          <button onClick={handleAnswer}>
            {!showAnswer ? `Show Answer` : `Show Question`}
          </button>
          <button
            onClick={handleNext}
            className="flex gap-1 items-center justify-end"
          >
            <p>Next</p>
            <p>&#62;</p>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
