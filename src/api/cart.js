import autoApi from './api';

class CartService {
    constructor(){
        this.cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')): {};
    }
    getCart = () =>{
        return this.cart;
    }
    getCartItems = (cb) =>{
        if(!Object.keys(this.cart).length === 0){
            autoApi.get(`/carts/${this.cart.id}`)
            .then((response) => {
                if (response.data.status === 200){
                    this.cart = response.data.data.cart
                    localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                    // localStorage.setItem('cart_items', JSON.stringify(response.data.data.cart_items));
                    cb(response.data.data.cart_items, this.cart);
                }
            }).catch((error) => {
                console.log(error);
                cb(false, null);
            });
        }
    }
    addToCart = (item, cb) => {
        if(Object.keys(this.cart).length === 0){
            autoApi.post(`/carts`, JSON.stringify(item))
            .then((response) => {
                if (response.data.status === 201){
                    this.cart = response.data.data.cart
                    localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                    cb(true);
                }
            }).catch((error) => {
                console.log(error);
                cb(false);
            });
        }else{
            autoApi.put(`/carts/${this.cart.id}`, JSON.stringify(item))
            .then((response) => {
                if (response.data.status === 200){
                    this.cart = response.data.data.cart
                    localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                    cb(true);
                }
            }).catch((error) => {
                console.log(error);
                cb(false);
            });
        }
    }
    removeFromCart = (item_id, cb) => {
        autoApi.delete(`/carts/${this.cart.id}?part_id=${item_id}`)
        .then((response) => {
            if (response.data.status === 200){
                this.cart = response.data.data.cart
                localStorage.setItem('cart', JSON.stringify(response.data.data.cart));
                cb(true);
            }
        }).catch((error) => {
            console.log(error);
            cb(false);
        });
    }
    placeOrder = (cb) => {
        autoApi.post(`/orders`, JSON.stringify(this.cart))
        .then((response) => {
            if (response.data.status === 201){
                localStorage.removeItem('cart')
                localStorage.removeItem('cart_items')
                cb(true, response.data.data.order);
            }
        })
        .catch((error) => {
            console.log(error);
            cb(false, null);
        })
    }
};

export default CartService;