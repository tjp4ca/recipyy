import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

// import auth

const Login = (props) => {
    const [formInput, setFormInput] = useState({ 
        username:'', 
        password:'' 
    });

    const handleChange = (event) => {
        console.log(event.target.value);

        const { name, value } = event.target;

        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    const handleClickLoginBtn = async (event) => {
        event.preventDefault();

        console.log('clicked login');
    }

    return (
        <div className='container'>
            <div className='box'>
                <form className='form' onSubmit={handleClickLoginBtn}>

                    <div className='row tabBox mx-5 mt-5'>
                        <div className='tabBtn col'><Link to="/login" className='tabBtnLink'>Login</Link></div>
                        <div className='tabBtn col'><Link to="/signup" className='tabBtnLink'>Signup</Link></div>
                    </div>

                    <div className='row mx-5 mt-5'>
                        <h2 className='printInput col-12'>Hello {formInput.username}</h2>
                    </div>

                    <div className='inputBox mx-5 mt-5'>
                        <input 
                            onChange={handleChange}
                            name='username'
                            type='text'
                            // placeholder='Username'
                            value={formInput.username}
                            required='required'
                        />
                        <span>
                            Username
                        </span>
                    </div>

                    <div className='inputBox mx-5 mt-5'>
                        <input 
                            onChange={handleChange}
                            name='password'
                            type='password'
                            // placeholder='Password'
                            value={formInput.password}
                            required='required'
                        />
                        <span>
                            Password
                        </span>
                    </div>

                    <div className='row mx-5 mt-5'>
                        <button type='submit' className='submitBtn col'><span>Login</span></button>
                    </div>
                </form>
            </div>
        </div>
    )
};

export default Login;