import React from 'react';
import "../css/Footer.css";

const Footer = () => {
    return (
        <div className="footer">
            <a href="#top">
                <div className="footer__backToTop">
                    <small>Back To Top</small>
                </div>
            </a>
            <div className="footer__nav">
                <div className="footer__navContainer">
                    <div className="footer__column">
                        <h4>Get to Know Us</h4>
                        <ul>
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Press Releases</li>
                            <li>Amazon Cares</li>
                            <li>Gift a Smile</li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <h4>Connect With Us</h4>
                        <ul>
                            <li>Facebook</li>
                            <li>Instagram</li>
                            <li>Twitter</li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <h4>Make Money With Us</h4>
                        <ul>
                            <li>Sell on Amazon</li>
                            <li>Become an Affiliate</li>
                            <li>Advertise your Products</li>
                            <li>Fulfilment by Amazon</li>
                            <li>Amazon Pay on Merchants</li>
                        </ul>
                    </div>
                    <div className="footer__column">
                        <h4>Let Us Help You</h4>
                        <ul>
                            <li>COVID-19 and Amazon</li>
                            <li>Your Account</li>
                            <li>Returns Center</li>
                            <li>100% Purchase Protection</li>
                            <li>Help</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className="footer__terms">
                <div className="footer__termsContainer">
                    <p>Conditions of Use & Sale</p>
                    <p>Privacy Notice</p>
                    <p>Interest-Based Ads</p>
                    <p>&copy; 2021, Amazon Clone</p>
                </div>
            </div>
        </div>
    )
}

export default Footer;
