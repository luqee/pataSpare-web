import { autoAPI } from "@/config/axios"
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {

  const params = req.nextUrl.searchParams
  const url = params.get('url')
  console.log("===========================================");
  console.log(url);
  console.log(params);
  if (url) {
    let response = await autoAPI.get(url, {
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
  }else{
    return Response.json({"Error": "Something bad happened"}, {
        status: 400
      })
  }
}