import React from 'react'
import useHttp from '../utils/useHttp'
import { Form, Input, Button, message } from 'antd'
import styled from 'styled-components'
import arrowIcon from '../assets/arrow-up-right.svg'
import registerImg from '../assets/register_img.jpeg'
import { Link, useNavigate } from 'react-router-dom'
import { TitleHeader } from '../App'
import AirbrbLogo from '../components/logo.jsx'

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

  background-color: #f2f0f1;
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
`

const Register = () => {
  const { isLoading, error, data, request } = useHttp()
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [confirmPassword, setConfirmPassword] = React.useState('')
  const navigate = useNavigate()
  React.useEffect(() => {
    if (error) {
      message.open({
        type: 'error',
        content: error.message || 'Registration failed!',
      })
    }
    if (data && data.token) {
      message.open({
        type: 'success',
        content: 'Registered successfully!',
      })
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
    }
  }, [error, data, navigate])

  const handleSubmit = async (event) => {
    event.preventDefault()
    console.log(email, password, name)

    if (!email || !name || !password || !confirmPassword) {
      message.open({ type: 'warning', content: 'All fields are required!' })
      return
    }

    if (password !== confirmPassword) {
      message.open({ type: 'error', content: 'Passwords do not match!' })
      return
    }
    await request('post', '/user/auth/register', { email, password, name })
  }
  return (
    <>
      <TitleHeader>
        <AirbrbLogo />
      </TitleHeader>
      <RegisterPage>
        <FormWrapper>
          <h1>Create new account</h1>
          <p>Welcome to AirBrB! 🏠</p>
          <SignupForm id="signup-form">
            <Form.Item label="Email address" name="email">
              <Input value={email} onChange={(e) => setEmail(e.target.value)} />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </Form.Item>
            <Form.Item label="Password" name="password">
              <Input.Password
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Confirm Password" name="confirmPassword">
              <Input.Password
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Item>
            <Form.Item>
              <RegisterButton
                type="primary"
                htmlType="submit"
                disabled={isLoading}
                onClick={handleSubmit}
              >
                {isLoading ? 'Signing Up...' : 'Signup Now'}
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
