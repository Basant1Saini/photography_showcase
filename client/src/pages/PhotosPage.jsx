import { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoCard from '../components/Photo/PhotoCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function PhotosPage() {
  const { user, token } = useAuth();
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get('/api/photos').then(res => setPhotos(res.data));
  }, []);

  async function handleDelete(id) {
    await axios.delete(`/api/photos/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setPhotos(photos.filter(p => p._id !== id));
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>All Photos</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {photos.map(photo => (
          <PhotoCard key={photo._id} photo={photo} onDelete={handleDelete} currentUserId={user?.id} />
        ))}
      </div>
    </div>
  );
}
