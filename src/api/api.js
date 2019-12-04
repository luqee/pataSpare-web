import axios from 'axios';
import urls from '../config/config';
import { useMediaQuery } from 'react-responsive'

const autoAPI = axios.create({
  baseURL: urls.baseURL,
  headers: {'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest'}
});

export default autoAPI;

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