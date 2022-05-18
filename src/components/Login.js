import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import auth from '../firebase.init';
import SocialLogin from '../Shared/SocialLogin';

const Login = () => {
    // Email & Password Login 
    const [signInWithEmailAndPassword, loginUser, loginLoading, loginError] = useSignInWithEmailAndPassword(auth);

    // React Hook Form 

    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {
        const userInfo = data;
        const { email, password } = userInfo;
        signInWithEmailAndPassword(email, password);
        reset();
    }
    return (
        <div>
            <div className='flex items-center justify-center'>
                <div className='md:w-1/4 px-4'>
                    <div className='text-center'>
                        <p className='text-4xl uppercase text-orange-40'>Log In</p>

                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className=' mx-auto '>
                        <div>
                            <input placeholder='Email' type='email' name='email' {...register("email", { required: true })}
                                className=' bg-[#dddddd38] block border-gray-300 w-full pl-10 py-2  
                            rounded-full outline-none'/>

                        </div>
                        <small className='text-red-500 '>
                            {errors.email?.type === 'required' && "Email is required"}

                        </small>

                        <div>
                            <input placeholder='Password' type='password' {...register("password", { required: true })}
                                className='bg-[#dddddd38] block border-gray-300 w-full pl-10 py-2 
                            rounded-full outline-none mt-6'/>
                        </div>

                        <small className=' text-red-500'>
                            {errors.password?.type === 'required' && "Password is required"}

                        </small>
                        {/* Submit Button  */}
                        <input type="submit" className='block border-gray-300 w-full mb-4 pl-4 py-2 cursor-pointer bg-orange-400 font-semibold tracking-wider
                        rounded-full outline-none mt-6'/>

                    </form>

                    <div className='text-center mt-6 tracking-wider'>
                        <p>Not Account Yet? <Link to='/register' className='text-orange-500 hover:underline'> Sign Up</Link></p>
                    </div>
                    <SocialLogin></SocialLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;