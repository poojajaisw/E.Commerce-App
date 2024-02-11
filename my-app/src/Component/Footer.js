import React from 'react';
import './Footer.css';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';


function Footer() {
    const location = useLocation();

    
    const isLoginPage = location.pathname === '/login';

    if (isLoginPage) {
        return null;

    }

    const isRegisterPage = location.pathname === '/register';

    if (isRegisterPage) {
        return null;

    }



    const isContact = location.pathname === '/contact';

    if (isContact) {
        return null;

    }


    return (
        <>
            <div className="footer">


                <div className="row">
                    <div className="col-sm">
                        <ul className='list'>
                            <li className="main-point">Women</li>
                            <li className="main-point" >Gouns</li>
                            <li className="main-point" >Saris</li>
                            <li className="main-point" >Jeans</li>
                            <li className="main-point" >Party Wear's</li>
                            <li className="main-point" >Accessories</li>
                        </ul>
                    </div>
                    <div className="col-sm">
                        <ul className='list'>
                            <li className="main-point">Men's</li>
                            <li className="main-point" >T-shart</li>
                            <li className="main-point" >Formal</li>
                            <li className="main-point" >Kurta</li>
                            <li className="main-point" >Soots</li>
                            <li className="main-point" >Accessories</li>
                        </ul>
                    </div>
                    <div className="col-sm">
                        <ul className='list'>
                            <li className="main-point" >Kis's</li>
                            <li className="main-point" >Froks</li>
                            <li className="main-point" >Farty Wears</li>
                            <li className="main-point" >Jeans</li>
                            <li className="main-point" >Accessories</li>
                        </ul>
                    </div>
                    <div class="col-sm">
                        <ul className='list'>
                            <li className="main-point" >Link</li>
                            <li className="main-point" ><FontAwesomeIcon className="card1" icon={faCartShopping} /></li>
                            <li className="main-point" > <FontAwesomeIcon icon={faFacebook} /></li>
                            <li className="main-point" ><FontAwesomeIcon icon={faInstagram} /></li>
                            <li className="main-point" ><FontAwesomeIcon icon={faTwitter} /></li>

                        </ul>
                    </div>


                </div>
            </div>

        </>
    );
};

export default Footer;
