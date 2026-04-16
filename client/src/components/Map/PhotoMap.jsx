import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix default marker icons broken by Vite bundling
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({ iconUrl: markerIcon, iconRetinaUrl: markerIcon2x, shadowUrl: markerShadow });

export default function PhotoMap({ photos }) {
  return (
    <MapContainer center={[20, 0]} zoom={2} style={{ height: '500px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      {photos.map((photo) => (
        <Marker
          key={photo._id}
          position={[photo.location.coordinates[1], photo.location.coordinates[0]]}
        >
          <Popup>
            <img src={photo.imageUrl} alt={photo.title} style={{ width: '150px', borderRadius: '4px' }} />
            <p><strong>{photo.title}</strong></p>
            <p>{photo.photographer?.name}</p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
