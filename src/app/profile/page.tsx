"use client"
import React, { useEffect } from 'react'
import { useSession , signOut} from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
export default function Profile(props : any) {
    const { data: session, status } = useSession()
    const router = useRouter()
    useEffect(() => {
        if(status === 'unauthenticated'){
            router.push('/')
        }
    },[router,status])
    return (
        status === 'authenticated' && session.user && <>
            <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
                <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
                    <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">Welcome To NextAuth - Login</h1>
                    
                    {
                        session?.user?.provider == 'discord' && 
                        <>
                            <center><Image className='w-[150px] rounded-full mb-[20px]' width={1000} height={1000} src={session?.user?.image} /></center>
                            <hr />
                        </>
                    }
                    <p>email : {session?.user?.email}</p>
                    <p>name : {session?.user?.name}</p>
                    <p>Role : {session?.user?.role}</p>
                    <p>Provider : {session?.user?.provider}</p>
                    <hr />
                    <br />
                    <button onClick={ () => { signOut({callbackUrl : '/'}) } } type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Log out</button>
                </div>
            </div>
        </>
    )
}