import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router';
import AuthStatus from '@/components/AuthStatus';

export default function AppContainer() {
    return (
        <>
            <Navbar bg="dark" variant="dark" expand="lg">
                <Container>
                    <Navbar.Brand as={NavLink} to="/">
                        📸 PickSnap
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="picksnap-navbar" />
                    <Navbar.Collapse id="picksnap-navbar">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/albums">Albums</Nav.Link>
                            <Nav.Link as={NavLink} to="/picker">
                                Pick Photos
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/selected">
                                Selected
                            </Nav.Link>
                            <Nav.Link as={NavLink} to="/settings">
                                Settings
                            </Nav.Link>
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
    );
}
