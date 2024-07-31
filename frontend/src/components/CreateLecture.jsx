import React, { useState } from 'react';
import api from '../api';  // Import your API handling module
import '../styles/CreateLecture.css';  // Import the CSS for styling

function CreateLecture() {
    const [videoLink, setVideoLink] = useState('');
    const [lectureName, setlectureName] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await api.post('/api/create-lecture-link/', { video_link: videoLink, lecture_name: lectureName });
            // Handle the response as needed
        } catch (err) {
            setError('An error occurred while processing the video link.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="dashboard">
          <h2 className="dashboard-title">Paste a link to a video lecture</h2>
          <form className="dashboard-form" onSubmit={handleSubmit}>
          <input
              type="text"
              className="dashboard-input"
              value={lectureName}
              onChange={(e) => setlectureName(e.target.value)}
              placeholder="Enter lecture name"
            />
            <input
              type="text"
              className="dashboard-input"
              value={videoLink}
              onChange={(e) => setVideoLink(e.target.value)}
              placeholder="Enter video link"
            />

            

            <button type="submit" className="dashboard-button">Submit</button>
          </form>
        </div>
    );
}

export default CreateLecture;
