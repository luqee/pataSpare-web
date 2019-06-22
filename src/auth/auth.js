const AuthService = {
    isAuthenticated(){
        let token = localStorage.getItem('access_token');
        if (token !== null){
            return true;
        }
        return false;
    },
    authenticate(cb) {
        this.isAuthenticated = true;
        setTimeout(cb, 100); // fake async
    },
    signout(cb) {
        this.isAuthenticated = false;
        setTimeout(cb, 100);
    }
};

export default AuthService;