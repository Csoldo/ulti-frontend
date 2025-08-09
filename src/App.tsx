import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login, Register } from './components/auth';
import { NotFound } from './components/common';
import './App.css'

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App
