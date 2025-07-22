import Register from "./pages/register";
import Login from "./pages/login";
import NewPage from "./pages/NewPage";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    setLoggedIn(false);
  };
  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newpage" element={<NewPage />} />
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/newpage" /> : <Navigate to="/login" />
            }
          />
        
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
