/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import ListTask from "./ListTask";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AddTask({ task, setNewTask, handleKeyDown }) {
  const getLocalItems = () => {
    let list = localStorage.getItem("Task");
    if (list) {
      return JSON.parse(list);
    } else {
      return [];
    }
  };

  const [datas, setDatas] = useState(getLocalItems());

  useEffect(() => {
    localStorage.setItem("Task", JSON.stringify(datas));
  }, [datas]);

  const handleAddTask = () => {
    let regex = /^(?=(?:[^a-zA-Z]*[a-zA-Z]){3})(?!^\d+$).{3,25}$/;
    let inTask = datas.some(
      (data) => data.task.toLowerCase().trim() === task.toLowerCase().trim()
    );
    if (task.trim() !== "" && regex.test(task) && !inTask) {
      setDatas((datas) => [...datas, { task: task, isCompletted: false }]);
      setNewTask("");
      toast.success("Task added successfully!", { position: "top-center" });
    } else if (inTask) {
      toast.warning("Task already exists!", { position: "top-center" });
    } else {
      toast.error("Please enter a valid task (3-25 characters with at least 3 letters)", { position: "top-center" });
    }
  };

  return (
    <div className="flex flex-col h-full sticky">
      <div className="sticky top-0 px-2 sm:px-3 md:px-4 lg:px-5 py-2 sm:py-3 z-10">
        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
          <input
            type="text"
            className="h-10 bg-zinc-100 pl-3 text-base sm:text-lg w-full rounded-md"
            placeholder="Add Task"
            onKeyDown={(e) => handleKeyDown(e, handleAddTask)}
            value={task}
            onChange={(event) => setNewTask(event.target.value)}
          />
          <button
            className="h-10 bg-yellow-900 rounded-lg px-4 sm:px-5 text-white hover:bg-yellow-800 transition-colors w-full sm:w-auto"
            onClick={handleAddTask}
          >
            Add
          </button>
        </div>
      </div>
      <ListTask
        datas={datas}
        setDatas={setDatas}
        handleAddTask={handleAddTask}
      />
    </div>
  );
}