import React from 'react';
 import './cover.css';
 import { useLocation } from 'react-router-dom';


 
 const HomeCover = () =>{

  const location = useLocation();

  const isSearchBar = location.pathname === '/search';

  if (isSearchBar) {
      return null; 
  
    }

  return(
    <>
    <div id="carouselExampleDark" className="carousel carousel-dark slide">
  
  <div className="carousel-inner">
    <div className="carousel-item active" data-bs-interval="10000">
      <img src="https://cdn.pixabay.com/photo/2016/11/22/21/57/apparel-1850804_640.jpg" className="d-block w-100" alt="slide-1"/>
      <div className="carousel-caption d-none d-md-block">
      <h5>ECOMMERCE</h5>
        <p>Clothes that talk on hrhalf of you.Something for every occassion</p>
      </div>
    </div>
    <div className="carousel-item" data-bs-interval="2000">
      <img src="https://cdn.pixabay.com/photo/2016/04/19/13/39/store-1338629_640.jpg" className="d-block w-100" alt="slide-2"/>
      <div className="carousel-caption d-none d-md-block">
      <h5>ECOMMERCE</h5>
        <p>Clothes that talk on hrhalf of you.Something for every occassion</p>
      </div>
    </div>
    <div className="carousel-item">
      <img src="https://cdn.pixabay.com/photo/2016/11/11/18/42/business-1817472_640.jpg" className="d-block w-100" alt="slide-3"/>
      <div className="carousel-caption d-none d-md-block">
        <h5>ECOMMERCE</h5>
        <p>Clothes that talk on hrhalf of you.Something for every occassion</p>
      </div>
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>



    </>
  )
 }
export default HomeCover;