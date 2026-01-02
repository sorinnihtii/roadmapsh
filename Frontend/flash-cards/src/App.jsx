import { useState } from "react";
import FrontContent from "./frontContent";
import BackContent from "./BackContent";
import questions from "./questions/en.json";

const questionCount = questions.length;
const percentageJump = 100 / questionCount;

function App() {
  const [language, setLanguage] = useState("en");

  const [progress, setProgress] = useState(1);

  const [isFlipped, setIsFlipped] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);

  const [isAnimating, setIsAnimating] = useState(false);
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  const handleNext = async () => {
    if (isAnimating || progress == 25) return;

    setIsAnimating(true);
    setIsFlipped((prev) => !prev);

    await delay(400);
    if (showAnswer) setShowAnswer(false);
    setProgress((prev) => prev + 1);

    await delay(400);
    setIsAnimating(false);
  };

  const handlePrevious = async () => {
    if (isAnimating || progress == 1) return;

    setIsAnimating(true);
    setIsFlipped((prev) => !prev);

    await delay(400);
    if (showAnswer) setShowAnswer(false);
    setProgress((prev) => prev - 1);

    await delay(400);
    setIsAnimating(false);
  };

  const handleAnswer = async () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsFlipped((prev) => !prev);

    await delay(400);
    setShowAnswer((prev) => !prev);

    await delay(400);
    setIsAnimating(false);
  };

  return (
    <div>
      <nav className="flex gap-4 ml-3 mb-0.5 w-fit font-semibold">
        <button
          className={`cursor-pointer ${
            language == "en" ? "text-three" : "text-black"
          }`}
          onClick={() => setLanguage("en")}
        >
          EN
        </button>
        <button
          className={`cursor-pointer ${
            language == "ro" ? "text-three" : "text-black"
          }`}
          onClick={() => setLanguage("ro")}
        >
          RO
        </button>
        <button
          className={`cursor-pointer ${
            language == "ru" ? "text-three" : "text-black"
          }`}
          onClick={() => setLanguage("ru")}
        >
          RU
        </button>
      </nav>
      <header className="flex items-center justify-end h-10 p-1.5 border-2 border-three bg-white rounded-lg text-md font-semibold">
        <div className="relative flex w-full h-full mr-16 items-center">
          <div
            style={{ width: `${progress * percentageJump}%` }}
            className="slow-transition h-full rounded-sm bg-three"
          ></div>
          <p
            style={{ marginLeft: `${progress * percentageJump}%` }}
            className="slow-transition absolute left-1.5 text-center text-sm cursor-default"
          >
            {progress * percentageJump}%
          </p>
        </div>
        <div className="flex justify-center items-center w-25 text-right text-sm border border-four rounded-md">
          <p className="cursor-default">
            {progress} of {questionCount}
          </p>
        </div>
      </header>
      <section className="flex flex-col p-1.5 mt-1.5 gap-2 items-center justify-center border-2 border-three rounded-lg">
        <main className="flip-card min-w-full w-xl h-75 bg-transparent rounded-lg">
          <div
            className={`flip-card-inner w-full h-full text-center transition-transform duration-800 ease-linear ${
              isFlipped ? "rotate-y-180" : ""
            }`}
          >
            <div
              className={`flip-card-front absolute flex flex-col w-full h-full items-center justify-center rounded-md
                ${showAnswer ? "bg-one" : "bg-two"}
                ${showAnswer ? "text-five" : "text-one"}`}
            >
              {showAnswer ? (
                <BackContent questionID={progress} lang={language} />
              ) : (
                <FrontContent questionID={progress} lang={language} />
              )}
            </div>
            <div
              className={`flip-card-back absolute flex flex-col w-full h-full items-center justify-center rounded-md rotate-y-180
              ${showAnswer ? "bg-one" : "bg-two"}
              ${showAnswer ? "text-five" : "text-one"}`}
            >
              {showAnswer ? (
                <BackContent questionID={progress} lang={language} />
              ) : (
                <FrontContent questionID={progress} lang={language} />
              )}
            </div>
          </div>
        </main>
        <footer className="grid grid-cols-3 w-full px-4 py-2 text-md rounded-md bg-one text-four">
          <button
            onClick={handlePrevious}
            className="flex gap-1 justify-start cursor-pointer"
          >
            <p>&#60;</p>
            <p>
              {language == "en" && "Previous"}
              {language == "ro" && "Înapoi"}
              {language == "ru" && "Назад"}
            </p>
          </button>
          <button onClick={handleAnswer} className="cursor-pointer">
            {language == "en" &&
              (!showAnswer ? `Show Answer` : `Show Question`)}
            {language == "ro" &&
              (!showAnswer ? `Arată Răspunsul` : `Arată Întrebarea`)}
            {language == "ru" &&
              (!showAnswer ? `Показать Ответ` : `Показать Вопрос`)}
          </button>
          <button
            onClick={handleNext}
            className="flex gap-1 justify-end cursor-pointer"
          >
            <p>
              {language == "en" && "Next"}
              {language == "ro" && "Următorul"}
              {language == "ru" && "Далее"}
            </p>
            <p>&#62;</p>
          </button>
        </footer>
      </section>
    </div>
  );
}

export default App;
