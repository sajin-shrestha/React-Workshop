import React from 'react';
import { Button } from 'antd';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import Complains from '../pages/Complains'; 

const RootLayout = () => {
    const token = localStorage.getItem('accessToken'); // Check if token exists in local storage
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div>
            <header>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="brand-name">Bibek Magar</div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                        {
                            token ? (
                                <>
                                    <Link to="/">Home</Link>
                                    <Link to="/complains">Complains</Link>
                                    <Button onClick={handleLogout} type="link">
                                        Logout
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/signup">Register</Link>
                                </>
                            )
                        }
                    </div>
                </div>
            </header>
            <main>
                {/* This is where the child routes will be rendered */}
                <Outlet />
            </main>
        </div>
    );
};

export default RootLayout;