import { useNavigate } from "react-router-dom";

import Feed from "./Feed";
import { useState } from "react";

function App() {
  const [showNewLaneForm, setShowNewLaneForm] = useState(false);
  const [subreddit, setSubreddit] = useState("");
  const [lanes, setLanes] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  console.log(lanes, lanes.length);

  function handleShowNewLaneForm() {
    setError(null);
    setSubreddit("");
    setShowNewLaneForm((prev) => !prev);
  }

  function handleNewLane() {
    if (lanes.includes(subreddit)) {
      setError("Subreddit already added");
      return;
    }
    setLanes((prev) => [...prev, subreddit]);
    setShowNewLaneForm(false);
  }

  const handleCloseLane = (toBeRemoved) => {
    setLanes((prev) => prev.filter((p) => p != toBeRemoved));
  };

  return (
    <>
      <nav className="fixed flex items-center left-0 top-0 h-14 px-10 w-screen bg-white border-b border-b-black z-100">
        <header className="flex flex-col">
          <h1 className="">Reddit Multi Lane</h1>
        </header>
        <button
          onClick={handleShowNewLaneForm}
          className="ml-auto px-2 py-px cursor-pointer bg-gray-200 text-sm rounded-xl"
        >
          New Lane
        </button>
      </nav>
      {showNewLaneForm && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleNewLane();
          }}
          className="fixed flex flex-col top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 z-300 w-[25vw] p-4 bg-white border-2 rounded-xl"
        >
          <label
            className="font-semibold text-lg text-center"
            htmlFor="subreddit"
          >
            Please enter the desired subreddit:
          </label>
          <input
            id="subreddit"
            type="text"
            value={subreddit}
            onInput={(e) => setSubreddit(e.target.value)}
            className="mt-1 border rounded-md"
          />
          <button
            type="button"
            onClick={handleNewLane}
            className="text-sm py-2 mt-3 bg-black text-white rounded-md cursor-pointer"
          >
            Add Subreddit
          </button>
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </form>
      )}
      <main
        className="grid w-screen"
        style={{ gridTemplateColumns: `repeat(${lanes.length}, 1fr)` }}
      >
        {lanes &&
          lanes.map((lane) => (
            <Feed
              key={lane}
              subreddit={lane}
              handleCloseLane={handleCloseLane}
            />
          ))}
      </main>
    </>
  );
}
export default App;
