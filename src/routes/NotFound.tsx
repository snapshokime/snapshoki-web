import { Link } from 'react-router';

export default function NotFound() {
    return (
        <div className="text-center mt-5">
            <h1 className="display-4">404</h1>
            <p className="lead">Page not found</p>
            <Link to="/" className="btn btn-primary">
                Go Home
            </Link>
        </div>
    );
}
