// LoginBtn.jsx

import React from 'react'
import styled from 'styled-components'
import { Button } from 'antd'

const StyledLoginButton = styled(Button)`
  width: 100%;
  max-width: 300px;
  align-self: center;
  margin-top: 20px;
`

const LoginBtn = ({ onClick, children }) => {
  return (
    <StyledLoginButton type="primary" danger onClick={onClick}>
      {children}
    </StyledLoginButton>
  )
}

export default LoginBtn
