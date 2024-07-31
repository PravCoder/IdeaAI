import React from 'react';
import { useParams } from 'react-router-dom';
import LectureImage from '../components/LectureImage';
import {useState, useEffect} from "react";
import api from "../api";


function ViewLecture() {
    const { id } = useParams();
    const [lecture, setLecture] = useState({});

    useEffect(() => {
        api.get(`/api/get-lecture/${id}/`)
            .then(response => {
                setLecture(response.data.lecture);
            })
            .catch(error => {
                console.log(error);
            });
    }, [])   // HAVE TO ADD THIS!!!

    // all components of this page
    return (
        <div className="view-lecture">
            
            <LectureImage url={lecture.url} title={lecture.title} />

        </div>
    );
}

export default ViewLecture;
