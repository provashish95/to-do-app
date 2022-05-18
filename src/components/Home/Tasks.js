import React, { useState } from 'react';
import { toast } from 'react-toastify';
import './tasks.css';

const Tasks = ({ task, setIsReload }) => {
    const [text, setText] = useState(false);
    const { name, description } = task;

    const handleComplete = () => {
        setText(!text);
        toast.success('Completed')
    }
    return (
        <div className="card mx-auto shadow-lg p-3 mb-3 bg-body rounded" style={{ width: '18rem' }}>
            <div className="card-body text-color">
                <h5 className="card-title">{name}</h5>
                <p className={text ? "text-decoration-line-through" : ''} >{description.length < 70 ? description : description.slice(0, 70) + ' ...'}</p>
                <button onClick={handleComplete} className='btn btn-sm btn-dark ms-3 '>Complete</button>
                <button className='btn btn-sm btn-dark ms-3'>Delete</button>
            </div>
        </div>
    );
};

export default Tasks;