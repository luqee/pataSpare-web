import {useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga';

function RouteTracker(props) {
    const location = useLocation()
    useEffect(()=>{
        logPageChange(location.pathname + location.search)
    }, [location])

    const logPageChange = (page)=>{
        const { location } = window
        ReactGA.set({
            page,
            location: `${location.origin}${page}`,
        })
        ReactGA.pageview(page)
    }

    return null
}

const init = (options = {}) => {
    const isGAEnabled = !!process.env.REACT_APP_GA_TRACKING_ID
    if (isGAEnabled) {
        ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
            debug: 'true',
            ...options
        }
        )
    }

    return isGAEnabled
}
const recordNumberView = () =>{
    ReactGA.event({
        category: 'Number',
        action: 'View Phone Number'
    })
}
const recordDirectionsView = () =>{
    ReactGA.event({
        category: 'Directions',
        action: 'View Directions'
    })
}
export default {
    RouteTracker,
    init,
    recordNumberView,
    recordDirectionsView
}