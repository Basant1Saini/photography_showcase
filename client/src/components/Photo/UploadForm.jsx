import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext.jsx';

export default function UploadForm({ onUploaded }) {
  const { token } = useAuth();
  const [form, setForm] = useState({ title: '', description: '', category: '', lat: '', lng: '' });
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    if (!file) return setError('Please select an image');
    setLoading(true);
    setError('');
    try {
      const data = new FormData();
      Object.entries(form).forEach(([k, v]) => data.append(k, v));
      data.append('image', file);
      const res = await axios.post('/api/photos', data, {
        headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'multipart/form-data' },
      });
      onUploaded?.(res.data);
      setForm({ title: '', description: '', category: '', lat: '', lng: '' });
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxWidth: '400px' }}>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <input placeholder="Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
      <textarea placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} />
      <input placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} />
      <input placeholder="Latitude" required type="number" step="any" value={form.lat} onChange={e => setForm({ ...form, lat: e.target.value })} />
      <input placeholder="Longitude" required type="number" step="any" value={form.lng} onChange={e => setForm({ ...form, lng: e.target.value })} />
      <input type="file" accept="image/*" required onChange={e => setFile(e.target.files[0])} />
      <button type="submit" disabled={loading}>{loading ? 'Uploading...' : 'Upload Photo'}</button>
    </form>
  );
}
