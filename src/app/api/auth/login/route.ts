import { autoAPI } from "@/config/axios"
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const data = await req.json()
  let response = null
  try {
    response = await autoAPI.post(`/auth/login`, JSON.stringify(data), {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    })
  } catch (error) {
    console.log(error);
  }
  if (response) {
    if (response.status === 200){
      cookies().set('user', JSON.stringify(response.data.data.user))
      cookies().set('token', response.data.data.token)
    }
    return Response.json(response.data, {
      status: response.status
    })
  }
  return Response.json({ error: 'Error Processing request' }, {
    status: 400,
  })
}