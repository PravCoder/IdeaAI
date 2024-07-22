import {useState, useEffect} from "react";
import api from "../api"
import "../styles/Dashboard.css";
import FlowchartList from "../components/FlowchartList";

function Dashboard() {
    useEffect(() => {
        console.log('Dashboard component rendered!!');
    }, []);

    const flowcharts = [
        { id: '1', name: 'Flowchart 1', description: 'Description of Flowchart 1' },
        { id: '2', name: 'Flowchart 2', description: 'Description of Flowchart 2' },
        { id: '3', name: 'Flowchart 3', description: 'Description of Flowchart 3' },
      ];

    return (
        <div className="dashboard">
            <FlowchartList flowcharts={flowcharts} />

        </div>
    );
}

export default Dashboard;