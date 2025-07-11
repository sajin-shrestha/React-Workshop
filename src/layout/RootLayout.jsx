import { Flex } from 'antd'
import { Link, Outlet } from 'react-router-dom';

const RootLayout = () => {
    return (
        <div>
            <header>
                <Flex justify='space-between'>
                    {/* // Left side text */}
                    <div style={{ fontWeight: 'bold' }}>Some one</div>
                    <Flex gap={ 8 }>
                        <Link to="/">Home</Link>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                        <div>Logout</div>
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

