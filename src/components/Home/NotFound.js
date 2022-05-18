import React from 'react';
import notFound from '../../images/notFound/notfound.png';

const NotFound = () => {
    return (
        <div className='container text-center my-5'>
            <img src={notFound} style={{ height: '250px' }} alt="img" />
            <h3 className='text-muted mb-4'>Sorry, The Page Not Found</h3>
            <p className='text-muted fw-bold mb-5'>The page you requested could not be found !</p>
        </div>
    );
};

export default NotFound;