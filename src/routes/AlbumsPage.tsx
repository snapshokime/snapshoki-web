import { useEffect, useState } from 'react';
import { useAuthStore } from '@/stores/authStore';
import { Container, Row, Col, Spinner, Alert, Card } from 'react-bootstrap';
import { Link } from 'react-router';

interface Album {
    id: string;
    title: string;
    coverPhotoBaseUrl?: string;
    mediaItemsCount?: string;
}

export default function AlbumsPage() {
    const accessToken = useAuthStore((s) => s.accessToken);
    const [albums, setAlbums] = useState<Album[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!accessToken) return;

        const fetchAlbums = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await fetch('https://photoslibrary.googleapis.com/v1/albums?pageSize=24', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!res.ok) throw new Error(`API error: ${res.status}`);
                const data = await res.json();
                setAlbums(data.albums || []);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchAlbums();
    }, [accessToken]);

    return (
        <Container className="my-4">
            <h2>Your Google Photo Albums</h2>

            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}

            <Row>
                {albums.map((album) => (
                    <Col key={album.id} xs={12} md={4} lg={3} className="mb-4">
                        <Card as={Link} to={`/albums/${album.id}`} className="text-decoration-none h-100">
                            {album.coverPhotoBaseUrl && (
                                <Card.Img variant="top" src={`${album.coverPhotoBaseUrl}=w300-h200`} />
                            )}
                            <Card.Body>
                                <Card.Title className="h6">{album.title}</Card.Title>
                                {album.mediaItemsCount && (
                                    <Card.Text className="text-muted small">
                                        {album.mediaItemsCount} item{album.mediaItemsCount === '1' ? '' : 's'}
                                    </Card.Text>
                                )}
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
}
