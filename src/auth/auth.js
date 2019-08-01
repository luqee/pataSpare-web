class AuthService {
    isAuthenticated = () => {
        let token = localStorage.getItem('access_token');
        if (token !== null){
            return true;
        }
        return false;
    }
    // authenticate = (cb) => {
    //     this.isAuthenticated = true;
    //     setTimeout(cb, 100); // fake async
    // }
    signout = (cb) => {
        localStorage.removeItem('access_token');
        cb();
    }
};

export default AuthService;