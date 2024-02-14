import { autoAPI } from "@/config/axios"
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";

export const GET = async (req: Request, {params}: { params: { id: number } }) =>{
    const token = cookies().get('token')
    const response = await autoAPI.get(`/inquiries/${params.id}`,{
        headers: {
            'Authorization': 'Bearer '+ token?.value
        },
        validateStatus: function (status) {
            return status < 500;
        }
    })
    if (response){
        return Response.json(response.data, {
            status: response.status,
          })
    } else {
        // No response received
        console.log('No response received');
        return Response.json({ error: 'Error Processing request' }, {
          status: 400,
        });
    }
}

export const POST = async (req: NextRequest, {params}: { params: { id: number } }) => {
    const token = cookies().get('token')
    const data = await req.json()
    let response = null
    try {
        response = await autoAPI.post(`/inquiries/${params.id}`, data, {
            headers: {
                'Authorization': 'Bearer '+ token?.value
            },
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        })
    } catch (error) {
        console.log('Error creating');
        console.log(error);
    }
    if (response) {
        return Response.json(response.data, {
            status: response.status,
        })
    } else {
        // No response received
        console.log('No response received');
        return Response.json({ error: 'Error Processing request' }, {
            status: 400,
        });
    }
}