import React, { useRef, useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../../firebase.init';
import Tasks from './Tasks';

const Home = () => {
    const [tasks, setTasks] = useState();
    const [user] = useAuthState(auth);
    const [isReload, setIsReload] = useState(false);
    const nameRef = useRef('');
    const descriptionRef = useRef('');


    //display all data on UI
    useEffect(() => {
        const url = `https://stark-river-87829.herokuapp.com/tasks`;
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setTasks(data);
            })
    }, [isReload])

    //insert data in database
    const handleSubmit = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const description = descriptionRef.current.value;

        fetch('https://stark-river-87829.herokuapp.com/tasks', {
            method: 'POST',
            body: JSON.stringify({
                name, description
            }),
            headers: {
                'authorization': `${user.email} ${localStorage.getItem("accessToken")}`,
                'Content-type': 'application/json'
            },
        })
            .then((response) => response.json())
            .then((data) => {
                toast.success(data.success)
                event.target.reset()
                setIsReload(!isReload);
            });
    }


    //delete data by id from UI and database
    const handleDelete = id => {
        const proceed = window.confirm("Are you sure to delete ? ");
        if (proceed) {
            const url = `https://stark-river-87829.herokuapp.com/task/${id}`;
            fetch(url, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    const remaining = tasks?.filter(task => task._id !== id);
                    setTasks(remaining);
                    toast.error(data.success)
                })
        }
    }

    return (
        <>
            <div className='container mt-3 '>
                <div className='w-50 mx-auto '>
                    <h5 className='text-center text-dark fw-bold mb-4'>Add Task</h5>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Control ref={nameRef} name='name' type="text" placeholder="Enter Name" required />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                            <Form.Control ref={descriptionRef} as="textarea" rows={3} placeholder="Description" required />
                        </Form.Group>
                        <Button className='w-50 mx-auto d-block mb-2' variant="dark" type="submit">
                            Add Task
                        </Button>
                    </Form>
                </div>
                <ToastContainer toastStyle={{
                    backgroundColor: "rgb(216, 216, 216)",
                    marginTop: "4rem",
                    color: "black",
                    borderRadius: "20px"
                }} />
            </div >
            <div className='container '>
                <h4 className='text-center mt-5 mb-3 text-color'>All Tasks </h4>
                <div className="row">
                    {
                        tasks?.map(task => <Tasks key={task._id} task={task} handleDelete={handleDelete}></Tasks>)
                    }
                </div>
            </div>
        </>
    );
};

export default Home;