import { autoAPI } from "@/config/axios"
import { cookies } from "next/headers";

export async function POST(req: Request) {

  const data = await req.json()
  let response = await autoAPI.post(`/auth/social`, JSON.stringify(data), {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  })
  if (response) {
    if (response.status === 200) {    
        cookies().set('user', JSON.stringify(response.data.data.user))
        cookies().set('token', response.data.data.token)
    }
    return Response.json(response.data, {
      status: response.status
    })
  } else {
    // No response received
    console.log('No response received');
    console.log(response);
    return Response.json(response, {
      status: 400
    })
  }
}