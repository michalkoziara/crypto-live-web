import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { logoutUser } from '../../api/authentication';
import { useCookies } from 'react-cookie';

const LogoutPage: React.FC = () => {
    const [cookies, , removeCookie] = useCookies();
    const [isLoggedOut, setIsLoggedOut] = useState(false);

    useEffect(() => {
        if (!isLoggedOut) {
            logoutUser().then(() => {
                cookies.token = null;
                removeCookie('token');
                setIsLoggedOut(true);
            });
            setIsLoggedOut(true);
        }
    }, []);

    return isLoggedOut ? <Redirect to="/login" /> : null;
};

export default LogoutPage;
