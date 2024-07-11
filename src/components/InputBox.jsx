import React, { useState } from 'react';
import AddTask from './AddTask';

export default function InputBox() {
    const [newTask, setNewTask] = useState('');

    const handleKeyDown = (e, handleAddTask) => {
        if (e.key === "Enter") {
            handleAddTask();
        }
    };

    return (
        <>
            <AddTask task={newTask} setNewTask={setNewTask} handleKeyDown={handleKeyDown} />
        </>
    );
}
