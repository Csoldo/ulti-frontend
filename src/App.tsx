import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { Login, Register } from './components/auth';
import { NotFound, DashboardLayout } from './components/common';
import { Home, History, Profile, GamePage } from './pages';
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/" element={<DashboardLayout />}>
              <Route index element={<Navigate to="//home" replace />} />
              <Route path="home" element={<Home />} />
              <Route path="history" element={<History />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App
