'use client';

import Button from '../components/Button'
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {

  return (
    <div className="bg-gray-50 w-screen h-screen flex items-center justify-center px-10">
      {/* Image Section */}
      <div className="w-1/2 flex justify-center">
        <img src="/images/login.jpg" alt="login" className="h-auto size-100 mr-15 shadow-4xl shadow-gray-400  w-600" />
      </div>

      {/* Form Section */}
      <div className=" ml-auto p-10 px-25 border border-gray-200 bg-white rounded">
        <h1 className="font-extrabold text-2xl text-gray-800 text-center">Welcome Back,</h1>

        <div className="flex gap-10 items-center justify-center mt-5">
          <hr className="w-25 border-gray-300" />
          <hr className="w-25 border-gray-300" />
        </div>

        <form className="my-5 flex flex-col gap-5" >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-600">Email Address</label>
            <input type="email" id="email" name="email" placeholder="Enter email address" required className="border border-gray-200 rounded p-2 text-gray-500"/>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-600">Password</label>
            <input type="password" id="password" name="password" placeholder="Enter password" required className="border border-gray-200 rounded p-2 text-gray-500"/>
          </div>
        
        </form>

        <div className="text-gray-500 text-center">
          Don't have an account? <a href="/signup" className="text-blue-800 font-bold">Sign Up</a>
        </div>
      </div>
    </div>
  )
}

export default Login
