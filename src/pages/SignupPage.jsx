import { Card, Form, message, notification } from "antd";
import { Input, Button } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SignupPage = () => {
    const [loading, setLoading] = useState(false); // to trap api calling process
    const navigate = useNavigate(); // to navigate to home page after login


    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Call our login API here with the values
            const res = await axios.post('https://egov-backend.vercel.app/api/users/register', values)

            console.log(res)

            navigate('/login');
            message.success("Signup Successful")
            notification.success("Signup Successful");
        } 

        catch (error) {
            // Handle error
            message.error("Signup Failed");
            notification.error("Signup Failed");
        } finally {
            setLoading(false);
        }
    }

        return(
            <Card title = "Signup">
                <Form onFinish={onFinish}>
                    <Form.Item label = "Username" name = {"username"} required>
                        <Input placeholder="Enter your Username" />
                    </Form.Item>

                    {/* email */}
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
                            Signup
                    </Button>
                </Form.Item>

            </Form>
        </Card>
    )
}

export default SignupPage;