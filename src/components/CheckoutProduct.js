import React from 'react';
import "../css/CheckoutProduct.css";
import { REMOVE_FROM_BASKET } from '../state/ActionTypes';
import { useStateValue } from '../state/StateProvider';

const CheckoutProduct = ({id, title, price, rating, image, hideButton}) => {
    const [{ basket }, dispatch] = useStateValue();
    
    const removeFromBasket = () => {
        dispatch({
            type: REMOVE_FROM_BASKET,
            id: id
        });
    }

    return (
        <div className="checkoutProduct">
            <div className="checkoutProduct__left">
                <img 
                    className="checkoutProduct__image"
                    src={image} />
            </div>
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__title">{title}</p>
                <p className="checkoutProduct__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="checkoutProduct__rating">
                    { Array(rating).fill().map((_, i) => <p>⭐</p>) }
                </div>
                {!hideButton && <button onClick={removeFromBasket}>Remove from Basket</button>}
            </div>
        </div>
    )
}

export default CheckoutProduct
