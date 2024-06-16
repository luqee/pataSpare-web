'use server'
import { autoAPI } from "@/config/axios"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function loginAction(data) {
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
        if (response.status === 200){
            cookies().set('user', JSON.stringify(response.data.data.user))
            cookies().set('token', response.data.data.token)
            redirect('/customer')
        }
    }
    throw new Error('Error while creating user')
}

export async function registerAction(data) {
    let response = null
    try {
        response = await autoAPI.post(`/auth/register`, JSON.stringify(data), {
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        })
    } catch (error) {
        console.log('inside error');
        console.log(error);
    } finally{
        if (response.data.status === 201) {
            cookies().set('email', response.data.data.mail)
            redirect(`/auth/email`)
        }else if(response.status === 422){
            return response.data.errors
        }
        return response
    }
}

export async function resendEmailAction() {
    let email = cookies().get('email')

    const params = new URLSearchParams().set('email', email)
    let response = null
    try {
        response = await autoAPI.get(`/auth/email?${params}`, {
            validateStatus: function (status) {
                return status < 500; // Resolve only if the status code is less than 500
            }
        })
    } catch (error) {
        console.log(error);
    }
    if (response) {
        console.log('Nice Action');
        redirect(`/auth/email`)
    }
    console.log('Some type of error!! Action');
    redirect(`/auth/email`)
}

export const verifyAction = async (url)=>{
    console.log('verify url');
    console.log(url);
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
        if (response.status === 200) {
            redirect('/auth/login')
        }
        console.log('error verifying!!');
        return response
    }

    return {"Error": "Something bad happened"}
}