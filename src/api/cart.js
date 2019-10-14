import autoApi from './api';

class CartService {
    getCart = () =>{
        return localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): {}
    }
    getCartItems = (cb) =>{
        let cart = this.getCart()
        if(!Object.keys(cart).length === 0){
            autoApi.get(`/carts/${cart.id}`)
            .then((response) => {
                if (response.data.status === 200){
                    cart = response.data.data.cart
                    localStorage.setItem('cart', cart);
                    cb(cart);
                }else if(response.data.status === 404){
                    localStorage.removeItem('cart');
                    cb({});
                }
            }).catch((error) => {
                console.log(error);
                cb(false, null);
            });
        }else{
            cb({})
        }
    }
    addToCart = (item, cb) => {
        let cart = this.getCart()
        let requestData = {...item}
        if(cart.id !== undefined){
            requestData['cart_id'] = cart.id
        }
        autoApi.post(`/carts`, JSON.stringify(requestData))
        .then((response) => {
            if (response.data.status === 201){
                localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                cb(response.data.data.cart);
            }
        }).catch((error) => {
            console.log(error);
            cb(false);
        });
    }
    updateCart = (item, cb) => {
        let cart = this.getCart()
        let requestData = {cart_id: cart.id, ...item}
        autoApi.put(`/carts`, JSON.stringify(requestData))
        .then((response) => {
            if (response.data.status === 200){
                localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                cb(response.data.data.cart);
            }
        }).catch((error) => {
            console.log(error);
            cb(false);
        });
    }
    removeFromCart = (item_id, cb) => {
        let cart = this.getCart()
        autoApi.delete(`/carts/${cart.id}?part_id=${item_id}`)
        .then((response) => {
            if (response.data.status === 200){
                localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                cb(response.data.data.cart);
            }
        }).catch((error) => {
            console.log(error);
            cb(false);
        });
    }
    placeOrder = (cb) => {
        let cart = this.getCart()
        let postData = {
            cart: cart
        }
        autoApi.post(`/orders`, JSON.stringify(postData), {
            headers: {'Authorization': 'Bearer '+ localStorage.getItem('access_token')}
        })
        .then((response) => {
            if (response.data.status === 201){
                localStorage.removeItem('cart')
                cb(response.data.data.order);
            }
        })
        .catch((error) => {
            console.log(error);
            cb(false);
        })
    }
};

export default CartService;
