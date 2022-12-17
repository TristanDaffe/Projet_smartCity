import React from 'react';
import { Navigate } from 'react-router-dom';
import { getToken } from '../context/LoginContext';


const PrivateRoute = ({ children }) => {
    const authed = getToken() 
    
    return authed ? children : <Navigate to="/Home" />;
  }

export default PrivateRoute;

