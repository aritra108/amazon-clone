import React, { useEffect, useState } from 'react';
import "../css/Payment.css";
import { useStateValue } from '../state/StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from '../state/reducer';
import axios from '../axios';
import { EMPTY_BASKET } from '../state/ActionTypes';
import { db } from "../firebase";
import NoUser from './NoUser';

const Payment = () => {
    const [{basket, user}, dispatch] = useStateValue();

    const stripe = useStripe();
    const elements = useElements();

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState("");
    const history = useHistory();

    useEffect(() => { // Generate a separate client secret whenever the basket is modified 
        const getClientSecret = async () => { 
            const response = await axios({
                method: "post",
                url: `/payments/create?total=${getBasketTotal(basket) * 100}` // Stripe expects the currency in subunits
            });
            setClientSecret(response.data.clientSecret); 
        }
        getClientSecret();
    }, [basket]);

    const handleSubmit = async e => {
        e.preventDefault();
        setProcessing(true);

        const payload = await stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            })
            .then(({ paymentIntent }) => {
                // paymentIntent is the payment confirmation
                db
                    .collection("users")
                    .doc(user?.uid)
                    .collection("orders")
                    .doc(paymentIntent.id)
                    .set({
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created
                    })

                setSucceeded(true);
                setError(null);
                setProcessing(false);

                dispatch({
                    type: EMPTY_BASKET
                });

                history.replace("/orders"); // The user will not be able to come back to the Payments page after pressing the back button of fthe user
            });
    }

    const handleChange = e => {
        setDisabled(e.empty); // if the event is empty, then set disabled to true 
        setError(e.error ? e.error.message : ""); // if there is an error, set the error to that error message
    }

    return (
        user ? (
            <div className="payment">
                <div className="payment__container">
                    <h1>
                        Checkout (<Link to="/checkout">{basket?.length} items</Link>)
                    </h1>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Delivery Address</h3>
                        </div>
                        <div className="payment__address">
                            <p>{user?.email}</p>
                            <p>123, React Lane</p>
                            <p>Los Angeles, CA</p>
                        </div>
                    </div>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Review Items and Delivery</h3>
                        </div>
                        <div className="payment__items">
                            {basket.map(item => (
                                <CheckoutProduct
                                    key={item.id}
                                    id={item.id}
                                    title={item.title}
                                    price={item.price}
                                    rating={item.rating}
                                    image={item.image} 
                                />
                            ))}
                        </div>
                    </div>
                    <div className="payment__section">
                        <div className="payment__title">
                            <h3>Card Payment</h3>
                        </div>
                        <div className="payment__details">
                                <form onSubmit={handleSubmit}>
                                    <CardElement onChange={handleChange} />
                                    <div className="payment__priceContainer">
                                        <CurrencyFormat
                                            renderText={value => (
                                                <h4>Order Total: {value}</h4>
                                            )}
                                            decimalScale={2}
                                            value={getBasketTotal(basket)}
                                            displayType={"text"}
                                            thousandSeparator={true}
                                            prefix={"₹"}
                                        />
                                        <button disabled={processing || disabled || succeeded}>
                                            <span>{processing ? <p>Processing</p> : "Pay Now"}</span>
                                        </button>
                                    </div>
                                    {error && <div>{error}</div>}
                                </form>
                        </div>
                    </div>
                </div>
            </div>
        ) : (
            <NoUser />
        )
    )
}

export default Payment
