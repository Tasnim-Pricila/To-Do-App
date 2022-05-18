import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import SocialLogin from '../Shared/SocialLogin';

const Signup = () => {
    const navigate = useNavigate();
    // Create User 
    const [createUserWithEmailAndPassword, emailUser, emailLoading, emailError] = useCreateUserWithEmailAndPassword(auth);

    // Update USer Info 
    const [updateProfile, updating] = useUpdateProfile(auth);

    // Send Email Verification 
    const [sendEmailVerification, sending] = useSendEmailVerification(auth);

    const [myError, setMyError] = useState('');

    // React Hook Form 
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = async (data, e) => {
        const userInfo = data;
        const { name, email, password, cpassword } = userInfo;
        if (password === cpassword) {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name });
            await sendEmailVerification();
            reset();
        }
        else if (password !== cpassword) {
            setMyError('Password Does not match')
        }
    }
    if(emailUser){
        navigate('/');
    }
    
    if (emailLoading || sending || updating) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <div className='flex items-center justify-center'
            >
                <div className='md:w-1/4 px-4 py-16'>
                    <div className='text-center'>
                        <p className='text-4xl uppercase text-orange-40 font-semibold'>Sign Up</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className=' mx-auto'>
                        {/* Name Field  */}
                        <div >
                            <input placeholder='Name' type='text' {...register("name", { required: true, })}
                                className='input input-bordered input-secondary w-full max-w-xs my-4'/>

                        </div>
                        <small className='text-red-500 '>
                            {errors.name?.type === 'required' && "Name is required"}
                        </small>
                        {/* Email Field  */}
                        <div >
                            <input placeholder='Email'  {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
                               className='input input-bordered input-secondary w-full max-w-xs my-4'/>

                        </div>

                        <small className='text-red-500 '>
                            {errors.email?.type === 'required' && "Email is required"}
                            {errors.email?.type === 'pattern' && "Email pattern is wrong"}

                        </small>

                        {/* PAssword field  */}
                        <div >
                            <input placeholder='Password' type='password' {...register("password", { required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/, minLength: 8 })}
                                className='input input-bordered input-secondary w-full max-w-xs my-4' />

                        </div>
                        <small className=' text-red-500'>
                            {errors.password?.type === 'required' && "Password is required"}
                            {errors.password?.type === 'minLength' && "Password must be 8 characters long"}
                            {errors.password?.type === 'pattern' && "Must use 1 uppercase, 1 lowercase, 1 number and 1 special character"}

                        </small>

                        {/* Confirm PAssword field  */}
                        <div>
                            <input placeholder='Confirm Password' type='password' {...register("cpassword", { required: true, })}
                                className='input input-bordered input-secondary w-full max-w-xs my-4'/>

                        </div>
                        <small className=' text-red-500'>
                            {errors.cpassword?.type === 'required' && "Password is required"}
                            {myError}
                        </small>

                        {/* Submit Button  */}
                        <input type="submit" className='btn btn-active btn-secondary w-full mt-6' />
                    </form>

                    <div className='text-center mt-6 tracking-wider font-semibold'>
                        <p>Already Have an Account? <Link to='/login' className='text-primary hover:underline '> Login </Link></p>
                    </div>
                    <SocialLogin></SocialLogin>

                </div>
            </div>
        </div>
    );
};

export default Signup;