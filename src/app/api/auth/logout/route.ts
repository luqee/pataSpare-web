import { autoAPI } from "@/config/axios"
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const token = cookies().get('token')
  const data = await req.json()
  let response = await autoAPI.post(`/auth/logout`, JSON.stringify(data), {
    headers: {
        'Authorization': 'Bearer '+ token?.value
    },
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  })
  if (response) {    
    if (response.status == 200) {
        cookies().delete('user')
        cookies().delete('token')
    }
    return Response.json(response.data, {
        status: response.status
    })
  }
  return Response.json({ error: 'Error Processing request' }, {
    status: 400,
  })
}