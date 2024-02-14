import { autoAPI } from "@/config/axios"
import { cookies } from "next/headers"
import { type NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    let response = await autoAPI.post(`/carts`, data, {
        validateStatus: function (status) {
            return status < 500; // Resolve only if the status code is less than 500
        }
    })
    if (response) {
        if (response.status == 201) {
            cookies().set('cart', JSON.stringify(response.data.data.cart))
        }
        return Response.json(response.data, {
            status: response.status,
        })
    }
    
    return Response.json({ error: 'Error Processing request' }, {
        status: 400,
    });
    
}

export const PUT = async (req: NextRequest) => {
    const data = await req.json()
    let response = null
    try {
        response = await autoAPI.put(`/carts`, data, {
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        })
    } catch (error) {
        console.log('Error creating');
        console.log(error);
    }
    
    if (response) {
        if (response.status == 200) {
            cookies().set('cart', JSON.stringify(response.data.data.cart))
        }
        return Response.json(response.data, {
            status: response.status,
        })
    }

    return Response.json({ error: 'Error Processing request' }, {
        status: 400,
    });
}