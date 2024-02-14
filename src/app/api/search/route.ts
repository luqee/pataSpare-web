import { autoAPI } from "@/config/axios"
import { type NextRequest } from "next/server"

export const GET = async (request: NextRequest) =>{
    const search = request.nextUrl.searchParams.toString()
    const response = await autoAPI.get(`/search?${search}`,{
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