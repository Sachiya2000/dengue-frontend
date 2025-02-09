// src/pages/Dashboard.jsx
import React from "react";
import DenguePredictionDashboard from "../components/DenguePredictionForm";

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold text-center my-6">
        Dengue Cases Prediction System
      </h1>
      <DenguePredictionDashboard />
    </div>
  );
};

export default Dashboard;
