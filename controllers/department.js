
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

exports.department_create_Page = function (req, res) {
    console.log("Create view for department");
    try {
        res.render('departmentcreate', { title: 'Create Department' });
    } catch (err) {
        res.status(500);
        res.send(`{'error': '${err}'}`);
    }
};


exports.department_view_one_Page = async function (req, res) {
    console.log("Single view for ID: " + req.query.id);
    try {
        const result = await Department.findById(req.query.id); // Fetch from database
        console.log("Department fetched: ", result); // Log the result for debugging
        res.render('departmentdetail', { title: 'Department Detail', toShow: result });
    } catch (err) {
        console.error(err);
        res.status(500).send(`{'error': '${err}'}`);
    }
};
exports.department_view_all_Page = async function (req, res) {
    try {
        results = await Department.find();  // Fetch all heritage sites from the DB
        res.render('department', { title: 'department', results: results });  // Render the view with results
    } catch (err) {
        res.status(500).send(`{"error": ${err}}`);  // Handle errors and send a response
    }
};


// For a specific Department

exports.department_detail = async function (req, res) {
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
exports.department_create_post = async function (req, res) {
    console.log(req.body)
    let document = new Department();
    document.departmentName = req.body.departmentName;
    document.size = req.body.size;
    document.budget = req.body.budget;
    try {
        let result = await document.save();
        res.send(result);
    }
    catch (err) {
        res.status(500);
        res.send(`{"error": ${err}}`);
    }
};


exports.department_update_Page = async function (req, res) {
    console.log("update view for item " + req.query.id);
    try {
        let result = await Department.findById(req.query.id);
        res.render('departmentupdate', { title: 'Department Update', toShow: result });
    }
    catch (err) {
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.department_delete_Page = async function(req, res) {
    console.log("Delete view for id " + req.query.id)
    try{
    result = await Department.findById(req.query.id)
    res.render('departmentdelete', { title: 'Department Delete', toShow:
   result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };


// Handle Department delete on DELETE
exports.department_delete = async function (req, res) {
    console.log("delete " + req.params.id)
    try {
        result = await Department.findByIdAndDelete(req.params.id)
        console.log("Removed " + result)
        res.send(result)
    } catch (err) {
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};
// Handle Department update on PUT
exports.department_update_put = async function (req, res) {
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

exports.department_update_post = async function (req, res) {
    try {
        // Try updating the department
        const updatedDepartment = await Department.findByIdAndUpdate(
            req.body.id, 
            req.body, 
            { new: true, runValidators: true } // Ensure validation is applied during update
        );

        if (!updatedDepartment) {
            return res.status(404).json({ error: 'Department not found' });
        }

        // Return a success message if the update is successful
        res.status(200).json({ message: 'Update succeeded', updatedDepartment });
    } catch (err) {
        // Check if the error is a validation error
        if (err.name === 'ValidationError') {
            // Send back the validation error details to the client
            return res.status(400).json({ error: `Validation failed: ${err.message}` });
        }

        // Handle other types of errors
        res.status(500).json({ error: `Internal server error: ${err.message}` });
    }
};



