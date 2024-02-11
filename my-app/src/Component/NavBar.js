import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../Component/navbar.css'



function NavBar() {


    const location = useLocation();
    const isSearchBar = location.pathname === '/search';

    if (isSearchBar) {
        return null;

    }

    const isLoginPage = location.pathname === '/login';

    if (isLoginPage) {
        return null; 
    
      }
    
      const isRegisterPage = location.pathname === '/register';
    
      if (isRegisterPage) {
          return null; 
      }

      const isProductDetails = location.pathname === '/contact';
    
      if (isProductDetails) {
          return null; 
      }
    return (
        <>
            <nav className="navbar navbar-expand-lg ">
                <div className="container-fluid">
                    <Link to="/home" className="nav-link mr-15px" >HOME</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link to="/About " className="nav-link mr-30px">ABOUT</Link>
                        <Link to="/products" className="nav-link mr-30px" >PRODUCT'S</Link>
                      <Link to="/register" className="nav-link mr-30px">CONTACT</Link>
                        </div>
                    </div>
                </div>
            </nav>

        </>
    );
}

export default NavBar