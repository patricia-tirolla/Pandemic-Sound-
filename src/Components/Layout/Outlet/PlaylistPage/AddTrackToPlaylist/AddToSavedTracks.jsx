import React, { useState } from 'react';
import usePutRequest from '../../../../../Hooks/usePutRequest';
// done
const AddToSavedTracks = ({ track }) => {
    const { sendPutRequest, isLoading, error } = usePutRequest();
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSaveTrack = async () => {
        try {
            await sendPutRequest(
                'https://api.spotify.com/v1/me/tracks',
                { ids: [track.id] }
            );
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 3000);
        } catch (error) {
            console.error('Failed to save track:', error);
        }
    };

    return (
        <div>
            <button 
                onClick={handleSaveTrack}
                disabled={isLoading}
                className="save-track-button"
            >
                {isLoading ? 'Saving...' : showSuccess ? '✓ Saved' : 'Save to Library'}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddToSavedTracks;