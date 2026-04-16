import { useEffect, useState } from 'react';
import axios from 'axios';
import PhotoMap from '../components/Map/PhotoMap.jsx';

export default function MapPage() {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    axios.get('/api/photos').then(res => setPhotos(res.data));
  }, []);

  return (
    <div>
      <h2 style={{ padding: '1rem' }}>Photo Map</h2>
      <PhotoMap photos={photos} />
    </div>
  );
}
