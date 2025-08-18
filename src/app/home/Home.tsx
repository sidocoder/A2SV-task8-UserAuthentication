"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

const Home = () => {
  const router = useRouter();

  const handleLogout = () => {
    // Clear token if you stored it
    // localStorage.removeItem("token");

    router.push("/login");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 px-6">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="bg-white shadow-xl rounded-2xl p-10 max-w-lg w-full text-center"
      >
        {/* Welcome Emoji */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
          className="text-6xl mb-4"
        >
          🎉
        </motion.div>

        {/* Welcome Title */}
        <h1 className="text-3xl font-extrabold text-gray-800 mb-2">
          Welcome Home!
        </h1>
        <p className="text-gray-600 mb-6">
          You have successfully logged in. <br />
          We’re happy to have you back 💙
        </p>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => router.push("/profile")}
            className="w-full py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
          >
            Go to Profile
          </button>

          <button
            onClick={handleLogout}
            className="w-full py-3 rounded-full bg-gray-100 text-gray-700 font-semibold hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Home;
