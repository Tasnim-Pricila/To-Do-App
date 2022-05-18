import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const SocialLogin = () => {
    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);
    return (
        <div>
            <button className='border w-full py-2 tracking-wide flex justify-center items-center' 
            onClick={() => signInWithGoogle()}>
                {/* <FontAwesomeIcon icon={faGoogle} className='text-orange-500 pr-2 
                basis-[20%]'></FontAwesomeIcon> */}
                <p>Sign in With Google</p>
               
            </button>
        </div>
    );
};

export default SocialLogin;