import React, { useState }from 'react';
import useSaveTrack from '../../Hooks/useSaveTrack';

const AddToSavedTracks = ({ track }) => {
    const { saveTrack, isLoading, error } = useSaveTrack();
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSaveTrack = async () => {
        try {
            const result = await saveTrack(track.id);
            if (result) {
                setShowSuccess(true);
                alert('Track saved successfully!');
                setTimeout(() => setShowSuccess(false), 3000);
            }
        } catch (err) {
            console.error('Failed to save track:', err);
        }
    };


    return (
        <div >
            <button 
                
                onClick={handleSaveTrack}
                disabled={isLoading}
            >
                {isLoading ? 'Saving...' : showSuccess ? '✓ Saved' : 'Save aaato Library'}
                </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddToSavedTracks;