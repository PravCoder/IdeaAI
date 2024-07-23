import React, { useState } from 'react';
import api from "../api"
import "../styles/CreateFlowChart.css";

const CreateFlowchart = () => {
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("SUBMIT FORM!")
      api.post("/api/create-flowchart/", { content, description })
          .then(response => {
              console.log(response.data)
          })
          
    };

    return (
      <div className="create-flowchart-container">
        <h1>Create New Flowchart</h1>
        <form onSubmit={handleSubmit} className="create-flowchart-form">

          <label htmlFor="name">Flowchart Name:</label>
          <input type="text" id="name" value={content} onChange={(e) => setContent(e.target.value)} required/>

          <label htmlFor="name">Flowchart Description:</label>
          <input type="text" id="name" value={description} onChange={(e) => setDescription(e.target.value)} required/>

          <button type="submit">Create Flowchart</button>

        </form>
      </div>
    );
};

export default CreateFlowchart;
