import { ListGroup, Form, Alert } from 'react-bootstrap'
import { useAlbumStore } from '@/stores/useAlbumStore'
import { useUIStore } from '@/stores/useUIStore'

export default function AlbumSidebar() {
    const albums = useAlbumStore((s) => s.albums)
    const selectedAlbumId = useAlbumStore((s) => s.selectedAlbumId)
    const setSelectedAlbum = useAlbumStore((s) => s.setSelectedAlbum)
    const showOnlyUntagged = useUIStore((s) => s.showOnlyUntagged)
    const toggleShowOnlyUntagged = useUIStore((s) => s.toggleShowOnlyUntagged)

    return (
        <div className="d-flex flex-column gap-3">
            <h6>Albums</h6>

            {albums.length === 0 ? (
                <Alert variant="info">No albums found. Try syncing with Google Photos.</Alert>
            ) : (
                <ListGroup>
                    {albums.map((album) => (
                        <ListGroup.Item
                            key={album.id}
                            action
                            active={selectedAlbumId === album.id}
                            onClick={() => setSelectedAlbum(album.id)}
                        >
                            {album.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}

            <Form.Check
                type="switch"
                id="showOnlyUntagged"
                label="Show only untagged"
                checked={showOnlyUntagged}
                onChange={toggleShowOnlyUntagged}
            />
        </div>
    )
}
