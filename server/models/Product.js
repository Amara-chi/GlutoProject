import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  subcategory: {
    type: String
  },
  image: {
    type: String,
    default: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg'
  },
  availability: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  ean: {
    type: String
  },
  weight: {
    type: String
  },
  origin: {
    type: String
  },
  packaging: {
    pieces: Number,
    cartons: Number,
    pallets: Number
  },
  leadTime: {
    type: String,
    default: '2-3 weeks'
  },
  shelfLife: {
    type: String,
    default: '12 months'
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

productSchema.index({ name: 'text', description: 'text' });

export default mongoose.model('Product', productSchema);