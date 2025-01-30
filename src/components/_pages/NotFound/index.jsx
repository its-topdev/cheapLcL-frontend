import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
  
 function NotFound() {
    const navigate = useNavigate();

    useEffect(() => {
        let token = localStorage.getItem("token");
        if (token) {
            navigate('/');
        } else {
            navigate('/login');
        }
    },[]);

}
export default NotFound;