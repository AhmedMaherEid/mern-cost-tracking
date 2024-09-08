import React, { useEffect, useState } from "react"
import Input from "antd/lib/input/Input"
import { Form, message } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { Player } from '@lottiefiles/react-lottie-player'
import '../resources/authentication.css'
import axios from 'axios'
import Spinner from "../components/Spinner"

function Login() {
  const [loading, setLoading] = useState(false);
  // use it in navigation
  const navigate = useNavigate()

  const onFinish = async (values) => {
    try {
      setLoading(false)
      const response = await axios.post('/api/users/login', values)

      //insert the data in the local storage
      localStorage.setItem('mahermoney-user', JSON.stringify({ ...response.data, password: 'Hidden' }))
      setLoading(false)
      message.success('Login is successful')

      //to return home
      navigate('/')
    }
    catch (error) {
      setLoading(false)
      message.error('login failed')
    }
  }
  useEffect(() => {
    if (localStorage.getItem(`mahermoney-user`)) {
      navigate('/');
    }
  },[])
  return (
    <div className="login">
      {loading ? <Spinner /> : null}
      <div className="row justify-content-center align-items-center w-70 h-100">
        <div className="col-md-4">
          <Form layout='vertical' onFinish={onFinish}>
            <h1>Sign in</h1>
            <hr />
            <Form.Item label="Email" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input type="password" />
            </Form.Item>
            <div className="d-flex justify-content-between align-content-center">
              <Link className='text-decoration-none' to="/register">Sign up</Link>
              <button className="primary h-50" type="submit">Login</button>
            </div>
          </Form>
        </div>
        <div className="col-md-5">
          <div className="lottie" >
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
      </div>
    </div>
  );
}
export default Login;
