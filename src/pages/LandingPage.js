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
                <title>PataSpare - Home</title>
                <meta name="description" content="Your one stop store for your auto parts needs" />
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