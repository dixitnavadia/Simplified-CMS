import Register from "./pages/register";
import Login from "./pages/login";
import NewPage from "./pages/NewPage";
import PageDrafts from "./pages/PageDrafts";
import UserMenu from "./components/UserMenu";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import { UserProvider, useUser } from "./context/UserContext";
import Box from "@mui/material/Box";
import "./App.css";

// Component to handle conditional UserMenu rendering
const AppContent = ({ loggedIn, setLoggedIn }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearUser } = useUser();
  const showUserMenu = loggedIn && location.pathname !== '/login' && location.pathname !== '/register';

  const handleLogout = () => {
    // Clear user data from context
    clearUser();
    // Clear token from localStorage
    localStorage.removeItem('token');
    // Set logged in state to false
    setLoggedIn(false);
    // Navigate to login page
    navigate('/login');
  };

  const handleLogin = () => {
    setLoggedIn(true);
    navigate('/newpage');
  };

  return (
    <Box sx={{ position: 'relative', minHeight: '100vh' }}>
      {/* Global UserMenu */}
      {showUserMenu && (
        <Box
          sx={{
            position: 'fixed',
            top: 20,
            right: 20,
            zIndex: 1300, // High z-index to appear above other content
          }}
        >
          <UserMenu handleLogout={handleLogout} />
        </Box>
      )}
      
      <Routes>
        <Route path="/login" element={<Login handleLogin={handleLogin} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/newpage" element={<NewPage />} />
        <Route path="/drafts" element={<PageDrafts />} />
        <Route
          path="/"
          element={
            loggedIn ? <Navigate to="/newpage" /> : <Navigate to="/login" />
          }
        />
      </Routes>
    </Box>
  );
};

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // Check if user is logged in on app start
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);

  return (
    <UserProvider>
      <BrowserRouter>
        <AppContent 
          loggedIn={loggedIn} 
          setLoggedIn={setLoggedIn}
        />
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
