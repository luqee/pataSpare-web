import { autoAPI } from "@/config/axios"

export async function POST(req: Request, res: Response) {
  const data = await req.json()
  let response = null
  try {
    response = await autoAPI.post(`/auth/register`, JSON.stringify(data), {
      validateStatus: function (status) {
        return status < 500; // Resolve only if the status code is less than 500
      }
    })
  } catch (error) {
    console.log(error);
  }
  if (response) {
    return Response.json(response.data, {
      status: response.status,
    })
  }
  return Response.json({ error: 'Error Processing request' }, {
    status: 400,
  });
}