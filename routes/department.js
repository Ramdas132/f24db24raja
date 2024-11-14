var express = require('express');
var router = express.Router();
const departmentcontroller = require('../controllers/department'); 
router.get('/', departmentcontroller.department_view_all_Page);
//router.post('/', departmentcontroller.department_create_post);

module.exports = router;
