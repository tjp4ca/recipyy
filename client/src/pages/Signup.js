import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import { Link } from 'react-router-dom';

import Auth from '../utils/auth';

const Signup = () => {
    const [formInput, setFormInput] = useState({ 
        email: '',
        username:'', 
        password:'' 
    });
    const [addUser, { error }] = useMutation(ADD_USER);


    const handleChange = (event) => {
        // console.log(event.target.value);

        const { name, value } = event.target;

        setFormInput({
            ...formInput,
            [name]: value,
        });
    };

    const handleClickSignupBtn = async (event) => {
        event.preventDefault();

        console.log('clicked signup');

        try {
            const { data } = await addUser({
              variables: { ...formInput },
            });
      
            Auth.login(data.addUser.token);
          } catch (e) {
            console.error(e);
          }
    }

    return (
        <div className='logSigncontainer'>
            <div className='signBox'>
                <form className='logSignform' onSubmit={handleClickSignupBtn}>

                    <div className='row tabBox mx-5 mt-5'>
                        <div className='tabBtn2 col' id='tabBtn2'><Link to="/login" className='tabBtnLink2'>Login</Link></div>
                        <div className='tabBtn2 col' id='tabBtn2'><Link to="/signup" className='tabBtnLink2'>Signup</Link></div>
                    </div>

                    <div className='row mx-5 mt-5'>
                        <h2 className='printInput col-12'>Welcome {formInput.username}</h2>
                    </div>

                    <div className='signInputBox mx-5 mt-5'>
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

                    <div className='signInputBox mx-5 mt-5'>
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

                    <div className='signInputBox mx-5 mt-5'>
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

                {error && <div>Signup failed</div>}

            </div>
        </div>
    )

};

export default Signup;