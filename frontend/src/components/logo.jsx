import React from 'react'
import Logo from '../assets/airbrb_logo.png'
import styled from 'styled-components'
const StyledAirbrbLogo = styled.img`
  width: 80px;
  height: fit-content;
  align-self: center;
  cursor: pointer;
`
const AirbrbLogo = ({ onClick }) => {
  return <StyledAirbrbLogo src={Logo} alt="logo" onClick={onClick} />
}

export default AirbrbLogo
