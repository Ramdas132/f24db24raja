const Department = require('../models/department');

// List of all Departments
exports.department_list = function(req, res) {
    Department.find({}, function(err, departments) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(departments);
    });
};

// For a specific Department
exports.department_detail = function(req, res) {
    Department.findById(req.params.id, function(err, department) {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(department);
    });
};

// Handle Department create on POST
exports.department_create_post = function(req, res) {
    const newDepartment = new Department({
        department_name: req.body.department_name,
        location: req.body.location,
        budget: req.body.budget
    });

    newDepartment.save(function(err, department) {
        if (err) {
            return res.status(500).send(err);
        }
        res.status(201).json(department);
    });
};

// Handle Department delete on DELETE
exports.department_delete = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};

// Handle Department update on PUT
exports.department_update_put = function(req, res) {
    res.send('NOT IMPLEMENTED: Costume delete DELETE ' + req.params.id);
};