import React, { useState } from 'react';
import "../css/Login.css";
import { Link, useHistory } from 'react-router-dom';
import { auth } from "../firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const signIn = e => {
        e.preventDefault();

        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                if(auth) {
                    history.push("/");
                }
            })
            .catch(error => alert(error.message));
    }

    const register = e => {
        e.preventDefault();

        auth
            .createUserWithEmailAndPassword(email, password)
            .then(auth => {
                if(auth) {
                    history.push("/");
                }
            })
            .catch(error => alert(error.message));
    }

    return (
        <div className="login">
            <Link to="/home">
                <img
                    className="login__logo"
                    src="https://pngimg.com/uploads/amazon/amazon_PNG6.png"
                    alt="Amazon Logo"
                />
            </Link>
            <div className="login__container">
                <h1>Sign In</h1>
                <form>
                    <h5>Email</h5>
                    <input 
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <h5>Password</h5>
                    <input 
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)} />

                    <button 
                        type="submit" 
                        onClick={signIn} 
                        className="login__signInButton">
                            Sign In
                    </button>
                </form>
                <p>By signing in, you agree to Amazon's conditions of use and sale. Please check our Privacy Notice, our Cookies Notice and our Interest-based Ad Notice.</p>
                <button 
                    className="login__registerButton"
                    onClick={register} >
                        Create an Amazon Account
                </button>
            </div>
        </div>
    )
}

export default Login
