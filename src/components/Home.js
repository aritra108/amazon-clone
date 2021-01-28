import React, { useEffect, useState } from 'react';
import "../css/Home.css";
import imageURLs from '../imageURLs';
import Product from './Product';
import ProductList from './ProductList';

const Home = () => {
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex(index => (index + 1) % imageURLs.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div id="home" className="home">
            <img
                className="home__image"
                src={imageURLs[index]}
                alt="Banner Image" 
            />
            <div className="home__gridContainer">
                <ProductList />
            </div>
        </div>
    )
}

export default Home
