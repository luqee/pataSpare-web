'use client'
import { useAuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';

export const RequireAuth = ({ children})=> {
    let {user} = useAuthContext()
    const router = useRouter()
    useEffect(()=>{
        if (!user ) {
            router.push('auth/login')
        }
    }, [])
    return children
}
