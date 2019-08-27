import autoApi from './api';

class CartService {
    getCart = (cb) =>{
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): {};
        console.log('the cart is ...');
        console.log(cart);
        if(cart !== {}){
            autoApi.get(`/carts/${cart.id}`)
            .then((response) => {
                if (response.data.status === 200){
                    localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                    localStorage.setItem('cart_items', JSON.stringify(response.data.data.cart_items));
                    cb(true);
                    // return response.data.data.cart;
                }
            }).catch((error) => {
                console.log(error);
            });
        }
        return cart;
    }
    addToCart = (item, cb) => {
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): {};
        console.log('the cart is ...');
        console.log(cart);
        if(Object.keys(cart).length === 0){
            console.log('there is no cart posting new.');
            // let uid = new Date().getUTCMilliseconds();
            autoApi.post(`/carts`, JSON.stringify(item))
            .then((response) => {
                if (response.data.status === 201){
                    console.log('successfully added');
                    console.log(response.data.data.cart);
                    localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                    cb(true);
                    // return response.data.data.cart;
                }
            }).catch((error) => {
                console.log(error);
            });
        }else{
            console.log('the cart is not empty putting item.');
            autoApi.put(`/carts/${cart.id}`, JSON.stringify(item))
            .then((response) => {
                if (response.data.status === 200){
                    console.log('updating cart vrom server');
                    localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                    cb(true);
                }
            }).catch((error) => {
                console.log(error);
            });
        }
        
    }
    removeFromCart = (cart_id, part_id, cb) => {
        autoApi.delete(`/cart${cart_id}`, JSON.stringify({'part_id': part_id}))
        .then((response) => {
            if (response.data.status === 200){
                console.log('updating cart vrom server');
                localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                cb(true);
            }
        }).catch((error) => {
            console.log(error);
        });
    }
};

export default CartService;