import { Button } from 'react-bootstrap';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';
import { useAuthStore } from '@/stores/authStore';

export default function AuthStatus() {
    const { login, logout, isAuthenticated } = useGoogleAuth();
    const profile = useAuthStore((s) => s.profile);

    return (
        <div className="d-flex align-items-center gap-2">
            {isAuthenticated && profile ? (
                <>
                    <span className="text-light small">Logged in as {profile.name}</span>
                    <Button onClick={logout} variant="outline-light" size="sm">
                        Logout
                    </Button>
                </>
            ) : (
                <Button onClick={login} variant="outline-light" size="sm">
                    Login
                </Button>
            )}
        </div>
    );
}
