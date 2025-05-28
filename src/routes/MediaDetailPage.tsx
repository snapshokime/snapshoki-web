import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuthStore } from '@/stores/authStore';
import { Container, Spinner, Alert, Card } from 'react-bootstrap';

interface MediaItem {
    id: string;
    baseUrl: string;
    filename: string;
    mimeType: string;
    description?: string;
    productUrl: string;
    mediaMetadata?: {
        creationTime: string;
        width: string;
        height: string;
        photo?: {
            cameraMake?: string;
            cameraModel?: string;
            focalLength?: number;
            apertureFNumber?: number;
            isoEquivalent?: number;
        };
        video?: {
            fps?: number;
            status?: string;
        };
    };
}

export default function MediaDetailPage() {
    const { id } = useParams();
    const accessToken = useAuthStore((s) => s.accessToken);
    const [media, setMedia] = useState<MediaItem | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id || !accessToken) return;

        const fetchMedia = async () => {
            setLoading(true);
            setError(null);

            try {
                const res = await fetch(`https://photoslibrary.googleapis.com/v1/mediaItems/${id}`, {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });

                if (!res.ok) {
                    throw new Error(`API error: ${res.status}`);
                }

                const data = await res.json();
                setMedia(data);
            } catch (err: any) {
                setError(err.message);
                setMedia(null);
            } finally {
                setLoading(false);
            }
        };

        fetchMedia();
    }, [id, accessToken]);

    return (
        <Container className="my-4">
            <h2>Media Detail</h2>

            {loading && <Spinner animation="border" />}
            {error && <Alert variant="danger">{error}</Alert>}
            {media && (
                <Card>
                    <Card.Img src={`${media.baseUrl}=w800-h800`} />
                    <Card.Body>
                        <Card.Title>{media.filename}</Card.Title>
                        <Card.Text>
                            <strong>Mime Type:</strong> {media.mimeType}<br />
                            <strong>Created:</strong> {media.mediaMetadata?.creationTime}<br />
                            <strong>Resolution:</strong> {media.mediaMetadata?.width}×{media.mediaMetadata?.height}
                        </Card.Text>

                        {media.mediaMetadata?.photo && (
                            <Card.Text className="text-muted small">
                                📷 {media.mediaMetadata.photo.cameraMake} {media.mediaMetadata.photo.cameraModel} | ƒ{media.mediaMetadata.photo.apertureFNumber} | ISO {media.mediaMetadata.photo.isoEquivalent}
                            </Card.Text>
                        )}

                        <a href={media.productUrl} target="_blank" rel="noopener noreferrer">
                            Open in Google Photos
                        </a>
                    </Card.Body>
                </Card>
            )}
        </Container>
    );
}
