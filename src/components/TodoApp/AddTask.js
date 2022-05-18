import React, { useState } from 'react';

const AddTask = () => {
    const [tasks, setTasks] = useState([]);
        const handleSubmit = (e) => {
            e.preventDefault();
            const name = e.target.name.value;
            const description = e.target.description.value;
            const details = {name, description}
            fetch('http://localhost:5000/tasks', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(details)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    console.log(data);
                    setTasks(data);
                }
            })
        }

    return (
        <div>
            <div className='mx-auto w-1/2 my-12 border py-4 px-4 shadow-lg rounded-xl'>
            <p className='text-2xl text-center text-primary mb-8 font-semibold'>Add Task</p>
            <form className='flex items-end gap-6' onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Task Name" className="input input-bordered input-secondary w-full max-w-xs" />
                <textarea name="description" className="textarea textarea-secondary" placeholder="Description" cols="30"></textarea>
                <button className="btn btn-outline btn-secondary">Button</button>
            </form>
        </div>
        </div>
    );
};

export default AddTask;