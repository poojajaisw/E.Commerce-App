import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../Component/UserToken'; 
import './Login.css';

function LOGIN() {
  const [formData, setFormData] = useState({ email: '', password: '' });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const navigate = useNavigate();
  const { loginUser } = useUser(); 

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/login', {
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
        navigate('/shipping');
      } else {
        console.error('Failed to login user');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="googlefont-bg-light" style={{ marginTop: '10%' }}>
      <h4 className="text-center text-uppercase pt-1" style={{ backgroundColor: 'blue', width: '40%', marginLeft: '26%' }}>
        Login <FontAwesomeIcon className="icon shadow-lg p-2 mb-2 bg-body" size="4x" style={{ width: '30px', height: '30px', borderRadius: '50%', marginLeft: '10px' }} icon={faCartShopping} />
      </h4>
      {isSubmitted ? (
        <div className="success-alert text-center text-uppercase pt-4">Login successful!</div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="product" className="form-label" style={{ marginLeft: '26%', fontWeight: 'bold', fontSize: '20px' }}>
              Email
            </label>
            <input type="email" className="form-control wider-input" style={{ width: '40%', marginLeft: '26%' }} id="" required name="email" value={formData.email} onChange={handleInputs} />
          </div>
          <div className="mb-3">
            <label htmlFor="quantity" className="form-label" style={{ marginLeft: '26%', fontWeight: 'bold', fontSize: '20px' }}>
              Password
            </label>
            <input type="password" className="form-control wider-input" style={{ width: '40%', marginLeft: '26%' }} id="" required name="password" value={formData.password} onChange={handleInputs} />
          </div>
          <div class="col">
            <button type="submit" className="btn btn-primary" style={{ marginLeft: '26%', width: '40%', textDecoration: 0, color: 'white', fontSize: '22px', fontWeight: 'bold' }}>
              SUBMIT
            </button>
          </div>
        </form>
      )}
      <p className="register" style={{ marginRight: '8%' }}>
        New User register here/<Link to="/register" className="nav-linkr ">
          {' '}
          Register{' '}
        </Link>
      </p>
    </div>
  );
}

export default LOGIN;
