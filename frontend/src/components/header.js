import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import {ReactComponent as Logo} from '../images/logo.svg'

const navbarStyle = {
    backgroundColor: '#d1e7e0'
};

const Header = ({title}) => {
    return(
        <Navbar style={navbarStyle}  data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">
            <Logo alt={title}  />
          </Navbar.Brand>
        </Container>
      </Navbar>
    )
};

export default Header;