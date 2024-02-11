import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addCart } from '../Redux/action/index'; 

import './cart.css';

const Products = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(data);
  const [loading, setLoading] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);

  const dispatch = useDispatch(); 

  let componentMounted = true;

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      const response = await fetch('http://localhost:8080/products');

      if (componentMounted) {
        const responseData = await response.json();
        setData(responseData);
        setFilter(responseData);
        setLoading(false);
      }

      return () => {
        componentMounted = false;
      };
    };

    getProducts();
  }, []);

  const filterProduct = (category) => {
    const filteredData = data.filter((product) => product.category === category);
    setFilter(filteredData);
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
  };

  const handleAddToCart = () => {
    if (selectedProductId) {
      const selectedProduct = data.find((product) => product.customId === selectedProductId);

      if (selectedProduct) {
        
        dispatch(addCart(selectedProduct.customId));
      }
    } else {
      console.error('No product selected.');
    }
  };

  const Loading = () => {
    return <div>Loading....</div>;
  };

  const ShowProducts = () => {
    return (
      <>
        <nav className="navbar navbar-light bg-black">
          <div className="buttons d-flex justify-content-center mb-10 pb-10" style={{marginLeft:'32%'}}>
            <button className="btn btn-outline-dark me-5 " onClick={() => setFilter(data)}>
              All
            </button>
            <button className="btn btn-outline-dark me-5 " onClick={() => filterProduct("men's clothing")}>
              Men's Wear
            </button>
            <button className="btn btn-outline-dark me-5 " onClick={() => filterProduct("women's clothing")}>
              Women's Wear
            </button>
            <button className="btn btn-outline-dark me-5 " onClick={() => filterProduct('jewelry')}>
              Jewelry
            </button>
            <button className="btn btn-outline-dark me-5 " onClick={() => filterProduct('electronics')}>
              Electronics
            </button>
          </div>
        </nav>
        <div className="row">
          <h1 className="shadow-lg p-3 mb-5 bg-body rounded text-center">LATEST PRODUCT SHOP NOW.</h1>
          {filter.map((product) => (
            <div key={product.customId} className="col-md-3">
              <div className="card shadow-lg p-3 mb-5">
                <img
                  src={product.image}
                  className="shadow-lg p-3 mb-5 card-img-top"
                  alt={product.title}
                />
                <h5 className="card-title5">Name : {product.name}</h5>
                <div className="card-body">
                  <p className="card-text">Price : ${product.price}</p>
                  <h5 className="card-title">Description : {product.description}</h5>
                  <Link
                    to={`/products/${product.customId}`}
                    className="btn btn-primary"
                    onClick={() => handleProductClick(product.customId)}
                  >
                    View Details
                  </Link>
                  <button className="btn btn-primary ms-2" onClick={handleAddToCart}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  return <div>{loading ? <Loading /> : <ShowProducts />}</div>;
};

export default Products;
