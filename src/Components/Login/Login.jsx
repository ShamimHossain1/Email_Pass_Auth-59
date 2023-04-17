import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../Firebase/Firebase';

const auth = getAuth(app);
const Login = () => {
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        setError('');
        setSuccess('');
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please add at least two uppercase.');
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please add at least one special character');
            return;
        }
        else if (password.length < 6) {
            setError('Password must be 6 character long');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)

            .then(result => {
                const loggedUser = result.user
                if (!loggedUser.emailVerified) {
                    setError('please check your mailbox to verify your email');
                    return;
                }
                setSuccess('User Login Successful');
                setError('');
                form.reset();
                console.log(loggedUser)

            })

            .catch(error => {
                setError(error.message)
            })

    }

    const resetPassword =(event)=>{

        const email = emailRef.current.value;
        if(!email){
            alert('Provide valid email address to rest')
            return;
        }
        sendPasswordResetEmail(auth, email)
        .then(()=>{
            alert('please check your email inbox')
        })
        .catch(error => {
            setError(error.message)
        })




    }

    return (
        <div className='text-center border p-5 w-1/2 mx-auto'>
            <h2 className='font-semibold text-xl mb-4'>please Login</h2>
            <form onSubmit={handleLogin} className="mx-auto max-w-md">
                <div className="mb-4">
                    <label htmlFor="email" className="block text-gray-700 font-bold mb-2">Email Address</label>
                    <input type="email" id="email" ref={emailRef} name="email" className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-gray" placeholder="Enter your email address" required />
                </div>
                <div className="mb-6">
                    <label htmlFor="password" className="block text-gray-700 font-bold mb-2">Password</label>
                    <input type="password" id="password" name="password" className="w-full px-4 py-3 rounded-lg shadow-sm focus:outline-none focus:shadow-outline-gray" placeholder="Enter your password" required />
                </div>
                <div className="flex items-center justify-between">
                    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue">Sign In</button>
                    <div>
                        <Link to='/register'><a href="#" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">Register</a></Link>
                        <Link onClick={resetPassword} ><p className='font-bold text-sm text-red-500 hover:text-blue-800'>Forgot Password</p></Link>
                    </div>

                </div>
                <p className='text-green-500 font-semibold'>{success}</p>
                <p className='text-red-600'>{error}</p><br />

            </form>

        </div>
    );
};

export default Login;