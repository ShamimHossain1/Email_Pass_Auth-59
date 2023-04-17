import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../Firebase/Firebase';
import { Link } from 'react-router-dom';

const auth = getAuth(app);

const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [error, setError]= useState('');
    const [success, setSuccess] = useState('')


    const handleEmailChange = (event) =>{
        // setEmail(event.target.value);

    } 
    const HandlePasswordBlur = (event) =>{
        // console.log(event.target.value);

    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        setSuccess('');
        setError('');
        const email = (event.target.email.value)
        const password = (event.target.password.value)

        // validate

        if(!/(?=.*[A-Z].*[A-Z])/.test(password)){
            setError('Please add at least two uppercase.');
            return;
        }
        else if(!/(?=.*[!@#$&*])/.test(password)){
            setError('Please add at least one special character');
            return;
        }
        else if (password.length <6){
            setError('Password must be 6 character long');
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
        .then (result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
            setError('')
            event.target.reset()
            setSuccess('Register SuccessFull')
            sendVerification(loggedUser)
        })
        .catch(error =>{
            // console.log(error.message);
            setError(error.message)
        })

    }

    const sendVerification=(email)=>{
        sendEmailVerification(email)
        .then(result=>{
            alert('please verify your email')
        })
    }
    return (
        <div className='text-center'>
            <h2  className='font-semibold text-xl mb-4' >Please Register</h2>
            <form onSubmit={handleSubmit} className='mt-5 border py-5 w-1/4 mx-auto rounded-lg'>
                <input onChange={handleEmailChange} type="email" placeholder='Your Email' name='email' id='email' className='rounded-lg' required /><br /><br />
                <input onBlur={HandlePasswordBlur} type="password" name='password' id='password' placeholder='Your Password' className='rounded-lg' required /><br />
                <p className='text-red-600'>{error}</p><br />

                <input type="submit" value="Register" className='border p-2 rounded-lg ' />
                
                <p>Already Have an account? Please <Link className='text-blue-600 underline font-semibold' to='/login'>Login</Link></p>
                <p className='text-green-500 font-semibold'>{success}</p>
            </form>
            
        </div>
    );
};

export default Register;