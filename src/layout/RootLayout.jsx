import { useEffect, useState } from 'react';
import { Button } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import './RootLayout.css';

const RootLayout = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');

  useEffect(() => {
    try {
      const userString = localStorage.getItem('user');
      if (userString) {
        const parsed = JSON.parse(userString);
        const userData = parsed?.user || parsed;

        if (userData?.username) {
          setUsername(userData.username);
        }
      }
    } catch (error) {
      console.error('Failed to parse user data:', error);
    }
  }, []);

  const token = localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.clear();
    navigate('/login');
  };

  return (
    <div>
      <header className="navbar">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* Left Side */}
          <div className="nav-left">{token && username ? username : 'Guest'}</div>

          {/* Right Side */}
          <div className="nav-links">
            {token ? (
              <>
                <Link to="/">Home</Link>
                <Link to="/Complains">Complains</Link>
                <Link to="/Profile">Profile</Link>
                <button onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
