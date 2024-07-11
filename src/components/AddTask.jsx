import React, { useEffect, useState } from "react";
import ListTask from "./ListTask";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AddTask({ task, setNewTask, handleKeyDown }) {
    const getLocalItems = () => {
        let list = localStorage.getItem('Task');
        if (list) {
            return JSON.parse(list);
        } else {
            return [];
        }
    };

    const [datas, setDatas] = useState(getLocalItems());

    useEffect(() => {
        localStorage.setItem('Task', JSON.stringify(datas));
    }, [datas]);

    const handleAddTask = () => {
        let regex =  /^(?=(?:[^a-zA-Z]*[a-zA-Z]){3})(?!^\d+$).{3,25}$/;
        let inTask = datas.some((data) => data.task.toLowerCase().trim() === task.toLowerCase().trim());
        if (task.trim() !== '' && regex.test(task) && !inTask) {
            setDatas(datas => [...datas, { 'task': task , isCompletted : false }]);
            setNewTask('');
        } else if (inTask) {
            toast.warning("Already in task", { position: "top-center" });
        } else {
            toast.error("Enter valid Task", { position: "top-center" });
        }
    };

    return (
        <>
            <input 
                type="text" 
                className='inputBox h-10 bg-gray-300 mt-2 ml-3 mr-2 pl-3 text-xl'
                placeholder='Add Task ' 
                onKeyDown={(e) => handleKeyDown(e, handleAddTask)}
                value={task}
                onChange={(event) => setNewTask(event.target.value)}
            />
            <button className='w-16 h-10 bg-sky-900 rounded-lg ml-2 mr-5 mb-0' onClick={handleAddTask}>add</button>
            <ListTask datas={datas} setDatas={setDatas} handleAddTask ={handleAddTask} />
        </>
    );
}
