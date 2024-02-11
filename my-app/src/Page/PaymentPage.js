import React, { useState, useEffect } from 'react';
import { useUser } from '../Component/UserToken';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faMoneyBill } from '@fortawesome/free-solid-svg-icons';


const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [newPaymentMethod, setNewPaymentMethod] = useState({
    cardNumber: '',
    cardHolderName: '',
    expirationDate: '',
    cvv: '',
  });

  const navigate = useNavigate();
  const { userToken } = useUser(); 
  

  useEffect(() => {
    // Fetch payment methods when the component mounts
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch('http://localhost:8080/payment', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentMethods(data);
      } else {
        console.error('Failed to fetch payment methods');
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error in fetchPaymentMethods:', error);
      // Handle other types of errors
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPaymentMethod({
      ...newPaymentMethod,
      [name]: value,
    });
  };

  const handleAddPaymentMethod = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`,
        },
        body: JSON.stringify(newPaymentMethod),
      });

      if (response.ok) {
        console.log('Payment method added successfully');
        navigate('/order');
        fetchPaymentMethods();
      } else {
        console.error('Failed to add payment method');
        // Handle error, e.g., show an error message
      }
    } catch (error) {
      console.error('Error in handleAddPaymentMethod:', error);
      // Handle other types of errors
    }
  };

  return (
    <div>
       <br />
         <br />
      <h2 className="text-center text-uppercase pt-4" style={{backgroundColor:'blue', width:'40%', marginLeft:'26%'}}>Payment<FontAwesomeIcon className="icon shadow-lg p-2 mb-2 bg-body"  size="4x" style={{width:"30px" ,height:"30px",borderRadius:'50%', marginLeft:"10px"}} icon={faCartShopping} /></h2>

      <ul>
        {paymentMethods.map((paymentMethod) => (
          <li key={paymentMethod._id}>
            Card: {paymentMethod.cardNumber}, Expiry: {paymentMethod.expirationDate}
         
          </li>
        ))}
      </ul>

      <h4 className="text-center text-uppercase pt-1" style={{ width:'40%', marginLeft:'26%'}}>Add The New Payment <FontAwesomeIcon className="icon shadow-lg p-2 mb-2 bg-body"  size="4x" style={{width:"30px" ,height:"30px",borderRadius:'50%', marginLeft:"10px"}} icon={faMoneyBill} /></h4>

      <form onSubmit={handleAddPaymentMethod}>
      <label htmlFor="product" className="form-label"  style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}>Card No.</label>
          
          <input type="text" className="form-control wider-input" style={{ width:'40%', marginLeft:'26%'}}  name="cardNumber" value={newPaymentMethod.cardNumber} onChange={handleInputChange} />
        

          <label htmlFor="product" className="form-label"  style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}>Card Holder Name</label>
          
          <input  type="text" className="form-control wider-input" style={{ width:'40%', marginLeft:'26%'}} name="cardHolderName" value={newPaymentMethod.cardHolderName} onChange={handleInputChange} />
        

          <label htmlFor="product" className="form-label"  style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}> Expiration Date</label>
         
          <input type="text" className="form-control wider-input" style={{ width:'40%', marginLeft:'26%'}}  name="expirationDate" value={newPaymentMethod.expirationDate} onChange={handleInputChange}  />
        
          <label htmlFor="product" className="form-label"  style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}>CVV</label>
          
          
          <input  type="text" className="form-control wider-input" style={{ width:'40%', marginLeft:'26%'}}  name="cvv" value={newPaymentMethod.cvv} onChange={handleInputChange}/>
        
          <br />
          <div class="col">
          <button type="submit" className="btn btn-primary" style={{marginLeft:'26%',width:'40%',textDecoration:0,color:'white', fontSize:'22px',fontWeight:'bold'}}>Payment</button>
          </div>
        
      </form>
      <br />
         <br />
         <br />
         <br />
    </div>
  );
};

export default PaymentMethods;

