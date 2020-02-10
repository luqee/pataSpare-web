import React, { Component } from 'react';
import Parts from '../components/Parts';
import Promotion from '../components/Promotion';
import Brands from '../components/Brands';
import Stores from '../components/Stores';
import Categories from '../components/Categories';
import Contact from '../components/Contact';
import Slider from '../components/Slider';
import {Helmet} from 'react-helmet';

class LandingPage extends Component {
    render(){
        return (
            <div className='landing'>
                <Helmet>
                <title>PataSpare | Your one stop solution for your auto parts needs </title>
                <meta name="description" content="Source for your spareparts from a wide selection of auto part dealers. Quality parts, timely delivery and overall top service are our top priority." />
                </Helmet>
                <Slider />
                <Categories />
                <Parts />
                <Promotion />
                <Stores location={this.props.location}/>
                <Brands />
                <Contact history={this.props.history} />
            </div>
        );
    }
}

export default LandingPage;