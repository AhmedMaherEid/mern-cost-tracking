import React ,{useEffect, useState} from "react";
import Input from "antd/lib/input/Input";
import { Form , message } from "antd";
import { Link, Navigate } from "react-router-dom";
import { Player } from '@lottiefiles/react-lottie-player';
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from "../components/Spinner";

function Register() {
  const [loading, setLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setLoading(true)
      await axios.post('/api/users/register', values)
      setLoading(false)
      message.success('Registered Successfully')
    }
    catch (error) {
      setLoading(false)
      message.error('something went wrong')
    }
  }
  useEffect(() => {
    if (localStorage.getItem(`mahermoney-user`)) {
      Navigate('/');
    }
  },[])
  return (
    <div className="register">
      {loading ? <Spinner/> : null}
      <div className="row justify-content-center align-items-center w-70 h-100">
        <div className="col-md-5">
          <div className="lottie">
          <Player
            src="https://lottie.host/61c1d896-b0f0-4226-8573-22e1aca0622e/VAPu38SFZx.json"
            background="transparent"
            speed="1"
            loop
            autoplay
            direction="1"
            mode="normal"
          />
          </div>
        </div>
        <div className="col-md-4">
          <Form layout ='vertical' onFinish={onFinish}>
            <h1>Sign up</h1>
            <hr />
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-content-center">
              <Link className='text-decoration-none' to="/login">Already registered, Click Here to Login</Link>
              <button className="primary h-50" type="submit">Register</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
export default Register;
