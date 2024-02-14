import { autoAPI } from "@/config/axios"
import { cookies } from "next/headers";

export const GET = async (req: Request, {params}: { params: { id: number } }) =>{
    const token = cookies().get('token')
    const response = await autoAPI.get(`/orders/${params.id}`,{
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
