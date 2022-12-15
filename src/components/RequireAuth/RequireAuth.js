import React from 'react';
import { useAuthState, useSendEmailVerification } from 'react-firebase-hooks/auth';
import { Navigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../firebase.init';
import Loading from '../Loading/Loading';

const RequireAuth = ({ children }) => {

    const [user, loading] = useAuthState(auth);
    const location = useLocation();
    
    const [sendEmailVerification, verificationSending] = useSendEmailVerification(auth);
    const handleVErification = async () => {
        await sendEmailVerification();
        toast.success('Email Verification Sent ', {
            theme: 'colored',
            delay: 0
        });
    }

    if (loading || verificationSending) {
        return <Loading/>
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    }

    if (!user.emailVerified && user.providerData[0].providerId === 'password') {
        return <div className='text-center min-h-[90vh] flex flex-col justify-center items-center bg-secondary py-12 px-8'>
            
            <p className='text-6xl font-semibold'>Your Email is not Verified !!!
            </p>
            
            <button onClick={handleVErification} className='py-4 px-4 my-4 text-white bg-accent rounded-3xl text-2xl md:w-1/3'>Send Verification Mail Again...</button>
            <p className='font-medium'>Please refresh this page after completing the verification
            </p>
            
        </div>
    }
    return children;
};

export default RequireAuth;