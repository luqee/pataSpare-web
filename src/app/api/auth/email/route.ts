import { autoAPI } from "@/config/axios"
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  const params = req.nextUrl.searchParams.toString()
  let response = await autoAPI.get(`/auth/email?${params}`, {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  })
  if (response) {    
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

export async function POST(req: Request) {

  const data = await req.json()
  let response = await autoAPI.post(`/auth/email`, JSON.stringify(data), {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  })
  if (response) {
    return Response.json(response.data, {
      status: response.status
    })
  } else {
    // No response received
    console.log('No response received');
    console.log(response);
    return Response.json({"Error": "Error?"}, {
      status: 400
    })
  }
}