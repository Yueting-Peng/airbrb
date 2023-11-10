import React from 'react'
import { Form, Input, Button } from 'antd'
import styled from 'styled-components'
import arrowIcon from '../assets/arrow-up-right.svg'
import registerImg from '../assets/register_img.jpeg'
import { Link } from 'react-router-dom'
import { TitleHeader } from '../App'
import { HomeOutlined } from '@ant-design/icons'
// Styled Components
const RegisterPage = styled.div`
  box-sizing: border-box;
  height: calc(100vh - 82px);
  width: 100%;
  justify-content: space-evenly;
  display: flex;
  padding: 50px;
  padding-top: 100px;
  gap: 50px;

  background-color: #f1eff0;
  @media (max-width: 950px) {
    flex-direction: column;
    padding: 10px;
    height: auto;
  }
`

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0.5;
  padding-top: 50px;
  @media (max-width: 950px) {
    padding: 5px;
  }
`

const ImageWrapper = styled.div`
  display: flex;
  flex: 0.5;
`

const RegisterImg = styled.img`
  width: 100%;
  height: auto;
  margin: auto;
  object-fit: cover;
  margin-top: 50px;
  border-radius: 20px;
`
const SignupForm = styled(Form)`
  max-width: 600px;
  padding: 20px;
  border-radius: 10px;
  /* box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); */
`

const RegisterButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  color: white;
  background-color: #ff385c;
  border-color: #ff385c;
`

const Register = () => {
  return (
    <>
      <TitleHeader>
        <h2>
          <HomeOutlined />&nbsp;
          airbrb
        </h2>
      </TitleHeader>
      <RegisterPage>
        <FormWrapper>
          <h1>Create new account</h1>
          <p>Welcome to AirBrB! 🏠</p>
          <SignupForm id="signup-form">
            <Form.Item label="Email address" name="email">
              <Input type="email" />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password />
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <Input.Password />
            </Form.Item>
            <Form.Item>
              <RegisterButton type="primary" danger htmlType="submit">
                Signup Now
              </RegisterButton>
            </Form.Item>
          </SignupForm>
          <p>
            Already have an account?
            <Link to={'/login'}>
              <a>
                Login
                <img src={arrowIcon} alt="arrow icon" />
              </a>
            </Link>
          </p>
        </FormWrapper>
        <ImageWrapper>
          <RegisterImg src={registerImg} alt="Register" />
        </ImageWrapper>
      </RegisterPage>
    </>
  )
}

export default Register
