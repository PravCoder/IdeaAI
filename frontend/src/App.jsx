import react from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Foo from "./pages/Foo";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreateFlowChart from "./pages/CreateFlowChart";
import ViewFlowchart from "./pages/ViewFlowchart";

function Logout() {
  localStorage.clear(); // when we logout we clear our refresh/access tokens
  return <Navigate to="/login"/>  // redirect to login-page
}

function RegisterAndLogout() {
  localStorage.clear();             // when registering clear tokens to make sure there are not any lingering around
  return <Register />   // return register-component redirects to register-page
}

function App() {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>

        {/* home-route is protected so you need valid access token to view home-component */} 
        <Route path="/" element={<ProtectedRoute> <Dashboard /> </ProtectedRoute>}/>
        {/* login-route is not protected because you can visit it any time */} 
        <Route path="/login" element={<Login />}/>

        <Route path="/logout" element={<Logout />}/>

        <Route path="/register" element={<RegisterAndLogout />}/>

        <Route path="/create-flowchart" element={<CreateFlowChart />}/>

        <Route path="/view-flowchart/:id" element={<ViewFlowchart />}/>

        {/* render 404-page anytime any other path is visited */} 
        <Route path="*" element={<NotFound />}/>

        <Route path="/foo" element={<Foo />}/>

      </Routes>
    </BrowserRouter>
  )
}

export default App
