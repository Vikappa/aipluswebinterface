/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

const UserLoginFailed = (props) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            props.setUserloginFailed(false)
        }, 2000); 

        return () => clearTimeout(timer); 
    }, []);

    if (props.UserLoginFailed) return null;

    return (
        <div className="d-flex align-items-center justify-content-center p-5">
            <p>Utente non trovato, riprova</p>
        </div>
    );
};

export default UserLoginFailed;
