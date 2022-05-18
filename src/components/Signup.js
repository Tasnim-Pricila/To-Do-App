import React, { useState } from 'react';
import { useCreateUserWithEmailAndPassword, useSendEmailVerification, useUpdateProfile } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import SocialLogin from '../Shared/SocialLogin';

const Signup = () => {
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
    if (emailLoading || sending || updating) {
        return <p>Loading...</p>
    }
    return (
        <div>
            <div className='flex items-center justify-center'
            >
                <div className='md:w-1/4 px-4 py-16'>
                    <div className='text-center'>
                        <p className='text-4xl uppercase text-orange-40'>Sign Up</p>
                        <p className='mt-4 mb-12 text-slate-500'>Create new account today to reap the benefits of a personalized
                            shopping experience</p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className=' mx-auto'>
                        {/* Name Field  */}
                        <div >
                            <input placeholder='Name' type='text' {...register("name", { required: true, })}
                                className='bg-[#dddddd38] block border-gray-300 w-full pl-10 py-2  
                            rounded-full outline-none'/>

                        </div>
                        <small className='text-red-500 '>
                            {errors.name?.type === 'required' && "Name is required"}
                        </small>
                        {/* Email Field  */}
                        <div >
                            <input placeholder='Email'  {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })}
                                className='bg-[#dddddd38] block border-gray-300 w-full pl-10 py-2  
                            rounded-full outline-none mt-6'/>

                        </div>

                        <small className='text-red-500 '>
                            {errors.email?.type === 'required' && "Email is required"}
                            {errors.email?.type === 'pattern' && "Email pattern is wrong"}

                        </small>

                        {/* PAssword field  */}
                        <div >
                            <input placeholder='Password' type='password' {...register("password", { required: true, pattern: /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*#?&^_-]).{8,}/, minLength: 8 })}
                                className='bg-[#dddddd38] block border-gray-300 w-full pl-10 py-2 rounded-full outline-none mt-6' />

                        </div>
                        <small className=' text-red-500'>
                            {errors.password?.type === 'required' && "Password is required"}
                            {errors.password?.type === 'minLength' && "Password must be 8 characters long"}
                            {errors.password?.type === 'pattern' && "Must use 1 uppercase, 1 lowercase, 1 number and 1 special character"}

                        </small>

                        {/* Confirm PAssword field  */}
                        <div>
                            <input placeholder='Confirm Password' type='password' {...register("cpassword", { required: true, })}
                                className='bg-[#dddddd38] block border-gray-300 w-full pl-10 py-2 
                            rounded-full outline-none mt-6'/>

                        </div>
                        <small className=' text-red-500'>
                            {errors.cpassword?.type === 'required' && "Password is required"}
                            {myError}
                        </small>

                        {/* Submit Button  */}
                        <input type="submit" className='block border-gray-300 w-full mb-4 pl-4 py-2 cursor-pointer bg-orange-400 font-semibold tracking-wider
                        rounded-full outline-none mt-6' />
                    </form>

                    <div className='text-center mt-6 tracking-wider'>
                        <p>Already Have an Account? <Link to='/login' className='text-orange-500 hover:underline'> Login </Link></p>
                    </div>
                    <SocialLogin></SocialLogin>

                </div>
            </div>
        </div>
    );
};

export default Signup;