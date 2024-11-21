var express = require('express');
var router = express.Router();
// Require controller modules.
var api_controller = require('../controllers/api');
var department_controller = require('../controllers/department');

/// API ROUTE ///
// GET resources base.
router.get('/', api_controller.api);
/// COSTUME ROUTES ///
// POST request for creating a Costume.
router.post('/department', department_controller.department_create_post);
// DELETE request to delete Costume.
router.delete('/department/:id', department_controller.department_delete);
// PUT request to update Costume.
router.put('/department/:id', department_controller.department_update_put);
// GET request for one Costume.
router.get('/department/:id', department_controller.department_detail);
// GET request for list of all Costume items.
router.get('/department', department_controller.department_list);



module.exports = router;