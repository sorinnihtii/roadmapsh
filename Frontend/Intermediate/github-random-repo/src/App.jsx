import { useEffect, useRef, useState } from "react";

import languageList from "./resources/languages.json";
import colors from "./resources/colors.json";

function getRandomIndex(length) {
  return Math.floor(Math.random() * length);
}

const defaultQuery = "https://api.github.com/search/repositories?q=stars:>0";

function App() {
  const [query, setQuery] = useState(defaultQuery);

  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const [refreshCount, setRefreshCount] = useState(0);

  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [dropDownOpen, setDropDownOpen] = useState(false);

  const dropDownRef = useRef(null);

  const [random, setRandom] = useState(0);

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
        setRandom(getRandomIndex(result.items.length));
      } catch (err) {
        setError(err.message);
      } finally {
        setIsPending(false);
      }
    };

    fetchData();
  }, [query, refreshCount]);

  useEffect(() => {
    if (!dropDownOpen) return;

    const handler = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target))
        setDropDownOpen(false);
    };

    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropDownOpen]);

  const handleDropDown = () => {
    setDropDownOpen((prev) => !prev);
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);

    if (language === "All Languages") setQuery(defaultQuery);
    else
      setQuery(
        `https://api.github.com/search/repositories?q=${encodeURIComponent(
          `language:${language}`
        )}&sort=stars&order=desc`
      );
    setDropDownOpen(false);
  };

  const handleRefresh = () => {
    setRefreshCount((prev) => prev + 1);
  };

  return (
    <main className="flex flex-col p-2 mx-auto mt-20 w-80">
      <header className="flex items-center gap-2">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Octicons-mark-github.svg/960px-Octicons-mark-github.svg.png?20180806170715"
          alt="github logo"
          className="object-scale-down h-7 aspect-square"
        />
        <h5>Github Repository Finder</h5>
      </header>
      <section>
        <h6 className="text-sm mt-2">Select a Language:</h6>

        <section
          ref={dropDownRef}
          className="relative flex flex-col mt-1 w-full z-1"
        >
          <header
            onClick={handleDropDown}
            className="flex items-center w-full px-4 py-0.5 border-2 rounded-md cursor-pointer"
          >
            <p>{selectedLanguage}</p>
            <span
              className={`
                relative ml-auto h-2 w-2.5
                [clip-path:polygon(50%_0%,0%_100%,100%_100%)] bg-black
                after:content-[''] after:absolute after:h-2 after:w-2.5 after:top-0.75
                after:[clip-path:polygon(50%_0%,0%_100%,100%_100%)] after:bg-white ${
                  !dropDownOpen && "transform-[rotate(180deg)]"
                }`}
            ></span>
          </header>
          <main
            className={`
              absolute top-full w-full pt-1.75 rounded-lg
              opacity-0 invisible ${dropDownOpen && "visible opacity-100"}
              transition-all duration-200`}
          >
            <ul
              className="
                h-[50vh] overflow-y-scroll [scrollbar-width:none] border-2 rounded-lg
                [&>li]:last:border-b-0 [&>li]:first:rounded-t-md [&>li]:last:rounded-b-md"
            >
              {languageList.map((language) => (
                <li
                  key={language.title}
                  onClick={() => handleLanguageSelect(language.title)}
                  data-selected="false"
                  className="flex items-center px-2 py-0.5 bg-white cursor-pointer hover:bg-amber-300 border-b-2"
                >
                  <p>{language.title}</p>
                  <div
                    className={`fa fa-check-circle ml-auto invisible opacity-0 ${
                      selectedLanguage == language.title &&
                      "visible opacity-100"
                    }`}
                  ></div>
                </li>
              ))}
            </ul>
          </main>
        </section>

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
                  flex flex-wrap items-center justify-around w-full mt-3 text-xs text-gray-700
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
        {!isPending && (
          <button
            onClick={handleRefresh}
            className="w-full mt-2 py-2 rounded-md bg-black text-white text-xs cursor-pointer"
          >
            Refresh
          </button>
        )}
      </section>
    </main>
  );
}

export default App;
