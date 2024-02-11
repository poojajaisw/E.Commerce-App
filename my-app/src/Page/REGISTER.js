import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import {useNavigate } from 'react-router-dom';
import { useUser } from '../Component/UserToken'; 
import './Login.css';

function REGISTER() {
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    email: '',
    Password: '',
    confirmPassword: '', 
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const { loginUser } = useUser(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    if (formData.Password !== formData.confirmPassword) {
      setError('Password and confirmation password do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        loginUser(data.token); 
        
        setIsSubmitted(true);
        navigate('/login');
        setError('');
      } else {
        const data = await response.json();
        setError(data.error || 'Failed to register User');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Failed to connect to the server.');
    }
  };

  return (
    <div className="googlefont">
      <h4 className="text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '40%', marginLeft: '26%' }}>
        Registation Form <FontAwesomeIcon className="icon shadow-lg p-2 mb-2 bg-body" size="4x" style={{ width: '30px', height: '30px', borderRadius: '50%', marginLeft: '10px' }} icon={faCartShopping} />
      </h4>
      {isSubmitted ? (
        <div className="success-alert text-center text-uppercase pt-4">Registration successful!</div>
      ) : (
        <form onSubmit={handleSubmit} className="register-form">
          <div className="mb-3">
            <label htmlFor="name" className="form-label" style={{ marginLeft: '26%', fontWeight: 'bold', fontSize: '20px' }}>
              Name
            </label>
            <input type="text" className="form-control wider-input" style={{ width: '40%', marginLeft: '26%' }} id="name" required name="name" value={formData.name} onChange={handleInputs} />
          </div>

          <div className="mb-3">
            <label htmlFor="userName" className="form-label" style={{ marginLeft: '26%', fontWeight: 'bold', fontSize: '20px' }}>
              User Name
            </label>
            <input type="text" className="form-control wider-input" style={{ width: '40%', marginLeft: '26%' }} id="userName" required name="userName" value={formData.userName} onChange={handleInputs} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label" style={{ marginLeft: '26%', fontWeight: 'bold', fontSize: '20px' }}>
              Email
            </label>
            <input type="email" className="form-control wider-input" style={{ width: '40%', marginLeft: '26%' }} id="email" required name="email" value={formData.email} onChange={handleInputs} />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label" style={{ marginLeft: '26%', fontWeight: 'bold', fontSize: '20px' }}>
              Password
            </label>
            <input type="password" className="form-control wider-input" style={{ width: '40%', marginLeft: '26%' }} id="Password" required name="Password" value={formData.Password} onChange={handleInputs} />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label" style={{ marginLeft: '26%', fontWeight: 'bold', fontSize: '20px' }}>
              Confirm Password
            </label>
            <input type="password" className="form-control wider-input" style={{ width: '40%', marginLeft: '26%' }} id="confirmPassword" required name="confirmPassword" value={formData.confirmPassword} onChange={handleInputs} />
          </div>

          {error && <div className="error-alert text-center text-uppercase pt-4">{error}</div>}

          <div class="col">
            
              <button type="submit" className="btn btn-primary" style={{ marginLeft: '26%', width: '40%', textDecoration: 0, color: 'white', fontSize: '22px', fontWeight: 'bold' }}>
                SUBMIT
              </button>
            
          </div>
        </form>
      )}
      
        
      
    </div>
  );
}

export default REGISTER;
