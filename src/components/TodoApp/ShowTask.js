import React from 'react';
import { useQuery } from 'react-query';
import { toast } from 'react-toastify';

const ShowTask = () => {
   
    const {data : tasks, isLoading, refetch} = useQuery( 'tasks',() => 
    fetch(`https://infinite-cliffs-36577.herokuapp.com/tasks`)
            .then(res => res.json())
    )

    if(isLoading){
        return <p>Loading...</p>
    }

    const handleDelete = (id) => {
        fetch(`https://infinite-cliffs-36577.herokuapp.com/tasks/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
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
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tasks.map((task, index) =>
                                <tr key={task._id} >
                                    <th>{index+1}</th>
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