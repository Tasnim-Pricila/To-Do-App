import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';

const SocialLogin = () => {
    const navigate = useNavigate();
    
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    if(googleUser){
        navigate('/');
    }
    if(googleLoading){
        return <p> Loading...</p>
    }
   
    return (
        <div>
            <div className="divider">OR</div>
            <button className='border w-full py-2 tracking-wide flex justify-center items-center' onClick={() => signInWithGoogle()}>
                <FontAwesomeIcon icon={faGoogle} className='pr-4 text-orange-700'></FontAwesomeIcon>
                <p className='font-semibold text-primary'>Sign In With Google</p>      
            </button>
        </div>
    );
};

export default SocialLogin;