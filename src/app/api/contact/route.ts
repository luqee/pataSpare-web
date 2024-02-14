import { autoAPI } from "@/config/axios"
import { type NextRequest } from "next/server"

export const POST = async (req: NextRequest) => {
    const data = await req.json()
    let response = null
    try {
        response = await autoAPI.post(`/contact`, data, {
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