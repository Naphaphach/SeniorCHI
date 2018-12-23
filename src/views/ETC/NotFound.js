import React from 'react';
import { Link } from 'react-router-dom';
import Home from '../../layouts/Home'
const NotFound = () => ( 
    <Home>
        <center>
            <h1>Oops! 404 <br/>The page was not found.</h1>
            < Link to = "/" > Return to Home Page </Link>
        </center>
    </Home>
);
export default NotFound;