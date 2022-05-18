import React from 'react';
import auth from '../../firebase.init';
import google from '../../images/social/google.jpg';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

const SocialLogin = () => {
    const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
    return (
        <div>
            <div className='d-flex align-items-center my-2'>
                <div style={{ height: '1px' }} className='bg-dark w-50'></div>
                <p className='mt-2 px-2'>or</p>
                <div style={{ height: '1px' }} className='bg-dark w-50'></div>
            </div>

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