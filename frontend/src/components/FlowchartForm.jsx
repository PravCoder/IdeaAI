import React, { useState, useEffect } from 'react';
import api from '../api';
import '../styles/FlowchartForm.css';

function FlowchartForm({chart_id}) {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [imageURL, setImageURL] = useState("nothing");
    // var imageURL = "";

    useEffect(() => {
        api.get(`/api/get-chart-image-url/${chart_id}/`)
            .then(response => {
                // imageURL = response.data.image_url
                setImageURL(imageURL);
                console.log("URL1: " + response.data.image_url);
                console.log("URL2: " + imageURL);
            })
            .catch(error => {
                console.log(error);
            });
    }, [chart_id]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        
        api.post(`/api/generate-flowchart/${chart_id}/`, { description })
            .then(response => {
                setImageURL(response.data.image_url);
                console.log("URL_POST", response.data.image_url); // Use response.data.image_url directly
            })
            .catch(err => {
                setError('An error occurred while generating the flowchart.');
                console.error(err); // Optional: Log the error to console for debugging
            })
            .finally(() => {
                setLoading(false);
            });
    };



    return (
        <div className="flowchart-form-container">
            <form onSubmit={handleSubmit}>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter flowchart description"
                    required
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Generating...' : 'Generate Flowchart'}
                </button>
            </form>
            {error && <div className="error">{error}</div>}
            {imageURL && (
                <div className="flowchart-image-container">
                    <img src={imageURL} alt="Generated Flowchart" />
                </div>
            )}
        </div>
    );
};

export default FlowchartForm;
