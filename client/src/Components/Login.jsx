import React,{useEffect} from 'react'
import { Form,Input,Button, message } from "antd";
import { Link,useNavigate } from 'react-router-dom';
import { LoginUser } from '../api/user';
import { useDispatch } from 'react-redux';
import { hideLoading, showLoading } from '../../redux/loaderSlice';
const Login = () => {
    const navigate=useNavigate();
    const dispatch=useDispatch();
    useEffect(() => {
        if (localStorage.getItem("tokenForBMS")) {
          navigate("/", { replace: true });
        }
      }, []);
    const handleFinish =async (values) => {
        console.log(values);
        try{
            dispatch(showLoading());
            const response=await LoginUser(values);
            if(response?.success)
            {
                message.success(response?.message)
                localStorage.setItem("tokenForBMS",response?.data);
                navigate("/")
            }
        }catch(error){
            message.error(response?.message)
            console.log(error);
        }finally{
            dispatch(hideLoading())
        }
    };
  return (
    <header className='App-header'>
            <main className='main-area mw-500 text-center px-3'> 
                <section >
                    <h1>Login to BookMyShow</h1>
                </section>
                <section>
                    
                    <Form layout="vertical" onFinish={handleFinish}>
                        <Form.Item label="Email" 
                        htmlFor="email" 
                        name="email" 
                        className="d-block"
                        rules={[{required:true,message:"Email is required"}]}>
                        
                            <Input id="email" 
                            type='text'
                            placeholder='Enter your email'></Input>
                        </Form.Item>
                    
                        <Form.Item label="Password" 
                        htmlFor="password" 
                        name="password" 
                        className="d-block"
                        rules={[{required:true,message:"Password is required"}]}>
                        
                            <Input id="password" 
                            type='password'
                            placeholder='Enter your password'></Input>
                        </Form.Item>
                        <Form.Item>
                            <Button type='primary' block htmlType="submit" style={{fontSize:"1rem",fontWeight:"600"}}>Login</Button>
                        </Form.Item>
                    </Form>
                </section>
                <section>
                    <p>New User?<Link to="/register">Register Now</Link></p>
                    <p>
            Forgot Password? <Link to="/forget">Click Here</Link>
          </p>
                </section>
            </main>
        </header>
  )
}

export default Login