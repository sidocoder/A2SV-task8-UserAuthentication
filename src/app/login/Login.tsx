"use client";

import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("https://akil-backend.onrender.com/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (data.success) {

        router.push("/dashboard"); // redirect after login
      } else {
        // ❌ API returned error
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 w-screen h-screen flex items-center justify-center px-10">
      {/* Image Section */}
      <div className="w-1/2 flex justify-center">
        <img
          src="/images/login.jpg"
          alt="login"
          className="h-auto size-100 mr-15 shadow-4xl shadow-gray-400 w-600"
        />
      </div>

      {/* Form Section */}
      <div className="ml-auto p-10 px-15 border border-gray-200 bg-white rounded w-[400px]">
        <h1 className="font-extrabold text-2xl text-gray-800 text-center">
          Welcome Back,
        </h1>

        <form className="my-5 flex flex-col gap-5" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="font-semibold text-gray-600">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter email address"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-200 rounded p-2 text-gray-500"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-purple-600 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="text-gray-500 text-center flex gap-3">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-800 font-bold">
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
