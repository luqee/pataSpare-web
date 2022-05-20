import autoApi from './config';

export const getCategories = (cb) => {
    autoApi.get('/categories')
    .then((response) => {
        if (response.data.status === 200){
            cb(response.data.data.categories)
        }
    })
    .catch((error) => {
        console.log('Woops an error '+error);
    })
}

export const getCategoriesPreview = (cb) => {
    autoApi.get('/categories?preview=true')
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log('Woops an error '+error);
    })
}

export const getBrands = (cb)=>{
    autoApi.get('/brands')
    .then((response) => {
        if (response.data.status === 200){
            cb(response.data.data.brands)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const getShops = (cb)=>{
    autoApi.get('/shops')
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const getShopsPreview = (cb)=>{
    autoApi.get('/shops?preview=true')
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const getShop = (shopId, cb)=>{
    autoApi.get(`/shops/${shopId}`)
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error)
    })
}

export const getSearch = (queryString, cb)=>{
    autoApi.get(`/search?${queryString}`)
    .then((response) => {
        if (response.data.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getParts = (cb)=>{
    autoApi.get(`/parts`)
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getLatest = (cb)=>{
    autoApi.get(`/parts?criteria=latest`)
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getRecommended = (cb)=>{
    autoApi.get(`/parts?criteria=recommended`)
    .then((response) => {
        if (response.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getPartsByCategory = (queryString, cb)=>{
    autoApi.get(`/parts?${queryString}`)
    .then((response) => {
        if (response.data.status === 200){
            cb(response.data.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const getPartsShop = (shopId, cb)=>{
    autoApi.get(`/parts?shop_id=${shopId}`)
    .then((response) => {
        if (response.data.status === 200){
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const postInquiry = (user, payload, cb)=>{
    autoApi.post('/inquiries', JSON.stringify(payload), {
        headers: {
            'Authorization': 'Bearer '+ user.token
        }
    })
    .then((response) => {
        if (response.data.status === 201) {
            cb(response.data.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const postReview = (user, payload, cb)=>{
    autoApi.post('/reviews', JSON.stringify(payload), {
        headers: {
            'Authorization': 'Bearer '+ user.token
        }
    })
    .then((response) => {
        if (response.status === 201) {
            cb(response.data)
        }
    })
    .catch((error) => {
        console.log(error);
    });
}

export const postContact = (payload, cb)=>{
    autoApi.post('/contact', JSON.stringify(payload))
		.then((response) => {
			if (response.status === 201) {
                cb(response.data)
			}
		})
		.catch((error) => {
			console.log(error);
		});
}

export const getOrders = (user, cb) => {
	autoApi.get(`/orders`, {
		headers: {'Authorization': 'Bearer '+ user.token}
	})
	.then((response) => cb(response.data))
	.catch((error) => {
		console.log('Error getting orders');
		console.log(error);
	})
}

export const getOrder = (orderId, user, cb) => {
	autoApi.get(`/orders/${orderId}`, {
		headers: {'Authorization': 'Bearer '+ user.token}
	})
	.then((response) => cb(response.data))
	.catch((error) => {
		console.log('Error getting order');
		console.log(error);
	})
}

export const getInquiries = (user, cb) => {
	autoApi.get(`/inquiries`, {
		headers: {'Authorization': 'Bearer '+ user.token}
	})
	.then((response) => cb(response.data))
	.catch((error) => {
		console.log('Error getting inquiries');
		console.log(error);
	})
}

export const getInquiry = (inquiryId, user, cb) => {
	autoApi.get(`/inquiries/${inquiryId}`, {
		headers: {'Authorization': 'Bearer '+ user.token}
	})
	.then((response) => cb(response.data))
	.catch((error) => {
		console.log('Error getting inquiry');
		console.log(error);
	})
}

export const postReplyInquiry = (inquiryId, payload, user, cb) => {
    autoApi.post(`/inquiries/${inquiryId}/replies`, JSON.stringify(payload), {
        headers: {'Authorization': 'Bearer '+ user.token}
    })
    .then((response) => {
        if(response.status === 201){
            cb(response.data)
        }
    })
	.catch((error) => {
		console.log('Error posting reply');
		console.log(error);
	})
}