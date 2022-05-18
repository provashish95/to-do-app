import React from 'react';
import './Footer.css';

const Footer = () => {
    let date = new Date().getFullYear();
    return (
        <div className='bg-dark p-5 text-center'>
            <p className='text-center text-white text-muted'>&copy; Copyright {date} | To-do app</p>
            <p className='text-center text-white text-muted'> Get active with To-do app</p>
            <span><i className="fa-brands fa-google icon-style"></i></span>
            <span ><i className="fa-brands fa-facebook icon-style"></i></span>
            <span ><i className="fa-brands fa-twitter icon-style"></i></span>
            <span ><i className="fa-brands fa-whatsapp icon-style"></i></span>
            <span ><i className="fa-brands fa-github icon-style"></i></span>
        </div>
    );
};

export default Footer;