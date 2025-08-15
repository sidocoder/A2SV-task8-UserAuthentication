"use client";
import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <button
      {...props}
      className={`w-full py-3 rounded-full bg-purple-600 text-white font-semibold disabled:opacity-50 ${props.className || ""}`}
    >
      {children}
    </button>
  );
};

export default Button;
