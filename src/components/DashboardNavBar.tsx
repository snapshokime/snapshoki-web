import { Navbar, Container, Form } from 'react-bootstrap'
import { useUIStore } from '@/stores/useUIStore'

export default function DashboardNavBar() {
    const darkMode = useUIStore((s) => s.darkMode)
    const toggleDarkMode = useUIStore((s) => s.toggleDarkMode)

    return (
        <Navbar bg="body-tertiary" className="border-bottom">
            <Container fluid>
                <Navbar.Brand>📸 SnapShoki</Navbar.Brand>
                <Form.Check
                    type="switch"
                    id="darkModeSwitch"
                    label="Dark Mode"
                    checked={darkMode}
                    onChange={toggleDarkMode}
                />
            </Container>
        </Navbar>
    )
}
