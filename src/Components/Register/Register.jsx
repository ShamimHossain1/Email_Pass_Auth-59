import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import app from '../Firebase/Firebase';

const auth = getAuth(app);

const Register = () => {
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const handleEmailChange = (event) =>{
        // setEmail(event.target.value);

    } 
    const HandlePasswordBlur = (event) =>{
        // console.log(event.target.value);

    }
    const handleSubmit = (event) =>{
        event.preventDefault();
        const email = (event.target.email.value)
        const password = (event.target.password.value)

        createUserWithEmailAndPassword(auth, email, password)
        .then (result=>{
            const loggedUser = result.user;
            console.log(loggedUser);
        })
        .catch(error =>{
            console.log(error);
        })

    }
    return (
        <div className='text-center'>
            <h2 >Please Register</h2>
            <form onSubmit={handleSubmit} className='mt-5 border py-5 w-1/4 mx-auto rounded-lg'>
                <input onChange={handleEmailChange} type="email" placeholder='Your Email' name='email' id='email' className='rounded-lg' /><br /><br />
                <input onBlur={HandlePasswordBlur} type="password" name='password' id='password' placeholder='Your Password' className='rounded-lg' /><br /><br />
                <input type="submit" value="Register" className='border p-2 rounded-lg ' />
            </form>
        </div>
    );
};

export default Register;