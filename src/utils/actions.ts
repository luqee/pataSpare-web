'use server'
import { autoAPI } from "@/config/axios"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(data:any) {
    console.log(`In action with data: \n${data}`);
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
        cookies().set('session', response.data.data.user)
        redirect('/customer')
    } else {
        // No response received
        console.log('No response received');
        return Response.json({ error: 'Error Processing request' }, {
        status: 400,
        });
    }
}