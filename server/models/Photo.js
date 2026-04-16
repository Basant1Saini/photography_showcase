import mongoose from 'mongoose';

const photoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  imageUrl: { type: String, required: true },
  location: {
    type: { type: String, default: 'Point' },
    coordinates: { type: [Number], required: true }, // [lng, lat]
  },
  category: String,
  photographer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

photoSchema.index({ location: '2dsphere' });

export default mongoose.model('Photo', photoSchema);
