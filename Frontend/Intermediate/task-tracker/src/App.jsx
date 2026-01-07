import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [description, setDescription] = useState("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = (event, description) => {
    event.preventDefault();

    const normalized = description.trim().toLowerCase();
    setDescription("");

    if (!description.trim()) return;
    if (tasks.some((task) => task.description === normalized)) return;

    setTasks((prevTasks) => [
      ...prevTasks,
      {
        id: crypto.randomUUID(),
        description: normalized,
        completed: false,
      },
    ]);
  };

  const handleCheck = (id, event) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: event.target.checked } : task
      )
    );
  };

  const handleDelete = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  return (
    <form className="flex flex-col gap-4 mx-auto mt-30 w-xl px-20 py-10 border-2 rounded-lg">
      <h6 className="text-xl font-semibold">Task Tracker</h6>
      <div>
        <input
          id="createTask"
          type="text"
          maxLength="75"
          placeholder="Start typing and press enter to add task"
          autoFocus
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`px-2 border-2 h-9 text-xs rounded-md w-full focus:outline-none ${
            description.length >= 75 && "border-red-500"
          }`}
        />
        <button
          hidden
          type="submit"
          onClick={(e) => handleAddTask(e, description)}
        ></button>
      </div>
      {[...tasks]
        .sort((a, b) => a.completed - b.completed)
        .map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-2 py-0.5 border-b border-b-gray-300"
          >
            <input
              id={`task-${task.id}`}
              type="checkbox"
              checked={task.completed}
              onChange={(e) => handleCheck(task.id, e)}
            ></input>

            <div
              className={`text-sm break-all ${
                task.completed == true ? "line-through text-gray-500" : ""
              }`}
            >
              {task.description}
            </div>
            <button
              type="button"
              className="fa fa-trash-o text-red-500 ml-auto mr-3 p-1 cursor-pointer"
              onClick={() => handleDelete(task.id)}
            ></button>
          </div>
        ))}
    </form>
  );
}

export default App;
