import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '../Component/UserToken'; 

const ShippingForm = () => {
  const [formData, setFormData] = useState({
    recipientName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: '',
    contactEmail: '',
    contactPhone: '',
  });

  const navigate = useNavigate();
  const { userToken } = useUser(); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/shipping/:customId', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userToken}`, 
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Shipping information saved successfully');
        navigate('/payment');
      } else {
        console.error('Failed to save shipping information');
      }
    } catch (error) {
      console.error('Internal Server Error', error);
    }
  };

  


  return (
    <div>
        
        <h2 className="text-center text-uppercase pt-4" style={{backgroundColor:'blue', width:'40%', marginLeft:'26%', marginTop:'5%'}}>Shipping Form <FontAwesomeIcon className="icon shadow-lg p-2 mb-2 bg-body"  size="4x" style={{width:"30px" ,height:"30px",borderRadius:'50%', marginLeft:"10px"}} icon={faCartShopping} /></h2>

      <form onSubmit={handleSubmit}>
      <label htmlFor="product" className="form-label"  style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}> Recipient Name</label>
         
          <input  type="text" className="form-control wider-input"   name="recipientName"  value={formData.recipientName} onChange={handleInputChange} style={{ width:'40%', marginLeft:'26%'}} />
        

          <label htmlFor="product" className="form-label" style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}>Address</label>
         
          <input type="text" className="form-control wider-input" name="address" value={formData.address} onChange={handleInputChange}  style={{ width:'40%', marginLeft:'26%'}} />
        
          <label htmlFor="product" className="form-label" style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}>City</label>
        
          
          <input type="text" name="city" className="form-control wider-input" value={formData.city} onChange={handleInputChange}  style={{ width:'40%', marginLeft:'26%'}} />
        

          <label htmlFor="product" className="form-label" style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}>State</label>
          
          <input type="text" className="form-control wider-input" name="state" value={formData.state} onChange={handleInputChange}  style={{ width:'40%', marginLeft:'26%'}} />
        

          <label htmlFor="product" className="form-label" style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}>Postal Code</label>
          
          <input type="text" className="form-control wider-input" name="postalCode"  value={formData.postalCode}  onChange={handleInputChange}  style={{ width:'40%', marginLeft:'26%'}} />

          <label htmlFor="product" className="form-label" style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}>Country</label>
          
          <input type="text" className="form-control wider-input" name="country" value={formData.country} onChange={handleInputChange} style={{ width:'40%', marginLeft:'26%'}} />
        

          <label htmlFor="product" className="form-label" style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}>Contact Email </label>
          
          <input   type="email" className="form-control wider-input" name="contactEmail" value={formData.contactEmail} onChange={handleInputChange}  style={{ width:'40%', marginLeft:'26%'}} />
        

          <label htmlFor="product" className="form-label" style={{  marginLeft:'26%', fontWeight:'bold', fontSize:'20px'}}>Contact No.</label>
          
          <input type="tel" className="form-control wider-input" name="contactPhone"  value={formData.contactPhone}   onChange={handleInputChange}  style={{ width:'40%', marginLeft:'26%'}} />
        
          <br />
          <div class="col">
            <button type="submit" className="btn btn-primary" style={{marginLeft:'26%',width:'40%',textDecoration:0,color:'white', fontSize:'22px',fontWeight:'bold'}}>SUBMIT</button></div>
        
      </form>
      <br />
      <br />
    </div>
  );
};

export default ShippingForm;
