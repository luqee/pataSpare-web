
const urls = {
    hostRoot: `${process.env.REACT_APP_BACKEND_URL}`,
    baseURL: `${process.env.REACT_APP_BACKEND_URL}/api/v1`,
    userRegister: `/auth/register`,
    userLogin: `/auth/login`,
    dealerHome: `/dealer`,
    emailResend: `/auth/email/resend`
}

export default urls;
