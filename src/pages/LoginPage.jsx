import { Card, Form, message } from "antd";
import { Input, Button } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const LoginPage = () => {
    const [loading, setLoading] = useState(false); // to trap api calling process
    const navigate = useNavigate(); // to navigate to home page after login


    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Call our login API here with the values
            const res = await axios.post('https://egov-backend.vercel.app/api/users/login', values)

            const { accessToken } = res.data;
            localStorage.setItem('accessToken', accessToken);

            navigate('/');
            message.success("Login Successful");
        } 

        catch (error) {
            // Handle error
            message.error("Login Failed");
        } finally {
            setLoading(false);
        }
    }

        return(
            <Card title = "Login">
                <Form onFinish={onFinish}>
                    {/* Email */}
                    <Form.Item label="Email" name={"email"} required>
                        <Input placeholder="Enter your email" />
                    </Form.Item>
                    {/* Password */}
                    <Form.Item label="Password" name={"password"} required>
                        <Input.Password placeholder="Enter your password" />
                    </Form.Item>
                    {/* Submit Button */}
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading}>
                            Login
                    </Button>
                </Form.Item>

            </Form>

              <h4>
                Do you want to signup? <Link to="/signup">Sign Up</Link>
            </h4>
        </Card>
    )
}

export default LoginPage;