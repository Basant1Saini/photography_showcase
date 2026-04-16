export default function PhotoCard({ photo, onDelete, currentUserId }) {
  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden', width: '250px' }}>
      <img src={photo.imageUrl} alt={photo.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
      <div style={{ padding: '0.75rem' }}>
        <h3 style={{ margin: '0 0 0.25rem' }}>{photo.title}</h3>
        <p style={{ margin: 0, color: '#666', fontSize: '0.85rem' }}>{photo.photographer?.name}</p>
        {photo.category && <span style={{ fontSize: '0.75rem', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>{photo.category}</span>}
        {currentUserId === photo.photographer?._id && (
          <button onClick={() => onDelete(photo._id)} style={{ marginTop: '0.5rem', color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
