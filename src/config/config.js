import { useMediaQuery } from 'react-responsive'

// const urls = {
    //     hostRoot: `${process.env.REACT_APP_BACKEND_URL}`,
    //     baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
    //     userRegister: `/auth/register`,
    //     userLogin: `/auth/login`,
    //     dealerHome: `/dealer`,
    //     emailResend: `/auth/email/resend`
    // }
    
    // export default urls;
    
const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 992 })
  return isDesktop ? children : null
}
const Tablet = ({ children }) => {
  const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 991 })
  return isTablet ? children : null
}
const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 })
  return isMobile ? children : null
}
const Default = ({ children }) => {
  const isNotMobile = useMediaQuery({ minWidth: 768 })
  return isNotMobile ? children : null
}

export {
  Desktop,
  Tablet,
  Mobile,
  Default
}