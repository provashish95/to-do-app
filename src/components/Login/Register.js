import React, { useEffect, useRef, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Home/Loading';

const Register = () => {
    const [agree, setAgree] = useState(false);
    const [userError, setUserError] = useState('');
    const navigate = useNavigate();
    const nameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const confirmPassRef = useRef('');
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth, { sendEmailVerification: true });
    let errorElement;

    useEffect(() => {
        if (user) {
            const url = `https://stark-river-87829.herokuapp.com/login`;
            fetch(url, {
                method: 'POST',
                body: JSON.stringify({
                    email: user.user.email
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    localStorage.setItem('accessToken', data.token);
                    navigate('/home')
                });
        }
    }, [user, navigate]);

    if (error) {
        errorElement = <p className='text-danger '>Error: {error?.message}</p>
    }
    if (loading) {
        return <Loading></Loading>
    }

    const navigateLogin = () => {
        navigate('/');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPassRef.current.value;

        if (password.length < 6) {
            setUserError('Password must be 6 character!');
        } else if (password !== confirmPassword) {
            setUserError('Password not matched');
        } else {
            setUserError('')
            createUserWithEmailAndPassword(email, password)
        }
    }


    return (
        <div className='container mt-3 mt-5 '>
            <div className='w-50 mx-auto '>
                <h5 className='text-center text-dark fw-bold mb-4'>Registration</h5>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicName">
                        <Form.Control ref={nameRef} name='name' type="text" placeholder="Enter Your Name" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control ref={emailRef} name='email' type="email" placeholder="Enter email" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control ref={passwordRef} name='password' type="password" placeholder="Password" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Control ref={confirmPassRef} name='confirmPass' type="password" placeholder="Confirm Password" required />
                    </Form.Group>
                    <Form.Text className="text-danger text-center fw-bold">
                        {userError || ''}
                    </Form.Text>
                    <Form.Group className="mb-3" controlId="formBasicCheckbox">
                        <Form.Check onClick={() => setAgree(!agree)} className={`fst-italic ${agree ? 'text-dark' : 'text-danger'}`} id='terms' name='terms' type="checkbox" label="Accept to-do app terms & condition" />
                    </Form.Group>
                    <Button className='w-50 mx-auto d-block mb-2' variant="dark" type="submit" disabled={!agree}>
                        Register
                    </Button>
                    {errorElement}
                </Form>
                <p>Already have an account? <span className='btn text-dark fst-italic fw-bold' onClick={navigateLogin}>Please Login </span></p>

            </div>
        </div>
    );
};

export default Register;