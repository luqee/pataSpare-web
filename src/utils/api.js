import {appAPI} from '@/config/axios'

export const getParts = (query)=>{
  if (query) {
    return appAPI.get(`/api/parts?${query}`)
  }else{
    return appAPI.get('/api/parts')
  }
}

export const getPart = (partId)=>{
  return appAPI.get(`/api/parts/${partId}`)
}

export const getCategories = (query)=>{
  if (query) {
    return appAPI.get(`/api/categories?${query}`)
  }else{
    return appAPI.get('/api/categories')
  }
}

export const getBrands = ()=>{
  return appAPI.get('/api/brands')
}

export const getSearch = (query)=>{
  return appAPI.get(`/api/search?${query}`)
}

export const postCart = (requestData)=>{
  return appAPI.post(`/api/carts`, JSON.stringify(requestData))
}

export const deleteCartItem = (id, query)=>{
  return appAPI.delete(`/api/carts/${id}?${query}`)
}

export const putCarts = (requestData)=>{
  return appAPI.put(`/api/carts`, JSON.stringify(requestData))
}

export const getShops = (query)=>{
  if (query) {
    return appAPI.get(`/api/shops?${query}`)
  }else{
    return appAPI.get('/api/shops')
  }
}

export const getShop = (shopId)=>{
  return appAPI.get(`/api/shops/${shopId}`)
}

export const postInquiries = (requestData)=>{
  return appAPI.post(`/api/inquiries`, JSON.stringify(requestData))
}

export const postInquiryReply = (id, requestData)=>{
  return appAPI.post(`/api/inquiries/${id}`, JSON.stringify(requestData))
}

export const getInquiries = ()=>{
  return appAPI.get('/api/inquiries')
}

export const getInquiry = (id)=>{
  return appAPI.get(`/api/inquiries/${id}`)
}

export const postReview = (requestData)=>{
  return appAPI.post(`/api/reviews`, JSON.stringify(requestData))
}

export const postContact = (requestData)=>{
  return appAPI.post(`/api/contact`, JSON.stringify(requestData))
}

export const getOrders = ()=>{
  return appAPI.get('/api/orders')
}

export const postOrders = (requestData)=>{
  return appAPI.post('/api/orders', JSON.stringify(requestData))
}

export const getOrder = (id)=>{
  return appAPI.get(`/api/orders/${id}`)
}

export const postRegister = (requestData)=>{
  return appAPI.post(`/api/auth/register`, JSON.stringify(requestData))
}

export const getEmailResend = (query)=>{
  return appAPI.get(`/api/auth/email?${query}`)
}

export const getVerify = (query)=>{
  return appAPI.get(`/api/auth/verify?${query}`)
}

export const postRequestReset = (requestData)=>{
  return appAPI.post(`/api/auth/email`, JSON.stringify(requestData))
}

export const postPasswordReset = (requestData)=>{
  return appAPI.post(`/api/auth/reset`, JSON.stringify(requestData))
}

export const postLogin = (requestData)=>{
  return appAPI.post(`/api/auth/login`, JSON.stringify(requestData))
}

export const postLogout = (requestData)=>{
  return appAPI.post(`/api/auth/logout`, JSON.stringify(requestData))
}

export const postSocialLogin = (requestData)=>{
  return appAPI.post(`/api/auth/social`, JSON.stringify(requestData))
}