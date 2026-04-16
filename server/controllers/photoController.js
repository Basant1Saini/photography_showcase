import Photo from '../models/Photo.js';

export async function getPhotos(req, res) {
  try {
    const photos = await Photo.find().populate('photographer', 'name avatarUrl');
    res.json(photos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function getPhoto(req, res) {
  try {
    const photo = await Photo.findById(req.params.id).populate('photographer', 'name avatarUrl bio');
    if (!photo) return res.status(404).json({ message: 'Photo not found' });
    res.json(photo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function createPhoto(req, res) {
  const { title, description, category, lat, lng } = req.body;
  try {
    const photo = await Photo.create({
      title,
      description,
      category,
      imageUrl: req.file.path,
      location: { type: 'Point', coordinates: [parseFloat(lng), parseFloat(lat)] },
      photographer: req.user.id,
    });
    res.status(201).json(photo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function updatePhoto(req, res) {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });
    if (photo.photographer.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    Object.assign(photo, req.body);
    await photo.save();
    res.json(photo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

export async function deletePhoto(req, res) {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: 'Photo not found' });
    if (photo.photographer.toString() !== req.user.id)
      return res.status(403).json({ message: 'Not authorized' });

    await photo.deleteOne();
    res.json({ message: 'Photo deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
