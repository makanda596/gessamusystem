import React, { useEffect, useState } from "react";
import Tasks from "./Tasks";
const   Quiz = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Unauthorized: No token found");
        return;
      }

      try {
        const response = await fetch(`https://gessamusystem-back.onrender.com/auth/profile`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to fetch user info");
        }

        setUser(data);;
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUserInfo();
  }, []);



  if (error) return <p className="text-center mt-5 text-red-500">{error}</p>;

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <p>{user ? (<p>{user.email}</p> ) : (<p>no</p>)}</p>
    </div>
  );
};

export default Quiz;
