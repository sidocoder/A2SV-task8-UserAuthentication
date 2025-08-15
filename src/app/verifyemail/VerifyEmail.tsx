'use client';
import React, { useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import axios from "axios";

const BASE_URL = "https://akil-backend.onrender.com";

const VerifyEmail = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";
  const router = useRouter();

  const [otp, setOtp] = useState(Array(4).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [timer, setTimer] = useState(60);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Countdown timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(countdown);
    }
  }, [timer]);

  // Handle OTP input
  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return; // only digits
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  // Handle backspace navigation
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  // Submit OTP
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length < 4) {
      setMessage("Please enter the full 4-digit code.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/verify-email`, {
        email,
        OTP: code, // must match API key
      });
      setMessage(res.data.message || "Verification successful.");
      if (res.data.success) {
        router.push("/login");
      }
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Verification failed.");
    } finally {
      setLoading(false);
    }
  };

  // Resend OTP
  const handleResend = async () => {
    if (!email) return;
    try {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/resend-otp`, { email });
      setMessage(res.data.message || "OTP resent.");
      setTimer(60);
      setOtp(Array(4).fill(""));
      inputRefs.current[0]?.focus();
    } catch (err: any) {
      setMessage(err.response?.data?.message || "Failed to resend OTP.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-white p-8 rounded-lg text-center w-full max-w-md shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-3">Verify Email</h1>
        <p className="text-gray-500 text-sm mb-6">
          We’ve sent a verification code to <span className="font-medium">{email}</span>.  
          Enter it below to verify your account.
        </p>

        {message && <p className="text-sm mb-4 text-red-500">{message}</p>}

        <form onSubmit={handleSubmit}>
          <div className="flex justify-center gap-3 mb-6">
            {otp.map((digit, index) => (
              <input
                key={index}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                placeholder="0"
                className="w-12 h-12 text-center border border-purple-300 rounded-lg text-2xl text-gray-700 bg-blue-50 font-semibold focus:outline-none focus:ring-2 focus:ring-purple-400 focus:bg-white"
              />
            ))}
          </div>

          <p className="text-gray-500 text-sm mb-6">
            {timer > 0 ? (
              <>
                You can request to{" "}
                <span className="text-purple-600 font-semibold">Resend code</span> in{" "}
                {String(timer).padStart(2, "0")}s
              </>
            ) : (
              <span
                onClick={handleResend}
                className="text-purple-600 font-semibold cursor-pointer"
              >
                Resend code
              </span>
            )}
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-purple-600 hover:bg-purple-700 text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Verifying..." : "Continue"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default VerifyEmail;
