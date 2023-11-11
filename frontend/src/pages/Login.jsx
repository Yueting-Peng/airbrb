import React from 'react'
import useHttp from '../utils/useHttp'
import { Form, Input, Button, Checkbox, message } from 'antd'
import styled from 'styled-components'
import arrowIcon from '../assets/arrow-up-right.svg'
import loginImg from '../assets/login_background.jpeg'
import loginImgSmall from '../assets/login_background_small.jpg'
import { Link, useNavigate } from 'react-router-dom'
import { TitleHeader } from '../App'
import AirbrbLogo from '../components/logo.jsx'

const LoginPage = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 82px);
  width: 100%;
  display: flex;
  flex-direction: column;
  background-image: url(${loginImg});
  background-repeat: no-repeat;
  background-size: cover;
  border-radius: 20px;
  @media (max-width: 750px) {
    background-image: url(${loginImgSmall});
  }
`

const StyledForm = styled(Form)`
  width: 80%;
  max-width: 700px;
  min-width: 500px;
  @media (max-width: 750px) {
    max-width: 700px;
    min-width: 350px;
  }
`

const RegisterLink = styled.p`
  margin-top: 16px;
  font-weight: bold;
`

const StyledButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  align-self: center;
  margin-top: 20px;
`
const LoginPane = styled.div`
  display: flex;
  height: 60%;
  flex-direction: column;
  background-color: rgba(223, 241, 255, 0.7);
  align-items: center;
  padding: 100px;
  border-radius: 30px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);

  margin: auto;
  @media (max-width: 750px) {
    padding: 0;
    margin-top: 30px;
    background-color: transparent;
    box-shadow: none;
  }
`

const Login = () => {
  const { isLoading, error, data, request } = useHttp()
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = React.useState('')
  const onFinish = async (values) => {
    const { email, password } = values
    setUserEmail(email)
    await request('post', '/user/auth/login', { email, password })
  }

  const onFinishFailed = (errorInfo) => {
    const errorContent = errorInfo.errorFields[0].errors[0]
    message.open({
      type: 'error',
      content: errorContent,
    })
  }

  React.useEffect(() => {
    if (error) {
      message.open({
        type: 'error',
        content: error.message || 'Login failed!',
      })
    }
    if (data && data.token) {
      message.open({
        type: 'success',
        content: 'Logged in successfully!',
      })
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', userEmail)
      navigate('/dashboard')
    }
  }, [error, data, navigate, userEmail])

  return (
    <>
      <TitleHeader>
        <AirbrbLogo />
      </TitleHeader>
      <LoginPage>
        <LoginPane>
          <StyledForm
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
          >
            <h1>Login</h1>
            <p>Hi, Welcome back 👋</p>
            <Form.Item
              label="Email address"
              name="email"
              rules={[{ required: true, message: 'Please input your email!' }]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: 'Please input your password!' },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <StyledButton
                type="primary"
                htmlType="submit"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </StyledButton>
            </Form.Item>
          </StyledForm>
          <RegisterLink>
            Not registered yet?
            <Link to={'/register'}>
              <a>
                Create an account
                <img src={arrowIcon} alt="arrow icon" />
              </a>
            </Link>
          </RegisterLink>
        </LoginPane>
      </LoginPage>
    </>
  )
}

export default Login
