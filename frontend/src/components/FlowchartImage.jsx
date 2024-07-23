import {useState, useEffect} from "react";
import api from "../api"
import "../styles/FlowchartImage.css";


function FlowchartImage({chart_id}) {
    const [imageURL, setImageURL] = useState("url not set");
    const baseURL = "http://localhost:8000";

    useEffect(() => {
        api.get(`/api/get-chart-image-url/${chart_id}/`)
            .then(response => {
                const absoluteUrl = `${baseURL}${response.data.image_url}`;
                setImageURL(absoluteUrl);
                console.log("reseponse.data.image_url: " + response.data.image_url);
                console.log("imageURL: " + imageURL);
            })
            .catch(error => {
                console.log(error);
            });
    }, [imageURL])   // HAVE TO ADD THIS!!!
    
    return (
        <div className="flowchart-image-wrapper">
            {imageURL && (
                <div className="flowchart-image-container">
                    <img src={imageURL} alt="Generated Flowchart" className="flowchart-image" />
                </div>
            )}
        </div>
    );
}

export default FlowchartImage;