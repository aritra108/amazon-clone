import React from 'react';
import "../css/Checkout.css";
import { useStateValue } from '../state/StateProvider';
import CheckoutProduct from './CheckoutProduct';
import Subtotal from './Subtotal';

const Checkout = () => {
    const [{ user, basket }, dispatch] = useStateValue();

    return (
        <div className="checkout">
            <div className="checkout__left">
                <img
                    className="checkout__ad"
                    src="https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg"
                    alt="Checkout Ad" />
                <div> 
                    <h3 className="checkout__welcomeUser">Hello, {user ? user.email : "Guest"}!</h3>
                    <h2 className="checkout__title">Your Shopping Cart</h2>
                    {basket.length > 0 ? (
                        basket.map(item => (
                            <CheckoutProduct 
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                price={item.price}
                                rating={item.rating}
                                image={item.image}
                            />
                        ))
                    ) : (
                        <h1 className="checkout__empty">Your Cart is Empty!</h1>
                    )}
                </div>
            </div>
            <div className="checkout__right">
                <Subtotal />
            </div>
        </div>
    )
}

export default Checkout
