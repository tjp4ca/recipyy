import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';

// import auth

const Signup = () => {
    const [formInput, setFormInput] = useState({ 
        email: '',
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

    const handleClickSignupBtn = async (event) => {
        event.preventDefault();

        console.log('clicked signup');
    }

    return (
        <div className='container'>
            <div className='box2'>
                <form className='form' onSubmit={handleClickSignupBtn}>

                    <div className='row tabBox mx-5 mt-5'>
                        <div className='tabBtn2 col' id='tabBtn2'><Link to="/login" className='tabBtnLink2'>Login</Link></div>
                        <div className='tabBtn2 col' id='tabBtn2'><Link to="/signup" className='tabBtnLink2'>Signup</Link></div>
                    </div>

                    <div className='row mx-5 mt-5'>
                        <h2 className='printInput col-12'>Welcome {formInput.username}</h2>
                    </div>

                    <div className='inputBox2 mx-5 mt-5'>
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

                    <div className='inputBox2 mx-5 mt-5'>
                        <input 
                            onChange={handleChange}
                            name='email'
                            type='email'
                            // placeholder='Email'
                            value={formInput.email}
                            required='required'
                        />
                        <span>
                            Email
                        </span>
                    </div>

                    <div className='inputBox2 mx-5 mt-5'>
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
                        <button type='submit' className='submitBtn2 col'><span>Signup</span></button>
                    </div>
                </form>
            </div>
        </div>
    )

};

export default Signup;