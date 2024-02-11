import React, { useEffect, useState } from 'react';
//import axios from 'axios';
import '../Component/Cart.css'
import ProductItem from '../Component/ProductItem';
import { useCart } from '../Component/Cart_Context';

const ProductList = () => {
    const { dispatch } = useCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
      // Backend se products fetch karne ke liye API request bhejein
      fetch('http://localhost:8080/getproducts') // Replace with your API endpoint
        .then((response) => response.json())
        .then((data) => setProducts(data))
        .catch((error) => console.error('Error fetching products:', error));
    }, []);


    const handleAddToCart = (product) => {
        dispatch({ type: 'ADD_TO_CART', payload: product });
    };

    return (
        <>
            <h2 className='text-center text-uppercase '>SHOPPING PRODUCT'S</h2>
            <div className="product-list shadow-lg">
                {products.map((product) => (
                    <ProductItem key={product.productId} product={product} onAddToCart={handleAddToCart} />
                ))}
            </div>
        </>
    );
};



export default ProductList;
