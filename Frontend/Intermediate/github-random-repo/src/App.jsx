import { useEffect, useState } from "react";

import languageList from "./resources/languages.json";
import colors from "./resources/colors.json";

function App() {
  const defaultQuery = "https://api.github.com/search/repositories?q=stars:>0";
  const [query, setQuery] = useState(defaultQuery);

  const [language, setLanguage] = useState("");

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(false);
  const [attempt, setAttempt] = useState(0);

  function getRandomInt() {
    return Math.floor(Math.random() * (30 - 0 + 1)) + 0;
  }

  const [random, setRandom] = useState(getRandomInt);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setIsPending(true);
        const response = await fetch(query);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setData(result);
        console.log("data:", result);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [query, attempt]);

  const handleLanguage = (e) => {
    console.log("e.target.value:", e.target.value);
    const value = e.target.value;
    setLanguage(value);
    if (value === "default") setQuery(defaultQuery);
    else
      setQuery(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          `language:${value}`
        )}`
      );
    e.target.blur();
  };

  const handleRetry = () => {
    setAttempt((prev) => prev + 1);
    setRandom(getRandomInt);
  };

  return (
    <section className="flex flex-col p-2 mx-auto mt-20 w-80">
      <header className="flex items-center gap-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/960px-Octicons-mark-github.svg.png?20180806170715"
          alt="github logo"
          className="object-scale-down h-7 aspect-square"
        />
        <h5>Github Repository Finder</h5>
      </header>
      <main>
        <h6 className="text-sm mt-2">Select a Language:</h6>
        <select
          name="languages"
          id="languages"
          value={language}
          onChange={handleLanguage}
          className="w-full mt-0.5 px-4 py-1 text-xs border-2 rounded-md"
        >
          {languageList.map((language, index) => (
            <option key={index} value={language.value}>
              {language.title}
            </option>
          ))}
        </select>

        <div className="flex flex-col justify-center items-start mt-2 px-4 py-3 border-2 rounded-md cursor-default">
          {isPending && <p>Loading...</p>}
          {error && <p>{error}</p>}
          {!error && !isPending && data && (
            <>
              <a
                href={data.items[random].html_url}
                className="font-semibold capitalize break-all"
              >
                {data.items[random].name}
              </a>
              <div className="mt-1 text-sm text-gray-500">
                {data.items[random].description}
              </div>
              <footer
                className="
                  flex items-center justify-around w-full mt-2 text-xs text-gray-700
                  [&>div]:flex [&>div]:items-center [&>div]:gap-1 [&>div]:mr-auto"
              >
                <div>
                  <i
                    style={{
                      color: colors[data.items[random].language]?.color,
                    }}
                    className="fa fa-circle"
                  />
                  <p>{data.items[random].language}</p>
                </div>
                <div>
                  <i className="fa fa-star"></i>
                  <p>{data.items[random].stargazers_count}</p>
                </div>
                <div>
                  <i className="fa fa-code-fork"></i>
                  <p>{data.items[random].forks}</p>
                </div>
                <div>
                  <i className="fa fa-exclamation-circle"></i>
                  <p>{data.items[random].open_issues_count}</p>
                </div>
              </footer>
            </>
          )}
        </div>
        <button
          onClick={handleRetry}
          className="w-full mt-2 py-2 rounded-md bg-black text-white text-xs cursor-pointer"
        >
          Refresh
        </button>
      </main>
    </section>
  );
}

export default App;
