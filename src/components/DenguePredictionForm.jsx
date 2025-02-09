// src/components/DenguePredictionForm.jsx
import { useState } from "react";
import { predictDengueCases } from "../utils/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FiAlertTriangle,
  FiArrowRight,
  FiCheckCircle,
  FiCloudRain,
  FiThermometer,
  FiWind,
} from "react-icons/fi";
const DenguePredictionDashboard = () => {
  const [formData, setFormData] = useState({
    temperature: "",
    precipitation: "",
    windspeed: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setError(""); // Clear error on input change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isNaN(formData.temperature) ||
      isNaN(formData.precipitation) ||
      isNaN(formData.windspeed)
    ) {
      setError("Please enter valid numeric values.");
      return;
    }

    try {
      const data = await predictDengueCases({
        temperature: parseFloat(formData.temperature),
        precipitation: parseFloat(formData.precipitation),
        windspeed: parseFloat(formData.windspeed),
      });

      if (data.status === "success") {
        setPrediction(data.prediction);
        setPredictions([
          ...predictions,
          {
            date: new Date().toLocaleDateString(),
            cases: data.prediction,
            ...formData,
          },
        ]);
      } else {
        setError("Failed to fetch prediction. Please try again.");
      }
    } catch (error) {
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Prediction Form Card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <FiThermometer className="text-orange-300" />
              Dengue AI Predictor
            </h1>
          </div>

          <div className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-100 border border-red-300 rounded-xl text-red-700">
                  <FiAlertTriangle className="flex-shrink-0 text-xl" />
                  <span className="font-medium">{error}</span>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Temperature Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiThermometer className="text-blue-600" />
                    උෂ්ණත්වය (°C)
                  </label>
                  <input
                    type="number"
                    name="temperature"
                    value={formData.temperature}
                    onChange={handleInputChange}
                    placeholder="උදා. 28.5"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    step="0.1"
                    required
                  />
                </div>

                {/* Precipitation Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiCloudRain className="text-blue-600" />
                    වර්ෂාපතනය (mm)
                  </label>
                  <input
                    type="number"
                    name="precipitation"
                    value={formData.precipitation}
                    onChange={handleInputChange}
                    placeholder="උදා. 12.3"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    step="0.1"
                    required
                  />
                </div>

                {/* Wind Speed Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <FiWind className="text-blue-600" />
                    සුළගේ වේගය (km/h)
                  </label>
                  <input
                    type="number"
                    name="windspeed"
                    value={formData.windspeed}
                    onChange={handleInputChange}
                    placeholder="උදා. 15.8"
                    className="w-full px-4 py-3 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                    step="0.1"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-lg transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
              >
                විශ්ලේෂණය කරන්න
                <FiArrowRight className="text-xl" />
              </button>
            </form>

            {prediction !== null && (
              <div className="mt-8 p-6 bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-2xl animate-fade-in">
                <div className="flex items-center gap-4">
                  <FiCheckCircle className="text-4xl text-green-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-semibold text-gray-600 uppercase tracking-wider">
                      මේ මාසය තුළ ඩෙංගු රෝගීන් ගණන මේපමණක් විය හැක
                    </h3>
                    <p className="text-4xl font-bold text-gray-900 mt-1">
                      {Math.round(prediction)}
                      <span className="text-lg text-gray-600 ml-2">ක්‍රම</span>
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      පරිසරාත්මක සාධක මත පදනම්ව ගණනය කරන ලදි
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Prediction History Chart */}
        {predictions.length > 0 && (
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6">
              <h2 className="text-xl font-semibold text-white flex items-center gap-3">
                අනාවැකි දත්ත
              </h2>
            </div>

            <div className="p-8">
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={predictions}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="text-gray-200"
                    />
                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#4b5563" }}
                      axisLine={{ stroke: "#d1d5db" }}
                    />
                    <YAxis
                      tick={{ fill: "#4b5563" }}
                      axisLine={{ stroke: "#d1d5db" }}
                    />
                    <Tooltip
                      contentStyle={{
                        background: "#ffffff",
                        border: "2px solid #e5e7eb",
                        borderRadius: "0.5rem",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Legend wrapperStyle={{ paddingTop: "1rem" }} />
                    <Line
                      type="monotone"
                      dataKey="cases"
                      stroke="#3b82f6"
                      strokeWidth={2}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 5 }}
                      activeDot={{ r: 8 }}
                      name="අනාවැකි ක්‍රම සංඛ්‍යාව"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default DenguePredictionDashboard;
