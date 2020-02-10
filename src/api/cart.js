import autoApi from './api';

class CartService {
    getCart = (cart, cb)=>{
        autoApi.get(`/carts/${cart.id}`)
        .then((response) => {
            if (response.data.status === 200){
                cb(response.data.data.cart);
            }
        }).catch((error) => {
            console.log(error);
            cb(false);
        });   
    }
    addToCart = (item, cart, cb) => {
        let requestData = {...item}
        if(cart.id !== undefined){
            requestData['cart_id'] = cart.id
        }
        autoApi.post(`/carts`, JSON.stringify(requestData))
        .then((response) => {
            if (response.data.status === 201){
                cb(response.data.data.cart);
            }
        }).catch((error) => {
            console.log(error);
            cb(false);
        });
    }
    updateCart = (item, cart, cb) => {
        let requestData = {cart_id: cart.id, ...item}
        autoApi.put(`/carts`, JSON.stringify(requestData))
        .then((response) => {
            if (response.data.status === 200){
                cb(response.data.data.cart);
            }
        }).catch((error) => {
            console.log(error);
            cb(false);
        });
    }
    removeFromCart = (item_id, cart, cb) => {
        autoApi.delete(`/carts/${cart.id}?part_id=${item_id}`)
        .then((response) => {
            if (response.data.status === 200){
                cb(response.data.data.cart);
            }
        }).catch((error) => {
            console.log(error);
            cb(false);
        });
    }
    placeOrder = (user, cart, details, cb) => {
        let postData = {
            cart: cart,
            details: details
        }
        autoApi.post(`/orders`, JSON.stringify(postData), {
            headers: {'Authorization': 'Bearer '+ user.token}
        })
        .then((response) => {
            if (response.data.status === 201){
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
