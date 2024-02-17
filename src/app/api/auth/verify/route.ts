import { autoAPI } from "@/config/axios"
import type{ NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  const params = req.nextUrl.searchParams
  const url = params.get('url')
  if (url) {
    let response = null
    try {
      response = await autoAPI.get(url, {
        validateStatus: function (status) {
          return status < 500; // Resolve only if the status code is less than 500
        }
      })
    } catch (error) {
      console.log(error)
    }
    if (response) {    
      return Response.json(response.data, {
        status: response.status
      })
    }
    return Response.json({"Error": "with request"}, {
      status: 400
    })
  }

  return Response.json({"Error": "Something bad happened"}, {
    status: 400
  })
}