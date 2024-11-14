const department = require('../models/department');
const Department = require('../models/department');


// List all Departments
exports.department_list = async function (req, res) {
    try {
        const department = await Department.find();
        res.send(department);
    } catch (err) {
        res.status(500).send({ "error": err.message });
    }
};


exports.department_view_all_Page = async function(req, res) {
    try{
    const thedepartment = await Department.find();
    res.render('department', { title: 'Department Search Results', results: thedepartment });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    
    




// For a specific Department
exports.department_detail = function (req, res) {
    res.send('NOT IMPLEMENTED: Department detail: ' + req.params.id);
};

// Handle Department create on POST
exports.department_create_post = async function(req, res) {
    console.log(req.body)
    let document = new department();
    document.departmentName = req.body.departmentName;
    document.size = req.body.size;
    document.budget = req.body.budget;
    try{
    let result = await document.save();
    res.send(result);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    

// Handle Department delete on DELETE
exports.department_delete = function (req, res) {
    res.send('NOT IMPLEMENTED: Department delete DELETE ' + req.params.id);
};

// Handle Department update on PUT
exports.department_update_put = function (req, res) {
    res.send('NOT IMPLEMENTED: Department update PUT ' + req.params.id);
};
