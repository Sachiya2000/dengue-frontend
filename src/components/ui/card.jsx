// src/components/ui/card.jsx
import React from "react";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`border border-gray-300 rounded-lg p-4 shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = "" }) => {
  return <div className={`font-bold mb-2 ${className}`}>{children}</div>;
};

export const CardTitle = ({ children, className = "" }) => {
  return <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>;
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={className}>{children}</div>;
};

export default Card;
