import React, { useState } from 'react';
import '../css/Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import ClearIcon from '@material-ui/icons/Clear';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';
import { useStateValue } from '../state/StateProvider';
import { auth } from '../firebase';
import { EMPTY_BASKET } from '../state/ActionTypes';

const Header = () => {
    const [{ user, basket }, dispatch] = useStateValue();
    const [open, setOpen] = useState(false);
    const [overlayOpen, setOverlayOpen] = useState(false);

    const handleAuthentication = () => {
        if(user) {
            auth.signOut();
            setOpen(false);
            setOverlayOpen(false);
            dispatch({
                type: EMPTY_BASKET
            });
        }
    }

    const handleHamburger = () => {
        setOpen(!open);
        setOverlayOpen(!overlayOpen);
    }

    return (
        <>
            <div className={`overlay ${overlayOpen ? "show" : "hide"}`}></div>
            <div className={`header__hamburgerDropdown ${open ? "slideIn" : "slideOut"}`}>
                <div className="header__hamburgerProfile">
                    <ClearIcon 
                        fontSize="large"
                        className="header__hamburgerClearIcon"
                        onClick={handleHamburger}
                    />
                    <h3>Hello,</h3>
                    <h2>{user ? user.email : "Guest"}!</h2>
                    <Link to={!user && `/login`}>
                        <p className="header__hamburgerSign" onClick={handleAuthentication}>{user ? "Sign Out" : "Sign In"}</p>
                    </Link>
                </div>
                <div className="header__hamburgerList">
                    <ul>
                        <li onClick={handleHamburger}><Link to="/home#header">Home</Link></li>
                        <li onClick={handleHamburger}><Link to="/orders#header">Returns and Orders</Link></li>
                        <li>My Prime</li>
                        <li onClick={handleHamburger}><Link to="/checkout#header">My Cart</Link></li>
                    </ul>
                </div>
            </div>
            <div id="header" className="header">
                <MenuIcon 
                    fontSize="large"
                    className="header__hamburger"
                    onClick={handleHamburger}
                />
                <Link to="/">
                    <img
                        className="header__logo"
                        src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                        alt="Amazon Logo" />
                </Link>
                <div className="header__search">
                    <input
                        className="header__searchInput"
                        type="text" />
                    <div className="header__searchIconContainer">
                        <SearchIcon 
                            className="header__searchIcon" />
                    </div>
                </div>
                <div className="header__nav">
                    <Link to={!user && `/login`}>
                        <div className="header__option" onClick={handleAuthentication} >
                            <span className="header__optionLineOne">Hello {user ? user.email : "Guest"}</span>
                            <span className="header__optionLineTwo">{user ? "Sign Out" : "Sign In"}</span>
                        </div>
                    </Link>
                    <Link to="/orders">
                        <div className="header__option">
                            <span className="header__optionLineOne">Returns</span>
                            <span className="header__optionLineTwo">& Orders</span>
                        </div>
                    </Link>
                    <div className="header__option">
                        <span className="header__optionLineOne">Your</span>
                        <span className="header__optionLineTwo">Prime</span>
                    </div>
                    <Link to="/checkout">
                        <div className="header__optionBasket">
                            <ShoppingCartIcon />
                            <span className="header__optionLineTwo header__basketCount">{basket?.length}</span>
                        </div>
                    </Link>
                </div>
                <SearchIcon
                    fontSize="large"
                    className="header__searchIconBig"
                />
            </div>
        </>
    )
}

export default Header
