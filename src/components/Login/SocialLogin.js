import React, { useEffect } from 'react';
import auth from '../../firebase.init';
import google from '../../images/social/google.jpg';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import Loading from '../Home/Loading';
import { useLocation, useNavigate } from 'react-router-dom';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || "/";
    let errorElement;

    useEffect(() => {
        if (user) {
            navigate(from, { replace: true })
        }
    }, [user, navigate, from])

    if (loading) {
        return <Loading></Loading>
    }

    if (error) {
        errorElement = <p className='text-danger'>Error: {error?.message} </p>
    }
    return (
        <div>
            <div className='d-flex align-items-center my-2'>
                <div style={{ height: '1px' }} className='bg-dark w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-dark w-50'></div>
            </div>
            {errorElement}
            <div>
                <button onClick={() => signInWithGoogle()} className='btn btn-dark w-50 mx-auto d-block  my-2'>
                    <img style={{ width: '30px' }} className='rounded-circle' src={google} alt="googleLogo" />
                    <span className='px-2'> Google sign in</span>
                </button>
            </div>
        </div>
    );
};

export default SocialLogin;