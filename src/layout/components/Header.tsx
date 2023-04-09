import styled from "styled-components";

const HeaderWrapper = styled.header`
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 10px;
  background-image: url('/images/header_bg.jpg');
  background-size: cover;
`

const LogoBox = styled.div`
  background-image: url('/images/logo.png');
  background-size: contain;
  height: 64px;
  background-repeat: no-repeat;
  background-position: center;
`

const Header = () => {
  return (
    <HeaderWrapper>
      <LogoBox />
    </HeaderWrapper>
  )
}

export default Header