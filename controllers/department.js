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

        exports.department_detail = async function(req, res) {
            console.log("Detail of Department with ID:", req.params.id);
            try {
                const result = await Department.findById(req.params.id);
                if (!result) {
                    res.status(404).send(`{"error": "Department for ID ${req.params.id} not found"}`);
                } else {
                    res.send(result);
                }
            } catch (error) {
                res.status(500).send(`{"error": "Error retrieving document for ID ${req.params.id}: ${error.message}"}`);
            }
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
exports.department_update_put = async function(req, res) {
    console.log(`Updating Department with ID: ${req.params.id} and data: ${JSON.stringify(req.body)}`);
    try {
        let toUpdate = await Department.findById(req.params.id);

        // If the document is not found, send a 404 response
        if (!toUpdate) {
            return res.status(404).send(`{"error": "Department with ID ${req.params.id} not found"}`);
        }

        // Update fields if they are present in the request body
        if (req.body.departmentName) toUpdate.departmentName = req.body.departmentName;
        if (req.body.size) toUpdate.size = req.body.size;
        if (req.body.budget) toUpdate.budget = req.body.budget;

        // Checkbox example: converting undefined to false if unchecked
        toUpdate.is_active = req.body.checkbox_active ? true : false;

        let result = await toUpdate.save();
        console.log("Update successful:", result);
        res.send(result);
    } catch (err) {
        console.error("Error updating document:", err);
        res.status(500).send(`{"error": "Update for ID ${req.params.id} failed: ${err.message}"}`);
    }
};


