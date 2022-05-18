import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';

const Home = () => {
    const nameRef = useRef('');
    const descriptionRef = useRef('');

    const handleSubmit = (event) => {
        event.preventDefault();
        const name = nameRef.current.value;
        const description = descriptionRef.current.value;
        console.log(name, description);
    }


    return (
        <div className='container mt-3 '>
            <div className='w-50 mx-auto '>
                <h4 className='text-center text-dark fw-bold mb-4'>Add Task</h4>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control ref={nameRef} name='name' type="text" placeholder="Enter Name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                        <Form.Control ref={descriptionRef} as="textarea" rows={3} placeholder="Description" />
                    </Form.Group>
                    <Button className='w-50 mx-auto d-block mb-2' variant="dark" type="submit">
                        Add
                    </Button>
                </Form>
            </div>
        </div>
    );
};

export default Home;