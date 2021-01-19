var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
    
    password: "",
    database: "employees_DB"
});

connection.connect(function(err) {
    if (err) throw err;
    startUp();
});

function startUp() {
    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "Choose what you would like to do.",
            choices: [
                "View Departments",
                "View Roles",
                "View Employees",
                "Add Departments",
                "Add Roles",
                "Add Employees",
                "Update Employee Roles",
                "Exit"
            ]
        })
        .then(function(answer) {
            switch (answer.action) {
                case "View Departments":
                    viewDepartments();
                    break;
                case "View Roles":
                    viewRoles();
                    break;
                case "View Employees":
                    viewEmployees();
                    break;
                case "Add Departments":
                    addDepartments();
                    break;
                case "Add Roles":
                    addRoles();
                    break;
                case "Add Employees":
                    addEmployees();
                    break;
                case "Update Employee Roles":
                    updateEmployeeRoles();
                    break;
                case "Exit":
                    connection.end();
                    break;
            }
        });
}

function viewDepartments() {
    connection.query("SELECT * FROM department", function(err, res) {
        if (err) throw err;
        console.log(res);
        startUp();
    });
}

function viewRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.log(res);
        startUp();
    });
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.log(res);
        startUp();
    });
}

function addDepartments(){
    inquirer
        .prompt([
            {
                name: "department_id",
                type: "input",
                message: "Add new department id."
            },
            {
                name: "name",
                type: "input",
                message: "Add new department name."
            }
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO department SET ?",
                {
                    department_id: answer.department_id,
                    name: answer.name
                },
                function(err) {
                    if (err) throw err;
                    console.log("New Department has been added.");
                    startUp();
                }
            )
        });
}

function addRoles(){
    inquirer
        .prompt([
            {
                name: "role_id",
                type: "input",
                message: "Add new role id."
            },
            {
                name: "title",
                type: "input",
                message: "Add new title for role."
            },
            {
                name: "salary",
                type: "input",
                message: "Add new salary."
            },
            {
                name: "department_id",
                type: "input",
                message: "Add department id that role belongs too."
            },
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO role SET ?",
                {
                    role_id: answer.role_id,
                    title: answer.title,
                    salary: answer.salary,
                    department_id: answer.department_id
                },
                function(err) {
                    if (err) throw err;
                    console.log("New Role has been added.");
                    startUp();
                }
            )
        });
}

function addEmployees() {
    inquirer
        .prompt([
            {
                name: "employee_id",
                type: "input",
                message: "Add new employee id."
            },
            {
                name: "first_name",
                type: "input",
                message: "Add first name for employee."
            },
            {
                name: "last_name",
                type: "input",
                message: "Add last name for employee."
            },
            {
                name: "role_id",
                type: "input",
                message: "Add role id for new employee."
            },
            {
                name: "manager_id",
                type: "input",
                message: "Add manager id that will overseen the new employee."
            },
        ])
        .then(function(answer) {
            connection.query(
                "INSERT INTO employee SET ?",
                {
                    employee_id: answer.employee_id,
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: answer.role_id,
                    manager_id: answer.manager_id
                },
                function(err) {
                    if (err) throw err;
                    console.log("New Employee has been added.");
                    startUp();
                }
            )
        });
}