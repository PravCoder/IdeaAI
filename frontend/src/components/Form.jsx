import {useState} from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";
import LoadingIndicator from "./LoadingIndicator";

// props: route is the path we want to go to upon submission, mehtod is login or register
function Form({route, method}) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();  // navigate func to redirect
    const name = method === "login" ? "Login" : "Register";

    const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();

        try {
            // response = api-axios-interceptor-obj send post-request to specifed route-path '/login' payload data is username/password
            console.log(email, password)
            const res = await api.post(route, {email, password});
            if (method == "login") {  // if the form-method was login set the access token in localstorage to the response.tokens
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");  // after logging in navigate to home page
            } else {   // form-method was login, so we need to use new credentials to login
                navigate("/login")
            }

        } catch (error) {
            console.log(error)
            alert(error);
        } finally {
            setLoading(false);
        }
    }

    return <form onSubmit={handleSubmit} className="form-container">
        <h1>{name}</h1>
         
        {/* value is the cur-username-var, onchange take in variable e and get what was typed in and set username*/} 
        <input className="form-input" type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>

        <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"/>

        {loading && <LoadingIndicator />}
        <button className="form-button" type="submit">{name}</button>
    
    </form>
}

export default Form;