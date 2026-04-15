# 📸 Local Photography Showcase

A MERN stack web application that allows photographers to showcase their work tied to real-world locations, displayed on an interactive map.

## Tech Stack

- **MongoDB** – stores photo metadata, location coordinates, and user info
- **Express.js** – REST API server
- **React** – frontend UI
- **Node.js** – backend runtime
- **Leaflet.js** (via `react-leaflet`) – interactive map view (open-source, no deprecated APIs)
- **Cloudinary** – photo storage and delivery
- **JWT** – authentication

## Features

- Upload photos with GPS coordinates or manual location pin
- Interactive map view showing photo locations as markers
- Click a marker to preview the photo and photographer details
- User registration, login, and profile management
- Browse photos by location, category, or photographer

## Project Structure

```
photography_showcase/
├── client/                  # React frontend
│   ├── public/
│   └── src/
│       ├── components/
│       │   ├── Map/         # Leaflet map components
│       │   ├── Photo/       # Photo card, upload form
│       │   └── Auth/        # Login, register
│       ├── pages/
│       ├── context/         # Auth context
│       └── App.jsx
├── server/                  # Express backend
│   ├── models/              # Mongoose schemas
│   ├── routes/              # API routes
│   ├── controllers/
│   ├── middleware/          # Auth middleware
│   └── server.js
├── .env.example
└── package.json
```

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- Cloudinary account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/<your-username>/photography_showcase.git
   cd photography_showcase
   ```

2. Install dependencies:
   ```bash
   # Install server dependencies
   cd server && npm install

   # Install client dependencies
   cd ../client && npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   ```

   Fill in the following in `.env`:
   ```env
   MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/photography
   JWT_SECRET=<your_jwt_secret>
   CLOUDINARY_CLOUD_NAME=<your_cloud_name>
   CLOUDINARY_API_KEY=<your_api_key>
   CLOUDINARY_API_SECRET=<your_api_secret>
   PORT=5000
   ```

4. Run the app:
   ```bash
   # From root (runs both client and server via concurrently)
   npm run dev
   ```

   Or separately:
   ```bash
   # Server
   cd server && npm run dev

   # Client
   cd client && npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive JWT |
| GET | `/api/photos` | Get all photos with coordinates |
| GET | `/api/photos/:id` | Get a single photo |
| POST | `/api/photos` | Upload a new photo (auth required) |
| PUT | `/api/photos/:id` | Update photo (owner only) |
| DELETE | `/api/photos/:id` | Delete photo (owner only) |

## Map Integration

Uses [`react-leaflet`](https://react-leaflet.js.org/) v4 with OpenStreetMap tiles — no API key required, no deprecated APIs.

```jsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

<MapContainer center={[20, 0]} zoom={2}>
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
  {photos.map(photo => (
    <Marker key={photo._id} position={[photo.lat, photo.lng]}>
      <Popup>
        <img src={photo.imageUrl} alt={photo.title} />
        <p>{photo.title}</p>
      </Popup>
    </Marker>
  ))}
</MapContainer>
```

## Data Model

### Photo
```js
{
  title: String,
  description: String,
  imageUrl: String,        // Cloudinary URL
  location: {
    type: { type: String, default: 'Point' },
    coordinates: [Number]  // [longitude, latitude]
  },
  category: String,
  photographer: ObjectId,  // ref: User
  createdAt: Date
}
```

### User
```js
{
  name: String,
  email: String,
  passwordHash: String,
  bio: String,
  avatarUrl: String
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Run client + server concurrently |
| `npm run build` | Build React client for production |
| `npm start` | Start production server |

## License

MIT
