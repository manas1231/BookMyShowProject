import React, { useEffect } from 'react'
import { Form, Input, Button, message,Radio} from "antd";
import { Link, useNavigate } from 'react-router-dom';
import { RegisterUser } from '../api/user';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/loaderSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        if (localStorage.getItem("tokenForBMS")) {
            navigate("/", { replace: true });
        }
    }, []);
    const handleFinish = async (values) => {
        console.log(values);
        try {
            dispatch(showLoading);
            const response = await RegisterUser(values);
            if (response?.success) {
                message.success(response?.message)
                navigate("/login")
            }
        } catch (error) {
            message.success(response?.message)
            console.log(error);
        } finally {
            dispatch(hideLoading)
        }
    };
    return (

        <header className='App-header'>
            <main className='main-area mw-500 text-center px-3'>
                <section >
                    <h1>Register to BookMyShow</h1>
                </section>
                <section>
                    <Form layout="vertical" onFinish={handleFinish} >
                        <Form.Item label="Name"
                            htmlFor="name"
                            name="name"
                            className="d-block"
                            rules={[{ required: true, message: "Name is required" }]}>

                            <Input id="name"
                                type='text'
                                placeholder='Enter your name'></Input>
                        </Form.Item>


                        <Form.Item label="Email"
                            htmlFor="email"
                            name="email"
                            className="d-block"
                            rules={[{ required: true, message: "Email is required" }]}>

                            <Input id="email"
                                type='text'
                                placeholder='Enter your email'></Input>
                        </Form.Item>


                        <Form.Item label="Password"
                            htmlFor="password"
                            name="password"
                            className="d-block"
                            rules={[{ required: true, message: "Password is required" }]}>

                            <Input id="password"
                                type='password'
                                placeholder='Enter your password'></Input>
                        </Form.Item>
                        <Form.Item
                            label="Register as a Partner"
                            htmlFor="role"
                            name="role"
                            className="d-block text-center"
                            initialValue={false}
                            rules={[{ required: true, message: "Please select an option!" }]}
                        >
                            <div className="d-flex justify-content-start">
                                <Radio.Group name="radiogroup" className="flex-start">
                                    <Radio value={"partner"}>Yes</Radio>
                                    <Radio value={"user"}>No</Radio>
                                </Radio.Group>
                            </div>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary'
                                block
                                htmlType="submit"

                                style={{ fontSize: "1rem", fontWeight: "600" }}>Register</Button>
                        </Form.Item>
                    </Form>
                </section>
                <section>
                    <p>Already a user ?<Link to="/login">Login Now</Link></p>
                </section>
            </main>
        </header>

    )
}

export default Register