import React, { useEffect, useState } from 'react';

const ShowTask = () => {
    const [tasks, setTasks] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/tasks')
            .then(res => res.json())
            .then(data => setTasks(data))
    }, [setTasks])
   
    return (
        <div>
            <div className="overflow-x-auto px-12 mx-auto">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) =>
                                <tr key={index}>
                                    <th>{index+1}</th>
                                    <td>{task.name}</td>
                                    <td>{task.description}</td>
                                    <td><button class="btn btn-outline btn-accent">Complete</button></td>
                                    <td><button className="btn btn-outline btn-error">Delete</button></td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ShowTask;