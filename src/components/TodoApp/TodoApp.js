import React, { useState } from 'react';
import AddTask from './AddTask';
import ShowTask from './ShowTask';

const TodoApp = () => {
    const [tasks, setTasks] = useState([]);
    return (
        <>
            <AddTask setTasks={setTasks}></AddTask>
            <ShowTask tasks={tasks} setTasks={setTasks}></ShowTask>
        </>
    );
};

export default TodoApp;