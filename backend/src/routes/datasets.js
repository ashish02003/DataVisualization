// backend/routes/datasets.js
const express = require('express');
const router = express.Router();
const {
  uploadDataset,
  getDatasets,
  getDataset,
  deleteDataset
} = require('../controllers/datasetController');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');

router.post('/upload', protect, upload.single('file'), uploadDataset);
router.get('/', protect, getDatasets);
router.get('/:id', protect, getDataset);
router.delete('/:id', protect, deleteDataset);

module.exports = router;