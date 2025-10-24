// backend/models/Dataset.js
const mongoose = require('mongoose');

const columnSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['string', 'number', 'date', 'boolean'],
    default: 'string'
  },
  index: {
    type: Number,
    required: true
  }
});

const datasetSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: [true, 'Dataset name is required'],
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  fileName: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  columns: [columnSchema],
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  rowCount: {
    type: Number,
    required: true
  },
  columnCount: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

// Indexes for better query performance
datasetSchema.index({ user: 1, createdAt: -1 });
datasetSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Dataset', datasetSchema);