import React, { useEffect, useState } from 'react';
import "../css/Orders.css";
import { db } from '../firebase';
import { useStateValue } from '../state/StateProvider';
import NoUser from './NoUser';
import Order from './Order';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [{ user }, dispatch] = useStateValue();

    useEffect(() => {
        if(user) {
            db
            .collection("users")
            .doc(user?.uid)
            .collection("orders")
            .orderBy("created", "desc")
            .onSnapshot(snapshot => {
                setOrders(snapshot.docs.map( doc => ({ id: doc.id, data: doc.data() }) ))
            })
        } else {
            setOrders([]);
        }
    }, [user]);

    return (
        user ? (
            <div className="orders">
                <h1 className="orders__title">My Orders</h1>
                <div className="orders__order"> 
                    {orders?.map(order => (
                        <Order key={order.id} order={order} />
                    ))}
                </div>
            </div>
        ) : (
            <NoUser />
        )
    )
}

export default Orders
