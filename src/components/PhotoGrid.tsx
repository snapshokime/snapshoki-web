import { Card, Row, Col } from 'react-bootstrap'
import { usePhotoStore } from '@/stores/usePhotoStore'
import { useUIStore } from '@/stores/useUIStore'

export default function PhotoGrid() {
    const selectedPhoto = usePhotoStore((s) => s.selectedPhoto)
    const setSelectedPhoto = usePhotoStore((s) => s.setSelectedPhoto)
    const showOnlyUntagged = useUIStore((s) => s.showOnlyUntagged)

    // Temporary mock data
    const demoPhotos = [
        { id: '1', url: 'https://via.placeholder.com/150', tagged: false },
        { id: '2', url: 'https://via.placeholder.com/150', tagged: true },
        { id: '3', url: 'https://via.placeholder.com/150', tagged: false },
    ]

    const photos = showOnlyUntagged
        ? demoPhotos.filter((p) => !p.tagged)
        : demoPhotos

    return (
        <>
            <h5 className="mb-3">Photo Grid</h5>
            <Row xs={2} sm={3} md={4} lg={6} className="g-3">
                {photos.map((photo) => (
                    <Col key={photo.id}>
                        <Card
                            className={`border ${
                                selectedPhoto?.id === photo.id ? 'border-primary' : ''
                            }`}
                            onClick={() =>
                                setSelectedPhoto({ id: photo.id, url: photo.url })
                            }
                            style={{ cursor: 'pointer' }}
                        >
                            <Card.Img variant="top" src={photo.url} />
                        </Card>
                    </Col>
                ))}
            </Row>
        </>
    )
}
