import { Modal, Button, Form } from 'react-bootstrap'
import { usePhotoStore } from '@/stores/usePhotoStore'

export default function PhotoViewer() {
    const selectedPhoto = usePhotoStore((s) => s.selectedPhoto)
    const description = usePhotoStore((s) => s.description)
    const tags = usePhotoStore((s) => s.tags)
    const clearSelectedPhoto = usePhotoStore((s) => s.clearSelectedPhoto)
    const setDescription = usePhotoStore((s) => s.setDescription)
    const setTags = usePhotoStore((s) => s.setTags)

    const handleGenerate = () => {
        // placeholder logic for generation
        setDescription('Generated description from Gemini API')
        setTags(['ai', 'sample'])
    }

    const handleClose = () => {
        clearSelectedPhoto()
    }

    return (
        <Modal show={!!selectedPhoto} onHide={handleClose} size="lg" centered>
            <Modal.Header closeButton>
                <Modal.Title>Photo Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {selectedPhoto && (
                    <>
                        <img
                            src={selectedPhoto.url}
                            alt=""
                            className="img-fluid rounded mb-3"
                        />
                        <Form.Group className="mb-3" controlId="photoDescription">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={3}
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="photoTags">
                            <Form.Label>Tags (comma-separated)</Form.Label>
                            <Form.Control
                                type="text"
                                value={tags.join(', ')}
                                onChange={(e) =>
                                    setTags(e.target.value.split(',').map((t) => t.trim()))
                                }
                            />
                        </Form.Group>
                    </>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="outline-primary" onClick={handleGenerate}>
                    Generate Tags + Description
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
