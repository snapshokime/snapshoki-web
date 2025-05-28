import PickerLauncher from '@/components/PickerLauncher';

export default function PickerPage() {
    return (
        <div className="text-center mt-5">
            <h2>📷 Pick Photos</h2>
            <p>Use the button below to open your Google Photos library.</p>
            <PickerLauncher />
        </div>
    );
}
