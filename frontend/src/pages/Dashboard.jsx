import {useState, useEffect} from "react";
import api from "../api"
import "../styles/Dashboard.css";
import FlowchartList from "../components/FlowchartList";

function Dashboard() {
    const [flowcharts, setFlowcharts] = useState([]);
    useEffect(() => {
        api.get(`/api/get-user-flowcharts/`)
            .then(response => {
                setFlowcharts(response.data.user_flowcharts);  
            })
            .catch(error => {
                console.log(error);
            });
        }, [])

    return (
        <div className="dashboard">
            <FlowchartList flowcharts={flowcharts} />

        </div>
    );
}

export default Dashboard;