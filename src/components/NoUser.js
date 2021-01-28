import React from 'react';
import "../css/NoUser.css";
import { Link } from "react-router-dom";

const NoUser = () => {
    return (
        <div className="noUser">
            <div className="noUser__container">
                <h2>Kindly Login/Register to Buy Something!</h2>
                <Link to="/login">Click Here to Login/Register</Link>
            </div>
        </div>
    )
}

export default NoUser;
