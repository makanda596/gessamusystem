import React, { useEffect, useState } from "react";
import axios from "axios";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

const alertStyles = {
  success: "bg-green-500/10 border-l-4 border-green-400 text-green-300 shadow-green-500/20",
  warning: "bg-yellow-500/10 border-l-4 border-yellow-400 text-yellow-300 shadow-yellow-500/20",
  error: "bg-red-500/10 border-l-4 border-red-400 text-red-300 shadow-red-500/20",
};

const GetAlert = () => {
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState("");

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white p-6">
      <h2 className="text-4xl font-bold text-center text-blue-400 mb-6 drop-shadow-lg">🚀 Live Alerts</h2>

      {error && (
        <div className="bg-red-500 text-white p-3 rounded-md text-center mb-4 shadow-lg">
          <XCircle className="inline-block w-5 h-5 mr-2" />
          {error}
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
                  {alertType === "success" && <CheckCircle className="text-green-400 w-7 h-7" />}
                  {alertType === "warning" && <AlertTriangle className="text-yellow-400 w-7 h-7" />}
                  {alertType === "error" && <XCircle className="text-red-400 w-7 h-7" />}

                  <div>
                    <p className="font-semibold text-lg tracking-wide">{alert.message}</p>
                    <p className="text-sm text-gray-400">🔹 User ID: {alert.userId}</p>
                  </div>
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
