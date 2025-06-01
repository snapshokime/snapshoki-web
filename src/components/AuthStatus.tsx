import {Button} from 'react-bootstrap'
import {useAuthStore} from '@/stores/useAuthStore'
import {useStartAuth} from "@/hooks/useStartAuth";
import {useThemeStore} from "@/stores/useThemeStore";

export default function AuthStatus() {
    const user = useAuthStore((s) => s.user)
    const {startAuth, signOut} = useStartAuth()
    const { navBarButtonVariant} = useThemeStore()

    if (!user) {
        return (
            <Button variant={navBarButtonVariant} onClick={startAuth}>
                Sign in with Google
            </Button>
        )
    }

    return (
        <div className="d-flex align-items-center gap-2">
            {user.picture && (
                <img
                    src={user.picture}
                    alt="Profile"
                    className="rounded-circle"
                    width={32}
                    height={32}
                />
            )}
            <span className={'fw-medium text-light'}>
                {user.name ?? user.email}
            </span>
            <Button variant={navBarButtonVariant} size="sm" onClick={signOut}>
                Sign Out
            </Button>
        </div>
    )
}
