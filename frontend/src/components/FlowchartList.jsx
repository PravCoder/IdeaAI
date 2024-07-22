import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import "../styles/FlowchartList.css";

const FlowchartList = ({ flowcharts }) => {
  const navigate = useNavigate();

  const handleCreateNewFlowchart = () => {
    navigate('/create-flowchart');
  };

  const handleFlowchartClick = (id) => {
    navigate(`/flowchart/${id}`);
  };



  return (
    <div className="flowchart-list-container">
      <div className="header">
        <h1>Dashboard Flowcharts</h1>
        <button className="create-button" onClick={handleCreateNewFlowchart}>
          Create New Flowchart
        </button>
      </div>
      <div className="flowchart-list">
        {flowcharts.map((flowchart) => (
          <div
            className="flowchart-card"
            key={flowchart.id}
            onClick={() => handleFlowchartClick(flowchart.id)}
          >
            <h2>{flowchart.name}</h2>
            <p>{flowchart.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

FlowchartList.propTypes = {
  flowcharts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default FlowchartList;
