import { redirect } from 'react-router-dom'
import { useAuthStore } from '@/stores/useAuthStore'

/**
 * Route loader to block access to protected routes
 * if the user is not authenticated.
 */
export function requireUser() {
    const { user } = useAuthStore.getState()

    if (!user) {
        return redirect('/')
    }

    return null
}
