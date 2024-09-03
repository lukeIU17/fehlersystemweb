import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        if (username === 'User1') {
            navigate('/0010');
        } else if (username === 'User2') {
            navigate('/0100');
        } else {
            alert('Invalid username. Please use either "User1" or "User2" as username.');
        }
    };

    return (
        <div className="home-container">
            <h1 className="login-title">ANMELDUNG</h1>
            <form onSubmit={handleLogin} className="login-form">
                <div className="input-group">
                    <input
                        type="username"
                        id="username"
                        name="username"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">Login</button>
            </form>
        </div>
    );
};

export default Home;
