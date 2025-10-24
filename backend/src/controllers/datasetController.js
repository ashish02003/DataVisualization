// backend/controllers/datasetController.js
const Dataset = require('../models/Dataset');
const User = require('../models/User');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Helper function to detect column type
const detectColumnType = (value) => {
  if (value === null || value === undefined || value === '') return 'string';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'boolean') return 'boolean';
  if (!isNaN(Date.parse(value)) && value.toString().match(/\d{4}-\d{2}-\d{2}/)) return 'date';
  return 'string';
};

// @desc    Upload and parse dataset
// @route   POST /api/datasets/upload
// @access  Private
exports.uploadDataset = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'Please upload a file'
      });
    }

    const { name, description } = req.body;
    const filePath = req.file.path;

    // Read the Excel/CSV file
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    
    // Convert to JSON
    const jsonData = xlsx.utils.sheet_to_json(worksheet);

    if (jsonData.length === 0) {
      fs.unlinkSync(filePath); // Delete uploaded file
      return res.status(400).json({
        success: false,
        message: 'The uploaded file is empty'
      });
    }

    // Extract columns from first row
    const columnNames = Object.keys(jsonData[0]);
    const columns = columnNames.map((colName, index) => ({
      name: colName,
      type: detectColumnType(jsonData[0][colName]),
      index
    }));

    // Create dataset
    const dataset = await Dataset.create({
      user: req.user._id,
      name: name || req.file.originalname,
      description: description || '',
      fileName: req.file.originalname,
      fileSize: req.file.size,
      columns,
      data: jsonData,
      rowCount: jsonData.length,
      columnCount: columnNames.length
    });

    // Update user's datasets
    await User.findByIdAndUpdate(req.user._id, {
      $push: { datasets: dataset._id }
    });

    // Delete uploaded file after processing
    fs.unlinkSync(filePath);

    res.status(201).json({
      success: true,
      message: 'Dataset uploaded successfully',
      data: dataset
    });

  } catch (error) {
    console.error('Upload error:', error);
    
    // Clean up file if error occurs
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: 'Error uploading dataset',
      error: error.message
    });
  }
};

// @desc    Get all datasets for user
// @route   GET /api/datasets
// @access  Private
exports.getDatasets = async (req, res) => {
  try {
    const datasets = await Dataset.find({ user: req.user._id })
      .select('-data') // Exclude large data field
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: datasets.length,
      data: datasets
    });
  } catch (error) {
    console.error('Get datasets error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching datasets',
      error: error.message
    });
  }
};

// @desc    Get single dataset with pagination and filters
// @route   GET /api/datasets/:id
// @access  Private
exports.getDataset = async (req, res) => {
  try {
    const { page = 1, limit = 50, search = '', sortBy = '', sortOrder = 'asc' } = req.query;
    
    const dataset = await Dataset.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found'
      });
    }

    let filteredData = [...dataset.data];

    // Apply search filter
    if (search) {
      filteredData = filteredData.filter(row => {
        return Object.values(row).some(value => 
          String(value).toLowerCase().includes(search.toLowerCase())
        );
      });
    }

    // Apply sorting
    if (sortBy && dataset.columns.some(col => col.name === sortBy)) {
      filteredData.sort((a, b) => {
        const aVal = a[sortBy];
        const bVal = b[sortBy];
        
        if (typeof aVal === 'number' && typeof bVal === 'number') {
          return sortOrder === 'asc' ? aVal - bVal : bVal - aVal;
        }
        
        const aStr = String(aVal).toLowerCase();
        const bStr = String(bVal).toLowerCase();
        
        if (sortOrder === 'asc') {
          return aStr.localeCompare(bStr);
        } else {
          return bStr.localeCompare(aStr);
        }
      });
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + parseInt(limit);
    const paginatedData = filteredData.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      data: {
        _id: dataset._id,
        name: dataset.name,
        description: dataset.description,
        fileName: dataset.fileName,
        columns: dataset.columns,
        rows: paginatedData,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(filteredData.length / limit),
          totalRows: filteredData.length,
          rowsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    console.error('Get dataset error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching dataset',
      error: error.message
    });
  }
};

// @desc    Delete dataset
// @route   DELETE /api/datasets/:id
// @access  Private
exports.deleteDataset = async (req, res) => {
  try {
    const dataset = await Dataset.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!dataset) {
      return res.status(404).json({
        success: false,
        message: 'Dataset not found'
      });
    }

    await dataset.deleteOne();

    // Remove from user's datasets
    await User.findByIdAndUpdate(req.user._id, {
      $pull: { datasets: dataset._id }
    });

    res.status(200).json({
      success: true,
      message: 'Dataset deleted successfully'
    });
  } catch (error) {
    console.error('Delete dataset error:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting dataset',
      error: error.message
    });
  }
};