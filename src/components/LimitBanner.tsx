import { Alert } from 'react-bootstrap'
import { useUIStore } from '@/stores/useUIStore'

export default function LimitBanner() {
    const hasReachedLimit = useUIStore((s) => s.hasReachedLimit)

    if (!hasReachedLimit) return null

    return (
        <Alert variant="warning" className="text-center rounded-0 m-0">
            ⚠️ You’ve reached your usage limit for AI descriptions.
        </Alert>
    )
}
