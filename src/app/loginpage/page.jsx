'use client'

import React from 'react'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import Image from "next/image"


function loginpage() {

    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const router = useRouter();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await signIn('credentials', {
                username, password, redirect: false
            })

            if (res.error) {
                setError("invalid credentials");
                return;
            }
            router.replace('/');

        } catch (error) {
            console.log(error)
    }
    }



  return (
    <>
    <section style={{
    backgroundImage: "url('/backg.png')",  // ใช้ไฟล์จาก public
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "100vh",  // ขนาดเต็มหน้าจอ
  }}>
     
    <div className="mt-20 max-w-max p-7 m-auto mx-autu  relative bg-white bg-opacity-40 backdrop-blur-md  rounded-lg shadow-md items-center">
     <div className="flex justify-center mx-auto">
        <img className="w-auto h-10 sm:h-10" src="ikkiw3.jpg" alt="Checkers game image" />
    </div>
    <div className='mt-5'>
    <form className='mt-5 ' onSubmit={handleSubmit}>
        
    <div>
            <label htmlFor="username" className="font-light block text-sm text-gray-400 dark:text-gray-500">Username</label>
            <div className='relative'>
        <input onChange={(e) => setUsername(e.target.value)}
          type='text'
          placeholder='Username'
          className='font-light w-full bg-white rounded-md border  py-[10px] pr-3 pl-12 text-gray-400 '
        />
        <span className='absolute top-1/2 left-4 -translate-y-1/2'>
          <svg
            width={20}
            height={20}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.72 12.886a4.167 4.167 0 0 1 2.947-1.22h6.666a4.167 4.167 0 0 1 4.167 4.167v1.666a.833.833 0 1 1-1.667 0v-1.666a2.5 2.5 0 0 0-2.5-2.5H6.667a2.5 2.5 0 0 0-2.5 2.5v1.666a.833.833 0 1 1-1.667 0v-1.666a4.17 4.17 0 0 1 1.22-2.947ZM10 3.333a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5Zm-4.166 2.5a4.167 4.167 0 1 1 8.333 0 4.167 4.167 0 0 1-8.333 0Z"
              opacity={0.8}
              fillRule="evenodd"
              clipRule="evenodd"
              fill="#9CA3AF"
            />
          </svg>
        </span>
      </div>
            {/* <input onChange={(e) => setUsername(e.target.value)} type="text" className="font-light block w-full px-4 py-2  text-gray-400 bg-white border rounded-lg" /> */}
        </div>

    <div className="mt-4">
            <div className="flex items-center justify-between">
                <label htmlFor="password" className="font-light block text-sm text-gray-400 dark:text-gray-500">Password</label>
                <Link href="/forgotpassword" className="font-light text-xs text-gray-600 dark:text-gray-400 hover:underline">Forget Password?</Link>
                
            
            </div>
            <div className="relative">
          <input onChange={(e) => setPassword(e.target.value)}  pattern="\d*" maxLength="8"
            type="password"
            placeholder="Password"
            className="w-full rounded-lg bg-white  border border-green py-[10px] px-12 text-gray-400 "
          />
          <span className="absolute top-1/2 left-4 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g opacity="0.8">
                <path
                  
                  d="M4.16797 10.0007C3.70773 10.0007 3.33464 10.3737 3.33464 10.834V16.6673C3.33464 17.1276 3.70773 17.5007 4.16797 17.5007H15.8346C16.2949 17.5007 16.668 17.1276 16.668 16.6673V10.834C16.668 10.3737 16.2949 10.0007 15.8346 10.0007H4.16797ZM1.66797 10.834C1.66797 9.45327 2.78726 8.33398 4.16797 8.33398H15.8346C17.2153 8.33398 18.3346 9.45327 18.3346 10.834V16.6673C18.3346 18.048 17.2153 19.1673 15.8346 19.1673H4.16797C2.78726 19.1673 1.66797 18.048 1.66797 16.6673V10.834Z"
                  fill="#9CA3AF"
                />
                <path
                  
                  d="M10 2.50065C9.11594 2.50065 8.2681 2.85184 7.64298 3.47696C7.01786 4.10208 6.66667 4.94993 6.66667 5.83398V9.16732C6.66667 9.62756 6.29357 10.0007 5.83333 10.0007C5.3731 10.0007 5 9.62756 5 9.16732V5.83398C5 4.5079 5.52678 3.23613 6.46447 2.29845C7.40215 1.36077 8.67392 0.833984 10 0.833984C11.3261 0.833984 12.5979 1.36077 13.5355 2.29845C14.4732 3.23613 15 4.5079 15 5.83398V9.16732C15 9.62756 14.6269 10.0007 14.1667 10.0007C13.7064 10.0007 13.3333 9.62756 13.3333 9.16732V5.83398C13.3333 4.94993 12.9821 4.10208 12.357 3.47696C11.7319 2.85184 10.8841 2.50065 10 2.50065Z"
                  fill="#9CA3AF"
                />
              </g>
            </svg>
          </span>
          <span className="absolute top-1/2 right-4 -translate-y-1/2">
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
             
              
            </svg>
          </span>
        </div>
            {/* <input onChange={(e) => setPassword(e.target.value)} type="password" className="block w-full px-4 py-2  text-gray-400 bg-white border rounded-lg" /> */}
        </div>

            

        {error && (
            
            <div className="w-full px-17 py-0.7 items-center text-white bg-red-700 rounded-lg mt-3 play-font1">{error}</div>
    
    )}

    <div className="mt-6">
    <button className="w-full px-6 py-2.5 text-sm play-font tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                Sign In
            </button>
        </div>
    </form>
    </div>

    <div className="flex items-center justify-between mt-4">
    <span className="w-75 border-b dark:border-gray-300 lg:5"></span>

    </div>
    <p className="mt-8 text-xs font-light text-center text-gray-400"> Don't have an account? <Link href="/register" className="play-font2 text-blue-500  hover:underline">Create One</Link></p>
    </div>
    
    </section>
    </>
  )
}

export default loginpage
