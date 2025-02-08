import React from 'react'
import { useAuthStore } from '../store/auth'
import Navbar from '../components/Navbar.jsx'
import Projects from '../components/Projects.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Footer from '../components/Footer.jsx'
import axios from 'axios'

function Home() {
    const { logout } = useAuthStore()
    const [details, setDetails] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    const fetchDetails = async () => {
        try {
            const response = await axios.get("http://localhost:5000/auth/profile", {
                withCredentials: true,
            });
            setDetails(response.data);
        } catch (error) {
            setError("You need to log in to access the dashboard.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDetails();
    }, []);

    const handlesubmit = async (e) => {
        try {
            await logout()
            window.location.href = "/";
        } catch (error) {
            console.log(error)
        }

    }
    return (
        <div>
            <Navbar userId={details.user.id}/>
            <Dashboard />
            <p>home</p>
            <Projects />
            <Footer />
            <button onClick={handlesubmit}> logout</button>

        </div>
    )
}

export default Home
