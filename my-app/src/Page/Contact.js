import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    <div className='googlefont'>
      <h2 className='text-center text-uppercase pt-4'>User Registration Form</h2>
      {isSubmitted ? (
        <div className="success-alert text-center text-uppercase pt-4">Registration successful!</div>
      ) : (
        <form onSubmit={handleSubmit} className="register-form"  >
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control wider-input" id="name" required name="name" value={formData.name} onChange={handleInputs} />
          </div>

          <div className="mb-3">
            <label htmlFor="userName" className="form-label">User Name</label>
            <input type="text" className="form-control wider-input" id="userName" required name="userName" value={formData.userName} onChange={handleInputs} />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-control wider-input" id="email" required name="email" value={formData.email} onChange={handleInputs} />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control wider-input" id="Password" required name="Password" value={formData.Password} onChange={handleInputs} />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control wider-input" id="confirmPassword" required name="confirmPassword" value={formData.confirmPassword} onChange={handleInputs} />
          </div>

          {error && <div className="error-alert text-center text-uppercase pt-4">{error}</div>}

          <div className='d-grid'>
            <button type="submit" className="btn btn-primary" >Submit</button>
          </div>
        </form>
      )}
    </div>
  );
}

export default REGISTER;
