import React from 'react';
import "../css/Product.css";
import { ADD_TO_BASKET } from '../state/ActionTypes';
import { useStateValue } from '../state/StateProvider';

const Product = ({ id, title, price, rating, image }) => {
    const [{}, dispatch] = useStateValue();

    const truncate = str => str.length > 70 ? str.substring(0, 67) + "..." : str;

    const addToBasket = () => {
        dispatch({
            type: ADD_TO_BASKET,
            item: {
                id: id, 
                title: title, 
                price: price, 
                rating: rating, 
                image: image
            }
        })
    }

    return (
        <div className="product">
            <div className="product__info">
                <p>{truncate(title)}</p>
                <p className="product__price">
                    <small>₹</small>
                    <strong>{price}</strong>
                </p>
                <div className="product__rating">
                    { Array(rating).fill().map((_, i) => <p>⭐</p>) }
                </div>
            </div>
            <img
                className="product__image"
                src={image}
                alt="Product Image" />
            <button
                className="product__button"
                onClick={addToBasket} >
                    Add to Basket
            </button>
        </div>
    )
}

export default Product
