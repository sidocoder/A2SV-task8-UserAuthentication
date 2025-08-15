"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const BASE_URL = "https://akil-backend.onrender.com";

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const Signup = () => {
  const [formData, setFormData] = useState<SignupData>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await axios.post(`${BASE_URL}/signup`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.data.success) {
        setMessage(response.data.message);
        router.push(`/verifyemail`);
      } else {
        setError("Signup failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 my-5">
      <div className="mx-96 p-10 shadow-2xl shadow-gray-400 bg-white">
        <h1 className="font-extrabold text-2xl text-gray-800 text-center">
          Sign Up Today!
        </h1>

        {/* Google Button */}
        <div className="border border-blue-200 rounded my-5 p-2 gap-3 py-3 flex items-center justify-center text-blue-800 font-bold">
          <img src="/images/google.png" alt="google" className="size-6" />
          <p>Sign Up with Google</p>
        </div>

        {/* Divider */}
        <div className="flex gap-3 items-center justify-center">
          <hr className="w-29 text-gray-300" />
          <p className="text-gray-500">Or Sign Up with Email</p>
          <hr className="w-29 text-gray-300" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="my-5 flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="font-semibold text-gray-600">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              value={formData.email}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="font-semibold text-gray-600">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded p-2 text-gray-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirm_password"
              className="font-semibold text-gray-600"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              name="confirm_password"
              placeholder="Re-enter password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className="border border-gray-200 rounded p-2 text-gray-500"
            />
          </div>

          {/* Success & Error Messages */}
          {message && <p className="text-green-600">{message}</p>}
          {error && <p className="text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-purple-600 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Signing up..." : "Continue"}
          </button>
        </form>

        <div className="text-gray-500">
          Already have an account?{" "}
          <a href="/login" className="text-blue-800 font-bold">
            Login
          </a>
        </div>

        <div className="text-gray-400 mt-2">
          <p>
            By clicking 'Continue', you acknowledge that you have read and
            accepted our{" "}
            <a href="#" className="text-blue-800">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-800">
              Privacy Policy
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
