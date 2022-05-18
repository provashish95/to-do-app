import React, { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useSendPasswordResetEmail, useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';
import Loading from '../Home/Loading';
import SocialLogin from './SocialLogin';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const emailRef = useRef('');
    const passwordRef = useRef('');
    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);
    const [sendPasswordResetEmail, sending, resetError] = useSendPasswordResetEmail(auth);
    let from = location.state?.from?.pathname || "/";
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
                    navigate(from, { replace: true });
                    navigate('/home')
                });
        }
    }, [user, navigate, from]);

    if (loading || sending) {
        return <Loading></Loading>
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signInWithEmailAndPassword(email, password);
        toast('Login Successfully');
    }
    if (error || resetError) {
        errorElement = <p className='text-danger'>Error: {error?.message}  {resetError?.message} </p>
    }

    const resetPassword = async () => {
        const email = emailRef.current.value;

        if (email) {
            await sendPasswordResetEmail(email);
            toast.success('Sent email');
        } else {
            toast.error('Please enter your email');
        }
    }

    return (
        <div className='container mt-3 mb-5 '>
            <div className='w-50 mx-auto '>
                <h4 className='text-center text-dark fw-bold mb-4'>Login</h4>
                <Form onSubmit={handleSubmit}>
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
                    errorElement
                }
                <p>Forget Password?<span className='btn text-dark fst-italic fw-bold' onClick={resetPassword}>Reset Password</span></p>

                <p>New to gym master?<span className='btn text-dark fst-italic fw-bold' onClick={() => navigate('/register')} >Please Register </span></p>
                <SocialLogin></SocialLogin>
                <ToastContainer toastStyle={{
                    backgroundColor: "rgb(216, 216, 216)",
                    marginTop: "4rem",
                    color: "black",
                    borderRadius: "20px"
                }} />
            </div>

        </div>
    );
};

export default Login;