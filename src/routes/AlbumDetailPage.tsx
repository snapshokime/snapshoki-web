import {useEffect, useState} from 'react';
import {Link, useParams} from 'react-router';
import {useAuthStore} from '@/stores/authStore';
import {Alert, Button, Card, Col, Container, Row, Spinner} from 'react-bootstrap';

interface MediaItem {
    id: string;
    baseUrl: string;
    filename: string;
}

export default function AlbumDetailPage() {
    const {id} = useParams();
    const accessToken = useAuthStore((s) => s.accessToken);
    const [items, setItems] = useState<MediaItem[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [nextPageToken, setNextPageToken] = useState<string | null>(null);

    const fetchAlbumItems = async (pageToken?: string) => {
        if (!accessToken || !id) return;

        setLoading(true);
        setError(null);

        try {
            const res = await fetch('https://photoslibrary.googleapis.com/v1/mediaItems:search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify({
                    albumId: id,
                    pageSize: 50,
                    pageToken,
                }),
            });

            if (!res.ok) throw new Error(`API error: ${res.status}`);
            const data = await res.json();
            setItems((prev) => [...prev, ...(data.mediaItems || [])]);
            setNextPageToken(data.nextPageToken || null);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setItems([]);
        setNextPageToken(null);
        fetchAlbumItems();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [accessToken, id]);

    return (
        <Container className="my-4">
            <h2>Album Details</h2>

            {loading && items.length === 0 && <Spinner animation="border"/>}
            {error && <Alert variant="danger">{error}</Alert>}

            {items.length === 0 && !loading && (
                <p className="text-muted">No media items found for this album.</p>
            )}

            <Row>
                {items.map((item) => (
                    <Col key={item.id} xs={6} md={3} className="mb-4">
                        <Link to={`/media/${item.id}`} className="text-decoration-none">
                            <Card>
                                <Card.Img src={`${item.baseUrl}=w300-h300`}/>
                                <Card.Body>
                                    <Card.Text className="small text-muted">{item.filename}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>

            {nextPageToken && !loading && (
                <div className="text-center mt-4">
                    <Button onClick={() => fetchAlbumItems(nextPageToken)}>Load More</Button>
                </div>
            )}
        </Container>
    );
}
