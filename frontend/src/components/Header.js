import React, {useState} from 'react';
import {Container, Navbar, Nav, NavDropdown} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';

const Header = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const handleDropdownToggle = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Toggle aria-controls="basic"/>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="justify-content-end" style={{ width: "100%" }}>
                        <NavDropdown
                            title="Dropdown"
                            id="basic-nav-dropdown"
                            show={dropdownOpen}
                            className="dropdown-menu-right"
                            onMouseEnter={handleDropdownToggle}
                            onMouseLeave={handleDropdownToggle}
                        >
                            <LinkContainer to="/home">
                                <NavDropdown.Item>
                                    Home
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/adminpage">
                                <NavDropdown.Item>
                                    Admin
                                </NavDropdown.Item>
                            </LinkContainer>
                            <LinkContainer to="/customerpage">
                                <NavDropdown.Item>
                                    Customers
                                </NavDropdown.Item>
                            </LinkContainer>
                            <NavDropdown.Divider />
                            {/*Need to add conditional rendering to change this to sign out once user accounts are created*/}
                            <LinkContainer to="/signin">
                                <NavDropdown.Item>
                                    Sign In
                                </NavDropdown.Item>
                            </LinkContainer>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}


export default Header;