var mysql = require("mysql");
var inquirer = require("inquirer");
var cTable = require("console.table")

var connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",
    
    password: "Amb-19376482",
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
        console.table(res);
        startUp();
    });
}

function viewRoles() {
    connection.query("SELECT * FROM role", function(err, res) {
        if (err) throw err;
        console.table(res);
        startUp();
    });
}

function viewEmployees() {
    connection.query("SELECT * FROM employee", function(err, res) {
        if (err) throw err;
        console.table(res);
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
                message: "Add manager id that will oversee the new employee."
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

function updateEmployeeRoles(){
    connection.query("SELECT * FROM employee", function(err,results) {
        if (err) throw err;
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "rawlist",
                    choices: function(){
                        var choiceArray = [];
                        for (var i = 0; i < results.length; i++) {
                            choiceArray.push(results[i].employee_id)
                        }
                        return choiceArray;
                    },
                    message: "Which employee would you like to update?"
                }                
             ])
            .then(function(answer) {
                var chosenEmployee;
                for (var i = 0; i < results.length; i++) {
                    if (results[i].employee_id === answer.choice) {
                        chosenEmployee = results[i];
                        console.table(chosenEmployee);
                        inquirer
                            .prompt([
                                {
                                    name: "update_employee_id",
                                    type: "input",
                                    message: "Update employee id."
                                },
                                {
                                    name: "update_role_id",
                                    type: "input",
                                    message: "Update role id for employee."
                                },
                                {
                                    name: "update_manager_id",
                                    type: "input",
                                    message: "Update manager id that will oversee the employee."
                                },
                            ])
                            .then(function(answer2){
                                connection.query(
                                    "UPDATE employee SET ? WHERE ?",
                                    [
                                        {
                                            employee_id: answer2.update_employee_id,
                                            role_id: answer2.update_role_id,
                                            manager_id: answer2.update_manager_id
                                        },
                                        {
                                            employee_id: chosenEmployee.employee_id
                                        }
                                    ],
                                    function(error) {
                                        if (error) throw err;
                                        console.log("Employee has been updated.");
                                        startUp();
                                    }
                                )
                            });
                    }
                }
            });
    })
}
