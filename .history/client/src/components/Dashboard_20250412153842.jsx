import { useState, useEffect } from "react";
import axios from 'axios'
import { useAuthStore } from "../store/auth";
const Dashboard = () => {
    const { fetchUserInfo ,user}=useAuthStore()
    const [error,setError] =useState()
    const[loading,setLoading]=useState()
    const [projects, setProjects] = useState(0);
    const [tasksCompleted, setTasksCompleted] = useState(0);
    const [alerts, setAlerts] = useState([]);
console.log(user.submittedtasks)
    const getGreeting = () => {
        const hour = new Date().getHours();
        if (hour < 12) return "Good morning";
        else if (hour < 18) return "Good afternoon";
        else return "Good evening";
    };

    useEffect(() => {
      
        fetchUserInfo();
    }, []);

    const Alert = async ()=>{
        try{
            const response = await axios.get(`{import.meta.env.BACKEND_URL}/alert/countAlert/${user._id}`)
        console.log(response.data)
        }
        catch(error){
            setError(error.message) 
        }
    }

    useEffect(()=>{
        Alert()
    },[])
    return (
        <div className="flex justify-center items-center min-h-screen  p-6">
            <div className="w-full bg-white p-8 rounded-lg shadow-2xl max-w-6xl text-center">
                <h2 className="text-xl font-bold text-gray-800 mb-4">{user ? `${getGreeting()}, Welcome Back ${user.email}` : "Welcome Back"}</h2>

                {/* Loading Animation */}
                {loading && <div className="animate-spin rounded-full h-10 w-10 border-t-4 border-blue-500 mx-auto my-4"></div>}

                {/* {error && <p className="text-red-500 font-medium">{error}</p>} */}

                {user && (
                    <div className="flex flex-col items-center">
                        {/* User Profile Image */}
                        <img
                            src={user.avatar || "https://via.placeholder.com/100"}
                            alt="User Avatar"
                            className="w-24 h-24 rounded-full shadow-md border-4 border-blue-500 mb-4"
                        />

                        {/* User Info */}
                        <h3 className="text-xl font-semibold text-gray-800">{user.firstName} {user.lastName}</h3>
                        <p className="text-gray-600">{user.email}</p>

                        {/* Projects, Tasks Completed, and Alerts */}
                        <div className="mt-6 w-full grid grid-cols-3 gap-4">
                            <div className="bg-blue-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-700">Projects</h4>
                                <p className="text-2xl font-bold text-blue-600">{projects}</p>
                            </div>
                            <div className="bg-green-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-700">Tasks Completed</h4>
                                <p className="text-2xl font-bold text-green-600">{tasksCompleted}</p>
                            </div>
                            <div className="bg-yellow-100 p-4 rounded-lg shadow-md">
                                <h4 className="text-lg font-semibold text-gray-700">Alerts</h4>
                                <p className="text-2xl font-bold text-yellow-600">{alerts.length}</p>
                            </div>
                        </div>

                      
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;
