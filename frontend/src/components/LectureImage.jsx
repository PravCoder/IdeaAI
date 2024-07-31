import React from 'react';
import PropTypes from 'prop-types';
import '../styles/LectureImage.css';

const LectureImage = ({ url, title }) => {
    if (!url) {
        console.error("No URL provided to LectureImage component.");
        return <div className="lecture-image-error">No URL provided</div>;
    }

    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([^&]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    if (!videoId) {
        console.error(`Invalid YouTube URL provided: ${url}`);
        return <div className="lecture-image-error">Invalid YouTube URL</div>;
    }

    const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/0.jpg`;

    return (
        <div className="lecture-image-container">
            <a href={url} target="_blank" rel="noopener noreferrer">
                <img src={thumbnailUrl} alt={title} className="lecture-thumbnail" />
            </a>
            <h3 className="lecture-title">{title}</h3>
        </div>
    );
};

LectureImage.propTypes = {
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default LectureImage;
