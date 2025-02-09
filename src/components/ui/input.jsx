// src/components/ui/input.jsx
import React from "react";

const Input = ({ value, onChange, placeholder, className = "", ...props }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 ${className}`}
      {...props}
    />
  );
};

export default Input;
