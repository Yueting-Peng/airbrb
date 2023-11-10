import React from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import styled from 'styled-components'
import arrowIcon from '../assets/arrow-up-right.svg'
import loginImg from '../assets/login_background.jpeg'
import loginImgSmall from '../assets/login_background_small.jpg'
import { Link } from 'react-router-dom'
import { TitleHeader } from '../App'
import { HomeOutlined } from '@ant-design/icons'

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
  height: 70%;
  flex-direction: column;
  background-color: rgba(245, 249, 255, 0.6);
  align-items: center;
  padding: 100px;
  border-radius: 30px;

  margin: auto;
  @media (max-width: 750px) {
    padding: 0;
    margin-top: 30px;
    background-color: transparent;
  }
`

const Login = () => {
  const onFinish = (values) => {
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  return (
    <>
      <TitleHeader>
        <h2>
          <HomeOutlined />
          &nbsp; airbrb
        </h2>
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
              <StyledButton type="primary" htmlType="submit">
                Login
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
