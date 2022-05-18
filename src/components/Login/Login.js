import React, { useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    return (
        <div className='container mt-5'>
            <div className='w-50 mx-auto'>
                <h5 className='text-center text-dark fw-bold mb-4'>Login</h5>
                <Form >
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Control ref={emailRef} name='email' type="email" placeholder="Enter email" required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control ref={passwordRef} name='password' type="password" placeholder="Password" required />
                    </Form.Group>
                    <Button className='w-50 mx-auto d-block mb-2' variant="dark" type="submit">
                        Login
                    </Button>
                </Form>
                {
                    //errorElement
                }
                <p>Forget Password?<span className='btn text-dark fst-italic fw-bold'>Reset Password</span></p>

                <p>New to gym master?<span className='btn text-dark fst-italic fw-bold' onClick={() => navigate('/register')} >Please Register </span></p>
                {/* <SocialLogin></SocialLogin> */}
            </div>

        </div >
    );
};

export default Login;