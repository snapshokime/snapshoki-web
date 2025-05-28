import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Container, Spinner, Alert } from 'react-bootstrap';

export default function MediaListTestPage() {
    const accessToken = useAuthStore((s) => s.accessToken);
    const [data, setData] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!accessToken) return;

        const fetchAllMedia = async () => {
            setLoading(true);
            try {
                const res = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                const text = await res.text(); // intentionally not parsing yet
                if (!res.ok) throw new Error(`API ${res.status}: ${text}`);

                setData(JSON.parse(text));
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAllMedia();
    }, [accessToken]);

    return (
        <Container className="my-4">
            <h2>mediaItems.list Test</h2>
            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">❌ {error}</Alert>}
            {data && <pre className="bg-light p-3">{JSON.stringify(data, null, 2)}</pre>}
        </Container>
    );
}
