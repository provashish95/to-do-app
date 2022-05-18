import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 ">
            <div className="container">
                <Link className="navbar-brand mx-auto" to='/'>TO-DO APP</Link>
            </div>
        </nav>
    );
};

export default Navbar;