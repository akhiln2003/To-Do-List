/* eslint-disable react/prop-types */
import { useState } from "react";
import DeleteTask from "./DeleteTask";
import EditTask from "./EditTask";
import { toast } from "react-toastify";

export default function ListTask({ datas, setDatas }) {
  const [edit, setEdit] = useState(-1);
  const [butstatus, setBtnStatus] = useState(true);
  const [activeCard, setActiveCard] = useState(null);

  function editTask(index) {
    setEdit(index);
  }

  function onDrop(position) {
    if (activeCard === null || activeCard === undefined) return;

    const newDatas = [...datas];
    const data = newDatas[activeCard];
    newDatas.splice(activeCard, 1);
    newDatas.splice(position, 0, data);
    setDatas(newDatas);
    toast.info("Task reordered successfully!", { position: "top-center" });
  }

  function updateStatus() {
    setBtnStatus(!butstatus);
  }

  function taskcompleted(index) {
    const updated = datas.map((value, i) => {
      if (i === index) {
        toast.success("Task marked as completed!", { position: "top-center" });
        return { ...value, isCompletted: true };
      }
      return value;
    });
    setDatas(updated);
  }

  function taskInCompletted(index) {
    const updated = datas.map((value, i) => {
      if (i === index) {
        toast.info("Task marked as incomplete!", { position: "top-center" });
        return { ...value, isCompletted: false };
      }
      return value;
    });
    setDatas(updated);
  }

  return (
    <div className="mt-5 mr-5">
      <button className="mb-5 ml-3 text-zinc-300 hover:text-white transition-colors" onClick={updateStatus}>
        {butstatus ? "Show Completed" : "Show Active"}
      </button>
      <ol>
        {butstatus
          ? datas?.map((value, index) =>
              !value.isCompletted ? (
                edit === index ? (
                  <EditTask
                    key={index}
                    index={index}
                    currentval={value.task}
                    setDatas={setDatas}
                    setEdit={setEdit}
                    datas={datas}
                  />
                ) : (
                  <div
                    draggable
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => onDrop(index)}
                    onDragStart={() => setActiveCard(index)}
                    onDragEnd={() => setActiveCard(null)}
                    key={index}
                    className="flex items-center justify-between text-white bg-zinc-800 p-2 rounded ml-4 mb-3 hover:bg-zinc-700 transition-colors"
                  >
                    <span className="text">{value.task}</span>
                    <div className="flex space-x-2">
                      <input
                        type="checkbox"
                        readOnly
                        checked={value.isCompletted}
                        onClick={() => taskcompleted(index)}
                      />
                      <button
                        className="button hover:text-yellow-500 transition-colors"
                        onClick={() => editTask(index)}
                      >
                        ✎
                      </button>
                      <DeleteTask index={index} datas={datas} setDatas={setDatas} />
                    </div>
                  </div>
                )
              ) : null
            )
          : datas?.map((value, index) =>
              value.isCompletted ? (
                <div
                  key={index}
                  className="flex items-center justify-between text-white bg-zinc-800 p-2 rounded ml-4 mb-3 hover:bg-zinc-700 transition-colors"
                >
                  <span className="text line-through">{value.task}</span>
                  <div className="flex space-x-2">
                    <input
                      type="checkbox"
                      readOnly
                      checked={value.isCompletted}
                      onClick={() => taskInCompletted(index)}
                    />
                    <DeleteTask index={index} datas={datas} setDatas={setDatas} />
                  </div>
                </div>
              ) : null
            )}
      </ol>
    </div>
  );
}