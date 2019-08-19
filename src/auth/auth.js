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
    getCurrentUser = () => {
        let user = JSON.parse(localStorage.getItem('user'));
        return user;
    }
    signout = (cb) => {
        localStorage.removeItem('access_token');
        cb();
    }
};

export default AuthService;