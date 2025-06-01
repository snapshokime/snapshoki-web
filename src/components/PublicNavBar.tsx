import {Container, Nav, Navbar} from "react-bootstrap";
import AuthStatus from "@/components/AuthStatus";
import DarkModeSwitch from "@/components/DarkModeSwitch";
import {NavLink} from 'react-router-dom'
import {useThemeStore} from "@/stores/useThemeStore";

export function PublicNavBar() {
    const { navbarBg, navbarVariant} = useThemeStore()

    return (
        <Navbar bg={navbarBg} variant={navbarVariant} expand="lg" className="border-bottom">
            <Container>
                <Navbar.Brand>SnapShoki</Navbar.Brand>
                <Navbar.Toggle aria-controls="picksnap-navbar"/>
                <Navbar.Collapse id="picksnap-navbar">
                    <Nav className="me-auto">
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                        <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                        <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                    </Nav>
                    <div className="d-flex align-items-center">
                        <AuthStatus/>
                        <DarkModeSwitch/>
                    </div>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}