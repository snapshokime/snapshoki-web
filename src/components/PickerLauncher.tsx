import { Button } from 'react-bootstrap';
import { useGooglePicker } from '@/hooks/useGooglePicker';

export default function PickerLauncher() {
    const { openPicker, pickerReady } = useGooglePicker();

    return (
        <Button onClick={openPicker} disabled={!pickerReady}>
            Open Google Photos Picker
        </Button>
    );
}
