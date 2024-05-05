import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from "./component/Login/Login.jsx";
import Homepage from "./component/HomePage/homepage.jsx";


const App = () => {
    return (
        <Router>
            <div>
                <h1>My App</h1>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/homepage" element={<Homepage />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;