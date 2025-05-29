import { Button } from 'react-bootstrap'
import { useAuthStore } from '@/stores/useAuthStore'

export default function AuthStatus() {
    const user = useAuthStore((s) => s.user)
    const setUser = useAuthStore((s) => s.setUser)
    const clearAuth = useAuthStore((s) => s.clearAuth)

    if (!user) {
        return (
            <Button
                variant="outline-light"
                onClick={() =>
                    setUser({
                        id: 'demo-user',
                        email: 'demo@example.com',
                        name: 'Demo User',
                    })
                }
            >
                Sign In
            </Button>
        )
    }

    return (
        <div className="d-flex align-items-center gap-2 text-light">
            <span>{user.email}</span>
            <Button variant="outline-light" size="sm" onClick={clearAuth}>
                Sign Out
            </Button>
        </div>
    )
}
