import Register from "./pages/register";
import Login from "./pages/login";
import NewPage from "./pages/NewPage";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import "./App.css";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    setLoggedIn(false);
    localStorage.removeItem('token');
  };

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login handleLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/newpage" element={<NewPage handleLogout={handleLogout} />} />
          <Route
            path="/"
            element={
              loggedIn ? <Navigate to="/newpage" /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
