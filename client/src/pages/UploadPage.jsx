import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import UploadForm from '../components/Photo/UploadForm.jsx';

export default function UploadPage() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Upload a Photo</h2>
      <UploadForm onUploaded={() => navigate('/photos')} />
    </div>
  );
}
