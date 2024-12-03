const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
    required: [true, 'Department name is required.'], 
    minlength: [3, 'Department name must be at least 3 characters long.'], 
    maxlength: [100, 'Department name cannot exceed 100 characters.'], 
  },
  size: {
    type: String,
    required: [true, 'Size is required.'], 
    enum: {
      values: ['Small', 'Medium', 'Large'], 
    },
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required.'],
    min: [1000, 'Budget must be at least 1000.'],
    max: [1000000, 'Budget cannot exceed 1000000.']
  }
});

module.exports = mongoose.model('Department', departmentSchema);

