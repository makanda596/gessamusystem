import React, { useEffect, useState } from "react";
import axios from "axios";

const alertStyles = {
  success: "bg-green-500/10 border-l-4 border-green-400 text-green-300 shadow-green-500/20",
  warning: "bg-yellow-500/10 border-l-4 border-yellow-400 text-yellow-300 shadow-yellow-500/20",
  error: "bg-red-500/10 border-l-4 border-red-400 text-red-300 shadow-red-500/20",
};

const GetAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/alert/getAlert");
        setAlerts(response.data);
      } catch (err) {
        setError("Failed to fetch alerts.");
      }
    };

    fetchAlerts();
  }, []);

  const deleteAlert = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/alert/deleteAlert/${id}`);
      setAlerts(alerts.filter((alert) => alert._id !== id));
      setSuccessMessage("Alert deleted successfully!");
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      setError("Failed to delete the alert.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-gray-900 to-black text-white p-8">
      <h2 className="text-5xl font-extrabold text-blue-400 mb-8 drop-shadow-lg text-center">
        🚀 Live Alerts
      </h2>

      {error && (
        <div className="bg-red-500 text-white p-4 rounded-lg text-center mb-6 shadow-lg max-w-2xl w-full">
          ❌ {error}
        </div>
      )}

      {successMessage && (
        <div className="bg-green-500 text-white p-4 rounded-lg text-center mb-6 shadow-lg max-w-2xl w-full">
          ✅ {successMessage}
        </div>
      )}

      <div className="space-y-6 w-full max-w-4xl">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            const alertType = alert.type || "warning";
            return (
              <div
                key={alert._id}
                className={`p-6 rounded-lg backdrop-blur-md border border-gray-700 transition-all hover:shadow-2xl hover:scale-[1.02] ${alertStyles[alertType]}`}
              >
                <div className="flex items-start gap-6">
                  <span className="text-3xl">
                    {alertType === "success" && "✅"}
                    {alertType === "warning" && "⚠️"}
                    {alertType === "error" && "❌"}
                  </span>

                  <div className="flex-1">
                    <p className="font-semibold text-xl mb-2">{alert.message}</p>
                    <p className="text-sm text-gray-400">🔹 User ID: {alert.user}</p>
                    <p className="text-sm text-gray-400">🔹 Admission No: {alert.admNo}</p>
                  </div>

                  <button
                    className="text-red-500 hover:text-red-700 self-start"
                    onClick={() => deleteAlert(alert._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500 text-lg">No alerts found.</p>
        )}
      </div>
    </div>
  );
};

export default GetAlert;
