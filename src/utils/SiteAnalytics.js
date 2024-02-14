'use client'
import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import ReactGA from 'react-ga';
import PropTypes from 'prop-types'

const SiteAnalytics = (props)=> {
    const pathname = usePathname()
    const searchParams = useSearchParams()
 
    useEffect(() => {
        logUrlChange()
    }, [pathname, searchParams])

    const logUrlChange = ()=>{
        console.log('URL changed');
        const page = `${pathname}?${searchParams}`
        console.log(page);
        
        const { location } = window
        ReactGA.set({
            page,
            location: `${location.origin}${page}`,
            ...props.options
        })
        ReactGA.pageview(page)
    }

  return null
}

SiteAnalytics.propTypes = {
    location: PropTypes.shape({
        pathname: PropTypes.string,
        search: PropTypes.string
    }).isRequired,
    options: PropTypes.object
}

const init = (options = {}) => {
    const isGAEnabled = !!process.env.NEXT_PUBLIC_GA_TRACKING_ID
    if (isGAEnabled) {
        ReactGA.initialize(process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
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
    SiteAnalytics,
    init,
    recordNumberView,
    recordDirectionsView
}