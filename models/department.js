const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: {
    type: String,
  },
  size: {
    type: String,
  },
  budget: {
    type: Number,
    required: [true, 'Budget is required.'],
    min: [1000, 'Budget must be at least 1000.'], 
    max: [1000000, 'Budget cannot exceed 1000000.'] 
  }
});


module.exports = mongoose.model('Department', departmentSchema);
