import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/LectureList.css";
// import ViewLecture from "./pages/ViewLecture";

const LecturesList = ({ lectures }) => {
    return (
        <div className="lectures-list">
            {lectures.map((lecture) => (
                <Link to={`/view-lecture/${lecture.id}`} key={lecture.id} className="lecture-link">
                    <div className="lecture-card">
                        <img src={lecture.image} alt={lecture.title} className="lecture-image" />
                        <h3 className="lecture-title">{lecture.title}</h3>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default LecturesList;
