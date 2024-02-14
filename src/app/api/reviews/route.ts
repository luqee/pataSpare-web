import { autoAPI } from "@/config/axios"
import { type NextRequest } from "next/server"
import { cookies } from "next/headers"

export const GET = async (request: NextRequest) =>{
    const token = cookies().get('token')
    const search = request.nextUrl.searchParams.toString()
    let reqPath = '/reviews'
    if (search) {
        reqPath+=`?${search}`
    }
    const response = await autoAPI.get(reqPath,{
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

export const POST = async (req: NextRequest) => {
    const token = cookies().get('token')

    const data = await req.json()
    let response = null
    try {
        response = await autoAPI.post(`/reviews`, data, {
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