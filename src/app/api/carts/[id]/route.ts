import { autoAPI } from "@/config/axios"
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const GET = async (req: Request, {params}: { params: { id: number } }) =>{
    const response = await autoAPI.get(`/carts/${params.id}`,{
        validateStatus: function (status) {
            return status < 500;
        }
    })
    if (response){
        return Response.json(response.data, {
            status: response.status,
          })
    }
    // No response received
    console.log('No response received');
    return Response.json({ error: 'Error Processing request' }, {
      status: 400,
    });
}

export const DELETE = async (req: NextRequest, {params}: { params: { id: number } }) =>{
    const search = req.nextUrl.searchParams
    const response = await autoAPI.delete(`/carts/${params.id}?${search.toString()}`,{
        validateStatus: function (status) {
            return status < 500;
        }
    })
    if (response){
        if (response.status == 200) {
            cookies().set('cart', JSON.stringify(response.data.data.cart))
        }
        return Response.json(response.data, {
            status: response.status,
          })
    }
    // No response received
    console.log('No response received');
    return Response.json({ error: 'Error Processing request' }, {
      status: 400,
    });
}
