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
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

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
      setAlerts(alerts.filter(alert => alert._id !== id)); // Remove the deleted alert from the state
      setSuccessMessage("Alert deleted successfully!"); // Set success message
      setTimeout(() => {
        setSuccessMessage(""); // Clear success message after a few seconds
      }, 3000);
    } catch (err) {
      setError("Failed to delete the alert.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h2 className="text-4xl font-bold text-center text-blue-400 mb-6 drop-shadow-lg">🚀 Live Alerts</h2>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md text-center mb-4 shadow-lg">
          ❌ {error}
        </div>
      )}

      {/* Display success message */}
      {successMessage && (
        <div className="bg-green-500 text-white p-3 rounded-md text-center mb-4 shadow-lg">
          ✅ {successMessage}
        </div>
      )}

      <div className="space-y-6 max-w-3xl mx-auto">
        {alerts.length > 0 ? (
          alerts.map((alert) => {
            const alertType = alert.type || "warning"; // Default to warning
            return (
              <div
                key={alert._id}
                className={`p-6 rounded-lg backdrop-blur-md border border-gray-700 transition-all hover:shadow-2xl hover:scale-[1.02] ${alertStyles[alertType]}`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-xl">
                    {alertType === "success" && "✅"}
                    {alertType === "warning" && "⚠️"}
                    {alertType === "error" && "❌"}
                  </span>

                  <div>
                    <p className="font-semibold text-lg tracking-wide">{alert.message}</p>
                    <p className="text-sm text-gray-400">🔹 User ID: {alert.user}</p>
                  </div>

                  {/* Delete Button */}
                  <button
                    className="ml-auto text-red-500 hover:text-red-700"
                    onClick={() => deleteAlert(alert._id)}
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center text-gray-500">No alerts found.</p>
        )}
      </div>
    </div>
  );
};

export default GetAlert;
