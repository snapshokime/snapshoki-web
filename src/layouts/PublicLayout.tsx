import { Outlet, NavLink } from 'react-router-dom'
import {Container, Nav, Navbar} from "react-bootstrap";
import AuthStatus from "@/components/AuthStatus";

export default function PublicLayout() {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={NavLink} to="/" className="fw-bold">
                        SnapShoki
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="picksnap-navbar" />
                    <Navbar.Collapse id="picksnap-navbar">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
                            <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                        </Nav>
                        <div className="d-flex">
                            <AuthStatus />
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>

            <Container className="my-4">
                <Outlet />
            </Container>
        </>
    )
}
