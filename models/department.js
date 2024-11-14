const mongoose = require("mongoose")
const departmentSchema = mongoose.Schema({
    departmentName: String,
    size: String,
    budget: Number
})
module.exports = mongoose.model("department",
    departmentSchema);