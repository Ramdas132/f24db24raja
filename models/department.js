const mongoose = require('mongoose');

const departmentSchema = new mongoose.Schema({
  departmentName: String,
  size: String,
  budget: Number
});

module.exports = mongoose.model('Department', departmentSchema);
