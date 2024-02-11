import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import {useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { delCart, incItem, decItem } from '../Redux/action/index';


const Cart = () => {
  const cartItems = useSelector((state) => state.handleCart);
  const dispatch = useDispatch();

  const handleRemoveItem = (customId) => {
    dispatch(delCart({ customId }));
  };

  const handleIncrement = (customId) => {
    dispatch(incItem({ customId }));
  };

  const handleDecrement = (customId) => {
    dispatch(decItem({ customId }));
  };

  return (
    <>
    <div>
      <h1 className="shadow-lg p-3 mb-5 bg-body rounded text-center">Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <p className="shadow-lg p-3 mb-5 bg-body rounded text-center">Your cart is empty</p>
      ) : (
        <ul>

          {cartItems.map((item) => (
            <div key={item.customId}>

              <div class="container">
                <div class="row">
                  <div class="col">
                    <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px' }} />
                    <div className="card-body">
                      <span>{item.name}</span>
                    </div>
                  </div>
                  <div class="col"> <span>Price: ${item.price}</span></div>
                  <div class="col">
                    <button className='button' style={{ width: '40px' }} onClick={() => handleIncrement(item.customId)}>+</button>
                    <span><button className='button' style={{ width: '30px' }}>{item.qty}</button></span>
                    <button className='button' style={{ width: '40px' }} onClick={() => handleDecrement(item.customId)}>-</button>
                  </div>
                  <div class="col"> <span>Total: ${item.qty * item.price}</span></div>
                  <div class="col"> <button className='button' style={{ color: 'red' }} onClick={() => handleRemoveItem(item.customId)}><FontAwesomeIcon icon={faTrash} /></button></div>
                </div>

              </div>
            </div>

          ))}
        </ul>

      )}
    </div>
     <div class="col"><Link to="/login"><button type="submit" className="btn btn-success" style={{marginLeft:'28%',width:'40%',textDecoration:0,color:'white'}}>Place the Order</button></Link></div>
       <br />
       <br />
       
       
        </>
  );

};

export default Cart;
