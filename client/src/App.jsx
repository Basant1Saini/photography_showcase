import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import MapPage from './pages/MapPage.jsx';
import PhotosPage from './pages/PhotosPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import RegisterPage from './pages/RegisterPage.jsx';
import UploadPage from './pages/UploadPage.jsx';

function Navbar() {
  const { user, logout } = useAuth();
  return (
    <nav style={{ padding: '1rem', background: '#222', color: '#fff', display: 'flex', gap: '1rem' }}>
      <Link to="/" style={{ color: '#fff' }}>🗺 Map</Link>
      <Link to="/photos" style={{ color: '#fff' }}>📷 Photos</Link>
      {user ? (
        <>
          <Link to="/upload" style={{ color: '#fff' }}>Upload</Link>
          <span style={{ marginLeft: 'auto', cursor: 'pointer' }} onClick={logout}>Logout ({user.name})</span>
        </>
      ) : (
        <>
          <Link to="/login" style={{ color: '#fff', marginLeft: 'auto' }}>Login</Link>
          <Link to="/register" style={{ color: '#fff' }}>Register</Link>
        </>
      )}
    </nav>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MapPage />} />
          <Route path="/photos" element={<PhotosPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
