import React from 'react';
import "../styles/LectureList.css";


const LecturesList = ({ lectures }) => {    

    return (
        <div className="lectures-list">
            {lectures.map((lecture) => (
            <div key={lecture.id} className="lecture-card">
                <img src={lecture.image} alt={lecture.title} className="lecture-image" />
                <h3 className="lecture-title">{lecture.title}</h3>
            </div>
            ))}
        </div>
        );
}

export default LecturesList;