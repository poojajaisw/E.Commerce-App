import React from 'react';
import { BrowserRouter as Router, Route, Routes  } from 'react-router-dom';
import Header from './Component/Header';
import NavBar from './Component/NavBar';
import Footer from './Component/Footer';
import HOME from './Page/HOME';
import ABOUT from './Page/ABOUT';
import LOGIN from './Page/LOGIN';
import REGISTER from'./Page/REGISTER';
import ProductList from './Page/ProductList';
import SingleProduct from'./Page/SingleProduct';
import Order from './Page/Order'
import Cart from './Component/Cart'
import Shipping from './Page/Shipping'
import PaymentPage from './Page/PaymentPage'






function App () {

  return(
<>
<Router>
<Header />
<NavBar />

      
      <Routes>
      <Route exact path="/" element={<HOME />}></Route>
      <Route exact path="/About" element={<ABOUT />}></Route>
      <Route exact path="/login" element={<LOGIN />}></Route>
      <Route exact path="/home" element={<HOME />}></Route>
      <Route exact path="/register" element={<REGISTER />}></Route>
      <Route exact path="/products" element={<ProductList/>}></Route>
      <Route exact path="/products/:id" element={<SingleProduct/>}></Route>
      <Route exact path="/cart" element={<Cart/>}></Route>
      <Route exact path="/order" element={<Order/>}></Route>
      <Route exact path="/shipping" element={<Shipping/>}></Route>
      <Route exact path="/payment" element={<PaymentPage/>}></Route>





      </Routes>
      <Footer />
      </Router>
      

</>
  )

};

export default App;