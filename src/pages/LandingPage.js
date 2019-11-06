import React, { Component } from 'react';
import Parts from '../components/Parts';
import Promotion from '../components/Promotion';
import Brands from '../components/Brands';
import Stores from '../components/Stores';
import Categories from '../components/Categories';
import Contact from '../components/Contact';
import Slider from '../components/Slider';

class LandingPage extends Component {
    render(){
        return (
            <div className='landing'>
                <Slider />
                <Categories />
                <Parts />
                <Promotion />
                <Stores location={this.props.location}/>
                <Brands />
                <Contact />
            </div>
        );
    }
}

export default LandingPage;