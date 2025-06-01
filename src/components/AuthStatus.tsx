import { Button } from 'react-bootstrap'
import { useAuthStore } from '@/stores/useAuthStore'
import {useStartAuth} from "@/hooks/useStartAuth";

export default function AuthStatus() {
    const user = useAuthStore((s) => s.user)
    const { startAuth, signOut } = useStartAuth()
    if (!user) {
        return (
            <Button variant="outline-light" onClick={startAuth}>
                Sign in with Google
            </Button>
        )
    }

    return (
        <div className="d-flex align-items-center gap-2 text-light">
            {user.picture && (
                <img
                    src={user.picture}
                    alt="Profile"
                    className="rounded-circle"
                    width={32}
                    height={32}
                />
            )}
            <span>{user.name ?? user.email}</span>
            <Button variant="outline-light" size="sm" onClick={signOut}>
                Sign Out
            </Button>
        </div>
    )
}
