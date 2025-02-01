import React from 'react';
import useSaveTrack from '../../Hooks/useSaveTrack';

const AddToSavedTracks = ({ track }) => {
    const { saveTrack, isLoading, error } = useSaveTrack();

    const handleSaveTrack = async () => {
        try {
            await saveTrack(track.id);
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
                {isLoading ? 'Saving...' : 'Save to Library'}
            </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddToSavedTracks;