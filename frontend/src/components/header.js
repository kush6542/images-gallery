import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
import {ReactComponent as Logo} from '../images/logo.svg'

const navbarStyle = {
    backgroundColor: 'Lightblue'
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