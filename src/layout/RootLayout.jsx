import { Flex } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { Button } from 'antd';

const RootLayout = () => {
    const token = localStorage.getItem('accessToken')
    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.clear()
        navigate('/login')
    }

    return (
        <div>
            <header>
                <Flex justify='space-between'>
                    {/* // Left side text */}
                    <div style={{ fontWeight: 'bold' }}>Some one</div>

                    <Flex gap={ 8 }>
                        {token ? (
                                <>
                                <Link to = "/">Home</Link>
                                <Link to = "/complain">Complains</Link>
                                <Button type = "link" onClick={handleLogout}>Logout</Button>
                                </>
                            ):(
                                <>
                                    <Link to="/login">Login</Link>
                                    <Link to="/signup">Sign Up</Link>
                                </>
                            )
                        }
                    </Flex>
                </Flex>
            </header>

            <main>
                {/* This is where the child routes will be rendered */}
                <Outlet />
                
            </main>
        </div>
    )
}
export default RootLayout;

