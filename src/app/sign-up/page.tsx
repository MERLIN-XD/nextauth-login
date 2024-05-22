"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';

type Props = {}

export default function Signup({ }: Props) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const router = useRouter();

  const onClientSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.post('/api/auth/signup', { email, name, password, confirmPassword });
      if(response.data.message !== "User created"){
        alert(response.data.message)
      }else{
        router.push('/');
      }
    } catch (error) {
      console.log('error', error)
    }
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center w-full dark:bg-gray-950">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg px-8 py-6 max-w-md">
          <h1 className="text-2xl font-bold text-center mb-4 dark:text-gray-200">NextAuth - Sign Up</h1>
          <form onSubmit={onClientSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email Address</label>
              <input onChange={(e) => setEmail(e.target.value)} type="email" id="email" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="your@xd-dev.com" required />
            </div>
            <div className="mb-4">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">name</label>
              <input onChange={(e) => setName(e.target.value)} type="text" id="name" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="merlin" required />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Password</label>
              <input onChange={(e) => setPassword(e.target.value)} type="password" id="password" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your password" required />
            </div>
            <div className="mb-4">
              <label htmlFor="password_confirm" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Confirm Password</label>
              <input onChange={(e) => setConfirmPassword(e.target.value)} type="password" id="password_confirm" className="shadow-sm rounded-md w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" placeholder="Enter your Confirm password" required />
            </div>
            <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign up</button>
            <Link href={'/'} className="mt-[10px] w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#00DA1D] duration-300 hover:bg-[#009A14] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Sign in</Link>
          </form>
        </div>
      </div>
    </>
  )
}