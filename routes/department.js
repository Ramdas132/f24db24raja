var express = require('express');
var router = express.Router();
const departmentcontroller = require('../controllers/department'); 
//router.post('/', departmentcontroller.department_create_post);
router.get('/detail', departmentcontroller.department_view_one_Page);





//router.get('/', departmentcontroller.department_view_all_Page);
 
// Route for creating a chocolate
router.post('/', departmentcontroller.department_create_post);
 
router.delete('/chocolates/:id', departmentcontroller.department_delete);
 

 
/* GET create chocolate page */
router.get('/create', departmentcontroller.department_create_Page);
router.get('/delete', departmentcontroller.department_delete_Page);
 
router.get('/update', departmentcontroller.department_update_Page);
 
//router.put('/chocolates/:id', departmentcontroller.department_update);

module.exports = router;