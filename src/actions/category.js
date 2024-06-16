'use server'
import { autoAPI } from "@/config/axios"

export const fetchCategories = async ()=> {
    const response = await  autoAPI.get('/categories', {
        validateStatus: function (status) {
            return status < 500;
        }
    })
    if (!response){
        console.log('No response received');
        throw new Error('Failed to get Categories')
    }
    if (response.status === 200){
        return response.data.data.categories
    }
    console.log('Error response received');
    console.log(response);
    throw new Error('Error while to get Categories')
}