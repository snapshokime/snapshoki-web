import { Link } from 'react-router';
import { Container, Button } from 'react-bootstrap';
import PickerLauncher from "@/components/PickerLauncher";

export default function HomePage() {
    return (
        <Container className="text-center my-5">
            <h1 className="display-4 mb-4">Welcome to <span className="text-primary">PickSnap</span></h1>
            <p className="lead text-muted">
                Explore your Google Photos, select your favorite memories, and do more with them.
            </p>
            <p className="mb-4">
                PickSnap makes it effortless to browse and retrieve photos directly from your Google account.
            </p>
            <Link to="/picker">
                <Button variant="primary" size="lg">
                    🚀 Launch Picker
                </Button>
            </Link>
            <PickerLauncher />
        </Container>
    );
}
