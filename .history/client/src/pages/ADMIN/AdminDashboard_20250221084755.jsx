import react, {useState,useEffect} from 'react'
import axios from 'axios'
import PostProject from './PostProject';
import GetProjects from './GetProjects';
import Student from './Student';
import CreateUser from './CreateUser';
import GetAlert from './GetAlert';
import AdmAlert from "./AdmAlert"
import PostWeekly from './PostWeekly';
import GetWeekly from './GetWeekly';
import GetSubmission from './GetSubmission';
import GetTask from './GetTask';
import PostTask from './PostTask';
const AdminDashboard = () => {
    axios.defaults.withCredentials = true;
    const [studentCount, setStudentCount] = useState(0);
    const [error, setError] = useState("");
    const [weeklyProjects, setWeeklyProjects] = useState(0)
    const [projects, setProjects] = useState(0)
    const [details,setDetails]= useState(null)

    //fetching the user details 
    const fetchDetails = async () => {
        try{
            const response = await axios.get('https://gessamubackend.onrender.com/admin/admDetails',{
                withCredentials:true
            })
            console.log(response.data)
           setDetails(response.data)
        }catch(error){
            setError("you need to log in")
         }
    }

    useEffect(()=>{
        fetchDetails() 
    },[])
    //logout
    const handleLogout = async () => {
        try {
            const response = await axios.post("https://gessamubackend.onrender.com/admin/adminLogout")
            console.log(response)
            window.location.href = '/'
        } catch (error) {
            console.log(error.message)
        }
    }
    const [activeSection, setActiveSection] = useState('dashboard');
    const [stats] = useState({
        students: 120,
        weeklyProjects: 15,
        totalProjects: 150,
        totalTasks: 320
    });
    const [notifications] = useState([
        "New student John Doe registered.",
        "Weekly project 'Project 1' is due soon.",
        "New quiz posted: 'Math Quiz 2025'.",
        "Task 'Complete Assignment 5' marked as pending."
    ]);
    const [activityLog] = useState([
        { action: "Admin added a new student", time: "2025-01-28 12:30 PM" },
        { action: "Admin posted a new task", time: "2025-01-28 10:15 AM" }
    ]);
    const [projectDropdown, setProjectDropdown] = useState(false);
    const [taskDropdown, setTaskDropdown] = useState(false);
    const [quizDropdown, setQuizDropdown] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);
    const [alertDropdown, setAlertDropdown] = useState(false)


    //fetching students count
    useEffect(() => {
        const fetchStudentCount = async () => {
            try {
                const response = await axios.get("https://gessamubackend.onrender.com/auth/studentCount");
                setStudentCount(response.data.count);
            } catch (error) {
                setError("Failed to fetch student count");
            }
        };

        fetchStudentCount();
    }, []);

    //fetching weeklyprojects count
    const fetchWeeklyCount = async () => {
        try {
            const response = await axios.get("https://gessamubackend.onrender.com/projects/countWeekly")
            setWeeklyProjects(response.data.count);
        } catch (error) {
            setError("Failed to fetch weekly count");
        }
    }
    useEffect(() => {
        fetchWeeklyCount()
    }, [])

    //fetching projects count
    const fetchTotalCount = async () => {
        try {
            const response = await axios.get("https://gessamubackend.onrender.com/projects/countProject")
            setProjects(response.data.count);
        } catch (error) {
            setError("Failed to fetch total projects count");
        }
    }
    useEffect(() => {
        fetchTotalCount()
    }, [])

    const renderMainContent = () => {
        if (activeSection === 'dashboard') {
            return (
                <div className="flex flex-col items-center justify-center h-full ">
                    <h2 className="text-3xl font-extrabold mb-6 text-blue-600">Welcome to Admin Dashboard</h2>
                    {details ?(
                        <h1 className="text-black">email : {details.admin.email} </h1>

                    ):(<p>loadin....</p>)}

                    {error && <p className="text-red-500">{error}</p>}
                    <div className="bg-white p-6 rounded-lg shadow-lg w-4/5 md:w-2/3 text-center">
                        <h3 className="text-xl font-semibold text-gray-800 mb-4">Overview</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">

                                <p className="text-3xl font-semibold text-blue-600">{studentCount}</p>

                                <p>Students</p>
                            </div>
                            <div className="bg-teal-500 text-white p-4 rounded-lg shadow-md">
                                <h4 className="font-bold text-2xl">{weeklyProjects}</h4>
                                <p>Weekly Projects</p>
                            </div>
                            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md">
                                <h4 className="font-bold text-2xl">{projects}</h4>
                                <p>Total Projects</p>
                            </div>
                            <div className="bg-teal-500 text-white p-4 rounded-lg shadow-md">
                                <h4 className="font-bold text-2xl">{stats.totalTasks}</h4>
                                <p>Total Tasks</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full max-w-lg mt-6">
                        <h4 className="text-xl font-semibold mb-4">Recent Notifications</h4>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <ul>
                                {notifications.map((notification, index) => (
                                    <li key={index} className="text-sm text-gray-700 py-2">{notification}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className="w-full max-w-lg mt-6">
                        <h4 className="text-xl font-semibold mb-4">Activity Log</h4>
                        <div className="bg-white p-4 rounded-lg shadow-md">
                            <ul>
                                {activityLog.map((log, index) => (
                                    <li key={index} className="text-sm text-gray-700 py-2">
                                        <strong>{log.action}</strong> at {log.time}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            );
        }
        switch (activeSection) {
            case 'postWeeklyProject':
                return <PostWeekly/>;
            case 'getWeeklyProject':
                return <GetWeekly />;
            case 'postProject':
                return <PostProject />
            case 'getProjects':
                return <GetProjects />
            case 'postTask':
                return <PostTask/>
            case 'getTask':
                return <GetTask/>
            case 'getsubmission':
                return <GetSubmission/>;
            case 'postalert':
                return <AdmAlert />
            case 'getalert':
                return <GetAlert/>
            case 'postQuiz':
                return <div>Post a Quiz</div>;
            case 'users':
                return <CreateUser />
            case 'students':
                return <Student />

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex ">
            {/* Sidebar */}
            <div className="w-64 bg-blue-600 text-white shadow-lg p-4 h-full fixed">
                <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
                <nav>
                    <ul className="space-y-2">
                        <li><button onClick={() => setActiveSection('dashboard')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Dashboard</button></li>
                        <li><button onClick={() => setActiveSection('students')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Manage Students</button></li>
                        <li>
                            <button onClick={() => setProjectDropdown(!projectDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-between">
                                Projects {projectDropdown ? '▲' : '▼'}
                            </button>
                            {projectDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('postWeeklyProject')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Post Weekly Project</button></li>
                                    <li><button onClick={() => setActiveSection('getWeeklyProject')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Get Weekly Project</button></li>
                                    <li><button onClick={() => setActiveSection('postProject')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Post a Project</button></li>
                                    <li><button onClick={() => setActiveSection('getProjects')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">get ALL Project</button></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={() => setTaskDropdown(!taskDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-between">
                                Tasks {taskDropdown ? '▲' : '▼'}
                            </button>
                            {taskDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('postTask')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Post a Task</button></li>
                                    <li><button onClick={() => setActiveSection('getTask')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Get Tasks</button></li>
                                    <li><button onClick={() => setActiveSection('getsubmission')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Submitted tasks</button></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={() => setAlertDropdown(!alertDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-between">
                                Alert {alertDropdown ? '▲' : '▼'}
                            </button>
                            {alertDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('postalert')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Post a Alert</button></li>
                                    <li><button onClick={() => setActiveSection('getalert')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Get all Alert</button></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={() => setQuizDropdown(!quizDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-between">
                                Quiz {quizDropdown ? '▲' : '▼'}
                            </button>
                            {quizDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('postQuiz')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Post a Quiz</button></li>
                                </ul>
                            )}
                        </li>
                        <li>
                            <button onClick={() => setUserDropdown(!userDropdown)} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700 flex justify-between">
                                Users {userDropdown ? '▲' : '▼'}
                            </button>
                            {userDropdown && (
                                <ul className="pl-4 mt-2 space-y-1">
                                    <li><button onClick={() => setActiveSection('users')} className="w-full text-left px-4 py-2 rounded-lg hover:bg-blue-700">Create a User</button></li>
                                </ul>
                            )}
                        </li>
                        <button onClick={handleLogout}>Logout</button>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 ml-80 flex items-center justify-center">
                {renderMainContent()}
            </div>
        </div>
    );
};

export default AdminDashboard;
