import React, { useState } from 'react';
import { Link , useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';
import '../Header.css';
import {useSelector} from "react-redux";





const Header = () => {


    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/search?q=${searchQuery}`);
            setSearchResults(response.data);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        if (searchQuery) {
            fetchData();
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          handleSearchClick();
        }
      };

   
      const state = useSelector((state)=> state.handleCart)


      const location = useLocation();
      const isLoginPage = location.pathname === '/login';

if (isLoginPage) {
    return null; 

  }

  const isRegisterPage = location.pathname === '/register';

  if (isRegisterPage) {
      return null; 
  
    }
    const iscontactPage = location.pathname === '/contact';

  if (iscontactPage) {
      return null; 
  
    }
    
    return (
        <>
       
            <nav className="navbar navbar-light ">
                <div className="container">
                    <h3 className="navbar-brand"><samp>E</samp>commerce</h3>
                    <input className="form-controlheader me-5" type="text" placeholder="Search products..." aria-label="Search" value={searchQuery} onChange={handleSearchChange} onKeyPress={handleKeyPress} />
                    <Link to="/search"> <button className="btn1 btn-outline-success" onClick={handleSearchClick}>Search</button></Link>
                    <button className="btnlogin" type="submit"><Link to="/login" className="btn btn-outline-success" >LOGIN</Link></button>
                    <button className='cart'><Link to ="/cart"><FontAwesomeIcon className="icon " icon={faCartShopping} />({state.length})</Link></button>
                 
                </div>
            </nav>

            <ul className='CartUl'>
                        {searchResults.map((result) => (
                            <li className='CartLi' key={result._id}>
                                {result.name}
                                <img src={result.imageUrl} alt={result.name} className='search-img'/>
                                <h3 className='result'>{result.name}</h3>
                                <p>${result.price}</p>
                                <p>{result.description}</p>
                                
                            </li>
                        ))}
                    </ul>
        </>
    );
}

export default Header