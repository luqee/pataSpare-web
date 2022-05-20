import Helmet from "react-helmet";
import ImageSlider from "../components/ImageSlider";
import Categories from '../components/Categories'
import Parts from "../components/Parts";
import Promotion from "../components/Promotion";
import Stores from "../components/Stores";
import Brands from "../components/Brands";

export default function LandingPage(){
    return (
        <div className='landing'>
            <Helmet>
            <title>PataSpare | Your one stop solution for your auto parts needs </title>
            <meta name="description" content="Source for your spareparts from a wide selection of auto part dealers. Quality parts, timely delivery and overall top service are our top priority." />
            </Helmet>
            <ImageSlider />
            <Categories />
            <Parts />
            <Promotion />
            <Stores />
            <Brands />
        </div>
    )
}