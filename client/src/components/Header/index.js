import React from 'react';
import { Link } from 'react-router-dom';

import Auth from '../../utils/auth';

const Header = () => {


    // remove later!!!! manually render logout
    // const loggedIn = false;



    const logout = event => {
        event.preventDefault();
        Auth.logout();
    };


    return (

            // <header className='header'>
            //     <div className='headerBox row align-middle'>
            //         <Link className='title col' to="/">
            //         <h1 className='mt-4'>Title</h1>
            //         </Link>

            //         <nav className='navBar col text-center'>
            //             <ul className='row'>
            //                 <li className='navLink col'>
            //                     <Link to="/">Home</Link>
            //                 </li>
            //                 <li className='navLink col'>
            //                     <Link to="/donation">Donation</Link>
            //                 </li>
            //                 <li className='navLink col'>
            //                     <Link to="/login">Login /</Link>
            //                     <Link to="/signup"> Signup</Link>
            //                 </li>
            //                 {/* <li className='navLink col'>
            //                     <Link to="/signup">Signup</Link>
            //                 </li> */}
            //             </ul>
            //         </nav>
            //     </div>
            // </header>

        <header>
            <nav className="navbar navbar-expand-lg navbar-light">
                <Link to="/" className="navbar-brand">Title</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav ml-auto">
                    <Link to="/" className="nav-item nav-link">
                        <span></span>
                        Home
                    </Link>
                    <Link to="/donation" className="nav-item nav-link">
                        <span></span>
                        Donation
                    </Link>
                    <div className='nav-item nav-link'>
                    {
                        // loggedIn ? (
                        Auth.loggedIn ? (
                            <>
                                <Link to='/' className='navLink' onClick={logout}>
                                    <span></span>
                                    Logout
                                </Link>
                            </>
                        ) : (  
                            <>
                                <Link to="/login" className='navLink'>
                                    <span></span>
                                    Login/
                                </Link>
                                    <Link to="/signup" className='navLink'>
                                    <span></span>
                                    Signup
                                </Link>
                            </>
                        )}
                    </div>
                    </div>
                </div>
            </nav>
        </header>


    );
};

export default Header;
