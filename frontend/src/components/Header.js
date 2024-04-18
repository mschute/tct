import React, {useState} from 'react';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import '../styles/header.css';

const Header = ({userRole, jwtToken, handleSignOut}) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    
    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div>
            <Navbar className="nav-background" expand="lg">
                <Container style={{marginRight: '40px'}}>
                    <Navbar.Toggle aria-controls="basic"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="justify-content-end" style={{width: "100%"}}>
                            <NavDropdown
                                title={<span style={{ color: 'white'}}>Menu</span>}
                                id="basic-nav-dropdown"
                                show={dropdownOpen}
                                className="dropdown-menu-right navbar-text"
                                onMouseEnter={handleDropdownToggle}
                                onMouseLeave={handleDropdownToggle}
                            >
                                <LinkContainer to="/">
                                    <NavDropdown.Item>
                                        Home
                                    </NavDropdown.Item>
                                </LinkContainer>
                                {jwtToken != null && userRole === 'Admin' && (
                                    <LinkContainer to="/adminpage">
                                        <NavDropdown.Item>
                                            Admin
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                )}
                                {jwtToken != null && userRole === 'Customer' && (
                                    <LinkContainer to="/customerpage">
                                        <NavDropdown.Item>
                                            Customers
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                )}
                                <NavDropdown.Divider/>
                                {jwtToken != null ? (
                                    <NavDropdown.Item onClick={handleSignOut}>
                                        Sign Out
                                    </NavDropdown.Item>
                                ) : (
                                    <LinkContainer to="/signinpage">
                                        <NavDropdown.Item>
                                            Sign In
                                        </NavDropdown.Item>
                                    </LinkContainer>
                                )}
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}


export default Header;