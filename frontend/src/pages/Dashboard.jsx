import {useState, useEffect} from "react";
import api from "../api"
import "../styles/Dashboard.css";
import FlowchartList from "../components/FlowchartList";
import LectureList from "../components/LectureList";
import CreateLecture from "../components/CreateLecture";

function Dashboard() {
    const [lectures, setLectures] = useState([]);
    
    useEffect(() => {
        api.get(`/api/get-user-lectures/`)
            .then(response => {
                setLectures(response.data.user_lectures);  
                console.log(lectures);
            })
            .catch(error => {
                console.log(error);
            });
        }, [lectures])

    return (
        <div className="dashboard">
            <CreateLecture />
            <LectureList lectures={lectures} />

        </div>
    );
}

export default Dashboard;