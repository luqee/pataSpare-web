import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import exterior from '../images/exterior.png';
import interior from '../images/interior.png';
import performance from '../images/performance.png';
import accessories from '../images/accessories.png';
class LandingPage extends Component {
    render(){
        return (
            <div className='landing'>
                <div className='banner'>
                    <p>The Textbook Platform for Auto Parts Business</p>
                    <p>The best eCommerce solution for auto parts</p>
                </div>
                <div className='search-bar'>
                    <form className="example" action="action_page.php">
                        <input type="text" placeholder="Search.." name="search" />
                        <button type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                    </form>
                </div>
                <div className='categories'>
                    <div className='category'>
                        <img src={exterior} alt='exterior' />
                        <p>EXTERIOR</p>
                    </div>
                    <div className='category'>
                        <img src={interior} alt='exterior' />
                        <p>INTERIOR</p>
                    </div>
                    <div className='category'>
                        <img src={performance} alt='exterior' />
                        <p>PERFORMANCE</p>
                    </div>
                    <div className='category'>
                        <img src={accessories} alt='exterior' />
                        <p>ACCESSORIES</p>
                    </div>
                </div>
                <div className=''></div>
            </div>
        );
    }
}

export default LandingPage;