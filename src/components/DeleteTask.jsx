/* eslint-disable react/prop-types */

import { toast } from 'react-toastify';

export default function DeleteTask({ index, datas, setDatas }) {
  function deleteTask() {
    const filteredData = datas.filter((_, i) => index !== i);
    setDatas(filteredData);
    toast.success("Task deleted successfully!", { position: "top-center" });
  }

  return (
    <button 
      className="button hover:text-red-500 transition-colors" 
      onClick={() => deleteTask(index)}
    >
      🗑️
    </button>
  );
}