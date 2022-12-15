import React from 'react';
import { useState } from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';
import Loading from '../Loading/Loading';

const ShowTask = () => {
   
    const [loading, setLoading] = useState(false)
    const {data : tasks, isLoading, refetch} = useQuery( 'tasks',() => 
    fetch(`https://to-do-app-ak7m.onrender.com/tasks`)
            .then(res => res.json())
    )

    if(isLoading || loading){
        return <Loading/>
    }

    const handleDelete = (id) => {
        setLoading(true)
        fetch(`https://to-do-app-ak7m.onrender.com/tasks/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    setLoading(false)
                    toast.success('Item Deleted Successfully', {
                        theme: 'colored',
                        delay: 0,
                    });
                    refetch();
                }
            })
    }

    const handleComplete = (e) => {     
        e.target.style.textDecoration = "line-through";
        toast.success('Task Completed Successfully', {
            theme: 'colored',
            delay: 0,
        });
    }
    return (
        <div>
            <div className="overflow-x-auto px-12 mx-auto">
                <table className="table table-zebra w-full text-center">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) =>
                                <tr key={task._id} >
                                    <th>{index + 1}</th>
                                    <td id='name'>{task.name}</td>
                                    <td>{task.description}</td>
                                    <td><button className="btn btn-outline btn-accent" onClick={handleComplete}>Complete</button></td>
                                    <td><button onClick={() => handleDelete(task._id)} className="btn btn-outline btn-error">Delete</button></td>
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