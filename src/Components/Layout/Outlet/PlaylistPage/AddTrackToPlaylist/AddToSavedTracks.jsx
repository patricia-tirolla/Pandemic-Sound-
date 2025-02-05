
import React, { useState, useEffect } from 'react';
import usePutRequest from '../../../../../Hooks/usePutRequest';
import "./addToSavedTracks.css"
const AddToSavedTracks = ({ track }) => {
    const { sendPutRequest, isLoading, error } = usePutRequest();
    const [showSuccess, setShowSuccess] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

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
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div>
            <button 
                onClick={handleSaveTrack}
                disabled={isLoading}
                className="save-track-button"
            >
                {isLoading ? '...' : 
                 showSuccess ? '✓' : 
                 isMobile ? '♥' : 'Save to Library'}
                    </button>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

export default AddToSavedTracks;
