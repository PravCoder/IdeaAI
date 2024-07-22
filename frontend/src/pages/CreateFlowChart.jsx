import React, { useState } from 'react';
import api from "../api"
import "../styles/CreateFlowChart.css";

const CreateFlowchart = () => {
    const [content, setContent] = useState("");
    const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

        try {
            const res = await api.post("/api/create-flowchart/", {content, description});
            console.log(res.data.msg)
        } catch (error) {
            alert(error);
        } finally {
        }
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
