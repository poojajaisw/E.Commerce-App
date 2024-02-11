import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../Redux/action/index';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './cart.css';
import ReviewPage from './ReviewPage';
import ReviewForm from './ReviewForm';

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [productId, setProductId] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

  const dispatch = useDispatch();
  const addProduct = (product) =>{
    dispatch(addCart(product))
  }

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await fetch(`http://localhost:8080/products/${id}`);
        const productData = await response.json();
        setProduct(productData);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleProductClick = (selectedProductId) => {
    setProductId(selectedProductId);
    setShowReviews(true);
  };

  const handleAddToCart = () => {
    if (product.customId) {
      dispatch(addCart(product));
    } else {
      console.error('Product ID is missing or invalid.');
    }
  };

  const Loading = () => <div>Loading....</div>;

  const ShowProduct = () => (
    <>
      <h1 className='shadow-lg p-3 mb-5 bg-body rounded text-center'>LATEST PRODUCT SHOP NOW.</h1>
      <div className='container'>
        <div className='row'>
          <div className='col-4'>
            {product.image ? (
              <img src={product.image} className='shadow-lg p-3 mb-5 card-img-top' alt={product.title} />
            ) : (
              <p>No image available</p>
            )}
          </div>
          <div className='col-4 shadow-lg p-3 mb-5'>
            <h5 className='card-titleH5'>Name : {product.name}</h5>
            <p className='card-text '>Price : ${product.price}</p>
            <h5 className='card-title'>Description : {product.description}</h5>
            <button className='btn btn-primary px-4 py-2' onClick={()=>addProduct(product)}>
              Add to Cart
            </button>
            <Link to='/cart' className='btn btn-primary ms-2 px-3 py-2'>
              Go to Cart
            </Link>
            <button className='btn btn-link' onClick={() => handleProductClick(product.customId)}>
              Show Reviews
            </button>
          </div>
          <div className='col-4 shadow-lg p-3 mb-5'>
            {showReviews && productId === product.customId && (
              <div>
                <ReviewPage customId={productId} />
                <ReviewForm customId={productId} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );

  return <div className='container'>{loading ? <Loading /> : <ShowProduct />}</div>;
};

export default Product;
