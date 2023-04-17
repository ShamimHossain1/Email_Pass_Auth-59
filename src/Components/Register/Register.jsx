import React from 'react';

const Register = () => {
    return (
        <div className='text-center'>
            <h2 >Please Register</h2>
            <form className='mt-5 border py-5 w-1/4 mx-auto rounded-lg'>
                <input type="email" placeholder='Your Email' name='email' id='email' className='rounded-lg' /><br /><br />
                <input type="password" name='password' id='password' placeholder='Your Password' className='rounded-lg' /><br /><br />
                <input type="submit" value="Register" className='border p-2 rounded-lg ' />
            </form>
        </div>
    );
};

export default Register;