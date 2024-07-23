import React, { useState } from 'react';
import api from '../api';
import '../styles/FlowchartForm.css';

function FlowchartForm({chart_id}) {
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const [imageURL, setImageURL] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);
        try {
            const response = await api.post(`/api/generate-flowchart/${chart_id}/`, { description });
            setImageURL(response.data.image_url);
            console.log(imageURL);
        } catch (err) {
            setError('An error occurred while generating the flowchart.');
        } finally {
            setLoading(false);
        }
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
