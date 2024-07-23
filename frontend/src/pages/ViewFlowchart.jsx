import React from 'react';
import { useParams } from 'react-router-dom';
import "../styles/ViewFlowchart.css";
import FlowchartForm from '../components/FlowchartForm';

function ViewFlowchart() {
    const { id } = useParams();
  return (
    <div className="view-flowchart">
        
        <FlowchartForm chart_id={id} />
    </div>
  );
}

export default ViewFlowchart;
