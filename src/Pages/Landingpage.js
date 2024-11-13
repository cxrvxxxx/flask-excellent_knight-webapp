import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login'); // Navigate to login page
    };

    const handleRegister = () => {
        navigate('/register'); // Navigate to register page
    };

    return (
        <div className="landing-container">
            <nav className="navbar">
                <div className="navbar-logo">
                    {/* Logo or branding */}
                </div>
                <div className="navbar-links-left">
                    <button className="login-btn" onClick={handleLogin}>
                        Log In
                    </button>
                    <button className="register-btn" onClick={handleRegister}>
                        Register
                    </button>
                </div>
            </nav>
        </div>
    );
}

export default LandingPage;
