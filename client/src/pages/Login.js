import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Login = (props) => {
    // use email to login
    const [formInput, setFormInput] = useState({ 
        email:'', 
        password:'' 
    });
    const [login, { error }] = useMutation(LOGIN_USER);


    const handleChange = (event) => {
        // console.log(event.target.value);

        const { name, value } = event.target;

        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    const handleClickLoginBtn = async (event) => {
        event.preventDefault();

        console.log('clicked login');

        try {
            const { data } = await login({
              variables: { ...formInput },
            });
            
            console.log(data.login.token);

            Auth.login(data.login.token);
        } catch (e) {
            console.error(e);
        }
      
        // use email to login
        setFormInput({
            email: '',
            password: '',
        });
    }

    return (
        <div className='logSigncontainer'>
            <div className='logBox'>
                <form className='logSignform' onSubmit={handleClickLoginBtn}>

                    <div className='row tabBox mx-5 mt-5'>
                        <div className='tabBtn col'><Link to="/login" className='tabBtnLink'>Login</Link></div>
                        <div className='tabBtn col'><Link to="/signup" className='tabBtnLink'>Signup</Link></div>
                    </div>

                    <div className='row mx-5 mt-5'>
                        <h2 className='printInput col-12'>Hello {formInput.email}</h2>
                    </div>

                    <div className='logInputBox mx-5 mt-5'>
                        <input 
                            // use email to login
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

                    <div className='logInputBox mx-5 mt-5'>
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

                {error && <div>Login failed</div>}

            </div>
        </div>
    )
};

export default Login;